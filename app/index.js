import Home from "./pages/home/home";
import About from "./pages/about/about";
import Details from "./pages/details/details";
import collections from "./pages/collections/collections";

import each from "lodash/each";

class App {
  constructor() {
    this.createContent();
    this.createPages();
    this.addLinkListeners();
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
    this.page.show();
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
      this.page.create();
      await this.page.show();
    } else {
      alert("Man This Page doesn't exist");
    }
    console.log(request);
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
}

new App();
