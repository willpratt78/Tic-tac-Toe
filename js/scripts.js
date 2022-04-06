function Board() {
  this.spaces= {}
}

Board.prototype.findSpace = function(id) {
  if (this.spaces[id] != undefined) {
    return this.spaces[id];
  }
  return false;
};

Board.prototype.addSpace = function(space) {
  this.spaces[space.id] = space;
};

Board.prototype.buildSpaceObjects = function() {
  for (let i = 1; i < 10; i++) {
    const space = new Space(i, false)
    this.addSpace(space);    
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
  const options = [[1,2,3],[4,5,6],[7,8,9],[3,5,7],[1,4,7],[2,5,8],[3,6,9],[1,5,9]]
  for (let i = 0; i < options.length; i++) {
    let count = 0;
    options[i].forEach(spaceId => {
      const space = board.findSpace(spaceId);
      if(space.isMarked){
        if(space.player === player){
          count++
        }
      }
    });
    if(count === 3){
      return 1;
      break;
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
  if(board.allSpacesMarked(board) === false) {
    for (let i = 0; i < 100; i++) {
    const randomNumber = Math.floor(Math.random() * 9) + 1;
    const space = board.findSpace(randomNumber)
    if(space.isMarked === false){
      space.markSpace("computer")
      return space.id
    }
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
    const spaceToMarkId = computer.pickSpace(board, computer);
    computerWriteMark(spaceToMarkId, computer)
  }
}
function computerWriteMark(id, computer) {
  $("#" + id).text(computer.makeMark())
  $("#" + id).prop("disabled", true)
  const isCompleted = board.IsCompleted(board, "computer")
  if(isCompleted === 1 || isCompleted === 2) {
    gameOver("Computer", isCompleted)
  }
}
function gameOver(winner, isCompleted) {
  if(isCompleted === 1){
    $("#game-over-output").text("GAME OVER " + winner + " Won!");
  }else {
    $("#game-over-output").text("Tie");
  }
}

$(document).ready(function() {
  $(".game-space").click(function() {
    const id = $(this).attr("id");
    WriteMark(id, player)
    $("#" + id).prop("disabled", true)
  })
})


