class Player extends Sprite {
  constructor({ collisionBlocks = [], imageSrc, frameRate, animations, loop }) {
    super({ imageSrc, frameRate, animations, loop });
    this.position = {
      x: 200,
      y: 200,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };

    this.gravity = 1;
    this.collisionBlocks = collisionBlocks;
    this.currentCollision = {
      position: {
        x: 0,
        y: 0,
      },
    };
  }

  // update function for any charcater changes
  update() {
    //player move left or right
    this.position.x += this.velocity.x;

    this.updateHitbox();
    // check for horizontal collsions
    this.checkForHorizontalCollisions();
    // player jump or fall (gravity)
    this.applyGravity();

    this.updateHitbox();

    // check for vertical collsions
    this.checkForVeriticalCollisions();
  }

  handleInput(keys) {
    if (this.preventInput) return;
    this.velocity.x = 0;
    if (keys.d.pressed) {
      this.switchSprite("runRight");
      this.velocity.x = 5;
      // store the last direction of the player facing
      this.lastDirection = "right";
    } else if (keys.a.pressed) {
      this.switchSprite("runLeft");
      this.velocity.x = -5;
      // store the last direction of the player facing
      this.lastDirection = "left";
    } else {
      // switch the sprite (which direction is the chacrater facing)
      if (this.lastDirection === "left") this.switchSprite("idleLeft");
      else this.switchSprite("idleRight");
    }
  }

  switchSprite(name) {
    if (this.image === this.animations[name].image) {
      return;
    }
    this.currentFrame = 0;
    this.image = this.animations[name].image;
    this.frameRate = this.animations[name].frameRate;
    this.frameBuffer = this.animations[name].frameBuffer;
    this.loop = this.animations[name].loop;
    this.currentAnimation = this.animations[name];
  }

  checkForHorizontalCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];
      if (
        this.hitbox.position.x <=
          collisionBlock.position.x + collisionBlock.width &&
        this.hitbox.position.x + this.hitbox.width >=
          collisionBlock.position.x &&
        this.hitbox.position.y + this.hitbox.height >=
          collisionBlock.position.y &&
        this.hitbox.position.y <=
          collisionBlock.position.y + collisionBlock.height
      ) {
        // collision on x axis going to the left
        if (this.velocity.x < 0) {
          const offset = this.hitbox.position.x - this.position.x;
          this.position.x =
            collisionBlock.position.x + collisionBlock.width - offset + 0.01;
          break;
        }

        if (this.velocity.x > 0) {
          const offset =
            this.hitbox.position.x - this.position.x + this.hitbox.width;
          this.position.x = collisionBlock.position.x - offset - 0.01;
          break;
        }
      }
    }
  }

  checkForVeriticalCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];
      if (
        // when the left side of the chacarter is hitting the right side of a collision object
        this.hitbox.position.x <=
          collisionBlock.position.x + collisionBlock.width &&
        // when the right side of the character is hitting the left side of a collision object
        this.hitbox.position.x + this.hitbox.width >=
          collisionBlock.position.x &&
        // when the bottom side of the character is hitting the top side of a collision object
        this.hitbox.position.y + this.hitbox.height >=
          collisionBlock.position.y &&
        // when the top side of the character is hitting the bottom side of a collision object
        this.hitbox.position.y <=
          collisionBlock.position.y + collisionBlock.height
      ) {
        this.currentCollision = collisionBlock;
        // collision on y axis
        if (this.velocity.y < 0) {
          this.velocity.y = 0;
          const offset = this.hitbox.position.y - this.position.y;
          this.position.y =
            collisionBlock.position.y + collisionBlock.height - offset + 0.01;
          break;
        }

        if (this.velocity.y > 0) {
          this.velocity.y = 0;
          const offset =
            this.hitbox.position.y - this.position.y + this.hitbox.height;
          this.position.y = collisionBlock.position.y - offset - 0.01;
          break;
        }
      }
    }
  }

  updateHitbox() {
    this.hitbox = {
      position: {
        x: this.position.x + 58,
        y: this.position.y + 34,
      },
      width: 50,
      height: 53,
    };
  }

  applyGravity() {
    this.velocity.y += this.gravity;
    this.position.y += this.velocity.y;
  }
}
