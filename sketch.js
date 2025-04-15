/* == programmer notes ==

fml


 */

//GLOBAL VARIABLES
let tileSize = 50;
let tilesX = 14;
let tilesY = 10;

let game; // game obj

let redBookImg, greenBookImg, blueBookImg;
// "why'd you call them nameNPC instead of just name?"
// its easier to search thru code n find them bc npcs are where all the bugs are
let amaliaNpc, cassieNpc, derekNpc, joshNpc, libNpc, rosalynNpc, teacherNpc;

let currentNPC = null;
let gameState = "explore";
let dialogueType = "";
let dialogueIndex = 0;
let playAgainButton;

//PRELOAD
function preload() {
  Tile.loadTextures();
  Book.loadImages();
  //sprites
  amaliaNpc = loadImage("characters/Amalia.png");
  cassieNpc = loadImage("characters/Cassie.png");
  derekNpc = loadImage("characters/Derek.png");
  joshNpc = loadImage("characters/Josh.png");
  libNpc = loadImage("characters/Librarian.png");
  rosalynNpc = loadImage("characters/Rosalyn.png");
  teacherNpc = loadImage("characters/Teacher.png");
}

//SET UP
function setup() {
  createCanvas(700, 500);
  gameFont = "monospace";
  textFont(gameFont);
  game = new Game();
  game.setup();
}

//DRAW FUNCTION
function draw() {
  background(220);
  game.update();
  game.display();
}

//KEYPRESSED FUNCTION
function keyPressed() {
  // if NPC is active and keypressed is 1,2, or 3, dialogue optns
  if (game.activeNPC && ["1", "2", "3"].includes(key)) {
    game.activeNPC.handleDialogue(key); // npc dialoge base on key
    return; // early return, stop key handling
  }

  game.handleInput(key); // otherwise handle playr input
}

// GAME CLASS
// manages rooms, player, inventory, NPC interactions
class Game {
  constructor() {
    this.rooms = {};
    this.currentRoom = "mainRoom";
    this.player = new Player(3, 5);
    this.inventory = [];
    this.ui = new UI(this);
    this.activeNPC = null;
    this.allBooks = [];
    this.allEvidence = [];
  }

