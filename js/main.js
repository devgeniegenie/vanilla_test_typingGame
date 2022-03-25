const GAME_TIME = 9
let score = 0;
let time = GAME_TIME;
let isPlaying = false;
let timeInterval;
let words = [];
let checkInterval;

const wordInput = document.querySelector('.word-input');
const wordDisplay = document.querySelector('.word-display');
const scoreDisplay = document.querySelector('.score');
const timeDisplay = document.querySelector('.time');
const button = document.querySelector('.button');

init();

function init() {
    buttonChange('게임 로딩중...')
    getWords()
    wordInput.addEventListener('input', checkMatch)
}

function checkStatus() {
    if (!isPlaying && time === 0) {
        isPlaying = false
        buttonChange("게임시작")
        clearInterval(checkInterval)
    }
}

function checkMatch() {
    if (wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()) {
        wordInput.value = ""
        if (!isPlaying) {
            return
        }
        score++
        scoreDisplay.innerText = score;
        time = GAME_TIME
        const randomIndex = Math.floor(Math.random() * words.length)
        wordDisplay.innerText = words[randomIndex]
        console.log(words[randomIndex])
    }
}

function run() {
    if (isPlaying) {
        return
    }
    wordInput.value = ''
    isPlaying = true
    time = GAME_TIME
    wordInput.focus();
    scoreDisplay.innerText = 0
    timeInterval = setInterval(countDown, 1000)
    checkInterval = setInterval(checkStatus, 50)
    buttonChange('게임중')
}

function countDown() {
    time > 0 ? time-- : isPlaying = false
    if (!isPlaying) {
        clearInterval(timeInterval)
    }
    timeDisplay.innerText = time
}

function getWords() {
    axios({
        method: 'get',
        url: 'https://random-word-api.herokuapp.com/word?number=100',
    })
        .then((res) => {
            res.data.forEach((word) => {
                if (word.length < 7) {
                    words.push(word);
                }
                buttonChange('게임시작')
            })
            console.log(words)
        })
        .catch(error => {
            console.log(error)
        });
}

function buttonChange(text) {
    button.innerText = text
    text === '게임시작' ? button.classList.remove('loading')
        : button.classList.add('loading')
}

wordInput.addEventListener('input', checkMatch)

setInterval(countDown, 1000)
buttonChange('게임시작')
