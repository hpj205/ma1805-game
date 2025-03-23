let player, npc;
let showDialogue = false;

function setup() {
  createCanvas(600, 400);

  // defining player and npc positions
  player = createVector(width / 3, height / 2);
  npc = createVector((2 * width) / 3, height / 2);
}

function draw() {
  background(220);

  // npc 1
  fill(255, 184, 237);
  ellipse(npc.x, npc.y, 40, 40);

  // player
  fill(209, 247, 255);
  ellipse(player.x, player.y, 40, 40);

  // checking distance to npc
  if (dist(player.x, player.y, npc.x, npc.y) < 60) {
    showDialogue = true;
  } else {
    showDialogue = false;
  }

  // draw dialogue box
  if (showDialogue) {
    fill(255);
    rect(50, height - 100, 500, 60, 10);
    fill(0);
    textSize(16);
    text("hello world!", 70, height - 70);
  }
}

//movement
function keyPressed() {
  let speed = 10;

  if (key === 'w' || key === 'W') player.y -= speed;
  if (key === 's' || key === 'S') player.y += speed;
  if (key === 'a' || key === 'A') player.x -= speed;
  if (key === 'd' || key === 'D') player.x += speed;
}
