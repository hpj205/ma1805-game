let player, npc;
let showMenu = false;
let selectedOption = null; //to store player's dialogue choices

function setup() {
  createCanvas(600, 400);

  // defining player and npc positions
  player = createVector(width / 3, height / 2);
  npc = createVector((2 * width) / 3, height / 2);
}

function draw() {
  background(220);

  // npc 
  fill(255, 184, 237);
  ellipse(npc.x, npc.y, 40, 40);

  // player
  fill(209, 247, 255);
  ellipse(player.x, player.y, 40, 40);

  // checking distance to npc
  if (dist(player.x, player.y, npc.x, npc.y) < 60) {
    showMenu = true;
  } else {
    showMenu = false;
    selectedOption  = null;// reset player's choice when the player moves away
  }

if (showMenu){

  fill(255);
  rect (50, height - 120, 500, 100, 10);
  fill(0);
  textSize(16);
  text("dialogue options", 70, height - 90)

  //menu/dialogue options
  // for now, dialogue ineractions will be handled with 1,2, and 3.
  // this will be changed later its just for testing purposes because mouseclick is tedious
  fill(200);
  rect(70, height - 60, 100, 30, 5);
  rect(180, height - 60, 100, 30, 5);
  rect(290, height - 60, 100, 30, 5);

  fill(0);
  text("1. inquire", 100, height - 40);
  text("2. challenge", 200, height - 40);
  text("3. accuse", 320, height - 40);
}

if(selectedOption){
fill(255);
rect(50, height - 160, 500, 40, 10);
fill(0);
textSize(16);

// this is jsut some random text i thought would be cool
if (selectedOption === "inquire") {
  text("NPC: I'm borrowing a book on gardening.", 70, height - 135);
} else if (selectedOption === "challenge") {
  text("NPC: I borrowed it last week!! >:(", 70, height - 135);
} else if (selectedOption === "accuse") {
  text("GAME OVER", 70, height - 135);
  noLoop(); // stops the game
    }
  }
}

//player movement
function keyPressed() {
  let speed = 10;

  if (key === 'w' || key === 'W') player.y -= speed;
  if (key === 's' || key === 'S') player.y += speed;
  if (key === 'a' || key === 'A') player.x -= speed;
  if (key === 'd' || key === 'D') player.x += speed;

 // handle dialogue choices
  if (showMenu) {
  if (key === '1') {
      selectedOption = "inquire";
    } else if (key === '2') {
      selectedOption = "challenge";
   } else if (key === '3') {
     selectedOption = "accuse";
  }
}
}
