import Component from "./Component";

class Animation extends Component {
  constructor({ element, elements }) {
    super({ element, elements });
    this.createObserver();
    this.animateOut();
  }
  createObserver() {
    this.observer = new window.IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          console.log("animateIN");
          this.animateIn();
        } else {
          console.log("animateOUr");
          this.animateOut();
        }
      });
    });

    this.observer.observe(this.element);
  }

  animateIn() {}

  animateOut() {}

  onResize() {}
}

export default Animation;
