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
    if(firstSpace.isMarked === true && firstSpace.player === player.name) {
      let count = 0;
      options[i].forEach(spaceId => {
        const space = board.findSpace(spaceId);
        if(space.isMarked){
          if(space.player === player.name){
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
  this.player = player.name;
}

function Player(mark, isTurn, name) {
  this.mark = mark
  this.isTurn = isTurn
  this.name = name
}

Player.prototype.turnChange = function() {
  
  if (this.isTurn === true) {
    this.isTurn = false;
  }else {
    this.isTurn = true;
  }
  console.log(this);
}

Player.prototype.makeMark = function() {
  return this.mark
}

Player.prototype.pickSpace = function(board, computer) {
  for (let i = 0; i < 100; i++) {
  const randomNumber = Math.floor(Math.random() * 9) + 1;
  const space = board.findSpace(randomNumber)
  if(space.isMarked === false){
    space.markSpace(computer)
    return space.id
  }
  }
}
// Ui Logic
function ShowMark (id, player, board) {
  $("#" + id).text(player.makeMark())
  const space = board.findSpace(id);
  space.markSpace(player);
}

function WriteMark(id, board, player, mode, player2) {
  ShowMark(id, player, board);
  const isCompleted = board.IsCompleted(board, player)
  if(isCompleted === 1 || isCompleted === 2) {
    gameOver(player.name, isCompleted)
  }else if(mode === "easy") {
    const spaceToMarkId = player2.pickSpace(board, player2);
    computerWriteMark(spaceToMarkId, player2, board)
  }else if(mode === "two-players"){
    player.turnChange();
    player2.turnChange();
  }
}

function computerWriteMark(id, computer, board) {
  $("#" + id).text(computer.makeMark())
  $("#" + id).prop("disabled", true)
  const isCompleted = board.IsCompleted(board, computer)
  console.log(isCompleted);
  if(isCompleted === 1 || isCompleted === 2) {
    gameOver("Computer", isCompleted)
  }
}
function gameOver(winner, isCompleted) {
  $(".game-space").prop("disabled", true)
  if(isCompleted === 1){
    $("#game-over-output").text("GAME OVER :" + winner + " Won!");
  }else {
    $("#game-over-output").text("Tie");
  }
}
function colorSquares(array) {
  array.forEach((id) => {
    $("#" + id).addClass("color")
  })
}
function unhideGameBoard() {
  $("#menu").addClass("hidden");
  $(".game-board").removeClass("hidden");
}
$(document).ready(function() {
  $(".btn").click(function() {
    const mode = $(this).attr("id");
    unhideGameBoard();
    let board = new Board();
    board.buildSpaceObjects();
    let player = new Player("X", true, " Player 1");
    let player2 = new Player("O", false, " Player 2");
    let computer = new Player("O", false, "Computer");
    $(".game-space").click(function() {
        const id = $(this).attr("id");
        if(mode === "easy"){
          WriteMark(id, board, player, mode, computer)
        }else if(mode ==="hard"){
           WriteMark(id, board, player, mode, computer)
        }else {
          console.log("ClickEvent: " + player.isTurn)
         if(player.isTurn) {
            WriteMark(id, board, player, mode, player2)
          }else {
            WriteMark(id, board, player2, mode, player) 
        }
      }
      $("#" + id).prop("disabled", true)
    })
  })
})