  setup() {
    // room map, NPCs, books
    this.rooms["mainRoom"] = new Room(
      mainRoomMap,
      [
        new NPC(
          "Amalia",
          200,
          170,
          ["filler dialogue", "filler dialogue"],
          amaliaNpc
        ),
        new NPC(
          "Librarian",
          625,
          250,
          ["Please whisper.", "We *will* throw you out."],
          libNpc
        ),

        new NPC(
          "Derek",
          300,
          250,
          {
            talk: [
              "Teacher: Derek, can I know what kind of books you are interested in?",
               "Derek: Ah, are you trying to find out my motivation dear teacher? Well as you should know, as an amazing detective, I only read mystery novels and science books to hone my skills.",
               "Teacher: …... That sounds nice Derek.",
              "Teacher *Internally*: Man, this kid is weird"
            ],
            alibi: [
              "Teacher: Derek, can I ask you something?",
              "Derek: Ah, you’re looking for the missing books aren’t you teacher?",
              "Teacher: Huh?! Well, yes. How did you know that?",
              "Derek: Well, I am the best detective in the world for a reason.",
              "Teacher: ………",
              "Derek: ………",
              "Derek: Ok, I overheard you talking with the librarian",
              "Teacher: Alright then. Derek, I need to know where-",
              "Derek: I was near the librarian’s desk, and I noticed that there seemed to be books strewn everywhere in the library, so I kept watch",
              "Teacher: ……. Ok, well thank you Derek",
              //ADDS EVIDENCE: DEREK WAS NEAR THE LIBRARIANS DESK
            ],
            accuseGuilty: [
              "Teacher: Derek, I need you to empty out your pockets, I know you took the book",
              "Derek: WHAT?! But I’m the detective I can’t steal!",
              "Teacher: Derek, please.",
              "(Derek silently pulls out the book)",
              "Teacher: *Sigh* Derek…",
              "Derek: I was going to give it back. I was going to use to help me find the other books",
              "Teacher: I know you wanted to help but doing something wrong won’t make it become right",
              "Derek: Ok, I’m sorry",
              "Teacher: It’s alright as long as you know",
            ],
            accuseInnocent: [
              "Teacher: Derek can you please empty out your pockets",
              "Derek: What?! But I’m the detective! I couldn’t steal something!",
              "Teacher: Derek, please.",
              "(Derek’s pockets are empty)",
              " Teacher:.....",
              "Derek: I told you! You doubted my abilities as the greatest detective!",
              "Librarian:......",
              " Librarian: To be honest he’s right, I should have tasked him to find the books not you",
              "Teacher: SHUT UP! BOTH OF YOU",
            ]
          },
          derekNpc
        ),
      ],
      [new Book("Gardening Book", redBookImg, 410, 170, this)]
    );

    this.rooms["childrenLibrary"] = new Room(
      childrenLibraryMap,
      [
        new NPC(
          "Josh",
          350,
          350,
          ["filler dialogue", "filler dialogue"],
          joshNpc
        ),
        new NPC(
          "Cassie",
          500,
          120,
          {
            talk: [
              "Teacher: Cassie, can I know what kind of books you are interested in?",
              "Cassie: O-oh w-well, I want t-to learn how to become more confident and b-braver...",
              "Teacher: That sounds very nice."
            ],
            alibi: [
              "Teacher: Cassie, can I know where you were in the past few minutes, one of the library’s books have gone missing.",
              "Cassie: O-oh, s-s-sorry ma’am, I’ve been here t-the whole time, lo-looking at the t-titles of the b-books",
              "Teacher: Thank you, Cassie."
            ],
            accuseGuilty: [
              "Teacher: Cassie can you please empty out your pockets",
              "Cassie: B-b-but why?",
              "Teacher: Cassie, please.",
              "Cassie silently pulls out the book.",
              "Teacher: I’m not mad, but you should know it isn’t right to steal...",
              "Cassie: Okay."
            ],
            accuseInnocent: [
              "Teacher: Cassie can you please empty out your pockets",
              "Cassie: B-b-but why?",
              "Teacher: Cassie, please.",
              "(Cassie’s pockets are empty)",
              "Librarian: Wow you’re a bad teacher.",
              "Teacher: SHUT UP!"
            ]
          },
          cassieNpc
        ),

        new NPC(
          "Rosalyn",
          150,
          250,
          [
            "Well, I was here in the kids’ section with all of the adorable stuffed animals. There so cute and soft!",
            "Oh, well I’ve been super obsessed with those amazing period books in the Regency! I adore all the flowery talk everyone uses. It makes me want to learn how to make my own poetry that’s like that.",
          ],
          rosalynNpc
        ),
      ],
      [
        new Book("Cheap Recipes", greenBookImg, 250, 170, this),
        new Book(
          "How to Inconvenience...",
          blueBookImg,
          5 * tileSize + tileSize / 2,
          3 * tileSize + tileSize / 2,
          this
        ),
      ]
    );

    //evidence added to rooms
    this.rooms["mainRoom"].evidence.push(
      new Evidence("Gardening Tips", 100, 200, [])
    );
    this.rooms["childrenLibrary"].evidence.push(
      new Evidence("Cheap Recipes", 400, 300, [])
    );

    for (let roomName in this.rooms) {
      this.allBooks.push(...this.rooms[roomName].books);
      this.allEvidence.push(...this.rooms[roomName].evidence);
    }

    this.ui.createInventoryButton();
    this.ui.createEvidenceButton();
  }

  update() {
    this.activeNPC = null; // reset active NPC to null each framae
    this.currentRoomObj().update(this.player, this.inventory); // update the current rm
    this.currentRoomObj().npcs.forEach((npc) => {
      npc.checkProximity(this.player);
      if (npc.active) {
        this.activeNPC = npc;
      }
    });
  }

  display() {
    this.currentRoomObj().display();
    this.player.display();
    this.ui.display();
  }

  handleInput(k) {
    // handling player movement n inputs
    this.player.handleInput(k, this.currentRoomObj());
    if (k === "i" || k === "I") this.ui.toggleInventory();

    // checking for tile change when player enters door (tile 3)
    let tile = this.currentRoomObj().getTile(this.player.grid);
    if (tile === 3) {
      this.currentRoom =
        this.currentRoom === "mainRoom" ? "childrenLibrary" : "mainRoom";
      this.player.setPosition(3, 5);
    }
  }
  // helper func to get current rm obj
  currentRoomObj() {
    return this.rooms[this.currentRoom];
  }
}

// ROOM CLASS
//rooms and the sutff in it, maps, npcs, books
class Room {
  constructor(map, npcs, books, evidence = []) {
    this.map = map;
    this.npcs = npcs;
    this.books = books;
    this.evidence = evidence;
  }

