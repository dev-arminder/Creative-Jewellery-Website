import Component from "../classes/Component";

import each from "lodash/each";
import GSAP from "gsap";

import { split } from "../utils/text";

class Preloader extends Component {
  constructor() {
    super({
      element: ".preloader",
      elements: {
        title: ".preloader__text",
        number: ".preloader__number",
        numberText: ".preloader__number_text ",
        images: document.querySelectorAll("img")
      }
    });
    split({
      element: this.elements.title,
      expression: "<br>"
    });
    split({
      element: this.elements.title,
      expression: "<br>"
    });
    this.elements.titleSpans = this.elements.title.querySelectorAll(
      "span span"
    );
    this.length = 0;
    // console.log(this.element, this.elements);
    this.createLoader();
  }

  createLoader() {
    each(this.elements.images, element => {
      element.src = element.getAttribute("data-src");
      element.onload = () => this.onAssestLoaded(element);
    });
  }

  onAssestLoaded(image) {
    this.length += 1;
    const percent = this.length / this.elements.images.length;
    this.elements.numberText.innerHTML = `${Math.round(percent * 100)}%`;

    if (percent === 1) {
      this.onLoaded();
    }
  }

  onLoaded() {
    return new Promise((resolve, reject) => {
      this.animateOut = GSAP.timeline({
        delay: 2
      });
      this.animateOut.to(this.elements.titleSpans, {
        y: "100%",
        stagger: 0.1,
        duration: 1.5,
        ease: "expo.out"
      });
      this.animateOut.to(
        this.elements.numberText,
        {
          y: "100%",
          stagger: 0.1,
          duration: 1.5,
          ease: "expo.out"
        },
        "-=1.4"
      );
      this.animateOut.to(
        this.element,
        {
          duration: 1.5,
          ease: "expo.out",
          scaleY: 0,
          transformOrigin: "100% 100%"
        },
        "-=1"
      );
      this.animateOut.call(() => {
        this.emit("completed");
      });
    });
  }

  destroy() {
    this.element.parentNode.removeChild(this.element);
  }
}

export default Preloader;
