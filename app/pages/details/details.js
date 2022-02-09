import Page from "../../classes/Page";
import Button from "../../classes/Button";

class Details extends Page {
  constructor() {
    super({
      id: "details",
      element: ".detail",
      elements: {
        button: ".detail__button"
      }
    });
  }
  create() {
    super.create();
    this.link = new Button({
      element: this.elements.button
    });
  }
  destroy() {
    super.destroy();
    this.link.removeEventListener();
  }
}

export default Details;
