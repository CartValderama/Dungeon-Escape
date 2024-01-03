// when pressed
window.addEventListener("keydown", (event) => {
  if (player.preventInput) return;
  if (level === 7) return
  switch (event.key) {
    case "w":
      for (let i = 0; i < doors.length; i++) {
        const door = doors[i];

        // when the charcater is colliding with the door object do this
        if (
          player.hitbox.position.x + player.hitbox.width <=
            door.position.x + door.width &&
          player.hitbox.position.x >= door.position.x &&
          player.hitbox.position.y + player.hitbox.height >= door.position.y &&
          player.hitbox.position.y <= door.position.y + door.height
        ) {
          // will prevent input when entering a door
          player.velocity.x = 0;
          player.velocity.y = 0;
          player.preventInput = true;
          // door animation
          player.switchSprite("enterDoor");
          door.play();
          // wont jump if it is in front of the door
          // because thw 'w' key is sued as a triggering button to go inside
          return;
        }
      }
      // when the chacrater hits the bottom collision then jump
      if (
        player.hitbox.position.y + player.hitbox.height >=
          player.currentCollision.position.y &&
        player.velocity.y === 0
      ) {
        player.velocity.y = -15;
        audio.jump.play();
      }
      break;
    case "a":
      keys.a.pressed = true;
      keys.d.pressed = false;
      break;
    case "d":
      keys.d.pressed = true;
      keys.a.pressed = false;
      break;
  }
});

// after letting go of the key
window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "a":
      keys.a.pressed = false;
      break;
    case "d":
      keys.d.pressed = false;
      break;
  }
});

let clicked = false;
window.onload = () => {
  if (!clicked) {
    audio.map.play();
    clicked = true;
  }
}
