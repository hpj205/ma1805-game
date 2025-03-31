let player, npc, clown, student;
let showMenu = false;
let selectedOption = null; // stores players dialogue choices
let inventory = [];
let showInventory = false;
let book, cheapRecipes, inconvenienceBook;
let bookCollected = false;
let currentRoom = "mainRoom"; // keeping track of the current room
let childrenLibrary = false;

function setup() {
  createCanvas(700, 500);
 

  // player positions
  player = createVector(width / 3, height / 2);

  // npc positions
  npc = createVector((2 * width) / 3, height / 2); // gardener
  clown = createVector(width / 2, height / 2 + 50); // class clown (in the children's library)
  student = createVector(width / 2 - 100, height / 2 + 150); // chef student (in the children's library)

  // define book positions
  book = createVector(width / 2, height / 3); // gardening book (in the main room)
  cheapRecipes = createVector(width / 3, height / 3); // cheap recipes (in the children's library)
  inconvenienceBook = createVector(width / 3, height / 2); // How to Inconvenience Your Classmates (in the children's library)
}

function draw() {
  background(220);

  // drawing room elements based on the current room
  if (currentRoom === "mainRoom") {
    // main room elements: player, npc, and the gardening book
    fill(255, 184, 237);
    ellipse(npc.x, npc.y, 40, 40);
    fill(0);
    textSize(16);
    text("NPC: Gardener", npc.x - 30, npc.y - 30);

    // draw gardening book (only if not collected)
    if (!bookCollected) {
      fill(139, 69, 19);
      rect(book.x, book.y, 20, 20);
    }
  } else if (currentRoom === "childrenLibrary") {
    // children's library elements: class clown, chef Student, and books
    fill(255, 184, 237);
    ellipse(clown.x, clown.y, 40, 40);
    fill(0);
    textSize(16);
    text("NPC: class clown", clown.x - 30, clown.y - 30);

    fill(255, 184, 237);
    ellipse(student.x, student.y, 40, 40);
    fill (0);
    textSize (16);
    text("NPC: chef Student", student.x - 30, student.y - 30);

    // books (if not yet collected)
    if (!inventory.includes("Cheap Recipes")) {
      fill(139, 69, 19);
      rect(cheapRecipes.x, cheapRecipes.y, 20, 20);
    }

    if (!inventory.includes("How to Inconvenience Your Classmates")) {
      fill(139, 69, 19);
      rect(inconvenienceBook.x, inconvenienceBook.y, 20, 20);
    }
  }

  // draw player
  fill(209, 247, 255);
  ellipse(player.x, player.y, 40, 40);

  // check if player touches npc (and show dialogue menu)
  if (dist(player.x, player.y, npc.x, npc.y) < 30) {
    showMenu = true;
  } else if (dist(player.x, player.y, clown.x, clown.y) < 30) {
    showMenu = true;
  } else if (dist(player.x, player.y, student.x, student.y) < 30) {
    showMenu = true;
  } else {
    showMenu = false;
    selectedOption = null; // reset choice when player moves away
  }

  // dialogue menu
  if (showMenu) {
    fill(255);
    rect(50, height - 120, 500, 100, 10);
    fill(0);
    textSize(16);
    text("Dialogue options:", 70, height - 90);

    fill(200);
    rect(70, height - 60, 100, 30, 5);
    rect(180, height - 60, 100, 30, 5);
    rect(290, height - 60, 100, 30, 5);

    fill(0);
    text("1. Inquire", 100, height - 40);
    text("2. Challenge", 200, height - 40);
    text("3. Accuse", 320, height - 40);
  }

  // display selected dialogue response
  if (selectedOption) {
    fill(255);
    rect(50, height - 160, 500, 40, 10);
    fill(0);
    textSize(16);

    // gardener npc dialogue
    if (dist(player.x, player.y, npc.x, npc.y) < 60) {
      if (selectedOption === "inquire") {
        text("NPC: I'm borrowing a book on gardening.", 70, height - 135);
      } else if (selectedOption === "challenge") {
        text("NPC: I borrowed it last week!! >:(", 70, height - 135);
      } else if (selectedOption === "accuse") {
        text("GAME OVER", 70, height - 135);
        noLoop(); // stops loop/ game over)
      }
    }

    // class clown npc dialogue
    if (dist(player.x, player.y, clown.x, clown.y) < 60) {
      if (selectedOption === "inquire") {
        text("NPC: I put in a lot of research into being a nuisance.", 70, height - 135);
      } else if (selectedOption === "challenge") {
        text("NPC: I borrowed it last week!! >:(", 70, height - 135);
      } else if (selectedOption === "accuse") {
        text("GAME OVER", 70, height - 135);
        noLoop(); // stops the game (game over)
      }
    }  

    // chef student dialogue
    if (dist(player.x, player.y, student.x, student.y) < 60) {
      if (selectedOption === "inquire") {
        text("NPC: I borrowed a Cheap Recipes book.", 70, height - 135);
      } else if (selectedOption === "challenge") {
        text("NPC: I borrowed it last week!! >:(", 70, height - 135);
      } else if (selectedOption === "accuse") {
        text("GAME OVER", 70, height - 135);
    
      }
    }
  }

  // inventory display
  if (showInventory) {
    fill(255);
    rect(50, 50, 300, 150, 10);
    fill(0);
    textSize(16);
    text("Inventory:", 70, 80);
    for (let i = 0; i < inventory.length; i++) {
      text("- " + inventory[i], 70, 100 + i * 20);
    }
  }
}

function keyPressed() {
  let speed = 20;
  if (key === 'w' || key === 'W') player.y -= speed;
  if (key === 's' || key === 'S') player.y += speed;
  if (key === 'a' || key === 'A') player.x -= speed;
  if (key === 'd' || key === 'D') player.x += speed;

  // Dialogue choices
  if (showMenu) {
    if (key === '1') {
      selectedOption = "inquire";
    } else if (key === '2') {
      selectedOption = "challenge";
    } else if (key === '3') {
      selectedOption = "accuse";
    }
  }

  // toggle inventory
  if (key === 'i' || key === 'I') {
    showInventory = !showInventory;
  }

  // checking if player has collected the books
  if (dist(player.x, player.y, book.x, book.y) < 30 && !bookCollected) {
    bookCollected = true;
    inventory.push("Gardening Book");
  }

  if (dist(player.x, player.y, cheapRecipes.x, cheapRecipes.y) < 30 && !inventory.includes("Cheap Recipes")) {
    inventory.push("Cheap Recipes");
  }

  if (dist(player.x, player.y, inconvenienceBook.x, inconvenienceBook.y) < 30 && !inventory.includes("How to Inconvenience Your Classmates")) {
    inventory.push("How to Inconvenience Your Classmates");
  }

  // press r to switch rooms, will change once we have tiles
  if (key === 'r' || key === 'R') {
    currentRoom = currentRoom === "mainRoom" ? "childrenLibrary" : "mainRoom";
  }
}
