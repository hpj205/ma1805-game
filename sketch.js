let playerGrid;
let npc, clown, student;
let showMenu = false;
let selectedOption = null; // stores player's dialogue choices
let inventory = [];
let showInventory = false;
let inventoryButton;
let book, cheapRecipes, inconvenienceBook;
let bookCollected = false;
let currentRoom = "mainRoom"; // keeping track of the current room
let textures = [];
let tileSize = 50;
let tilesX = 14;
let tilesY = 10;

let mainRoomMap = [
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [2, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 3, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 2],
  [2, 0, 0, 2, 2, 2, 0, 0, 0, 0, 2, 2, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 2],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
];

let childrenLibraryMap = [
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 2],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
];

function preload() {
  textures[0] = loadImage("floor-tile.png");
  textures[1] = loadImage("bookshelf.png");
  textures[2] = loadImage("brown-wall-tile.png");
  textures[3] = loadImage("door-tile.png");

  redBookImg = loadImage("red-book.png");
  greenBookImg = loadImage("green-book.png");
  blueBookImg = loadImage("blue-book.png");
}

function setup() {
  createCanvas(700, 500);

  // player starting tile position
  playerGrid = createVector(3, 5);

  // npcs use screen coords still (can be moved later if needed)
  npc = createVector((2 * width - 1000) / 3, height / 2 - 80); // gardener
  clown = createVector(width / 2, height / 2 + 100); // class clown
  student = createVector(width / 2 + 150, height / 2 - 130); // chef student
  librarian = createVector((2 * width + 450) / 3, height / 2); //librarian

  // books
  book = createVector(width / 2  + 60 , height / 3);
  cheapRecipes = createVector(width / 3, height / 3);
  inconvenienceBook = createVector(width / 3, height / 2);

  inventoryButton = createButton("Inventory");
  inventoryButton.position(300, 50);
  inventoryButton.mousePressed(toggleInventory);

}

function toggleInventory() {
  showInventory = !showInventory;
}


function drawTiles() {
  let map = currentRoom === "mainRoom" ? mainRoomMap : childrenLibraryMap;

  for (let y = 0; y < tilesY; y++) {
    for (let x = 0; x < tilesX; x++) {
      let tileIndex = map[y][x];
      if (textures[tileIndex]) {
        image(
          textures[tileIndex],
          x * tileSize,
          y * tileSize,
          tileSize,
          tileSize
        );
      }
    }
  }
}

