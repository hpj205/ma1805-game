/* == programmer notes ==

- canvas positioning is funny
- button positioning is funny
- collisions r not collisioning 

*/

//    ======  ~~~ GLOBAL VARIABLES ~~~ ======
let tileSize = 50;
let tilesX = 14;
let tilesY = 10;

let game; // game obj
let gameOver = false;

let redBookImg, greenBookImg, blueBookImg, yellowBookImg, purpleBookImg;
// "why'd you call them nameNPC instead of just name?"
// its easier to search thru code n find them bc npcs are where all the bugs are
let amaliaNpc, cassieNpc, derekNpc, joshNpc, libNpc, rosalynNpc, teacherNpc;
let currentNPC = null;
let dialogueType = "";
let dialogueIndex = 0;

let startButton, controlsButton, backButton, playAgainButton;
let gameState = "title"; // game will start w title page
let teacher, librarian;
let otherNPCs = []; //hold students
let currentLine = 0;
let dialogue = [
  {
    speaker: "librarian",
    text: "You need to learn how to control your students!",
  },
  {
    speaker: "teacher",
    text: "Can you calm down and tell me what happened ma’am?",
  },
  {
    speaker: "librarian",
    text: "Well, I noticed that some of the books are missing, and I noticed that one of your students pocketing one of them and darting away!",
  },
  {
    speaker: "librarian",
    text: "and I noticed that one of your students pocketing one of them and darting away!",
  },
  {
    speaker: "teacher",
    text: "Can you tell me which student it was so I can get it back?",
  },
  {
    speaker: "librarian",
    text: "Well, I couldn’t really see the child that well, but I know it was one of the books",
  },
  {
    speaker: "librarian",
    text: "and the only children here currently are your students.",
  },
  {
    speaker: "librarian",
    text: "And if one of your students could steal one of my books then they all could have stolen them!",
  },
  {
    speaker: "teacher",
    text: "That’s a bit harsh to say. Could it be that some of them were misplaced?",
  },
  {
    speaker: "librarian",
    text: " Unlikely! I keep this library in tip top shape!",
  },
  {
    speaker: "teacher",
    text: "*internally*: And yet she can’t notice some of the books are on the floor",
  },
  {
    speaker: "teacher",
    text: "Teacher: *Sigh* I will interview each of my students and bring all of the missing books back",
  },
  {
    speaker: "librarian",
    text: "You better, check your book inventory, it's a list of the books that are missing.",
  },
  {
    speaker: "librarian",
    text: "Talk to your students and gather evidence.",
  },
];

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

  // buttons
  startButton = loadImage("buttons/Start Game Button 1.png");
  playAgainButton = loadImage("buttons/Play Again Button 1.png");
  inventoryButton = loadImage("buttons/Book List button.png");
}

//SET UP
function setup() {
  cnv = createCanvas(tilesX * tileSize, tilesY * tileSize);
  cnv.position((windowWidth - width) / 2, (windowHeight - height) / 2);
  gameFont = "monospace";
  textFont(gameFont);
  game = new Game();
  game.setup();

  //start button
  startButton = createImg("buttons/Start Game Button 1.png");
  startButton.position(800, 400);
  startButton.mousePressed(() => {
    gameState = "dialogue";
    startButton.hide();
    controlsButton.hide();
    if (backButton) backButton.hide();
    game.player.canMove = true;
  });

  //controls like deleuze

  controlsButton = createButton("controls");
  controlsButton.position(900, 400);
  controlsButton.mousePressed(() => {
    gameState = "controls";
    startButton.hide();
    controlsButton.hide();
    backButton.show();
  });
  //back button
  backButton = createButton("Back");
  backButton.position(20, 20);
  backButton.mousePressed(() => {
    gameState = "title";
    startButton.show();
    controlsButton.show();
    backButton.hide();
  });
  backButton.hide();
}

//DRAW FUNCTION
function draw() {
  clear(); // let me be clear
  // no color  behind the tiles
  for (let y = 0; y < tilesY; y++) {
    for (let x = 0; x < tilesX; x++) {
   if (gameState === "title") {
    drawTitleScreen();
  } else if (gameState === "controls") {
    drawControlsScreen();
  } else if (gameState === "gameover") {
    drawGameOverScreen();
  } else if (gameState === "game" || gameState === "dialogue") {
    game.update();
    game.display();

    if (gameState === "dialogue") {
      game.display();
      if (gameState === "dialogue") drawDialogue();
    }}
  }
}}
//title scrn function
function drawTitleScreen() {
  background(220);
  textAlign(CENTER);
  textSize(40);
  fill(50);
  text("Library Theft", width / 2, height / 3);
}

