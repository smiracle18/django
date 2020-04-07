var table = document.querySelector('table');
var tableCells = document.querySelectorAll('td');
var resetButton = document.getElementById('reset');
var registerButton = document.querySelector('#register');
var chanceMsg = document.querySelector('#chanceinfo');
var state =[["0","1","2"],["3","4","5"],["6","7","8"]];
var user1="Player 1";
var user2="Player 2";
var chance = "first";
var winner = "noone";
chanceMsg.textContent=user1+"'s chance: tap empty grid to enter O";



//register users to the game
function registerUsers() {
  registerButton.addEventListener('click',function () {
    user1 = prompt('Enter your name',"Player 1");
    user2 = prompt('Enter opponents name',"Player 2");
    chanceMsg.textContent=user1+"'s chance: tap empty grid to enter O";

  })
}

function updateState() {
  for(var i=0;i<3;i++){
    state[0][i]=tableCells[i].textContent;
    state[1][i]=tableCells[3+i].textContent;
    state[2][i]=tableCells[6+i].textContent;
  }
}

function checkWinner() {

    if(state[0][0]==state[1][1]&&state[1][1]==state[2][2]&&state[2][2]=="O"){
      return user1;
    }
    if(state[0][0]==state[1][1]&&state[1][1]==state[2][2]&&state[2][2]=="X"){
      return user2;
    }
    if(state[0][2]==state[1][1]&&state[1][1]==state[2][0]&&state[2][0]=='X'){
      return user2;
    }
    if(state[0][2]==state[1][1]&&state[1][1]==state[2][0]&&state[2][0]=='O'){
      return user1;
    }


    for(var i=0;i<3;i++){

          if(state[0][i]==state[1][i]&&state[1][i]==state[2][i]&&state[2][i]=='O'){
            return user1;
          }
          if(state[0][i]==state[1][i]&&state[1][i]==state[2][i]&&state[2][i]=='X'){
            return user2;
          }


        if(state[i][0]==state[i][1]&&state[i][1]==state[i][2]&&state[i][2]=='O'){
          return user1;
        }
        if(state[i][0]==state[i][1]&&state[i][1]==state[i][2]&&state[i][2]=='X'){
          return user2;
        }
      }
      return winner;
}

function resetPlay(){
    tableCells.forEach((cell) => {
    cell.textContent = "";
    });
    chance="first";
    chanceMsg.textContent=user1+"'s chance: tap empty grid to enter O";
}



//reset the grid
resetButton.addEventListener("click",resetPlay);

//register users
registerButton.addEventListener('click',registerUsers);

//cells event listners
tableCells.forEach((cell, i) => {
  cell.addEventListener("click",function () {
    var response = cell.textContent;

    if(winner=="noone"){
            if(chance=="first" && response==""){
              cell.textContent="O";
              chance="second";
              chanceMsg.textContent=user2+"'s chance: tap empty grid to enter X";
            }
            else if(chance=="second" && response==""){
              cell.textContent="X";
              chance="first";
              chanceMsg.textContent=user1+"'s chance: tap empty grid to enter O";
            }

            updateState();
            winner=checkWinner();
            if(winner==user1){
              alert("Congratulations! "+winner+" won the game.");
              chanceMsg.textContent=winner+" has won the game reset to play again.";

            }
            else if (winner==user2){
                alert("Congratulations! "+winner+" won the game.");
                chanceMsg.textContent=winner+" has won the game reset to play again.";
            }
    }
    else{
      chanceMsg.textContent=winner+" has already won the game. Reset to play again.";
    }
  })
});
