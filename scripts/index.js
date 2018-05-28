var containerGame = document.getElementById('containerGame')

function generateBoard () {
  // Generate board for game

  // clear existing board
  containerGame.innerHTML = ''
  
  var jumlahBaris = document.getElementById('input-baris').value
  var jumlahKolom = document.getElementById('input-kolom').value

  console.log(jumlahBaris)

  for (i = 0; i < jumlahBaris ; i++ ){
    var divBaris = document.createElement('div')
    divBaris.id = 'baris-'+i
    divBaris.className = 'containerBaris'

    for (j = 0 ; j < jumlahKolom ; j++) {
      var divKolom = document.createElement('div')
      divKolom.id = 'box'+i+j
      divKolom.className = 'box'

      divBaris.appendChild(divKolom)
    }

    containerGame.appendChild(divBaris)
  }
}

function rollDice (){
  console.log('ROLLLL DICE')
  document.getElementById('roll-dice-button').setAttribute("disabled", false )
}


