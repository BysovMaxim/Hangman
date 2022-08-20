const alphabetContainer = document.querySelector('.alphabet-container')
const wordContainer = document.querySelector('.word-container')
const controls = document.querySelector('.controls')
const category = document.querySelector('.category')
const hintContainer = document.querySelector('.hint-container')
const canvas = document.getElementById("canvas")
const categories = {
    films : {
      ['Jaws'] : {
        clueText : 'famous film about sharks'
      },

      ['The Terminator'] : {
        clueText: 'mechanical robot machine look like a man'
      },

      ['Lion King'] : {
        clueText : 'from which one was lion named Simba?'
      },
      ['One Flew Over the Cuckoos Nest'] : {
        clueText : 'A criminal pleads insanity and is admitted to a mental institution, where he rebels against the oppressive nurse and rallies up the scared patients.'
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
        clueText : 'one of the sexiest actress of 21 century'
      }
    }
  }
let winCount = 0
let loseCount = 0
let chosenWord = '';
let hint = ''

// blocks all buttons

const changeStateButtons = (disabled) => {
  let letters = document.querySelectorAll('.letters')
  letters.forEach(letter => {
    letter.disabled = disabled
  })
}

//Canvas
const canvasCreator = () => {
  let context = canvas.getContext("2d");
  context.beginPath();
  context.strokeStyle = "#000";
  context.lineWidth = 2;

  //For drawing lines
  const drawLine = (fromX, fromY, toX, toY) => {
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.stroke();
  };

  const head = () => {
    context.beginPath();
    context.arc(70, 30, 10, 0, Math.PI * 2, true);
    context.stroke();
  };

  const body = () => {
    drawLine(70, 40, 70, 80);
  };

  const leftArm = () => {
    drawLine(70, 50, 50, 70);
  };

  const rightArm = () => {
    drawLine(70, 50, 90, 70);
  };

  const leftLeg = () => {
    drawLine(70, 80, 50, 110);
  };

  const rightLeg = () => {
    drawLine(70, 80, 90, 110);
  };

  //initial frame
  const initialDrawing = () => {
    //clear canvas
    context.clearRect(0, 0, context.canvas.width, context.canvas.height)
    //bottom line
    drawLine(10, 130, 130, 130)
    //left line
    drawLine(10, 10, 10, 131)
    //top line
    drawLine(10, 10, 70, 10)
    //small top line
    drawLine(70, 10, 70, 20)
  };

  return { initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg }
};

// create menu with some buttons
const createMenu = () => {
  let gameRestart = document.createElement('button')
  let getHint = document.createElement('button')
  gameRestart.innerHTML = 'Play again!'
  getHint.innerHTML = 'Get a hint!'
  controls.append(getHint)
  controls.append(gameRestart)

  gameRestart.addEventListener('click', () => {
    // clearing some info
    let result = document.querySelector('.result')
    winCount = 0
    loseCount = 0
    if(result) result.innerHTML = ''
    hintContainer.innerHTML = ''
    let { initialDrawing } = canvasCreator()
    //initialDrawing would draw the frame
    initialDrawing()
    changeStateButtons(false)
    generateWord()
  })
  getHint.addEventListener('click', () => {
    hintContainer.innerHTML = hint
  })



}

// word generator
const generateWord = () => {
  // choose category randomly
  let randomedCategory = Object.keys(categories)[Math.floor(Math.random() * Object.keys(categories).length)]
  console.log(randomedCategory)
  category.innerHTML = randomedCategory
  // choose word randomly
  chosenWord = Object.keys(categories[randomedCategory])[Math.floor(Math.random() * Object.keys(categories[randomedCategory]).length)]
  console.log(chosenWord)
  hint = Object.values(categories[randomedCategory][chosenWord]).toString()
  console.log(hint)
  chosenWord = chosenWord.toUpperCase()
  let dashedWord = ''
  // deleting spaces between words
  for(let i = 0; i < chosenWord.split('').length; i++) {
    if(chosenWord.split('')[i] != ' ') dashedWord += '<span class="dash">_</span>'
      else dashedWord += '<span class="space"> </span>'
  }
  wordContainer.innerHTML = dashedWord

}

// main game logic, initialize

const initialize = () => {
  winCount = 0
  loseCount = 0
  for(let i = 65; i < 91; i++) {
    let button = document.createElement('button')
    button.classList.add('letters')
    button.innerHTML = `${String.fromCodePoint(i)}`
    button.addEventListener('click', () => {
      let charArray = chosenWord.replace(/ /g, '').split('')
      let dashes = document.getElementsByClassName('dash')
      if(charArray.includes(button.innerHTML)) {
        charArray.forEach((char, index) => {
          if(char === button.innerHTML) {
            dashes[index].innerHTML = char.toLowerCase()
            winCount++
            if(winCount == charArray.length) {
              let result = document.createElement('div')
              result.innerHTML = '<h2 class="result">You won!!!</h2>'
              wordContainer.after(result)
              changeStateButtons(true)
            }
          }
        })
      } else {
            loseCount++
            drawMan(loseCount);
            if(loseCount > 5) {
              let result = document.createElement('div')
              result.innerHTML = '<h2 class="result">You lost!!!</h2>'
              wordContainer.after(result)
              changeStateButtons(true)
            }
      }
      button.disabled = true
    })

    alphabetContainer.append(button)
  }

}
const drawMan = (loseCount) => {
  let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();
  switch (loseCount) {
    case 1:
      head();
      break;
    case 2:
      body();
      break;
    case 3:
      leftArm();
      break;
    case 4:
      rightArm();
      break;
    case 5:
      leftLeg();
      break;
    case 6:
      rightLeg();
      break;
    default:
      break;
  }
};
generateWord()
createMenu()
window.onload = initialize