// console.log("connected")

var user1 = prompt("Enter User 1, you will be Blue","Santa")
var user2 = prompt("Enter User 2, you will be Red","Banta")

var user1Color = "rgb(19, 162, 209)";
var user2Color = "rgb(242, 65, 101)";
var defaultColor = "rgb(240, 240, 240)";

var table = $('table tr');

// logs console after win.
function reportWin(row, col){
    console.log("You won starting at row no: "+row+ "and coloumn no; "+col);
    console.log("Refresh to play again");

}

function changeColor(rowno,colno,newColor){
    table.eq(rowno).find("td").eq(colno).find("button").css("background-color",newColor);
}

function returnColor(rowno,colno){
    return table.eq(rowno).find("td").eq(colno).find("button").css("background-color");
}

function checkBottom(colno){
    for (let rowno = 5; rowno >= 0; rowno--) {
        if(returnColor(rowno,colno)===defaultColor){
            return rowno
        }
        
    }
}

function colorMatchCheck(one, two, three, four){
    return ( one===two && one===three && one===four && one!==defaultColor && one!== undefined)
}


function checkHorizontalWin(){
    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 3; col++) {
            if(colorMatchCheck(returnColor(row,col), returnColor(row,col+1), returnColor(row,col+2), returnColor(row,col+3))){
                reportWin(row,col)
                return true;
            }
            else{
                continue;
            }
        } 
    }
}

function checkVerticalWin(){
    for (let col = 0; col < 6; col++) {
        for (let row = 0; row < 3; row++) {
            if(colorMatchCheck(returnColor(row,col), returnColor(row+1,col), returnColor(row+2,col), returnColor(row+3,col))){
                reportWin(row,col)
                return true;
            }
            else{
                continue;
            }
        } 
    }  
}

//Need to review this function as not tested with sufficient test cases
function checkDiagonalWin(){
    for (let row = 0; row <= 6; row++) {
        for (let col = 0; col <= 6 ; col++) {
            if(colorMatchCheck(returnColor(row,col),returnColor(row+1,col+1),returnColor(row+2,col+2),returnColor(row+3,col+3) )){
                reportWin(row,col)
                console.log("diag win...")
                return true
            }
            else if( colorMatchCheck(returnColor(row,col),returnColor(row-1,col+1),returnColor(row-2,col+2),returnColor(row-3,col+3) ) ){
                reportWin(row,col)
                console.log("diag win...")
                return true

            }
            
        }      
    }
}



function checkWin(){
    if(checkHorizontalWin() || checkVerticalWin() || checkDiagonalWin()){
        return true
    }
    else{
        return false
    }

}

function endGame(){
    $(".board").fadeOut(3000)
    $("h3").fadeOut("fast")


    $("h2").fadeOut(8000)
    $("h1").text("Refresh page to play again")
    // $("h4").click(location.reload())
    
    console.log("game ended now refresh")
}








// GAME LOGIC is to be written from here


var currentPlayer = 1
var currentName = user1
var currentColor = user1Color

$("h3").text(currentName+"'s Chance, choose a column to fill bottom chip.");

$("button").on('click',function(){

    var colno = $(this).closest("td").index();

    var bottomAvailable = checkBottom(colno);

    changeColor(bottomAvailable,colno,currentColor);


    if(checkWin()){
        console.log("game ended")
        $("h2").text(currentName+"!, You Won The Game.").delay(30)
        endGame();
    }

    currentPlayer *= -1

    if(currentPlayer==1){
        currentName = user1
        $("h3").text(currentName+"'s Chance, choose a column to fill bottom chip.");
        currentColor = user1Color

    }else{
        currentName = user2
        $("h3").text(currentName+"'s Chance, choose a column to fill bottom chip.");
        currentColor = user2Color

    }


})