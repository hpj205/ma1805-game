PROJECT NAME: Library Theft Game

BY Yvette & Mary
MEMBERS:
Yvette Hupje: Candidate number: 2511121

OVERVIEW OF GAME
Think of this like an introduction to your game. What is your game about? What are its key mechanics? What are its main narrative
ideas and themes? What aesthetic choics did you make. 

Yvette: It's a short mystery game where you play as a substitute teacher trying to solve the case of a missing library book. It takes place in two rooms, the main library and the children's library. The player  has to explore, speak to NPCs and make deductions based on the evidence gathered.

Key mechanics are tile based movement, collision detection, NPC interaction thru key press (1,2,3 for talk, alibi, accuse), and a simple inventory/evidence system, and game states. 
Narratively its based around observation, honesty and trust. 
Visually, it uses hand-drawn pixel art inspired by old RPGMaker games :)

INDIVIDUAL CONTRIBUTIONS

Yvette: 
I led the technical development and most of the visual asset creation for this project. I designed n coded the core systems in p5.js incl. player movement, collision detection, interactive NPC dialogue with branching choices (Talk, Alibi, Accuse), game states like dialogue scenes vs. free exploration, and a tile-based world system, and an evidence/book collection system.
I created the environmental tiles manually using pixel art (pixil.net) and tried to make sure they matched a consistent (ish) style and color pallete.
This project really pushed me out of my comfort zone. Before this, I'd had a little experience programming little games (in school and in uni) so building this was a challenge. I learnt how to write object oriented code tht cld be re-used and expanded through the class resources. I became more confident using arrays n objects, especially for managing more complex interactions like dialogue tress and tilemaps. 
Artistically, I practised creating pixel art and I also learned how much visual choices impact game readability.


THEMES
A sentence or two describing the major themes, tone, and ideas of your game.

Yvette: The game explores ideas of trust, accountability and communication. The tone is playful and the dialogue is comedic, I guess it kinda tackles the idea of how we interpret others' stories and how we decide who we want to believe.

GAME DESIGN
Yvette:
The game explores themes of trust, observation, and truth-seeking. These are expressed thru the mechanics by encourgaing players to interact w NPCs, collect info, and make deductions based on dialogue rather than combat or action. The core gameplay loop revolves around speaking to characters, collecting books and evidence, then accusing the correct suspect to recover the missing library book.
Technically, the game is built in p5.js w a tilemap system. The environment is mapped using a 2D array, movement is handled w x/y coordinates based on key inputs, collision detection prvents the player from walking thru walls or furniture. 
For dialogue interactions, an NPC interaction system is used where pressing keys (1,2,3) triggers different dialogue branches (talk, alibi, accuse). These dialogues were initially store as arrays but now are dialogue objects.
In short:
- tile-based movement and collision detection
- basic NPC interation thru keyboard input
- simple dialogue magament system
- intro cutscene where player cannot move until a conversation conclused
- inventory and evidence systems

NARRATIVE
Discuss the narrative elements of your game and how you plan to develop these in the final project.

//idk what to write here mary u can add smth here maybe

AESTHETIC
Discuss your aesthetic approach and the inspirations you drew from. Upload images to your repository and point me to the relevant directory for these, and discuss
the choices you made.

Yvette: When I was making the tiles (walls, door, bookshelves, floor, and books, toy etc) I envisioned a cozy library, a bit nostalgic with earthy tones. I like the idea of keeping the designs simple with basic shapes and flat color blocks. In retrospect after designing I think I took some inspiration from the Minecraft library, especially with the wooden rustic aesthetic I originally had in mind? Assets can be found in the /Tiles folder

// mary again

ANYTHING YOU'D ADD?
Would you make changes if you had a few more weeks? Or what about if you had a full studio behind you? What ideas would you like to implement if you had more technical knowledge?

Yvette: I think exploring the multiple endings concept further would have been really interesting. A full quest log, maybe more rooms were you can explore more things. Sprite animations would've made the game look a lot nicer, and minigames (like sorting books, finding hidden objects) also would have been fun to try out. An in-game timer to add pressure to the player would've been something else to add as well, alongside music and sound effects.
Some text effects and more polished UI would have been nicer.
There's a weird issue with the canvas being slightly cut off which I'd been struggling to figure out where it came from for a while now, so I would have fixed that too if we had a bigger group/more ppl working on the programming :)