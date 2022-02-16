import { Plane, Transform } from "ogl";
import GSAP from "gsap";

import Media from "./Media";
import map from "lodash/map";

class Home {
  constructor({ gl, scene, sizes }) {
    this.x = {
      current: 0,
      target: 0,
      lerp: 0.1
    };
    this.y = {
      current: 0,
      target: 0,
      lerp: 0.1
    };

    this.scrollCurrent = {
      x: 0,
      y: 0
    };

    this.scroll = {
      x: 0,
      y: 0
    };

    this.gl = gl;
    this.scene = scene
    this.group = new Transform();

    this.sizes = sizes;
    this.galleryElement = document.querySelector(".home__gallery");
    this.mediasElements = document.querySelectorAll(
      ".home__gallery_media_image"
    );
    this.createGeometry();
    this.createGallery();

    this.group.setParent(scene);

    this.show();
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

  // Animations
  show() {
    map(this.medias, media => media.show());
  }

  hide() {
    map(this.medias, media => media.hide());
  }

  onResize(event) {
    this.galleryBounds = this.galleryElement.getBoundingClientRect();

    this.sizes = event.sizes;
    this.gallerySizes = {
      width: (this.galleryBounds.width / window.innerWidth) * this.sizes.width,
      height:
        (this.galleryBounds.height / window.innerHeight) * this.sizes.height
    };

    this.scroll.x = this.x.target = 0;
    this.scroll.y = this.y.target = 0;

    map(this.medias, media => {
      media.onResize(event, this.scroll);
    });
  }
  onTouchDown({ x, y }) {
    this.scrollCurrent.x = this.scroll.x;
    this.scrollCurrent.y = this.scroll.y;
  }

  onTouchMove({ x, y }) {
    const xDistance = x.start - x.end;
    const yDistance = y.start - y.end;

    this.x.target = this.scrollCurrent.x - xDistance;
    this.y.target = this.scrollCurrent.y - yDistance;
  }

  onTouchUp({ x, y }) {}

  onWheel({ pixelX, pixelY }) {
    // console.log(pixelX, pixelY);
    this.x.target += pixelX;
    this.y.target += pixelY;
  }

  update() {
    if (!this.galleryBounds) return;
    this.x.current = GSAP.utils.interpolate(
      this.x.current,
      this.x.target,
      this.x.lerp
    );
    this.y.current = GSAP.utils.interpolate(
      this.y.current,
      this.y.target,
      this.y.lerp
    );

    // Checking Scroll Directions based upon event positions

    if (this.scroll.x < this.x.current) {
      this.x.direction = "right";
    } else if (this.scroll.x > this.x.current) {
      this.x.direction = "left";
    }

    if (this.scroll.y < this.y.current) {
      this.y.direction = "up";
    } else if (this.scroll.y > this.y.current) {
      this.y.direction = "down";
    }

    this.scroll.x = this.x.current;
    this.scroll.y = this.y.current;

    map(this.medias, (media, index) => {
      const scaleX = media.mesh.scale.x / 2;
      const scaleY = media.mesh.scale.y / 2;
      // Infinite scroll for X-axis
      if (this.x.direction === "left") {
        const x = media.mesh.position.x + scaleX;
        if (x < -this.sizes.width / 2) {
          media.extra.x += this.gallerySizes.width;
          // Rotating the image
          media.mesh.rotation.z = GSAP.utils.random(
            -Math.PI * 0.02,
            Math.PI * 0.02
          );
        }
      } else if (this.x.direction === "right") {
        const x = media.mesh.position.x - scaleX;
        if (x > this.sizes.width / 2) {
          // Rotating the image
          media.extra.x -= this.gallerySizes.width;
          media.mesh.rotation.z = GSAP.utils.random(
            -Math.PI * 0.02,
            Math.PI * 0.02
          );
        }
      }

      // Infinnite scroll for Y-axis
      if (this.y.direction === "up") {
        const y = media.mesh.position.y + scaleY;
        if (y < -this.sizes.height / 2) {
          media.extra.y += this.gallerySizes.height;
          media.mesh.rotation.z = GSAP.utils.random(
            -Math.PI * 0.02,
            Math.PI * 0.02
          );
        }
      } else if (this.y.direction === "down") {
        const y = media.mesh.position.y - scaleY;
        if (y > this.sizes.height / 2) {
          media.extra.y -= this.gallerySizes.height;
          media.mesh.rotation.z = GSAP.utils.random(
            -Math.PI * 0.02,
            Math.PI * 0.02
          );
        }
      }

      // Infinite scroll for Y-axis
      media.update(this.scroll);
    });
  }

  destroy() {
    this.scene.removeChild(this.group);
  }
}

export default Home;
