// setup canvas of the game here
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

// 16 x 9 ratio size of the game canvas
// The game will use 64px x 64px tiles
canvasWidth = canvas.width = 64 * 16; // 1024
canvasHeight = canvas.height = 64 * 9; // 576
//audio.Map.play()
// get the 2 dimentional array
let parsedCollisions;
// start creating collision boundaries
let collisionBlocks;
// background level
let background;
// door arrays
let doors;
// create an object called player
const player = new Player({
  imageSrc: "./img/king/idle.png",
  frameRate: 11,
  animations: {
    idleRight: {
      frameRate: 11,
      frameBuffer: 3,
      loop: true,
      imageSrc: "./img/king/idle.png",
    },
    idleLeft: {
      frameRate: 11,
      frameBuffer: 3,
      loop: true,
      imageSrc: "./img/king/idleLeft.png",
    },
    runRight: {
      frameRate: 8,
      frameBuffer: 5,
      loop: true,
      imageSrc: "./img/king/runRight.png",
    },
    runLeft: {
      frameRate: 8,
      frameBuffer: 5,
      loop: true,
      imageSrc: "./img/king/runLeft.png",
    },
    enterDoor: {
      frameRate: 8,
      frameBuffer: 6,
      loop: false,
      imageSrc: "./img/king/enterDoor.png",
      onComplete: () => {
        // stop music when entering door
        audio.door.play();
        audio.map.stop();
        gsap.to(overlay, {
          opacity: 1,
          onComplete: () => {
            // start the main music after entering
            audio.map.play();
            level++;
            // temporary loop, ill add maps later
            if (level === 7) {
              window.open('https://youtube.com/clip/UgkxR-PNsrzYQEImH5SAZEEs6b022DmuzvWr?si=7MERfX0XMnx7iLIJ', '_blank');
              audio.map.stop();
            }
            levels[level].init();
            // starting postion/direction of the character
            player.switchSprite("idleRight");
            player.preventInput = false;
            gsap.to(overlay, {
              opacity: 0,
            });
          },
        });
      },
    },
  },
});

