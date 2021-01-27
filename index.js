const col = 6;
const row = 6;
const minNumber = 1;
const maxNumber=9;
//ПЕРЕМЕННАЯ ОШИБКИ
var error_txt="";

window.onload = function () {
  let table = document.querySelector('table');
  if (document.getElementsByClassName('Cells')) {

    for (var i = 0; i < row; i++) {
      let tr = document.createElement("tr");
      tr.setAttribute('id','row'+i);
      table.append(tr);

      for (var j = 0; j < col; j++) {
            let rowTr = document.querySelector("#row"+i);
            let td = document.createElement("td");
            td.setAttribute('id','cell'+i+j);
            td.setAttribute('class','Cells');
            //td.setAttribute('onclick','clickCell('+i+','+j+')');
            rowTr.append(td);
            let inputNumber = document.createElement("input");
            inputNumber.setAttribute('id','TapCell'+i+j);
            inputNumber.setAttribute('class','InputCells');
            inputNumber.setAttribute('onclick','clickCell('+i+','+j+')');
            inputNumber.readOnly = true;
            td.appendChild(inputNumber);



    }

  }

}
 autoFill();
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min+1)) + min;
}



function autoFill() {
  for (var i = 0; i < row; i++) {
    for (var j = 0; j < col; j++) {
        let cell = document.querySelector("#TapCell"+i+j);
        cell.value += getRandomInt(minNumber,maxNumber);
    }
    }
}

var lastX;
var lastY;
var click = 0;
function clickCell(x,y) {
  let lastCell;
  let currentCell = document.querySelector("#TapCell"+x+y);
    currentCell.style.backgroundColor = 'red';
  click +=1;
  if (click == 1) {
    lastX = x;
    lastY = y;
    return;
  } else if (click==2) {
    lastCell =  document.querySelector("#TapCell"+lastX+lastY);
     if (checkNumbers(Number(lastCell.value),Number(currentCell.value)) && checkPos(lastX,lastY,x,y)  ) {
       lastCell.value = "";
       currentCell.value = "";
       //gameover
       if (checkGameOver()) newGame(lastCell,currentCell);

     } else {
       alert (error_txt);
     }
     lastCell.style.backgroundColor = 'white';
     currentCell.style.backgroundColor = 'white';
    click =0;
  }
}

function checkNumbers(lastValue,currentValue) {
  if (lastValue== 0||currentValue==0) {
    error_txt = "Выбрана пустая ячейка!";
    return false;
  } else if (lastValue==currentValue) {
    return true;
  } else {
    error_txt = "Ячейки не равны. Выберите другие!";
    return false;
  }
}

function checkNumberOfRow(x,lastY,y) { //одна строка пустые колонки
let distance = y - (lastY+1);
let count = 0;
  for (var i = lastY+1; i < y; i++) {
      let cell = document.querySelector("#TapCell"+x+i);
    if (Number(cell.value) == 0 ) {
      count+=1;
    }
  }
  if (count == distance) {
    return true;
  }
  else return false;
}
function checkNumberOfColumn(x,lastX,y) { //один столбец, пустые строки
let distance = x - (lastX+1);
let count = 0;
  for (var i = lastX+1; i < x; i++) {
      let cell = document.querySelector("#TapCell"+i+y);
    if (Number(cell.value) == 0 ) {
      count+=1;
    }
  }
  if (count == distance) {
    return true;
  }
  else return false;
}

function checkPos(lastX,lastY,x,y) {
//одна строка, первый столбец
  if (lastX == x && lastY == 0 && y==(lastY + 1)) {
      return true;
  } //строка одна,последний столбец
  else if (lastX == x && lastY==(col - 1) && y==(lastY-1)) {
    return true;
  } //строка одна
  else if (lastX == x && ( (lastY == (y-1)) || (lastY == (y+1)) || checkNumberOfRow(x,lastY,y) || checkNumberOfRow(x,y,lastY) ) ) {
    return true;
  } //не одна и та же ячейка
  else if (lastX==x && lastY ==y) {
    error_txt = "Выбрана одна ячейка!Кликните еще раз";
    return false;
  }// столбец один
  else if (lastY == y && (x == (lastX - 1) || x == (lastX + 1) || checkNumberOfColumn(x,lastX,y) || checkNumberOfColumn(lastX,x,y) ) ) {
    return true;
  }//перенос строки
  else if (rowOfNull(lastX,x,lastY,y) || rowOfNull(x,lastX,y,lastY) ){
    return true;
  }
  else {
    error_txt = "Выберите новые ячейки";
    return false;
  }

}