//controls scrn function
function drawControlsScreen() {
  background(220);
  textAlign(LEFT);
  textSize(20);
  fill(0);
  text("controls:", 40, 80);
  text("WASD to move", 40, 110);
  text("-Use Spacebar to navigate cutscene", 40, 140);
  text("Press 1 repeatedly to Talk, 2 repeatedly to Ask for Alibi", 40, 170);
  text("3 repeatedly to Accuse", 40, 200);
  text("- Use mouse for UI buttons", 40, 230);
}

//draw dialogue box n text
function drawDialogue() {
  // dialogue box
  fill(255);
  rect(50, 400, width - 100, 150, 20);

  // speaker name
  fill(0);
  textSize(20);
  text(dialogue[currentLine].speaker + ":", 120, 430);

  // dialogue text
  textSize(16);
  text(dialogue[currentLine].text, 70, 460, width - 140);
}
//game over
function drawGameOverScreen() {
  background(0);
  fill(255);
  textSize(40);
  textAlign(CENTER);
  text("CASE SOLVED!", width / 2, height / 2);
  textSize(20);
  text("Derek was stealing books", width / 2, height / 2 + 50);

  // restart button
  if (!playAgainButton) {
    playAgainButton = createImg("buttons/Play Again Button 1.png");
    playAgainButton.position(300, 300);
    playAgainButton.mousePressed(resetGame);
  }
  playAgainButton.show();
}

//KEYPRESSED FUNCTION
function keyPressed() {
  // if NPC is active and keypressed is 1,2, or 3, dialogue optns
  if (gameState === "dialogue" && key === " ") {
    currentLine++;
    if (currentLine >= dialogue.length) {
      gameState = "game";
      game.player.canMove = true; // Unlock player movement
    }
    return;
  }

  // only handling game inputs when game is in "play"
  if (gameState === "game") {
    // NPC interaction
    if (game.activeNPC && ["1", "2", "3"].includes(key)) {
      game.activeNPC.handleDialogue(key, game);
      return;
    }

    // player movement
    game.handleInput(key);

    // inventory toggle
    if (key === "i" || key === "I") {
      game.ui.toggleInventory();
    }
  }
  if (game.activeNPC && ["1", "2", "3"].includes(key)) {
    game.activeNPC.handleDialogue(key, game); // npc dialogue base on key
    return; // early return, stop key handling
  }

  game.handleInput(key); // otherwise handle player input
}

//reset game function
function resetGame() {
  gameOver = false;
  game = new Game();
  game.setup();
  gameState = "title";
  if (playAgainButton) playAgainButton.hide();
  startButton.show();
  controlsButton.show();
}

// GAME CLASS
// manages rooms, player, inventory, NPC interactions
class Game {
  constructor() {
    this.rooms = {};
    this.currentRoom = "mainRoom";
    this.player = new Player(3, 5);
    this.player.canMove = true;
    this.inventory = [];
    this.ui = new UI(this);
    this.activeNPC = null;
    this.allBooks = [];
    this.allEvidence = [];
    this.collectedEvidence = [];
    this.startCutsceneDone = false;
  }

