import Page from "../../classes/Page";

class Home extends Page {
  constructor() {
    super({
      id: "home",
      element: ".home",
      elements: {
        navigation: document.querySelector(".navigation"),
        link: ".home__link"
      }
    });
  }
  create() {
    super.create();
    this.elements.link.addEventListener("click", () => {
      alert("Clicked Me");
    });
  }
}

export default Home;
