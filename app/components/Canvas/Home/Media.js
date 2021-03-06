import { Mesh, Program, Texture } from "ogl";
import GSAP from "gsap"

import fragment from "../../../shaders/plane-fragment.glsl";
import vertex from "../../../shaders/plane-vertex.glsl";

class Media {
  constructor({ element, geometry, gl, scene, index, sizes }) {
    this.element = element;
    this.geometry = geometry;
    this.gl = gl;
    this.scene = scene;
    this.index = index;

    this.sizes = sizes;

    this.createTexture();
    this.createProgram();
    this.createMesh();

    this.extra = { x: 0, y: 0 };
  }

  createTexture() {
    this.texture = new Texture(this.gl);
    // console.log(this.element);
    this.image = new window.Image();
    this.image.crossOrigin = "anonymous";
    this.image.src = this.element.getAttribute("data-src");
    this.image.onload = () => (this.texture.image = this.image);
  }

  createProgram() {
    this.program = new Program(this.gl, {
      fragment,
      vertex,
      uniforms: {
        uAlpha: {value: 0},
        tMap: { value: this.texture }
      }
    });
  }

  createMesh() {
    this.mesh = new Mesh(this.gl, {
      program: this.program,
      geometry: this.geometry
    });
    this.mesh.setParent(this.scene);
    // this.mesh.scale.x = 2;
    // this.mesh.position.x += this.index * this.mesh.scale.x;
  }

  createBound({ sizes }) {
    this.sizes = sizes;

    this.bounds = this.element.getBoundingClientRect();

    this.updateScale(sizes);
    this.updateX();
    this.updateY();
  }

  // Animations
  show() {
    GSAP.fromTo(
      this.program.uniforms.uAlpha,
      {
        value: 0
      },
      {
        value: 1
      }
    );
  }

  hide() {
    GSAP.to(this.program.uniforms.uAlpha, {
      value: 0
    });
  }

  onResize(sizes, scroll) {
    this.extra = {
      x: 0,
      y: 0
    };
    this.createBound(sizes);
    this.updateX(scroll ? scroll.x : 0);
    this.updateY(scroll ? scroll.y : 0);
  }

  updateScale({ width, height }) {
    this.height = this.bounds.height / window.innerHeight;
    this.width = this.bounds.width / window.innerWidth;

    // this.mesh.scale.x = width * this.bounds.width;
    // this.mesh.scale.y = height * this.bounds.height;

    this.mesh.scale.x = this.sizes.width * this.width;
    this.mesh.scale.y = this.sizes.height * this.height;

    // console.log(this.mesh.position);
  }

  updateX(x = 0) {
    this.x = (this.bounds.left + x) / window.innerWidth;
    // this.mesh.position.x =
    //   -this.sizes.width / 2 + this.mesh.scale.x / 2 + this.x * this.sizes.width;
    this.mesh.position.x =
      -this.sizes.width / 2 +
      this.mesh.scale.x / 2 +
      this.x * this.sizes.width +
      this.extra.x;
  }

  updateY(y = 0) {
    this.y = (this.bounds.top + y) / window.innerHeight;
    // this.mesh.position.y =
    //   this.sizes.height / 2 -
    //   this.mesh.scale.y / 2 -
    //   this.y * this.sizes.height;
    this.mesh.position.y =
      this.sizes.height / 2 -
      this.mesh.scale.y / 2 -
      this.y * this.sizes.height +
      this.extra.y;
  }

  update(scroll) {
    if (!this.bounds) return;
    this.updateX(scroll.x);
    this.updateY(scroll.y);
  }
}

export default Media;
