let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;
let answer;
let reset = document.querySelector('.reset');
let home = document.querySelector('.home');
reset.hidden = true;



async function getWord() {
   
    const response = await fetch('https://random-word-api.herokuapp.com/all');
    const data = await response.json();
        index = Math.floor(Math.random() * data.length)
        answer = data[index];
        console.log(answer);
};

home.addEventListener('click', () => {
    window.location.href = '../index.html'
})

document.addEventListener('keydown', (event) => {
    const letter = event.key.toLowerCase();

    if (/^[a-z]$/.test(letter) && !document.getElementById(letter).disabled) {
        handleGuess(letter);
    }
});

function generateButtons() {
    let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter => 
        `<button class="btn" id="${letter}" onclick="handleGuess('${letter}')">
            ${letter}
        </button>`
    ).join('');

    document.querySelector('.btnCon').innerHTML = buttonsHTML;
};

function handleGuess(chosenLetter) {
    guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
    document.getElementById(chosenLetter).disabled = true;



    if (answer.indexOf(chosenLetter) >= 0) {
        guessedWord();
        checkWin();
    } else if (answer.indexOf(chosenLetter) === -1) {
        mistakes++;
        updateMistakes();
        checkLoss();
        updatePicture();
    }
};

function updatePicture() {
    document.querySelector('.hanging').src = `pics/${mistakes}.jpg`;
}


function checkWin() {
    if (wordStatus === answer) {
        reset.hidden = false;
        document.querySelector('.btnCon').textContent = "You Won!"
    }
}

function checkLoss() {
    if (mistakes === maxWrong) {
        document.querySelector('.wordSpotlight').textContent = `The Answer Was ${answer}`;
        reset.hidden = false;
        document.querySelector('.btnCon').textContent = "You Lost!"
    }
}


function guessedWord() {
    wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');

    document.querySelector('.wordSpotlight').textContent = wordStatus;
};

document.querySelector('.maxWrong').textContent = maxWrong;

function updateMistakes() {
    document.querySelector('.mistakes').textContent = mistakes;
}

reset.addEventListener('click', resetBTN);

function resetBTN() {
    mistakes = 0;
    guessed = [];
    document.querySelector('.hanging').src = 'pics/0.jpg';
    reset.hidden = true;

    getWord();
    guessedWord();
    updateMistakes();
    generateButtons();
}


generateButtons();
getWord();