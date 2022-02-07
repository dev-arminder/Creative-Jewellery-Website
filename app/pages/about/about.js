import Page from "../../classes/Page";

class About extends Page {
  constructor() {
    super({
      id: "about",
      element: ".about",
      elements: {
        title: ".about__title",
        navigation: document.querySelector(".navigation"),
        wrapper: ".about__wrapper"
      }
    });
    // console.log("Home.js");
  }
}

export default About;
