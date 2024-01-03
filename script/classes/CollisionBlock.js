// collision block class
class CollisionBlock {
    constructor({ position }) {
      this.position = position;
      // 64 x 64
      this.width = 64;
      this.height = 64;
    }
  
    draw() {
      context.fillStyle = 'rgba(255, 0, 0, 0.5)';
      context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
  }
  