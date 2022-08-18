window.onload = function() {
  
  const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'];

  const category = {
    films : {
      ['Jaws'] : {
        clue : 'famous film about sharks'
      },

      ['The Terminator'] : {
        clue: 'mechanical robot machine look like a man'
      },

      ['Lion King'] : {
        clue : 'from which one was lion named Simba?'
      }
    },

    cars : {
      reno : {
        clue : 'really survival car'
      },

      lamborgini : {
        clue : 'very fast and georgeous car'
      },

      bugatti : {
        clue : 'maybe most fastest car in the world'
      }
    },

    actors : {
      ['Brad Pitt'] : {
        clue : 'most handsome hollywood actor'
      },
      ['Arnold Shwarznegger'] : {
        clue : 'self-made man bodybuilder mr. Olympia'
      }
    },

    actresses : {
      ['Margot Robbie'] : {
        clue : 'one of the sexiest acress of 21 century'
      }
    }
  }

  const letters = document.querySelector('.letters')
  const chosenCategory = document.querySelector('.chosen-category')
  const clue = document.querySelector('.clue')
  const hint = document.querySelector('.hint')
  const restart = document.querySelector('.restart')
  const lives = document.querySelector('.lives-remaining')
  const word = document.querySelector('.word')
  let arr = []
  let livesCount = 10

  function getRandomCategory(obj) {
    let catValue = Object.keys(obj)[Math.floor(Math.random() * (Object.keys(obj).length))] // Films
    let word = Object.keys(obj[catValue])[Math.floor(Math.random() * (Object.keys(obj[catValue]).length))] // Lion King
    let clue = Object.values(obj[catValue][word]).toString() // In which movie is the lion named Simba?
    arr.push(catValue, word, clue)
  }

  function updateDisplay() {
    chosenCategory.innerHTML += arr[0] + '!'
    clue.innerHTML = arr[2]
    lives.innerHTML = `You have ${livesCount} lives`
  }

  getRandomCategory(category)
  updateDisplay()
  
  hint.addEventListener('click', () => {
    clue.style.visibility = 'visible'
  })

  restart.addEventListener('click', () => {
    arr = []
    getRandomCategory(category)
    chosenCategory.innerHTML = 'Randomly chosen category now is - '
    updateDisplay()
    clue.style.visibility = 'hidden'
  })

  alphabet.forEach(letter => {
    letters.innerHTML += `<button class="letter">${letter}</button>`
  })
}
