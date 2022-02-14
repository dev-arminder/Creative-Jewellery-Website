import { Renderer, Camera, Transform } from "ogl";

import Home from "./Home";

class Canvas {
  constructor() {
    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.createHome();
  }
  createRenderer() {
    this.renderer = new Renderer();
    this.gl = this.renderer.gl;
    const scriptTag = document.querySelector("#main-script");
    scriptTag.before(this.gl.canvas);
  }

  createCamera() {
    this.camera = new Camera();
    this.camera.position.z = 5;
  }

  createScene() {
    this.scene = new Transform();
  }

  createHome() {
    this.home = new Home({ gl: this.gl, scene: this.scene });
    // this.geometry = new Box(this.gl);
    // this.program = new Program(this.gl, {
    //   vertex,
    //   fragment
    // });
    // this.mesh = new Mesh(this.gl, {
    //   geometry: this.geometry,
    //   program: this.program
    // });
    // this.mesh.setParent(this.scene);
  }

  onResize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.perspective({
      aspect: window.innerWidth / window.innerHeight
    });
  }

  update() {
    // this.mesh.rotation.x += 0.1;
    // this.mesh.rotation.y += 0.1;
    this.renderer.render({
      camera: this.camera,
      scene: this.scene
    });
  }
  // show() {}
}

export default Canvas;
