// Words
let gameWords = [
    { "id": 1, "word": "Planet", "hint": "Orbits a star." },
    { "id": 2, "word": "Bridge", "hint": "Connects two places over a gap." },
    { "id": 3, "word": "Jungle", "hint": "A dense forest with tropical plants." },
    { "id": 4, "word": "Knight", "hint": "A medieval warrior." },
    { "id": 5, "word": "Tunnel", "hint": "A passageway through or under something." },
    { "id": 6, "word": "Puzzle", "hint": "A brain-teasing game or problem." },
    { "id": 7, "word": "Anchor", "hint": "Used to hold a ship in place." },
    { "id": 8, "word": "Falcon", "hint": "A fast bird of prey." },
    { "id": 9, "word": "Island", "hint": "Land surrounded by water." },
    { "id": 10, "word": "Crystal", "hint": "A shiny, transparent mineral." },
    { "id": 11, "word": "Canyon", "hint": "A deep valley with steep sides." },
    { "id": 12, "word": "Safari", "hint": "An adventure to see wild animals." },
    { "id": 13, "word": "Cactus", "hint": "A spiky desert plant." },
    { "id": 14, "word": "Comet", "hint": "A celestial object with a glowing tail." },
    { "id": 15, "word": "Pirate", "hint": "A thief of the seas." },
    { "id": 16, "word": "Rocket", "hint": "Launches into space." },
    { "id": 17, "word": "Castle", "hint": "A medieval fortress." },
    { "id": 18, "word": "Helmet", "hint": "Protects your head." },
    { "id": 19, "word": "Mirror", "hint": "Reflects your image." },
    { "id": 20, "word": "Lantern", "hint": "A portable light source." }
]
let gameWord = gameWords[Math.floor(Math.random() * gameWords.length)];

let wordsCont = document.createElement('div');
wordsCont.setAttribute('class', 'words-container container');
document.body.appendChild(wordsCont);

let actualWord = document.createElement('p')
actualWord.innerHTML = gameWord.word
actualWord.setAttribute('id', 'word');
wordsCont.appendChild(actualWord)

let word = gameWord.word.toLowerCase()
let guessedWord = '_'.repeat(word.length).split("").join(' ')
let secretKeyCont = document.createElement('div')
secretKeyCont.setAttribute('class', 'secret-key-cont')
wordsCont.appendChild(secretKeyCont)
for (let i = 0; i < word.length; i++) {
    let secret = document.createElement('p')
    secret.setAttribute('id', `${word[i]}`);
    secret.setAttribute('class', `shift-key`);
    secret.innerText = '_'
    secretKeyCont.appendChild(secret)
}

document.addEventListener('keydown', (event) => {
    const pressedKey = event.key.toLowerCase();
    const shiftKeys = document.querySelectorAll('.shift-key');
    shiftKeys.forEach((letter, index) => {
        if (letter.getAttribute('id') == pressedKey) {
            shiftKeys[index].innerText = pressedKey
        }
    })
    // counterIncrement()
});

let hintWord = document.createElement('h2')
hintWord.innerHTML = `<span>Hint: </span>${gameWord.hint}`
wordsCont.appendChild(hintWord)

let incorrectWords = document.createElement('h3')
incorrectWords.innerHTML = `Incorrect Words: <span style='color:red'> 0/6</span>`
wordsCont.appendChild(incorrectWords)


// Virtual Keyboard
let alphabet = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm']
];
let rightCont = document.createElement('div')
rightCont.setAttribute('class', 'right-container')
document.body.appendChild(rightCont)
let keyboardCont = document.createElement('div');
keyboardCont.setAttribute('class', 'keyboard-container container');
rightCont.appendChild(keyboardCont);

window.onload = () => {
    alphabet.forEach((row, keyIndex) => {
        const keyboardUl = document.createElement('ul');
        keyboardUl.setAttribute('class', 'keyboard-ul');
        keyboardUl.setAttribute('id', `row-${keyIndex}`);
        row.forEach((key) => {
            const listItem = document.createElement("li");
            listItem.setAttribute('id', `Key${key.toUpperCase()}`);
            listItem.setAttribute('class', `key`);
            listItem.textContent = `${key}`;
            keyboardUl.appendChild(listItem);

            listItem.addEventListener('click', () => {
                simulateKeyPress(key)
            })
        });

        keyboardCont.appendChild(keyboardUl);
    });

    function handleKeyEvent(event) {
        const pressedKey = event.key.toLowerCase()
        const shiftKeys = document.querySelectorAll('.shift-key');
        const liElements = document.querySelectorAll('.key');
        //highlight pressed key
        liElements.forEach((li) => {
            if (li.id == `Key${pressedKey.toUpperCase()}`) {
                li.style.backgroundColor = '#778da9';
            }
        })

        //reveal correct letter
        shiftKeys.forEach((letter) => {
            if (letter.getAttribute('id') === pressedKey) {
                letter.innerText = pressedKey;
            }
        });
    }

    //simulate key press for the virtual keyboard
    function simulateKeyPress(key) {
        handleKeyEvent({ key })
    }
};

//Physical Keyboard
let keyDown = document.addEventListener('keydown', (event) => {
    const liElements = document.querySelectorAll('.key');

    liElements.forEach((li) => {
        if (li.id == event.code) {
            li.style.backgroundColor = '#778da9';
        }
    })
});

// document.querySelector('.keyboard-container').appendChild(keyboardUl)

// function counterIncrement(event) {
//     let counter = 0
//     const shiftKeys = document.querySelectorAll('.shift-key');
//     shiftKeys.forEach((letter) => {
//         if (letter.getAttribute('id').includes(letter.innerText.toLowerCase())) {
//             console.log(letter.innerText)
//         } else {
//             console.log(counter++)
//         }
//     })
// }