window.onload = function() {
  
  const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'];

  const category = {
    films : {
      ['Jaws'] : {
        clueText : 'famous film about sharks'
      },

      ['The Terminator'] : {
        clueText: 'mechanical robot machine look like a man'
      },

      ['Lion King'] : {
        clueText : 'from which one was lion named Simba?'
      }
    },

    cars : {
      reno : {
        clueText : 'really survival car'
      },

      lamborgini : {
        clueText : 'very fast and georgeous car'
      },

      bugatti : {
        clueText : 'maybe most fastest car in the world'
      }
    },

    actors : {
      ['Brad Pitt'] : {
        clueText : 'most handsome hollywood actor'
      },
      ['Arnold Shwarznegger'] : {
        clueText : 'self-made man bodybuilder mr. Olympia'
      }
    },

    actresses : {
      ['Margot Robbie'] : {
        clueText : 'one of the sexiest acress of 21 century'
      }
    }
  }

  const letters = document.querySelector('.letters')
  const chosenCategory = document.querySelector('.chosen-category')
  const clueText = document.querySelector('.clue')
  const hintButton = document.querySelector('.hint')
  const restart = document.querySelector('.restart')
  const lives = document.querySelector('.lives-remaining')
  const word = document.querySelector('.word')
  
  let arr = []
  let livesCount = 10
  


  function getRandomCategory(obj) {
    let catValue = Object.keys(obj)[Math.floor(Math.random() * (Object.keys(obj).length))] // Films
    let word = Object.keys(obj[catValue])[Math.floor(Math.random() * (Object.keys(obj[catValue]).length))] // Lion King
    let clueText = Object.values(obj[catValue][word]).toString() // In which movie is the lion named Simba?
    arr.push(catValue, word, clueText)
  }

  function updateDisplay() {
    chosenCategory.innerHTML += arr[0] + '!'
    clueText.innerHTML = arr[2]
    lives.innerHTML = `You have ${livesCount} lives`
  }

  function drawWord() {
    for(let i = 0; i < arr[1].length; i++) {
      if(arr[1].split('')[i] == ' ') word.innerHTML += '<span class="symbol"> </span>'
      else word.innerHTML += '<span class="symbol">_</span>'
    }
  }


  getRandomCategory(category)
  updateDisplay()
  drawWord()

  const spans = document.querySelectorAll('.symbol')
  const mainWord = arr[1]

  hintButton.addEventListener('click', () => {
    clueText.style.visibility = 'visible'
  })

  restart.addEventListener('click', () => {
    word.innerHTML = ''
    arr = []
    getRandomCategory(category)
    chosenCategory.innerHTML = 'Randomly chosen category now is - '
    drawWord()
    updateDisplay()
    clueText.style.visibility = 'hidden'
  })

  alphabet.forEach(letter => {
    letters.innerHTML += `<button class="letter">${letter}</button>`
  })

  const letterButtons = document.querySelectorAll('.letter')

  letterButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      let target = e.target;
      console.log(livesCount)
        if(livesCount <= 0) {
          lives.innerHTML = 'GAME OVER!!!'
          return
        }
      if (mainWord.toLowerCase().split('').includes(target.innerHTML)) {

        for(let i = 0; i < mainWord.length; i++ ) {
          if(mainWord.toLowerCase().split('')[i] == target.innerHTML) {
            spans[i].innerHTML = target.innerHTML
          } 
        }

      } else {
          livesCount--
          lives.innerHTML = `You have ${livesCount} lives`
      }
    })
  })
}