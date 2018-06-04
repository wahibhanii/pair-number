var containerGame = document.getElementById('containerGame')
var boardSettings = []
var boardsOpened = []
var isHoldOpenBoard = false

function generateBoardSettings () {
  containerGame.innerHTML = ''
  var row = document.getElementById('input-baris').value
  var col = document.getElementById('input-kolom').value
  a
  if (!validateInput(row ) || !validateInput(col)) {
      return containerGame.innerHTML = 'WRONG INPUT'
  }

  var arr = generateArray(row, col)

  for (var i = 0; i < row; i++) {
    var rowSettings = []
    for (var j = 0; j < col; j++) {
      var box = {
        value : arr.pop(),//''+i+j,
        isOpened: false,
        isMatched: false
      }

      rowSettings.push(box)
    }

    boardSettings.push(rowSettings)
  }

  printBoard(boardSettings, isHoldOpenBoard)
}

function printBoard (boardSettings, isHoldOpenBoard) {
  containerGame.innerHTML = ''

  for (var i = 0 ; i < boardSettings.length ; i++) {
    var divBaris = document.createElement('div')
    divBaris.id = 'baris-'+i
    divBaris.className = 'containerBaris'

    for (var j = 0; j < boardSettings[i].length ; j++) {
       var divKolom = document.createElement('div')

      divKolom.id = 'box'+i+j
      divKolom.rowNumber = i;
      divKolom.colNumber = j;

      if (!isHoldOpenBoard && !boardSettings[i][j].isMatched) {
        divKolom.onclick = function () {
          rowClicked = this.rowNumber
          colClicked = this.colNumber
          openBoard(boardSettings, rowClicked , colClicked)
        }
      }

      if (boardSettings[i][j].isMatched || boardSettings[i][j].isOpened) {
        divKolom.innerHTML = `<p>${boardSettings[i][j].value}</p>`
        divKolom.className = 'opened-box'
      } else {
        divKolom.className = 'box'
        divKolom.innerHTML = `<p>?</p>`
      }

      divBaris.appendChild(divKolom)
    }

    containerGame.appendChild(divBaris)
  }
}

function openBoard (arr, row, col) {
  console.log(arr, row, col)
  arr[row][col].isOpened = true
  boardsOpened.push({
    row,
    col
  })
  if (boardsOpened.length%2 == 0) {
    isHoldOpenBoard = true
    checkIsBoxMatch()
  }

  printBoard(boardSettings, isHoldOpenBoard)
}

function checkIsBoxMatch () {
  console.log('checking is board match...', boardsOpened)
  printBoard(boardSettings, isHoldOpenBoard)
  lastOne = boardsOpened[boardsOpened.length-1],
  lastTwo = boardsOpened[boardsOpened.length - 2]
  

  
    console.log('haoooo')
    if (boardSettings[lastOne.row][lastOne.col].value === boardSettings[lastTwo.row][lastTwo.col].value){
      console.log('match')
      boardSettings[lastOne.row][lastOne.col].isMatched = true;
      boardSettings[lastTwo.row][lastTwo.col].isMatched = true
      isHoldOpenBoard = false
      printBoard(boardSettings, isHoldOpenBoard)
    } else {
      setTimeout(function() {
        closeBoard(boardSettings, lastOne.row, lastOne.col)
        closeBoard(boardSettings, lastTwo.row, lastTwo.col)
        boardsOpened.pop()
        boardsOpened.pop()
        isHoldOpenBoard = false
        printBoard(boardSettings, isHoldOpenBoard)
      },1000)
    }
}

function closeBoard (boardSettings, row, col) {
  boardSettings[row][col].isOpened = false
}

function generateArray (row, col) {
  var arrResult = []
  var num = 0
  for (var i = 0; i < row * col ; i+=2) {
    arrResult[i] = String(num)
    arrResult[i+1] = String(num)
    num++
  }

  for (var j = arrResult.length-1 ; j >= 0 ; j--){
    var swapIndex = Math.floor(Math.random() * j)
    var temp = arrResult[j]
    arrResult[j] = arrResult[swapIndex]
    arrResult[swapIndex] = temp
  }

  return arrResult
}

function validateInput (input) {
  if (!input  || (input <= 0) || ((input % 2) !== 0)) {
    return false
  }

  return true
}

function rollDice (){
  console.log('ROLLLL DICE')
  document.getElementById('roll-dice-button').setAttribute("disabled", false )
}