  setup() {
    // room map, NPCs, books
    this.rooms["mainRoom"] = new Room(
      mainRoomMap,
      [
        new NPC(
          "Amalia",
          240,
          150,
          {
            talk: [
              "Teacher: Amalia, some of the books have gone missing, may I know where you have been?",
              "Amalia: Sorry teach, but I’ve been here the whole time reading this book I checked out, see?",
              "(You look on the back of the cover, noting that the book is indeed stamped with Amalia’s name on it)",
              "Teacher: Ok then, thank you Amalia.",
              "Amalia: Jeez, if you want to interrogate anyone with a book, ask that librarian. I haven’t been here long, but she seems really disorganized, maybe some of the books on her desk are the missing books.",
              "Teacher *internally*: Well she’s not wrong.",
              //ADDS EVIDENCE: LIBRARIANS DESK
            ],
            alibi: ["Amalia does not need an alibi"],
            accuseGuilty: ["You cannot accuse Amalia"],
            accuseInnocent: ["You cannot accuse Amalia"],
          },

          amaliaNpc
        ),
        new NPC(
          "Librarian",
          580,
          220,
          {
            talk: [
              "Teacher: Ma’am",
              "Librarian: What is it?",
              "Teacher: This book here",
              "Librarian: What of it",
              "Teacher: Isn’t this one of the missing books",
              "Librarian: It is certainly no-",
              "Librarian: …………",
              "Librarian: I’ll just put this back when I’m done reading.",
            ],
            alibi: [
              "Teacher: Ma’am?",
              "Librarian: *Grumpily* What is it now?",
              "Teacher: Can I ask you a few questions abput what you saw happen?",
              "",
              " Librarian: YOU CALLIN’ ME A LIAR?!?!",
              "Teacher: N-no! I Just wanted to know a few more details about the kid you saw stealing so I can find the books!",
              "Librarian: Ugh, fine. I’ll say it again, I didn’t quite see what exactly the kid looked like, my glasses fell off so they were quite blurry.",
              "BUT I KNOW I saw with my two own eyes from across the library!",
              "Teacher: So, the culprit wasn’t anywhere near you?",
              "Librarian: Yes, the only time anyone came near my desk was near the beginning of this class trip when that girl sitting at that table checked out that book she’s still currently reading.",
              // ADD EVIDENCE
            ],
            accuseGuilty: ["You can't accuse Librarian."],
            accuseInnocent: ["You can't accuse Librarian."],
          },
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
              "Teacher *Internally*: Man, this kid is weird",
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
              "GAME OVER",
            ],
          },
          derekNpc,
          true // derek is guiLTY
        ),
      ],
      [
        new Book("The Complete Language of Flowers", redBookImg, 300, 50, this),
        new Book(
          "The Tale of the Courageous MegaGirl",
          purpleBookImg,
          550,
          250,
          this
        ),
      ]
    );

    this.rooms["childrenLibrary"] = new Room(
      childrenLibraryMap,
      [
        new NPC(
          "Josh",
          350,
          350,

          {
            talk: [
              "Teacher: Josh some of the books went missing, may I ask if you have seen any of them?",
              "Josh:.....",
              "Teacher:.....",
              "Josh: Did you seriously forget I’m blind?",
              "Teacher:………………Yes",
              "Josh: Well I didn’t SEE any books, but I have heard some stuff falling around the bookshelves, maybe one of the books fell behind them",
              "Teacher: Thank you, did you remember which bookshelf?",
              "Josh:……",
              " Teacher: Oh, right. Sorry.",
              // add fallen book to evidence list
            ],

            alibi: ["No alibi"],
            accuseGuilty: ["Can't accuse Josh"],
            accuseInnocent: ["Can't accuse Josh"],
          },

          joshNpc
        ),

        new NPC(
          "Cassie",
          500,
          100,
          {
            talk: [
              "Teacher: Cassie, can I know what kind of books you are interested in?",
              "Cassie: O-oh w-well, I want t-to learn how to become more confident and b-braver...",
              "Teacher: That sounds very nice.",
            ],
            alibi: [
              "Teacher: Cassie, can I know where you were in the past few minutes, one of the library’s books have gone missing.",
              "Cassie: O-oh, s-s-sorry ma’am, I’ve been here t-the whole time, lo-looking at the t-titles of the b-books",
              "Teacher: Thank you, Cassie.",
            ],
            accuseGuilty: [
              "Teacher: Cassie can you please empty out your pockets",
              "Cassie: B-b-but why?",
              "Teacher: Cassie, please.",
              "Cassie silently pulls out the book.",
              "Teacher: I’m not mad, but you should know it isn’t right to steal...",
              "Cassie: Okay.",
            ],
            accuseInnocent: [
              "Teacher: Cassie can you please empty out your pockets",
              "Cassie: B-b-but why?",
              "Teacher: Cassie, please.",
              "(Cassie’s pockets are empty)",
              "Librarian: Wow you’re a bad teacher.",
              "Teacher: SHUT UP!",
            ],
          },
          cassieNpc
        ),

        new NPC(
          "Rosalyn",
          550,
          250,
          {
            talk: [
              "Teacher: Rosalyn, can I know what kind of books you are interested in?",
              "Rosalyn: Oh, well I’ve been super obsessed with those amazing period books in the Regency! I adore all the flowery talk everyone uses. It makes me want to learn how to make my own poetry that’s like that",
              "Teacher: That sounds very lovely Rosalyn.",
            ],

            alibi: [
              "Teacher: Rosalyn, can I ask you something?",
              "Rosalyn: Of course, what is it?",
              "Teacher: I need to know where exactly you’ve been for the past few minutes, one of the library’s books has gone missing",
              "Rosalyn: Well, I was here in the kids’ section with all of the adorable stuffed animals. They're so cute and soft!",
              "Teacher: Thank you",

              //ADDS EVIDENCE: ROSYALN WAS IN THE KIDS SECTION W/ STUFFIES
            ],
            accuseGuilty: [
              "Teacher: Rosalyn can you please empty out your pockets",
              "Rosalyn: HUH!? But why!",
              "Teacher: Rosalyn, please.",
              "(Rosalyn silently pulls out the book)",
              "Teacher: I’m not mad, but you should know it isn’t right to steal. Let’s go get this book checked out together, ok?",
              "Rosalyn: *Sigh* Alright. I’m very sorry",
            ],
            accuseInnocent: [
              "Teacher: Rosalyn can you please empty out your pockets",
              "Rosalyn: Huh? Why? I didn’t steal anything!",
              "Teacher: Rosalyn, please.",
              "(Rosalyn’s pockets are empty)",
              "Teacher:",
              "Rosalyn:",
              "Librarian:",
              "Librarian: Wow you’re a bad teacher",
              "Teacher: SHUT UP!",
            ],
          },
          rosalynNpc
        ),
      ],
      [
        new Book(
          "The Elf Princess and the Last Dragon",
          greenBookImg,
          250,
          170,
          this
        ),
        new Book(
          "Starlight Explorers: Journey to the Cosmic Fair",
          blueBookImg,
          5 * tileSize + tileSize / 2 + 310,
          3 * tileSize + tileSize / 2 - 100,
          this
        ),

        new Book(
          "Glasses Jones and the Elusive Emerald",
          yellowBookImg,
          5 * tileSize + tileSize / 2 + 180,
          3 * tileSize + tileSize / 2 + 230,
          this
        ),
      ]
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
      this.player.setPosition(1, 1);
    }
  }
  // helper func to get current rm obj
  currentRoomObj() {
    return this.rooms[this.currentRoom];
  }

  //DEBUGGING
  addEvidence(evidenceName) {
    if (!this.collectedEvidence.includes(evidenceName)) {
      this.collectedEvidence.push(evidenceName);
      this.ui.setMessage(`found evidence: ${evidenceName}`);
    }
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
        image(
          Tile.textures[tileIndex],
          x * tileSize,
          y * tileSize,
          tileSize,
          tileSize
        );
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
    this.canMove = true; // player starts locked
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
    }
  }

  handleInput(k, room) {
    if (!this.canMove) return;

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
    if (newX !== this.grid.x || newY !== this.grid.y) {
      let tile = room.map[newY][newX];
      if (tile !== 1 && tile !== 2 && tile !== 4 && tile !== 5) {
        // 1s
        this.grid.set(newX, newY);
      }
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
  constructor(name, x, y, dialogues, img = null, isGuilty = false) {
    this.name = name;
    this.pos = createVector(x, y);
    this.dialogues = dialogues;
    this.active = false;
    this.lastLine = ""; // store last dialogue line
    this.img = img;
    this.guilty = isGuilty;
  }

  checkProximity(player) {
    // check if player is within certain distance from the npc
    this.active =
      dist(this.pos.x, this.pos.y, player.getPos().x, player.getPos().y) < 80;
  }

  display() {
    imageMode(CENTER);

    if (this.img && this.img.width) {
      image(this.img, this.pos.x, this.pos.y, 40, 60);
    }

    // name over the sprites head
    fill(0);
    textSize(14);
    textFont("monospace");
    text(this.name, this.pos.x - 30, this.pos.y - 40);

    //show dialogue optns if npc is active
    if (this.active) {
      //dialogue optns box
      fill(255);
      rect(50, height - 160, width - 100, 130, 10);
      fill(0);
      textSize(14);
      textFont("monospace");
      text("1. Talk    2. Alibi    3. Accuse", 200, height - 110);

      // display NPCS last line of dialogue
      if (this.lastLine) {
        textSize(16);
        fill(0);
        textWrap(WORD);
        text(`${this.name}: "${this.lastLine}"`, 100, height - 80, width - 140);
      }
    }
  }

  handleDialogue(k, game) {
    // player choose which dialogue to use
    let dialogueArray;
    if (k === "1") dialogueArray = this.dialogues.talk;
    else if (k === "2") dialogueArray = this.dialogues.alibi;
    else if (k === "3")
      dialogueArray = this.guilty
        ? this.dialogues.accuseGuilty
        : this.dialogues.accuseInnocent;
    else {
      this.lastLine = "I don't understand that.";
      return;
    }

    // next line if available
    if (dialogueArray.length > 0) {
      this.lastLine = dialogueArray.shift();

      // ah yes, many many if-statements :)
      // because how else would i have organize any of this :))

      if (
        this.name === "Amalia" &&
        this.lastLine.includes("ask that librarian")
      ) {
        game.addEvidence("Librarian's messy desk");
      } else if (
        this.name === "Josh" &&
        this.lastLine.includes("heard some stuff falling")
      ) {
        game.addEvidence("Books behind bookshelves");
      } else if (
        this.name === "Rosalyn" &&
        this.lastLine.includes("adorable stuffed animals")
      ) {
        game.addEvidence("Rosalyn was in the kids’ section");
      } else if (
        this.name === "Derek" &&
        this.lastLine.includes("near the librarian’s desk")
      ) {
        game.addEvidence("Derek was near the librarian’s desk");
      } else if (
        // this evidence clashes with the librarians evidence?
        this.name === "Cassie" &&
        this.lastLine.includes("whole time")
      ) {
        game.addEvidence("Cassie hasn't moved.");
      } else if (
        this.name === "Librarian" &&
        this.lastLine.includes("near my desk")
      ) {
        game.addEvidence("Nobody was near the Librarian's desk.");
      }
    } else {
      this.lastLine = "I have nothing more to say.";
    }
    //game over
    if (this.lastLine.includes("GAME OVER")) {
      gameOver = true;
      gameState = "gameover";
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
      dist(this.pos.x, this.pos.y, player.getPos().x, player.getPos().y) < 40
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
    redBookImg = loadImage("Tiles/red-book.png");
    greenBookImg = loadImage("Tiles/green-book.png");
    blueBookImg = loadImage("Tiles/blue-book.png");
    purpleBookImg = loadImage("Tiles/purple-book.png");
    yellowBookImg = loadImage("Tiles/yellow-book.png");
  }
}

// TILE CLASS
// self explanatory. tiles init
class Tile {
  static loadTextures() {
    Tile.textures = [];
    Tile.textures[0] = loadImage("Tiles/floor-tile.png");
    Tile.textures[1] = loadImage("Tiles/bookshelf.png");
    Tile.textures[2] = loadImage("Tiles/brown-wall-tile.png");
    Tile.textures[3] = loadImage("Tiles/door-tile.png");
    Tile.textures[4] = loadImage("Tiles/front-desk1.png"); //top half of desk
    Tile.textures[5] = loadImage("Tiles/front-desk2.png"); //bottom half
    Tile.textures[6] = loadImage("Tiles/toy-tile.png");
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
    this.showEvidence = false;
    this.message = "";
    this.messageTimer = 0;
  }

  createInventoryButton() {
    this.inventoryButton = createImg("buttons/Book List button.png");
    this.inventoryButton.position(650, 50);
    this.inventoryButton.mousePressed(() => this.toggleInventory());
  }

  //EVIDENCE BUTTON
  createEvidenceButton() {
    this.evidenceButton = createImg("buttons/Evidence Button.png");
    this.evidenceButton.position(850, 60);
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
      rect(50, 50, 460, 150, 10);
      fill(0);
      textSize(16);
      text("Inventory:", 100, 80);

      this.game.allBooks.forEach((book, i) => {
        const yPos = 100 + i * 20;
        fill(book.collected ? 169 : 0); // grey if collected
        text("- " + book.name, 250, yPos);
      });

      if (this.showEvidence) {
        fill(255);
        rect(400, 50, 300, 150, 10);
        fill(0);
        textSize(16);
        text("Evidence Bank:", 520, 80);

        // display collected evidence
        this.game.collectedEvidence.forEach((evidence, i) => {
          const yPos = 100 + i * 20;
          fill(0);
          text("- " + evidence, 500, yPos);
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
      text(this.message, 270, height - 30);
    }
  }
}

//EVIDENCE CLASS
class Evidence {
  constructor(
    name,
    x,
    y,
    dialogues = [],
    evidence = [],
    img = null,
    game = null
  ) {
    this.name = name;
    this.pos = createVector(x, y);
    this.dialogues = dialogues;
    this.evidence = evidence; // a boolean wld be good here
    this.img = img;
    this.collected = false;
    this.active = false;
    this.lastLine = "";
    this.game = game;
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
      this.game.ui.setMessage(`You collected evidence: "${this.name}"`); // feedback

      return true;
    }
    return false;
  }

  handleDialogue(key) {
    const idx = parseInt(key) - 1;

    if (idx >= 0 && idx < this.dialogues.length) {
      // show dialogue n evidence
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
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2], //1
  [2, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 3, 2], //2
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2], //3
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2], //4
  [2, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 4, 0, 2], //5
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 2], //6
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2], //7
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2], //8
  [2, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 2], //9
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2], //10
];

let childrenLibraryMap = [
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 2],
  [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
  [2, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 2],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
];