  update(player, inventory) {
    // update npcs (check if theyre close 2 player) and books (check if picked up)
    this.npcs.forEach((npc) => npc.checkProximity(player));
    this.books.forEach((book) => book.checkPickup(player, inventory));
  }

  display() {
    // drawing tiles of the room using map layout
    for (let y = 0; y < tilesY; y++) {
      for (let x = 0; x < tilesX; x++) {
        let tileIndex = this.map[y][x];
        Tile.draw(tileIndex, x, y);
      }
    }
    // display all npcs n books
    this.npcs.forEach((npc) => npc.display());
    this.books.forEach((book) => book.display());
  }
  // yayyy helper function to get tile at spceific grid pos
  getTile(grid) {
    return this.map[grid.y][grid.x];
  }
}

// PLAYER CLASS
class Player {
  constructor(x, y) {
    this.grid = createVector(x, y);
    this.sprite = teacherNpc;
  }

  display() {
    imageMode(CENTER);
    if (this.sprite) {
      image(
        this.sprite,
        this.grid.x * tileSize + tileSize / 2,
        this.grid.y * tileSize + tileSize / 2,
        40, //width
        60 //height
      );
    } else {
      fill(208, 247, 255);
      ellipse(
        this.grid.x * tileSize + tileSize / 2,
        this.grid.y * tileSize + tileSize / 2,
        40
      );
    }
  }

  handleInput(k, room) {
    let dx = 0,
      dy = 0;
    // WASD movement cuz duhh
    if (k === "w" || k === "W") dy = -1;
    if (k === "s" || k === "S") dy = 1;
    if (k === "a" || k === "A") dx = -1;
    if (k === "d" || k === "D") dx = 1;

    //constrainig new pos to be within room boundaries
    let newX = constrain(this.grid.x + dx, 0, tilesX - 1);
    let newY = constrain(this.grid.y + dy, 0, tilesY - 1);
    let tile = room.map[newY][newX];

    // move the player as long as the tile is like walkable on
    if (tile !== 1 && tile !== 2) {
      this.grid.set(newX, newY);
    }
  }
  // player pos as a vector to display rzns
  getPos() {
    return createVector(
      this.grid.x * tileSize + tileSize / 2,
      this.grid.y * tileSize + tileSize / 2
    );
  }

  setPosition(x, y) {
    this.grid.set(x, y);
  }
}
// NPC CLASS
class NPC {
  constructor(name, x, y, dialogues, img = null) {
    this.name = name;
    this.pos = createVector(x, y);
    this.dialogues = dialogues;
    this.active = false;
    this.lastLine = ""; // store last dialogue line
    this.img = img;
  }

  checkProximity(player) {
    // check if player is within certain distance from the npc
    this.active =
      dist(this.pos.x, this.pos.y, player.getPos().x, player.getPos().y) < 60;
  }

  display() {
    imageMode(CENTER);
    if (this.img) {
      image(this.img, this.pos.x, this.pos.y, 40, 60);
    } else {
      fill(255, 200, 200);
      ellipse(this.pos.x, this.pos.y, 40, 60);
    }

    // name over the sprites head
    fill(0);
    textSize(14);
    textFont("monospace");
    text(this.name, this.pos.x - 30, this.pos.y - 40);

    //show dialogue optns if npc is active
    if (this.active) {
      fill(255);
      rect(50, height - 140, 600, 120, 10);
      fill(0);
      textSize(14);
      text("1. Talk    2. Alibi    3. Accuse", 70, height - 110);

      // display NPCS last line of dialogue
      if (this.lastLine) {
        textSize(16);
        text(`${this.name}: "${this.lastLine}"`, 70, height - 80);
      }
    }
  }
  // self explanatory...
  handleDialogue(k) {
    const idx = parseInt(k) - 1;
    if (idx >= 0 && idx < this.dialogues.length) {
      this.lastLine = this.dialogues[idx];
    } else {
      this.lastLine = "I don't understand that.";
    }
  }
}

// BOOK CLASS
class Book {
  constructor(name, img, x, y, game) {
    this.name = name;
    this.img = img;
    this.pos = createVector(x, y);
    this.collected = false;
    this.game = game;
  }

  checkPickup(player, inventory) {
    if (
      !this.collected &&
      dist(this.pos.x, this.pos.y, player.getPos().x, player.getPos().y) < 30
    ) {
      inventory.push(this.name);
      this.collected = true;
      this.game.ui.setMessage(`You picked up "${this.name}"!`);
    }
  }

