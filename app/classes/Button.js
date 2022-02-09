import GSAP from "gsap";
import Component from "./Component";

class Button extends Component {
  constructor({ element }) {
    super({ element });
    this.path = element.querySelector("path:last-child");
    this.pathLength = this.path.getTotalLength();

    this.timeLine = GSAP.timeline({ paused: true });
    this.timeLine.fromTo(
      this.path,
      {
        strokeDashoffset: this.pathLength,
        strokeDasharray: `${this.pathLength} ${this.pathLength}`
      },
      {
        strokeDashoffset: 0,
        strokeDasharray: `${this.pathLength} ${this.pathLength}`
      }
    );
  }

  addEventListener() {
    this.onMouseEnterEvent = this.onMouseEnter.bind(this);
    this.onMouseLeaveEvent = this.onMouseLeave.bind(this);
    this.element.addEventListener("mouseenter", this.onMouseEnterEvent);
    this.element.addEventListener("mouseleave", this.onMouseLeaveEvent);
  }
  removeEventListener() {
    this.onMouseEnterEvent = this.onMouseEnter.bind(this);
    this.onMouseLeaveEvent = this.onMouseLeave.bind(this);
    this.element.removeEventListener("mouseenter", this.onMouseEnterEvent);
    this.element.removeEventListener("mouseleave", this.onMouseLeaveEvent);
  }

  onMouseEnter() {
    this.timeLine.play();
  }

  onMouseLeave() {
    this.timeLine.reverse();
  }
}
export default Button;
