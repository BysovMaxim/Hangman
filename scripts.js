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
  const takenCategory = getRandomCategory(category)

  function getRandomCategory(obj) {
    let arr = []
    let catValue = Object.keys(obj)[Math.floor(Math.random() * (Object.keys(obj).length))] // films
    let word = Object.keys(obj[catValue])[Math.floor(Math.random() * (Object.keys(obj[catValue]).length))] // Lion King
    let clue = Object.values(obj[catValue][word]).toString() // from which one was lion named Simba?
    arr.push(catValue, word, clue)
    console.log(arr)
    return arr;

  }


  chosenCategory.innerHTML += takenCategory[0] + '!'
  



  alphabet.forEach(letter => {
    letters.innerHTML += `<button class="letter">${letter}</button>`
  })
}
