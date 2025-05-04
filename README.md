PROJECT NAME: Library Theft Game

BY Yvette & Mary
MEMBERS:
Yvette Hupje: Candidate number: 2511121
Mary Duncan: Candidate number: 2511843

OVERVIEW OF GAME
Think of this like an introduction to your game. What is your game about? What are its key mechanics? What are its main narrative
ideas and themes? What aesthetic choics did you make. 

Mary:
Our game is a short puzzle-based mystery game set in a library, where the player character, a teacher has been tasked by the head librarian to find missing books and find out if any of their students have stolen any of them. The player would explore the library, talk with the NPCs, gathering evidence to use during interrogations, and traverse the library to find the remaining missing books, thus allowing the teacher to make their deductions to pin the culprit.

INDIVIDUAL CONTRIBUTIONS

Mary:
I had written all the narrative story and dialogue, creating our original concept for the game. Whenever there was a complication that wouldn’t allow us to successfully implement part of the story or designs in the code, I would quickly come up with rewrites and new ideas we could use so that the game would feel complete and enjoyable. I had used the free website, pixilart.com to create all of the assets I had made for the game, which included all the characters, the desk tiles, and the play buttons. 
While I did not contribute much to the code save for implementing new dialogue as the script would change, I fully understand the importance of the characters I had made and all of the different character classes they would come to be. All of the characters would become separate classes that would determine how they would act in the game, such as the teacher being defined by the Player class, the code making it so that the player could control the character and use them as their mouthpiece for the world of the game, and all of the other characters being defined as part of the NPC class, as although not being able to control personally by the player, the code allows them to still interact with the Player character in various different ways, be they a witness, a suspect, or the theif.

Yvette: 
I led the technical development and most of the visual asset creation for this project. I designed n coded the core systems in p5.js incl. player movement, collision detection, interactive NPC dialogue with branching choices (Talk, Alibi, Accuse), game states like dialogue scenes vs. free exploration, and a tile-based world system, and an evidence/book collection system.
I created the environmental tiles manually using pixel art (pixil.net) and tried to make sure they matched a consistent (ish) style and color pallete.
This project really pushed me out of my comfort zone. Before this, I'd had a little experience programming little games (in school and in uni) so building this was a challenge. I learnt how to write object oriented code tht cld be re-used and expanded through the class resources. I became more confident using arrays n objects, especially for managing more complex interactions like dialogue tress and tilemaps. 
Artistically, I practised creating pixel art and I also learned how much visual choices impact game readability.


THEMES
A sentence or two describing the major themes, tone, and ideas of your game.

Mary:
The major theme we had in mind for our game was player-based logic, allowing the player to use the evidence they collected (both the characters whereabouts, and the remaining books), to draw their own conclusions on who the culprit is.

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
Discuss the narrative elements of your game and how you plan to develop these in
the final project.

Mary:
The main story is that the player plays a teacher who acts as the chaperone for their class's field trip to the library. However in the opening scene, they get confronted by the librarian who, after noticing that many books are missing, briefly witnesses one of the teacher's students stealing a book. So the librarian tasks the teacher with finding the missing books while also figuring out which one of their students stole the book. 

AESTHETIC
Discuss your aesthetic approach and the inspirations you drew from. Upload images
to your repository and point me to the relevant directory for these, and discuss
the choices you made.

Mary:
I have always had a love for mystery and puzzle games, so there have been many pieces of media that inspired me to create the concept for the game and script. Some of my main inspirations for the gameplay have been many of the point-and-click puzzle games made by LucasArts in the 80s and 90s, such as Sam and Max and Grim Fandango. Another one of my main inspirations was the game Cluedo (Also known as Clue). The game helped fuelled my original main idea for the game, being a deduction-based mystery game with multiple endings. While we later on could not fully implement the multiple endings feature to the game and had to scrap it, Cluedo still ended up being a huge inspiration in the final product, as the evidence lists slightly still took inspiration from the board game, with the player cross-referencing the evidence they recieved from the suspects' alibis and figuring out which suspect might stole what book based on their interests to solve the mystery.

ANYTHING YOU'D ADD?
Would you make changes if you had a few more weeks? Or what about if you had a 
full studio behind you? What ideas would you like to implement if you had more
technical knowledge?

Yvette: I think exploring the multiple endings concept further would have been really interesting. A full quest log, maybe more rooms were you can explore more things. Sprite animations would've made the game look a lot nicer, and minigames (like sorting books, finding hidden objects) also would have been fun to try out. An in-game timer to add pressure to the player would've been something else to add as well, alongside music and sound effects.

Mary:
Like as Yvette mentioned above, it would have been really cool if we could have implemented our multiple endings idea, but unfortunately, we didn't have enough time to figure out how we could fully implement it to the code. Personally, I would have liked it so that there could have been longer dialogue between the player and the NPCs. For example: in one of my original drafts for the script, Josh and Amalia, would have mini scenes together when the player tries to talk to either of them, with both accusing the other of stealing the books, making it clear there was a rivalry between the two of them.