let level = 1;
let levels = {
  1: {
    init: () => {
      parsedCollisions = collisionsLevel1.parse2D();
      // start creating collision boundaries
      collisionBlocks = parsedCollisions.createObjectsFrom2D();
      player.collisionBlocks = collisionBlocks;
      player.position.x = 150;
      player.position.y = 268;

      if (player.currentAnimation) player.currentAnimation.isActive = false;
      // background level one map
      background = new Sprite({
        position: {
          x: 0,
          y: 0,
        },
        imageSrc: "./img/backgroundLevel1.png",
      });

      // door arrays
      doors = [
        new Sprite({
          position: {
            x: 625,
            y: 268,
          },
          imageSrc: "./img/doorOpen.png",
          frameRate: 5,
          frameBuffer: 5,
          loop: false,
          autoplay: false,
        }),
      ];
    },
  },
  2: {
    init: () => {
      parsedCollisions = collisionsLevel2.parse2D();
      // start creating collision boundaries
      collisionBlocks = parsedCollisions.createObjectsFrom2D();
      player.collisionBlocks = collisionBlocks;
      player.position.x = 170;
      player.position.y = 402;

      if (player.currentAnimation) player.currentAnimation.isActive = false;

      // background level one map
      background = new Sprite({
        position: {
          x: 0,
          y: 0,
        },
        imageSrc: "./img/backgroundLevel2.png",
      });

      // door arrays
      doors = [
        new Sprite({
          position: {
            x: 721,
            y: 207,
          },
          imageSrc: "./img/doorOpen.png",
          frameRate: 5,
          frameBuffer: 5,
          loop: false,
          autoplay: false,
        }),
      ];
    },
  },
  3: {
    init: () => {
      parsedCollisions = collisionsLevel3.parse2D();
      // start creating collision boundaries
      collisionBlocks = parsedCollisions.createObjectsFrom2D();
      player.collisionBlocks = collisionBlocks;
      player.position.x = 80;
      player.position.y = 224;

      if (player.currentAnimation) player.currentAnimation.isActive = false;
      // background level one map
      background = new Sprite({
        position: {
          x: 0,
          y: 0,
        },
        imageSrc: "./img/backgroundLevel3.png",
      });

      // door arrays
      doors = [
        new Sprite({
          position: {
            x: 781,
            y: 205,
          },
          imageSrc: "./img/doorOpen.png",
          frameRate: 5,
          frameBuffer: 5,
          loop: false,
          autoplay: false,
        }),
      ];
    },
  },
  4: {
    init: () => {
      parsedCollisions = collisionsLevel4.parse2D();
      // start creating collision boundaries
      collisionBlocks = parsedCollisions.createObjectsFrom2D();
      player.collisionBlocks = collisionBlocks;
      player.position.x = 50;
      player.position.y = 224;

      if (player.currentAnimation) player.currentAnimation.isActive = false;
      // background level one map
      background = new Sprite({
        position: {
          x: 0,
          y: 0,
        },
        imageSrc: "./img/backgroundLevel4.png",
      });

      // door arrays
      doors = [
        new Sprite({
          position: {
            x: 852,
            y: 80,
          },
          imageSrc: "./img/doorOpen.png",
          frameRate: 5,
          frameBuffer: 5,
          loop: false,
          autoplay: false,
        }),
      ];
    },
  },
  5: {
    init: () => {
      parsedCollisions = collisionsLevel5.parse2D();
      // start creating collision boundaries
      collisionBlocks = parsedCollisions.createObjectsFrom2D();
      player.collisionBlocks = collisionBlocks;
      player.position.x = 780;
      player.position.y = 440;

      if (player.currentAnimation) player.currentAnimation.isActive = false;
      // background level one map
      background = new Sprite({
        position: {
          x: 0,
          y: 0,
        },
        imageSrc: "./img/backgroundLevel5.png",
      });

      // door arrays
      doors = [
        new Sprite({
          position: {
            x: 849,
            y: 79,
          },
          imageSrc: "./img/doorOpen.png",
          frameRate: 5,
          frameBuffer: 5,
          loop: false,
          autoplay: false,
        }),
      ];
    },
  },
  6: {
    init: () => {
      parsedCollisions = collisionsLevel6.parse2D();
      // start creating collision boundaries
      collisionBlocks = parsedCollisions.createObjectsFrom2D();
      player.collisionBlocks = collisionBlocks;
      player.position.x = 435;
      player.position.y = 429;

      if (player.currentAnimation) player.currentAnimation.isActive = false;
      // background level one map
      background = new Sprite({
        position: {
          x: 0,
          y: 0,
        },
        imageSrc: "./img/backgroundLevel6.png",
      });

      // door arrays
      doors = [
        new Sprite({
          position: {
            x: 464,
            y: 207,
          },
          imageSrc: "./img/doorOpen.png",
          frameRate: 5,
          frameBuffer: 5,
          loop: false,
          autoplay: false,
        }),
      ];
    },
  },
  7: {  
    init: () => {
      parsedCollisions = collisionsLevel7.parse2D();
      // start creating collision boundaries
      collisionBlocks = parsedCollisions.createObjectsFrom2D();
      player.collisionBlocks = collisionBlocks;
      player.position.x = 435;
      player.position.y = 500;

      background = new Sprite({
        position: {
          x: 0,
          y: 0,
        },
        imageSrc: "./img/backgroundLevel7.png",
      });

      doors = [
        new Sprite({
          position: {
            x: 0,
            y: 0,
          },
          imageSrc: "",
          frameRate: 5,
          frameBuffer: 5,
          loop: false,
          autoplay: false,
        }),
      ];
    },
  },
};

// player movement keys
const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

overlay = {
  opacity: 0,
};

function animate() {
  // Loop animation by calling itseld
  window.requestAnimationFrame(animate);
  //resets the canvas to cover up the extending of the chacarter/object
  background.draw();
  /*
  collisionBlocks.forEach((collisionBlock) => {
    collisionBlock.draw();
  });
  */
  doors.forEach((door) => {
    door.draw();
  });

  player.handleInput(keys);
  // renders and updates the character
  player.draw();
  player.update();

  // screen out
  context.save();
  context.globalAlpha = overlay.opacity;
  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.restore();
}
levels[level].init();

animate();