  display() {
    if (!this.collected) {
      image(this.img, this.pos.x, this.pos.y, 20, 20);
    }
  }

  static loadImages() {
    redBookImg = loadImage("red-book.png");
    greenBookImg = loadImage("green-book.png");
    blueBookImg = loadImage("blue-book.png");
  }
}

// TILE CLASS
// self explanatory. tiles init
class Tile {
  static loadTextures() {
    Tile.textures = [];
    Tile.textures[0] = loadImage("floor-tile.png");
    Tile.textures[1] = loadImage("bookshelf.png");
    Tile.textures[2] = loadImage("brown-wall-tile.png");
    Tile.textures[3] = loadImage("door-tile.png");
  }

  static draw(index, x, y) {
    image(Tile.textures[index], x * tileSize, y * tileSize, tileSize, tileSize);
  }
}

// UI CLASS
// user interface, inventory
class UI {
  constructor(game) {
    this.game = game;
    this.showInventory = false;
    this.showEvidence - false;
    this.message = "";
    this.messageTimer = 0;
  }

  createInventoryButton() {
    this.inventoryButton = createButton("Book Inventory");
    this.inventoryButton.position(300, 50);
    this.inventoryButton.mousePressed(() => this.toggleInventory());
  }

  //EVIDENCE BUTTON
  createEvidenceButton() {
    this.evidenceButton = createButton("Evidence");
    this.evidenceButton.position(500, 50);
    this.evidenceButton.mousePressed(() => this.toggleEvidence());
  }

  toggleInventory() {
    this.showInventory = !this.showInventory;
  }

  toggleEvidence() {
    this.showEvidence = !this.showEvidence;
  }

  setMessage(msg) {
    this.message = msg;
    this.messageTimer = millis(); // timestamp of when message started
  }
  // show inventory UI
  display() {
    if (this.showInventory) {
      fill(255);
      rect(50, 50, 300, 150, 10);
      fill(0);
      textSize(16);
      text("Inventory:", 70, 80);

      this.game.allBooks.forEach((book, i) => {
        const yPos = 100 + i * 20;
        fill(book.collected ? 169 : 0); // grey if collected
        text("- " + book.name, 70, yPos);
      });

      if (this.showEvidence) {
        fill(255);
        rect(400, 50, 300, 150, 10);
        fill(0);
        textSize(16);
        text("Evidence Bank:", 420, 80);

        // display collected evidence
        this.game.allEvidence.forEach((evidence, i) => {
          const yPos = 100 + i * 20;
          fill(evidence.collected ? 169 : 0); // grey if collected
          text("- " + evidence.name, 420, yPos);
        });
      }
    }

    // show pickup message for 3 sec
    if (this.message && millis() - this.messageTimer < 3000) {
      fill(255);
      rect(50, height - 50, 600, 30, 10);
      fill(0);
      textSize(14);
      textFont("monospace");
      text(this.message, 70, height - 30);
    }
  }
}

//EVIDENCE CLASS
class Evidence {
  constructor(name, x, y, dialogues = [], evidence = [], img = null) {
    this.name = name;
    this.pos = createVector(x, y);
    this.dialogues = dialogues;
    this.evidence = evidence; // a boolean wld be good here
    this.img = img;
    this.collected = false;
    this.active = false;
    this.lastLine = "";
  }
  // checking if player is close
  checkProximity(player) {
    (this.active = dist(this.pos.x, this.pos.y)),
      player.getPos().x,
      player.getPos().y < 60;
  }

  collect() {
    if (!this.collected) {
      this.collected = true;
      // this.evidence.push(this.name); // adds evidence to the evidence array
      this.game.ui.setMessage(`You collected evidence: "${this.name}"`); // feedback
    }
  }

  handleDialogue(key) {
    const idx = parseInt(key) - 1;

    if (idx >= 0 && idx < this.dialogues.length) {
      // show dialoge n evidence
      this.lastLine = this.dialogues[idx];
      this.collect(game);

      // adding evidence msg
      if (this.evidence) {
        this.evidence.collect();
        this.game.ui.setMessage(
          `You collected evidence: "${this.evidence.name}"`
        );
      }
    } else {
      this.lastLine = "I don't understand that.";
    }
  }

  display() {
    if (!this.collected) {
      image(this.img, this.pos.x, this.pos.y, 20, 20);
    }
  }
}

// MAPS
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
