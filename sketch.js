let player, npc;
let showMenu = false;
let selectedOption = null; // stores players dialogue choices
let inventory = [];
let showInventory = false;
let book;
let bookCollected = false;

function setup() {
  createCanvas(600, 400);

  // define player, npc, book positions
  player = createVector(width / 3, height / 2);
  npc = createVector((2 * width) / 3, height / 2);
  book = createVector(width / 2, height / 3);
}

function draw() {
  background(220);

  // draw npc circle
  fill(255, 184, 237);
  ellipse(npc.x, npc.y, 40, 40);
  fill(0);
  textSize(16);
  text("NPC: Gardener", npc.x - 30, npc.y - 30);

  // draw book (only if not collected)
  if (!bookCollected) {
    fill(139, 69, 19);
    rect(book.x, book.y, 20, 20);
  }

  // player circle
  fill(209, 247, 255);
  ellipse(player.x, player.y, 40, 40);

  // check if player touches npc
  if (dist(player.x, player.y, npc.x, npc.y) < 60) {
    // if player is within 60px of npc, dialogue showMenu is shown
    showMenu = true;
  } else {
    showMenu = false;
    selectedOption = null; // reset choice when player moves away
  }

  // display dialogue menu
  if (showMenu) {
    fill(255);
    rect(50, height - 120, 500, 100, 10);
    fill(0);
    textSize(16);
    text("dialogue options:", 70, height - 90);
    
    fill(200);
    rect(70, height - 60, 100, 30, 5);
    rect(180, height - 60, 100, 30, 5);
    rect(290, height - 60, 100, 30, 5);
    
    fill(0);
    text("1. inquire", 100, height - 40);
    text("2. challenge", 200, height - 40);
    text("3. accuse", 320, height - 40);
  }

  // display selected dialogue response
  if (selectedOption) {
    fill(255);
    rect(50, height - 160, 500, 40, 10);
    fill(0);
    textSize(16);
    if (selectedOption === "inquire") {
      text("NPC: I'm borrowing a book on gardening.", 70, height - 135);
    } else if (selectedOption === "challenge") {
      text("NPC: I borrowed it last week!! >:(", 70, height - 135);
    } else if (selectedOption === "accuse") {
      text("GAME OVER", 70, height - 135);
      noLoop(); // stops game/game overrrr
    }
  }

  // inventory display
  if (showInventory) {
    fill(255);
    rect(50, 50, 300, 150, 10);
    fill(0);
    textSize(16);
    text("Inventory:", 70, 80);
    //iterating thru inventory array
    for (let i = 0; i < inventory.length; i++) {
      text("- " + inventory[i], 70, 100 + i * 20);
    }
  }
}

function keyPressed() {
  let speed = 10;
  if (key === 'w' || key === 'W') player.y -= speed;
  if (key === 's' || key === 'S') player.y += speed;
  if (key === 'a' || key === 'A') player.x -= speed;
  if (key === 'd' || key === 'D') player.x += speed;

  // dialogue choices
  if (showMenu) {
    if (key === '1') {
      selectedOption = "inquire";
    } else if (key === '2') {
      selectedOption = "challenge";
    } else if (key === '3') {
      selectedOption = "accuse";
    }
  }

  // opening and closing inventory
  if (key === 'i' || key === 'I') {
    showInventory = !showInventory;
  }

  // checking to see if player has collected the book
  // if player is within 30px of the book (and hasn't collected it)
  //it'll be added to inventory and bookCollected = true;
  if (!bookCollected && dist(player.x, player.y, book.x, book.y) < 30) {
    bookCollected = true;
    inventory.push("Gardening Book");
  }
}
