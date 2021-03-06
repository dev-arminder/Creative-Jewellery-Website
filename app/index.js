import Preloader from "./components/Preloader";

import Home from "./pages/home/home";
import About from "./pages/about/about";
import Details from "./pages/details/details";
import collections from "./pages/collections/collections";

import each from "lodash/each";
import normalizeWheel from "normalize-wheel";
import Navigation from "./components/Navigation";

import Canvas from "components/Canvas";

class App {
  constructor() {
    this.createContent();

    this.createPreloader();
    this.createNavigation();

    // Creating Canvas
    this.createCanvas();

    this.createPages();
    // TO LIMIT SMOOTH SCROLL
    this.addEventsListeners();
    this.addLinkListeners();

    // smooth Scroll Hack
    this.update();
  }

  createNavigation() {
    this.navigation = new Navigation({
      template: this.template
    });
  }

  createPreloader() {
    this.preloader = new Preloader();
    const handlePreloaded = this.onPreloaded.bind(this);
    this.preloader.once("completed", handlePreloaded);
  }

  createCanvas() {
    this.canvas = new Canvas({
      template: this.template
    });
  }
  createContent() {
    this.content = document.querySelector(".content");
    this.template = this.content.getAttribute("data-template");
  }

  createPages() {
    this.pages = {
      home: new Home(),
      about: new About(),
      details: new Details(),
      collections: new collections()
    };
    this.page = this.pages[this.template];
    this.page.create();

    // console.log(this.page);
  }

  async onChange(url) {
    this.canvas.onChangeStart(this.template);

    await this.page.hide();
    const request = await fetch(url);
    if (request.status === 200) {
      const html = await request.text();
      const div = document.createElement("div");
      div.innerHTML = html;
      const divContent = div.querySelector(".content");
      this.template = divContent.getAttribute("data-template");
      this.content.setAttribute("data-template", this.template);
      this.content.innerHTML = divContent.innerHTML;

      this.canvas.onChangedEnd(this.template);

      this.page = this.pages[this.template];

      // Implementing Navigation
      this.navigation.onChange(this.template);

      this.page.create();

      // TO LIMIT SMOOTH SCROLL
      this.onResize();
      // await this.page.show();
      this.page.show();

      this.addLinkListeners();
    } else {
      alert("Man This Page doesn't exist");
    }
    console.log(request);
  }

  onPreloaded() {
    this.preloader.destroy();

    // TO LIMIT SMOOTH SCROLL
    this.onResize();

    this.page.show();
  }

  addLinkListeners() {
    const links = document.querySelectorAll("a");
    each(links, link => {
      link.onclick = e => {
        e.preventDefault();
        const { href } = link;
        this.onChange(href);
      };
    });
  }

  onResize() {
    // if (this.canvas && this.canvas.onResize) {
    //   this.canvas.onResize();
    // }
    window.requestAnimationFrame(_ => {
      if (this.canvas && this.canvas.onResize) {
        this.canvas.onResize();
      }
    });
    if (this.page && this.page.onResize) {
      this.page.onResize();
    }
  }

  // Mouse and Touch Evevnts
  onTouchDown(event) {
    if (this.canvas && this.canvas.onResize) {
      this.canvas.onTouchDown(event);
    }
  }

  onTouchMove(event) {
    if (this.canvas && this.canvas.onResize) {
      this.canvas.onTouchMove(event);
    }
  }

  onTouchUp(event) {
    if (this.canvas && this.canvas.onResize) {
      this.canvas.onTouchUp(event);
    }
  }

  onWheel(event) {
    const normalizedWheel = normalizeWheel(event);

    if (this.canvas && this.canvas.onWheel) {
      this.canvas.onWheel(normalizedWheel);
    }

    if (this.page && this.page.onWheel) {
      this.page.onWheel(normalizedWheel);
    }
  }

  update() {
    if (this.canvas && this.canvas.update) {
      this.canvas.update(this.page.scroll);
    }

    if (this.page && this.page.update) {
      this.page.update();
    }

    this.frame = window.requestAnimationFrame(this.update.bind(this));
  }

  addEventsListeners() {
    // mouse Events
    window.addEventListener("mousewheel", this.onWheel.bind(this));

    window.addEventListener("mousedown", this.onTouchDown.bind(this));
    window.addEventListener("mouseup", this.onTouchUp.bind(this));
    window.addEventListener("mousemove", this.onTouchMove.bind(this));

    // touch Events
    window.addEventListener("touchstart", this.onTouchDown.bind(this));
    window.addEventListener("touchend", this.onTouchUp.bind(this));
    window.addEventListener("touchmove", this.onTouchMove.bind(this));

    window.addEventListener("resize", this.onResize.bind(this));
  }
}

new App();
