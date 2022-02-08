import each from "lodash/each";
import map from "lodash/map";
import GSAP from "gsap";
import Prefix from "prefix";
import normalizeWheel from "normalize-wheel";

import Title from "../animations/Title";

class Page {
  constructor({ id, element, elements }) {
    this.selector = element;
    this.selectorChildren = {
      ...elements,
      animationsTitles: '[data-animation="title"]'
    };
    this.id = id;
    this.transformPrefix = Prefix("transform");
  }
  create() {
    this.element = document.querySelector(this.selector);
    this.elements = {};
    this.scroll = {
      current: 0,
      target: 0,
      last: 0,
      limit: 0
    };

    each(this.selectorChildren, (entry, key) => {
      if (
        entry instanceof window.HTMLElement ||
        entry instanceof window.NodeList ||
        Array.isArray(entry)
      ) {
        this.elements[key] = entry;
      } else {
        this.elements[key] = document.querySelectorAll(entry);

        if (this.elements[key].length === 0) {
          this.elements[key] = null;
        } else if (this.elements[key].length === 1) {
          this.elements[key] = document.querySelector(entry);
        }
      }
    });

    this.createAnimations();
  }

  createAnimations() {
    this.animationsTitles = map(this.elements.animationsTitles, element => {
      return new Title({ element });
    });
  }

  show() {
    return new Promise((resolve, reject) => {
      this.animationIn = GSAP.timeline();
      this.animationIn.fromTo(
        this.element,
        {
          autoAlpha: 0
        },
        {
          autoAlpha: 1,
          onComplete: resolve
        }
      );
      this.animationIn.call(() => {
        this.addEventsListener();
        resolve();
      });
    });
  }

  hide() {
    return new Promise((resolve, reject) => {
      this.removeEventListener();
      this.animationOut = GSAP.timeline();
      this.animationOut.to(this.element, {
        autoAlpha: 0,
        onComplete: resolve
      });
    });
  }

  onResize() {
    if (this.elements.wrapper) {
      this.scroll.limit =
        this.elements.wrapper.clientHeight - window.innerHeight + 200;
    }
    each(this.animationsTitles, animation => {
      animation.onResize();
    });
  }

  onMouseWheel(event) {
    // console.log(event);
    const { pixelY } = normalizeWheel(event);
    this.scroll.target += pixelY;
  }

  update() {
    // console.log(this.scroll.target);
    this.scroll.current = GSAP.utils.interpolate(
      this.scroll.current,
      this.scroll.target,
      0.1
    );
    this.scroll.target = GSAP.utils.clamp(
      0,
      this.scroll.limit,
      this.scroll.target
    );

    if (this.scroll.current < 0.01) {
      this.scroll.current = 0;
    }
    if (this.elements.wrapper) {
      this.elements.wrapper.style[
        this.transformPrefix
      ] = `translateY(-${this.scroll.current}px)`;
    }
  }

  addEventsListener() {
    window.addEventListener("mousewheel", this.onMouseWheel.bind(this));
  }

  removeEventListener() {
    window.removeEventListener("mousewheel", this.onMouseWheel.bind(this));
  }
}

export default Page;