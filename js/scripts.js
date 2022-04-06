function Board() {
  this.spaces= {}
}

Board.prototype.findSpace = function(id) {
  if (this.spaces[id] != undefined) {
    return this.spaces[id];
  }
  return false;
};

Board.prototype.buildSpaceObjects = function() {
  for (let i = 1; i < 10; i++) {
    const space = new Space(i, false)
    this.spaces[space.id] = space;
  }
}
Board.prototype.allSpacesMarked = function(board) {
  let bool = true;
  Object.keys(board.spaces).forEach(function(key) {
    const space = board.findSpace(key);
    if(space.isMarked === false) {
      bool = false;
    }
  });
  return bool;
}
Board.prototype.IsCompleted = function(board, player) {
  const options = [[1,2,3],[6,5,4],[7,8,9],[3,5,7],[4,1,7],[2,5,8],[9,6,3],[5,1,9]]
  for (let i = 0; i < options.length; i++) {
    const firstSpace = board.findSpace(options[i][0])
    if(firstSpace.isMarked === true && firstSpace.player === player) {
      let count = 0;
      options[i].forEach(spaceId => {
        console.log(spaceId)
        const space = board.findSpace(spaceId);
        if(space.isMarked){
          if(space.player === player){
            count++
          }
        }
      });
      if(count === 3){
        colorSquares(options[i]);
        return 1;
        break;
      }
    }
  }
  if(board.allSpacesMarked(board)){
    return 2;
  }
  return 3
}

function Space(id, isMarked) {
  this.id = id
  this.isMarked = isMarked
}

Space.prototype.markSpace = function(player) {
  this.isMarked = true;
  this.player = player;
}

function Player(mark, isTurn) {
  this.mark = mark
  this.isTurn = isTurn
}

Player.prototype.makeMark = function() {
  return this.mark
}

Player.prototype.pickSpace = function(board, computer) {
  for (let i = 0; i < 100; i++) {
  const randomNumber = Math.floor(Math.random() * 9) + 1;
  const space = board.findSpace(randomNumber)
  if(space.isMarked === false){
    space.markSpace("computer")
    return space.id
  }
  }
}

// Ui Logic
let board = new Board();
board.buildSpaceObjects();
let player = new Player("X", true);
let computer = new Player("O", false);

function WriteMark(id, player) {
  $("#" + id).text(player.makeMark())
  const space = board.findSpace(id);
  space.markSpace("player");
  const isCompleted = board.IsCompleted(board, "player")
  if(isCompleted === 1 || isCompleted === 2) {
    gameOver("You", isCompleted)
  }else {
    const spaceToMarkId = computer.pickSpace(board);
    computerWriteMark(spaceToMarkId)
  }
}
function computerWriteMark(id) {
  $("#" + id).text(computer.makeMark())
  $("#" + id).prop("disabled", true)
  const isCompleted = board.IsCompleted(board, "computer")
  if(isCompleted === 1 || isCompleted === 2) {
    gameOver("Computer", isCompleted)
  }
}
function gameOver(winner, isCompleted) {
  $(".game-space").prop("disabled", true)
  if(isCompleted === 1){
    $("#game-over-output").text("GAME OVER " + winner + " Won!");
  }else {
    $("#game-over-output").text("Tie");
  }
}
function colorSquares(array) {
  array.forEach((id) => {
    $("#" + id).addClass("color")
  })
}
$(document).ready(function() {
  $(".game-space").click(function() {
    const id = $(this).attr("id");
    WriteMark(id, player)
    $("#" + id).prop("disabled", true)
  })
})