function draw() {
  background(220);
  drawTiles();

  let playerX = playerGrid.x * tileSize + tileSize / 2;
  let playerY = playerGrid.y * tileSize + tileSize / 2;

  // current room elements
  if (currentRoom === "mainRoom") {
    fill(255, 184, 237);
    ellipse(npc.x, npc.y, 40, 40);
    fill(0);
    textSize(16);
    text("NPC: Gardener", npc.x - 30, npc.y - 30);

    fill(255, 184, 237);
    ellipse(librarian.x, librarian.y, 40, 40);
    fill(0);
    textSize(16);
    text("NPC: Librarian", librarian.x - 30, librarian.y - 30);

  
    if (!bookCollected) {
      image(redBookImg, book.x, book.y, 20, 20); //red book
    }
  } else if (currentRoom === "childrenLibrary") {
    fill(255, 184, 237);
    ellipse(clown.x, clown.y, 40, 40);
    fill(0);
    textSize(16);
    text("NPC: class clown", clown.x - 30, clown.y - 30);
  
    fill(255, 184, 237);
    ellipse(student.x, student.y, 40, 40);
    fill(0);
    textSize(16);
    text("NPC: chef Student", student.x - 30, student.y - 30);
  
    if (!inventory.includes("Cheap Recipes")) {
      image(greenBookImg, cheapRecipes.x, cheapRecipes.y, 20, 20); // green book
    }
  
    if (!inventory.includes("How to Inconvenience Your Classmates")) {
      image(blueBookImg, inconvenienceBook.x, inconvenienceBook.y, 20, 20); // blue book
    }
  }
  

  // draw player
  fill(209, 247, 255);
  ellipse(playerX, playerY, 40, 40);

  // detect proximity for dialogue
  if (
    dist(playerX, playerY, npc.x, npc.y) < 30 ||
    dist(playerX, playerY, clown.x, clown.y) < 30 ||
    dist(playerX, playerY, student.x, student.y) < 30
  ) {
    showMenu = true;
  } else {
    showMenu = false;
    selectedOption = null;
  }

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

  if (selectedOption) {
    fill(255);
    rect(50, height - 160, 500, 40, 10);
    fill(0);
    textSize(16);

    if (dist(playerX, playerY, npc.x, npc.y) < 60) {
      if (selectedOption === "inquire") {
        text("NPC: I'm borrowing a book on gardening.", 70, height - 135);
      } else if (selectedOption === "challenge") {
        text("NPC: I borrowed it last week!! >:(", 70, height - 135);
      } else if (selectedOption === "accuse") {
        text("GAME OVER", 70, height - 135);
        noLoop();
      }
    }

    if (dist(playerX, playerY, clown.x, clown.y) < 60) {
      if (selectedOption === "inquire") {
        text(
          "NPC: I put in a lot of research into being a nuisance.",
          70,
          height - 135
        );
      } else if (selectedOption === "challenge") {
        text("NPC: I borrowed it last week!! >:(", 70, height - 135);
      } else if (selectedOption === "accuse") {
        text("GAME OVER", 70, height - 135);
        noLoop();
      }
    }

    if (dist(playerX, playerY, student.x, student.y) < 60) {
      if (selectedOption === "inquire") {
        text("NPC: I borrowed a Cheap Recipes book.", 70, height - 135);
      } else if (selectedOption === "challenge") {
        text("NPC: I borrowed it last week!! >:(", 70, height - 135);
      } else if (selectedOption === "accuse") {
        text("GAME OVER", 70, height - 135);
      }
    }

    if (dist(playerX, playerY, librarian.x, librarian.y) < 60) {
      if (selectedOption === "inquire") {
        text("NPC: Please whisper. Some of us are trying to read.", 70, height - 135);
      } else if (selectedOption === "challenge") {
        text("NPC: Shhh. We *will* throw you out.", 70, height - 135);
      } else if (selectedOption === "accuse") {
        text("GAME OVER: Librarian revoked your reading privileges.", 70, height - 135);
        noLoop();
      }
    }
    




  }

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
  let dx = 0;
  let dy = 0;

  if (key === "w" || key === "W") dy = -1;
  if (key === "s" || key === "S") dy = 1;
  if (key === "a" || key === "A") dx = -1;
  if (key === "d" || key === "D") dx = 1;

  let newX = constrain(playerGrid.x + dx, 0, tilesX - 1);
  let newY = constrain(playerGrid.y + dy, 0, tilesY - 1);

  let currentMap = currentRoom === "mainRoom" ? mainRoomMap : childrenLibraryMap;
  let tile = currentMap[newY][newX];
  

  // only update if not a wall (2) or bookshelf (1)
  if (tile !== 2 && tile !== 1) {
    playerGrid.x = newX;
    playerGrid.y = newY;
  }

  // dialogue selection
  if (showMenu) {
    if (key === "1") selectedOption = "inquire";
    else if (key === "2") selectedOption = "challenge";
    else if (key === "3") selectedOption = "accuse";
  }

  // toggle inventory
  if (key === "i" || key === "I") showInventory = !showInventory;

  // check if player touches books
  let px = playerGrid.x * tileSize + tileSize / 2;
  let py = playerGrid.y * tileSize + tileSize / 2;

  if (dist(px, py, book.x, book.y) < 30 && !bookCollected) {
    bookCollected = true;
    inventory.push("Gardening Book");
  }

  if (
    dist(px, py, cheapRecipes.x, cheapRecipes.y) < 30 &&
    !inventory.includes("Cheap Recipes")
  ) {
    inventory.push("Cheap Recipes");
  }

  if (
    dist(px, py, inconvenienceBook.x, inconvenienceBook.y) < 30 &&
    !inventory.includes("How to Inconvenience Your Classmates")
  ) {
    inventory.push("How to Inconvenience Your Classmates");
  }
  let tileUnderPlayer = currentMap[playerGrid.y][playerGrid.x];

  // if player is on a door tile, switch room
  if (tileUnderPlayer === 3) {
    currentRoom = currentRoom === "mainRoom" ? "childrenLibrary" : "mainRoom";

    // reset player position when entering new room
    playerGrid = createVector(3, 5);
  }
}
