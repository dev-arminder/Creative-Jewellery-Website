import Home from "./pages/home/home";
import About from "./pages/about/about";
import Details from "./pages/details/details";
import collections from "./pages/collections/collections";

class App {
  constructor() {
    this.createContent();
    this.createPages();
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
}

new App();
