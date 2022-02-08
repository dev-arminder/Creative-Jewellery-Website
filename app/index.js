import Preloader from "./components/Preloader";

import Home from "./pages/home/home";
import About from "./pages/about/about";
import Details from "./pages/details/details";
import collections from "./pages/collections/collections";

import each from "lodash/each";
import Navigation from "./components/Navigation";

class App {
  constructor() {
    this.createContent();

    this.createPreloader();
    this.createNavigation();

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
    if (this.page && this.page.onResize) {
      this.page.onResize();
    }
  }

  update() {
    if (this.page && this.page.update) {
      this.page.update();
    }

    const frame = window.requestAnimationFrame(this.update.bind(this));
  }

  addEventsListeners() {
    window.addEventListener("resize", this.onResize.bind(this));
  }
}

new App();
