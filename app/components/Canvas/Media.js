import { Mesh, Program, Texture } from "ogl";

import fragment from "../../shaders/plane-fragment.glsl";
import vertex from "../../shaders/plane-vertex.glsl";

class Media {
  constructor({ element, geometry, gl, scene, index }) {
    this.element = element;
    this.geometry = geometry;
    this.gl = gl;
    this.scene = scene;
    this.index = index;
    this.createTexture();
    this.createProgram();
    this.createMesh();
  }

  createTexture() {
    this.texture = new Texture(this.gl);
    console.log(this.element);
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

    this.mesh.position.x += this.index * this.mesh.scale.x;
  }
}

export default Media;
