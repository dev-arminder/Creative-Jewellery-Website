import { Plane, Transform } from "ogl";

import Media from "./Media";
import map from "lodash/map";

class Home {
  constructor({ gl, scene, sizes }) {
    this.gl = gl;
    this.group = new Transform();

    this.sizes = sizes;

    this.mediasElements = document.querySelectorAll(
      ".home__gallery_media_image"
    );
    this.createGeometry();
    this.createGallery();

    this.group.setParent(scene);
  }

  createGeometry() {
    this.geometry = new Plane(this.gl);
  }
  createGallery() {
    this.medias = map(this.mediasElements, (element, index) => {
      return new Media({
        element,
        geometry: this.geometry,
        index,
        gl: this.gl,
        scene: this.group,
        sizes: this.sizes
      });
    });
  }

  onResize(event) {
    map(this.medias, media => {
      media.onResize(event);
    });
  }
}

export default Home;
