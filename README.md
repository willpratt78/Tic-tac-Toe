``` Javascript
Describe: Player()

Test:"Creates a new player object"
Code: let player = new Player("X", true);
      console.log(player)
Result: {mark: "X", isTurn: true}

Describe: Player.prototype.mark()

Test:"Return the mark of the player"
Code: let player = new Player();
      console.log(player.mark())
Result: "X"

Test:"Creates a new player object"
Code: let computer = new Player("O", false);
      console.log(computer)
Result: {mark: "O", isTurn: false}

Test:"Return the mark of the computer"
Code: let computer = new Player();
      console.log(computer.mark())
Result: "O"

Describe: Board()

Describe: Board.prototype.findSpace()

Test:"Returns the correct space based on id"
Code: board.findSpace(1);
Result: {id: 1, isMarked: false}

Describe: Space()

Describe: Space.prototype.markSpace()

Test:"Changes isMarked to True on correct id"
Code: let space = board.findSpace(1);
      space.markSpace();
      console.log(space)
Result: {id: 1, isMarked: true}
 
```









Use boolean to switch between players

Use CSS with a border across 9 divs to create a board

Use dives that borders are being made with to place x/o

Give computer random number from 1-0
Use if space === “” return o
Else run again
