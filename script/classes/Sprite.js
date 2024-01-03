// creat a sprite for map
class Sprite {
  constructor({
    position,
    imageSrc,
    frameRate = 1,
    animations,
    frameBuffer = 2,
    loop = true,
    autoplay = true,
  }) {
    this.position = position;
    this.image = new Image();
    this.image.onload = () => {
      this.loaded = true;
      this.width = this.image.width / this.frameRate;
      this.height = this.image.height;
    };
    this.image.src = imageSrc;
    this.loaded = false;
    this.frameRate = frameRate;
    this.currentFrame = 0;
    this.elapsedFrames = 0;
    this.frameBuffer = frameBuffer;
    this.animations = animations;
    this.loop = loop;
    this.autoplay = autoplay;
    this.currentAnimation;

    // this will renedr the animations dynamically
    if (this.animations) {
      for (let key in this.animations) {
        // dummy storage
        const image = new Image();
        image.src = this.animations[key].imageSrc;
        this.animations[key].image = image;
      }
    }
  }

  draw() {
    // the image should load first, if not then return
    if (!this.loaded) return;
    const cropbox = {
      position: {
        x: this.width * this.currentFrame,
        y: 0,
      },
      width: this.width,
      height: this.height,
    };
    context.drawImage(
      this.image,
      cropbox.position.x,
      cropbox.position.y,
      cropbox.width,
      cropbox.height,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );

    this.updateFrames();
  }

  play() {
    this.autoplay = true;
  }

  updateFrames() {
    if (!this.autoplay) return;
    this.elapsedFrames++;
    if (this.elapsedFrames % this.frameBuffer === 0) {
      if (this.currentFrame < this.frameRate - 1) this.currentFrame++;
      else if (this.loop) this.currentFrame = 0;
    }

    // this will check the door animation exist
    if (this.currentAnimation?.onComplete) {
      // makes sure that the current frame is at the edn of the animation
      if (
        this.currentFrame === this.frameRate - 1 &&
        !this.currentAnimation.isActive
      ) {
        // activate function
        this.currentAnimation.onComplete();
        this.currentAnimation.isActive = true;
      }
    }
  }
}
