/*! For license information please see main.7f7c8bed404f3e0ed9a0.hot-update.js.LICENSE.txt */
"use strict";self.webpackHotUpdatefrontend_boilerplate("main",{"./app/components/Canvas/index.js":(e,t,s)=>{s.r(t),s.d(t,{default:()=>c});var n=s("./node_modules/ogl/src/core/Renderer.js"),i=s("./node_modules/ogl/src/core/Camera.js"),h=s("./node_modules/ogl/src/core/Transform.js"),o=s("./app/components/Canvas/Home.js");const c=class{constructor(){this.x={start:0,end:0,distance:0},this.y={start:0,end:0,distance:0},this.createRenderer(),this.createCamera(),this.createScene(),this.onResize(),this.createHome()}createRenderer(){this.renderer=new n.Renderer({alpha:!0}),this.gl=this.renderer.gl;document.querySelector("#main-script").before(this.gl.canvas)}createCamera(){this.camera=new i.Camera,this.camera.position.z=5}createScene(){this.scene=new h.Transform}createHome(){this.home=new o.default({gl:this.gl,scene:this.scene,sizes:this.sizes})}onTouchDown(){this.isDown=!0,this.x.start=event.touches?event.touches[0].clientX:event.clientX,this.y.start=event.touches?event.touches[0].clientY:event.clientY,this.home&&this.home.onTouchDown({x:this.x,y:this.y})}onTouchMove(){if(!this.isDown)return;const e=event.touches?event.touches[0].clientX:event.clientX,t=event.touches?event.touches[0].clientY:event.clientY;this.x.end=e,this.y.end=t,this.home&&this.home.onTouchMove({x:this.x,y:this.y})}onTouchUp(){this.isDown=!1;const e=event.touches?event.touches[0].clientX:event.clientX,t=event.touches?event.touches[0].clientY:event.clientY;this.x.end=e,this.y.end=t,this.home&&this.home.onTouchUp({x:this.x,y:this.y})}onResize(){this.renderer.setSize(window.innerWidth,window.innerHeight),this.camera.perspective({aspect:window.innerWidth/window.innerHeight});const e=this.camera.fov*(Math.PI/180),t=2*Math.tan(e/2)*this.camera.position.z,s=t*this.camera.aspect;this.sizes={height:t,width:s},this.home&&this.home.onResize({sizes:this.sizes})}update(e){this.home&&this.home.update(),this.renderer.render({camera:this.camera,scene:this.scene})}}}},(function(e){e.h=()=>"c1e93dca449db945057c"}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QU8sQ0FDbkIvQixPQUFRbkIsS0FBS21CLE9BQ2JJLE1BQU92QixLQUFLdUIseUJDNUhsQjRCLEVBQW9CQyxFQUFJLElBQU0iLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mcm9udGVuZC1ib2lsZXJwbGF0ZS8uL2FwcC9jb21wb25lbnRzL0NhbnZhcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9mcm9udGVuZC1ib2lsZXJwbGF0ZS93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVuZGVyZXIsIENhbWVyYSwgVHJhbnNmb3JtIH0gZnJvbSBcIm9nbFwiO1xyXG5cclxuaW1wb3J0IEhvbWUgZnJvbSBcIi4vSG9tZVwiO1xyXG5cclxuY2xhc3MgQ2FudmFzIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMueCA9IHtcclxuICAgICAgc3RhcnQ6IDAsXHJcbiAgICAgIGVuZDogMCxcclxuICAgICAgZGlzdGFuY2U6IDBcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy55ID0ge1xyXG4gICAgICBzdGFydDogMCxcclxuICAgICAgZW5kOiAwLFxyXG4gICAgICBkaXN0YW5jZTogMFxyXG4gICAgfTtcclxuICAgIHRoaXMuY3JlYXRlUmVuZGVyZXIoKTtcclxuICAgIHRoaXMuY3JlYXRlQ2FtZXJhKCk7XHJcbiAgICB0aGlzLmNyZWF0ZVNjZW5lKCk7XHJcblxyXG4gICAgdGhpcy5vblJlc2l6ZSgpO1xyXG5cclxuICAgIHRoaXMuY3JlYXRlSG9tZSgpO1xyXG4gIH1cclxuICBjcmVhdGVSZW5kZXJlcigpIHtcclxuICAgIHRoaXMucmVuZGVyZXIgPSBuZXcgUmVuZGVyZXIoe1xyXG4gICAgICBhbHBoYTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICB0aGlzLmdsID0gdGhpcy5yZW5kZXJlci5nbDtcclxuICAgIGNvbnN0IHNjcmlwdFRhZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWFpbi1zY3JpcHRcIik7XHJcbiAgICBzY3JpcHRUYWcuYmVmb3JlKHRoaXMuZ2wuY2FudmFzKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZUNhbWVyYSgpIHtcclxuICAgIHRoaXMuY2FtZXJhID0gbmV3IENhbWVyYSgpO1xyXG4gICAgdGhpcy5jYW1lcmEucG9zaXRpb24ueiA9IDU7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVTY2VuZSgpIHtcclxuICAgIHRoaXMuc2NlbmUgPSBuZXcgVHJhbnNmb3JtKCk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVIb21lKCkge1xyXG4gICAgdGhpcy5ob21lID0gbmV3IEhvbWUoeyBnbDogdGhpcy5nbCwgc2NlbmU6IHRoaXMuc2NlbmUsIHNpemVzOiB0aGlzLnNpemVzIH0pO1xyXG4gIH1cclxuXHJcbiAgb25Ub3VjaERvd24oKSB7XHJcbiAgICB0aGlzLmlzRG93biA9IHRydWU7XHJcbiAgICB0aGlzLnguc3RhcnQgPSBldmVudC50b3VjaGVzID8gZXZlbnQudG91Y2hlc1swXS5jbGllbnRYIDogZXZlbnQuY2xpZW50WDtcclxuICAgIHRoaXMueS5zdGFydCA9IGV2ZW50LnRvdWNoZXMgPyBldmVudC50b3VjaGVzWzBdLmNsaWVudFkgOiBldmVudC5jbGllbnRZO1xyXG5cclxuICAgIGlmICh0aGlzLmhvbWUpIHtcclxuICAgICAgdGhpcy5ob21lLm9uVG91Y2hEb3duKHtcclxuICAgICAgICB4OiB0aGlzLngsXHJcbiAgICAgICAgeTogdGhpcy55XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuICBvblRvdWNoTW92ZSgpIHtcclxuICAgIGlmICghdGhpcy5pc0Rvd24pIHJldHVybjtcclxuICAgIGNvbnN0IHggPSBldmVudC50b3VjaGVzID8gZXZlbnQudG91Y2hlc1swXS5jbGllbnRYIDogZXZlbnQuY2xpZW50WDtcclxuICAgIGNvbnN0IHkgPSBldmVudC50b3VjaGVzID8gZXZlbnQudG91Y2hlc1swXS5jbGllbnRZIDogZXZlbnQuY2xpZW50WTtcclxuXHJcbiAgICB0aGlzLnguZW5kID0geDtcclxuICAgIHRoaXMueS5lbmQgPSB5O1xyXG5cclxuICAgIC8vIHRoaXMueC5kaXN0YW5jZSA9IHRoaXMueC5zdGFydCAtIHRoaXMueC5lbmQ7XHJcbiAgICAvLyB0aGlzLnkuZGlzdGFuY2UgPSB0aGlzLnkuc3RhcnQgLSB0aGlzLnkuZW5kO1xyXG5cclxuICAgIGlmICh0aGlzLmhvbWUpIHtcclxuICAgICAgdGhpcy5ob21lLm9uVG91Y2hNb3ZlKHtcclxuICAgICAgICB4OiB0aGlzLngsXHJcbiAgICAgICAgeTogdGhpcy55XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25Ub3VjaFVwKCkge1xyXG4gICAgdGhpcy5pc0Rvd24gPSBmYWxzZTtcclxuICAgIGNvbnN0IHggPSBldmVudC50b3VjaGVzID8gZXZlbnQudG91Y2hlc1swXS5jbGllbnRYIDogZXZlbnQuY2xpZW50WDtcclxuICAgIGNvbnN0IHkgPSBldmVudC50b3VjaGVzID8gZXZlbnQudG91Y2hlc1swXS5jbGllbnRZIDogZXZlbnQuY2xpZW50WTtcclxuXHJcbiAgICB0aGlzLnguZW5kID0geDtcclxuICAgIHRoaXMueS5lbmQgPSB5O1xyXG5cclxuICAgIGlmICh0aGlzLmhvbWUpIHtcclxuICAgICAgdGhpcy5ob21lLm9uVG91Y2hVcCh7XHJcbiAgICAgICAgeDogdGhpcy54LFxyXG4gICAgICAgIHk6IHRoaXMueVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uUmVzaXplKCkge1xyXG4gICAgdGhpcy5yZW5kZXJlci5zZXRTaXplKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xyXG4gICAgdGhpcy5jYW1lcmEucGVyc3BlY3RpdmUoe1xyXG4gICAgICBhc3BlY3Q6IHdpbmRvdy5pbm5lcldpZHRoIC8gd2luZG93LmlubmVySGVpZ2h0XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBmb3YgPSB0aGlzLmNhbWVyYS5mb3YgKiAoTWF0aC5QSSAvIDE4MCk7XHJcbiAgICBjb25zdCBoZWlnaHQgPSAyICogTWF0aC50YW4oZm92IC8gMikgKiB0aGlzLmNhbWVyYS5wb3NpdGlvbi56O1xyXG4gICAgY29uc3Qgd2lkdGggPSBoZWlnaHQgKiB0aGlzLmNhbWVyYS5hc3BlY3Q7XHJcblxyXG4gICAgdGhpcy5zaXplcyA9IHtcclxuICAgICAgaGVpZ2h0LFxyXG4gICAgICB3aWR0aFxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAodGhpcy5ob21lKSB7XHJcbiAgICAgIHRoaXMuaG9tZS5vblJlc2l6ZSh7XHJcbiAgICAgICAgc2l6ZXM6IHRoaXMuc2l6ZXNcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB1cGRhdGUoc2Nyb2xsKSB7XHJcbiAgICAvLyB0aGlzLm1lc2gucm90YXRpb24ueCArPSAwLjE7XHJcbiAgICAvLyB0aGlzLm1lc2gucm90YXRpb24ueSArPSAwLjE7XHJcbiAgICBpZiAodGhpcy5ob21lKSB7XHJcbiAgICAgIHRoaXMuaG9tZS51cGRhdGUoKTtcclxuICAgIH1cclxuICAgIHRoaXMucmVuZGVyZXIucmVuZGVyKHtcclxuICAgICAgY2FtZXJhOiB0aGlzLmNhbWVyYSxcclxuICAgICAgc2NlbmU6IHRoaXMuc2NlbmVcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLy8gc2hvdygpIHt9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IENhbnZhcztcclxuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gKFwiYzFlOTNkY2E0NDlkYjk0NTA1N2NcIikiXSwibmFtZXMiOlsiY29uc3RydWN0b3IiLCJ0aGlzIiwieCIsInN0YXJ0IiwiZW5kIiwiZGlzdGFuY2UiLCJ5IiwiY3JlYXRlUmVuZGVyZXIiLCJjcmVhdGVDYW1lcmEiLCJjcmVhdGVTY2VuZSIsIm9uUmVzaXplIiwiY3JlYXRlSG9tZSIsInJlbmRlcmVyIiwiUmVuZGVyZXIiLCJhbHBoYSIsImdsIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiYmVmb3JlIiwiY2FudmFzIiwiY2FtZXJhIiwiQ2FtZXJhIiwicG9zaXRpb24iLCJ6Iiwic2NlbmUiLCJUcmFuc2Zvcm0iLCJob21lIiwiSG9tZSIsInNpemVzIiwib25Ub3VjaERvd24iLCJpc0Rvd24iLCJldmVudCIsInRvdWNoZXMiLCJjbGllbnRYIiwiY2xpZW50WSIsIm9uVG91Y2hNb3ZlIiwib25Ub3VjaFVwIiwic2V0U2l6ZSIsIndpbmRvdyIsImlubmVyV2lkdGgiLCJpbm5lckhlaWdodCIsInBlcnNwZWN0aXZlIiwiYXNwZWN0IiwiZm92IiwiTWF0aCIsIlBJIiwiaGVpZ2h0IiwidGFuIiwid2lkdGgiLCJ1cGRhdGUiLCJzY3JvbGwiLCJyZW5kZXIiLCJfX3dlYnBhY2tfcmVxdWlyZV9fIiwiaCJdLCJzb3VyY2VSb290IjoiIn0=