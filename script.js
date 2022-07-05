const counterNode = document.querySelector('#counter')
const clickBtn = document.querySelector('#click')
const resetBtn = document.querySelector('#reset')

let counter = 0

const setCounter = () => {
  counterNode.innerText = counter
}
const incrementCounter = () => {
  counter++
  setCounter()
}

const resetCounter = () => {
  counter = 0
  setCounter()
}

setCounter()

clickBtn.addEventListener('click', () => {
  incrementCounter()
})
resetBtn.addEventListener('click', () => {
  if (counter) {
    resetCounter()
  } else {
    if (!error.classList.contains('active')) errorMessage()
  }
})

//* добавление кнопок
const addBtn = document.querySelector('#add') // add btn
const deleteBtn = document.querySelector('#delete') // delete btn
const deleteAllBtn = document.querySelector('#deleteAll') // delete all btn
const containerBlocks = document.querySelector('.container__blocks') // путь к диву
const counterNum = document.querySelector('#counterBlocks') // счётчик под заголовком
const error = document.querySelector('#error') // сообщение с ошибкой

let counterBlocks = 0
let blockArr = []

const setValue = () => {
  counterNum.innerText = counterBlocks
}

const createBlock = () => {
  counterBlocks++
  const block = document.createElement('div')
  blockArr.push(block)
  block.classList.add('container__item')

  containerBlocks.appendChild(block)
  block.innerText = counterBlocks
  setValue()
}

const deleteBlock = () => {
  counterBlocks--
  let el = blockArr.pop()
  el.remove()
  setValue()
}

const deleteAllBlock = () => {
  counterBlocks = 0
  blockArr = blockArr.map((item) => item.remove())
  blockArr.splice(0, blockArr.length)

  setValue()
}

const errorMessage = () => {
  error.classList.add('active')
  setTimeout(() => {
    error.classList.remove('active')
  }, 3000)
}

addBtn.addEventListener('click', () => {
  createBlock()
})

deleteBtn.addEventListener('click', () => {
  if (blockArr.length) {
    deleteBlock()
  } else {
    if (!error.classList.contains('active')) errorMessage()
  }
})

deleteAllBtn.addEventListener('click', () => {
  if (blockArr.length) {
    deleteAllBlock()
  } else {
    if (!error.classList.contains('active')) errorMessage()
  }
})

//* ИГРА - угадай число от 1 до 100

const getRandom = () => {
  return Math.floor(Math.random() * 100) + 1
}

let randomNumber = getRandom() //! рандомное число
let guessCount = 10
console.log(randomNumber)

const guessNumber = document.querySelector('#guessNumber') //! введённые числа
const guessTries = document.querySelector('#guessTries') //! кол-во попыток

const guessField = document.querySelector('#guessField') //! поле с вводом
const guessSubmit = document.querySelector('#guessSubmit') //! кнопка с вводом
const lowOrHi = document.querySelector('#lowOrHi') //! больше или меньше
const results = document.querySelector('#results') //! результат игры
const guessReset = document.querySelector('#guessReset') //! рестарт игры

let numbArr = []
const reset = () => {
  numbArr.length = 0
  guessSubmit.removeAttribute('disabled', 'disabled')
  guessField.disabled = false
  randomNumber = getRandom()
  console.log(randomNumber)
  guessCount = 10
  lowOrHi.classList.remove('no-correct')
  lowOrHi.classList.remove('correct')
  lowOrHi.innerText = ' '
  guessNumber.innerText = ' '
  results.innerText = ' '
  guessTries.innerText = guessCount
  if (results.classList.contains('loss')) {
    results.classList.remove('loss')
  } else {
    results.classList.remove('win')
  }
}

const loss = () => {
  lowOrHi.innerText = ' '
  results.classList.add('loss')
  results.innerText = 'Oops... You lost'
  guessField.disabled = true
  guessSubmit.setAttribute('disabled', 'disabled')
}
const win = () => {
  incTries()

  guessNumber.innerText = numbArr.slice(0, numbArr.length - 1).join(' ')
  const corrNum = document.createElement('span')
  corrNum.classList.add('container__text', 'win')
  corrNum.innerText = ' ' + randomNumber
  guessNumber.appendChild(corrNum)

  lowOrHi.innerText = ' '
  lowOrHi.classList.remove('no-correct')
  lowOrHi.classList.add('correct')
  guessField.disabled = true

  results.classList.add('win')
  results.innerText = 'Congratulations! You win.'
  guessSubmit.setAttribute('disabled', 'disabled')
}
const incTries = () => {
  --guessCount
  guessTries.innerText = guessCount
}

const more = () => {
  incTries()
  lowOrHi.classList.add('no-correct')
  lowOrHi.innerText = 'More!'
}

const less = () => {
  incTries()
  lowOrHi.classList.add('no-correct')
  lowOrHi.innerText = 'Less!'
}

const gameGuess = () => {
  const userGuess = Number(guessField.value)
  if (guessCount !== 0) {
    if (userGuess <= 100 && userGuess >= 1) {
      numbArr.push(`${userGuess}`)

      guessNumber.innerText = numbArr.join(' ')
      guessField.value = ''

      if (userGuess > randomNumber) {
        less()
      } else if (userGuess < randomNumber) {
        more()
      } else {
        win()
      }
    }
  }
  if ((guessCount === 0) & (userGuess !== randomNumber)) {
    loss()
  }

  if (guessCount < 10 || userGuess === randomNumber) {
    guessReset.classList.remove('reset')
  }

  guessField.focus()
}

guessSubmit.addEventListener('click', () => {
  gameGuess()
})

guessReset.addEventListener('click', () => {
  reset()
})
