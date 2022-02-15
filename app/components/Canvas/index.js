import { Renderer, Camera, Transform } from "ogl";

import Home from "./Home";

class Canvas {
  constructor() {
    this.x = {
      start: 0,
      end: 0,
      distance: 0
    };

    this.y = {
      start: 0,
      end: 0,
      distance: 0
    };
    this.createRenderer();
    this.createCamera();
    this.createScene();

    this.onResize();

    this.createHome();
  }
  createRenderer() {
    this.renderer = new Renderer({
      alpha: true
    });
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
    this.home = new Home({ gl: this.gl, scene: this.scene, sizes: this.sizes });
  }

  onTouchDown() {
    this.isDown = true;
    this.x.start = event.touches ? event.touches[0].clientX : event.clientX;
    this.y.start = event.touches ? event.touches[0].clientY : event.clientY;

    if (this.home) {
      this.home.onTouchDown({
        x: this.x,
        y: this.y
      });
    }
  }
  onTouchMove() {
    if (!this.isDown) return;
    const x = event.touches ? event.touches[0].clientX : event.clientX;
    const y = event.touches ? event.touches[0].clientY : event.clientY;

    this.x.end = x;
    this.y.end = y;

    // this.x.distance = this.x.start - this.x.end;
    // this.y.distance = this.y.start - this.y.end;

    if (this.home) {
      this.home.onTouchMove({
        x: this.x,
        y: this.y
      });
    }
  }

  onTouchUp() {
    this.isDown = false;
    const x = event.touches ? event.touches[0].clientX : event.clientX;
    const y = event.touches ? event.touches[0].clientY : event.clientY;

    this.x.end = x;
    this.y.end = y;

    if (this.home) {
      this.home.onTouchUp({
        x: this.x,
        y: this.y
      });
    }
  }

  onResize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.perspective({
      aspect: window.innerWidth / window.innerHeight
    });

    const fov = this.camera.fov * (Math.PI / 180);
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width = height * this.camera.aspect;

    this.sizes = {
      height,
      width
    };

    if (this.home) {
      this.home.onResize({
        sizes: this.sizes
      });
    }
  }

  update(scroll) {
    // this.mesh.rotation.x += 0.1;
    // this.mesh.rotation.y += 0.1;
    if (this.home) {
      this.home.update();
    }
    this.renderer.render({
      camera: this.camera,
      scene: this.scene
    });
  }

  // show() {}
}

export default Canvas;