function rowOfNull(lastX,x,lastY,y) {
  let distanceLastY = col - (lastY+1);
  let distance = y + distanceLastY;
  let count = 0;
  let countRow = x - (lastX+1);
  //от первой строки до конца по колонкам
  for (var i = lastY+1; i < col; i++) {
    let cell = document.querySelector("#TapCell"+lastX+i).value;
    if (Number(cell) == 0) {
      count+=1;
    }
  }
  //от "второй" строки по колонкам с начала
for (var i = 0; i < y; i++) {
  let cell = document.querySelector("#TapCell"+x+i).value;
  if (Number(cell) == 0) {
    count+=1;
  }
}

for (var i = lastX+1; i < x; i++) {
  for (var j = 0; j < col; j++) {
    let cell = document.querySelector("#TapCell"+i+j).value;
    if (Number(cell) == 0) {
      count+=1;
    }
  }

}

if (count == (distance + countRow*col)) {
  return true;
} else return false;
}

function checkGameOver(){
  let count = 0;
  for (var i = 0; i < row; i++) {
    for (var j = 0; j < col; j++) {
        let cell = document.querySelector("#TapCell"+i+j).value;
        if (Number(cell) == 0) {
          count+=1;
        } else {
          return false;
        }

    }
  }
  if (count == row*col) {
    return true;
  }
}
function newGame(lastCell, currentCell) {
  let newGame = confirm("Игра окончена!Начать новую игру?");
  if (newGame)  window.location.reload(); else {
    lastCell.style.backgroundColor = 'white';
    currentCell.style.backgroundColor = 'white';
  }
}
//перемешать.
function toMix() {
  let arrayCell = new Array();
  for (var i = 0; i < row; i++) {
    for (var j = 0; j < col; j++) {
      let cell = document.querySelector("#TapCell"+i+j).value;
      if (Number(cell)!==0) {
        arrayCell.push(cell);
      }
    }
  }
shuffle(arrayCell);
 let ind=0;
 clearCell();
  while (ind!=arrayCell.length){
      for (var j = 0; j < col; j++) {
//ОКРУГЛЕНИЕ В МЕНЬШУЮ СТОРОНУ!
          let indexRow = Math.floor(ind/col);
        let cell = document.querySelector("#TapCell"+indexRow+j);
        cell.value = arrayCell[ind];
        ind++;
        if (ind==arrayCell.length) break;
      }
  }
}
function clearCell() {
  for (var i = 0; i < row; i++) {
    for (var j = 0; j < col; j++) {
      let cell = document.querySelector("#TapCell"+i+j);
      cell.value = "";
    }

  }

}


function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
  }


function fillArray() {
  let arrayCell = new Array();
  for (var i = 0; i < row; i++) {
    arrayCell[i] = new Array();
    for (var j = 0; j < col; j++) {
      let cell = document.querySelector("#TapCell"+i+j).value;
        arrayCell[i][j] = Number(cell);
    }
  }

  return arrayCell;

}
//посчитать кол во пустых ячеек в строке от координаты определенной, вернуть значение, проверять на умноженное значение и/ж

function checkNullOfRow(indexRow,indexCol) { //на одной строке пустые колонки
  let count = 0;
    for (var j = indexCol; j < col; j++) {
      let cell = document.querySelector("#TapCell"+indexRow+j).value;
      if (Number(cell) == 0) count+=1;
      if (count!=0) return count;
    }
}

function toHelp() {
let array = fillArray();
console.log(array);
for (var i = 0; i < row; i++) {
  for (var j = 0; j < col; j++) {
    //  checkNumbers(Number(lastCell.value),Number(currentCell.value)) && checkPos(lastX,lastY,x,y)
    //соседние ячейки
  if ( j!=col-1 && checkNumbers(Number(document.querySelector("#TapCell"+i+j).value),Number(document.querySelector("#TapCell"+i+(j+1)).value)) && checkPos(i,j,i,j+1) ){
    document.querySelector("#TapCell"+i+j).style.backgroundColor = "green";
    document.querySelector("#TapCell"+i+(j+1)).style.backgroundColor = "green";
    return ;
  }
  else if (i!=row-1 && checkNumbers(Number(document.querySelector("#TapCell"+i+j).value),Number(document.querySelector("#TapCell"+(i+1)+j).value)) && checkPos(i,j,i+1,j) ) {
    document.querySelector("#TapCell"+i+j).style.backgroundColor = "green";
    document.querySelector("#TapCell"+(i+1)+j).style.backgroundColor = "green";
    return ;
  }
  //между колонками пусто
  else if ( j!= col-1 && Number(document.querySelector("#TapCell"+i+(j+1)).value) == 0  ) {
    let countCol = checkNullOfRow(i,j+1);
    if ( checkNumbers(Number(document.querySelector("#TapCell"+i+j).value),Number(document.querySelector("#TapCell"+i+(j+1+countCol)).value)) && checkPos(i,j,i,j+1+countCol) ) {
      document.querySelector("#TapCell"+i+j).style.backgroundColor = "green";
      document.querySelector("#TapCell"+i+(j+1+countCol)).style.backgroundColor = "green";
    }
  }


  }
}

}
