const gameWords = [
        { "id": 1, "word": "Planet", "hint": "Orbits a star." },
        { "id": 2, "word": "Bridge", "hint": "Connects two places over a gap." },
        { "id": 3, "word": "Ocean", "hint": "A vast body of saltwater." },
        { "id": 4, "word": "Mountain", "hint": "A high, rocky landform." },
        { "id": 5, "word": "Library", "hint": "A place filled with books." },
        { "id": 6, "word": "Galaxy", "hint": "A system of stars and planets." },
        { "id": 7, "word": "Pyramid", "hint": "An ancient triangular structure." },
        { "id": 8, "word": "Desert", "hint": "A dry, sandy area with little rain." },
        { "id": 9, "word": "Volcano", "hint": "Erupts with lava and ash." },
        { "id": 10, "word": "Compass", "hint": "Helps you find direction." },
        { "id": 11, "word": "Clock", "hint": "Tells the time." },
        { "id": 12, "word": "Rainbow", "hint": "A colorful arc in the sky." },
        { "id": 13, "word": "Candle", "hint": "Provides light when burned." },
        { "id": 14, "word": "Guitar", "hint": "A musical instrument with strings." },
        { "id": 15, "word": "Elephant", "hint": "A large animal with a trunk." },
        { "id": 16, "word": "Telescope", "hint": "Used to see distant objects." },
        { "id": 17, "word": "Bicycle", "hint": "A two-wheeled mode of transport." },
        { "id": 18, "word": "Rocket", "hint": "Travels to space." },
        { "id": 19, "word": "Jungle", "hint": "A dense, tropical forest." },
        { "id": 20, "word": "Castle", "hint": "A large, fortified building." },
        { "id": 21, "word": "Cloud", "hint": "Floats in the sky and holds water." },
        { "id": 22, "word": "Tunnel", "hint": "A passageway through the ground." },
        { "id": 23, "word": "Island", "hint": "A land surrounded by water." },
        { "id": 24, "word": "Satellite", "hint": "Orbits planets and collects data." },
        { "id": 25, "word": "Train", "hint": "Runs on tracks to transport people." },
        { "id": 26, "word": "Whale", "hint": "A giant sea mammal." },
        { "id": 27, "word": "Cave", "hint": "A hollow space in a rock or hill." },
        { "id": 28, "word": "Lighthouse", "hint": "Guides ships with its light." },
        { "id": 29, "word": "Meteor", "hint": "A space rock that burns in the sky." },
        { "id": 30, "word": "Pencil", "hint": "Used for writing or drawing." },
        { "id": 31, "word": "River", "hint": "A flowing body of water." },
        { "id": 32, "word": "Map", "hint": "Shows locations and directions." },
        { "id": 33, "word": "Ferris Wheel", "hint": "A giant rotating amusement ride." },
        { "id": 34, "word": "Submarine", "hint": "Travels under the ocean." },
        { "id": 35, "word": "Statue", "hint": "A carved or cast figure." },
        { "id": 36, "word": "Moon", "hint": "Orbits a planet at night." },
        { "id": 37, "word": "Waterfall", "hint": "Water flows down from a height." },
        { "id": 38, "word": "Chimney", "hint": "Releases smoke from a house." },
        { "id": 39, "word": "Scarecrow", "hint": "Placed in fields to scare birds." },
        { "id": 40, "word": "Lantern", "hint": "A portable light source." },
        { "id": 41, "word": "Dolphin", "hint": "A smart marine animal." },
        { "id": 42, "word": "Caravan", "hint": "A mobile home on wheels." },
        { "id": 43, "word": "Clocktower", "hint": "A tall building with a clock." },
        { "id": 44, "word": "Igloo", "hint": "A dome-shaped snow house." },
        { "id": 45, "word": "Harbor", "hint": "A dock for ships and boats." },
        { "id": 46, "word": "Ferrari", "hint": "A luxury sports car brand." },
        { "id": 47, "word": "Parachute", "hint": "Slows down falling speed." },
        { "id": 48, "word": "Windmill", "hint": "Generates power from the wind." },
        { "id": 49, "word": "Sculpture", "hint": "An artistic 3D object." },
        { "id": 50, "word": "Glacier", "hint": "A massive frozen river of ice." }
];

const alphabet = [
    'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',
    'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l',
    'z', 'x', 'c', 'v', 'b', 'n', 'm'
];

const allowedKeys = ['KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM']

class Game {
    constructor() {
        this.wordObj = gameWords[Math.floor(Math.random() * gameWords.length)];
        this.word = this.wordObj.word;
        this.hint = this.wordObj.hint;
        this.secretWord = this.word.split('').map(() => '_');
        this.guesses = [];
        this.wrongGuesses = [];
        this.wrongCount = 0;
        this.maxWrongCount = 6;
        this.foundWord = []
    }

    generateImg(parentEl) {
        for (let i = 1; i <= this.maxWrongCount; i++) {
            let images = document.createElement('img');
            images.setAttribute('class', `hangman-${i}`)
            images.setAttribute('src', `./source/hangman-${i}.png`)
            images.setAttribute('alt', `hangman-${i}`)
            parentEl.appendChild(images)
        }
    }

    generateSecretLetters(parentEl) {
        this.word.split('').forEach(letter => {
            let secretLetter = document.createElement('p')
            secretLetter.setAttribute('class', 'shift-key')
            secretLetter.innerText = '_'
            parentEl.appendChild(secretLetter)
        });
    }

    getHint(parentEl) {
        parentEl.innerHTML = `<b>Hint: </b>${this.hint}`
    }

    generateKeyboard(parentEl) {
        alphabet.forEach(letter => {
            let keyboardLetter = document.createElement('li')
            keyboardLetter.setAttribute('id', `Key${letter.toUpperCase()}`)
            keyboardLetter.setAttribute('class', 'key')
            keyboardLetter.innerText = letter
            parentEl.appendChild(keyboardLetter)
        });
    }

    keyboardClicked(letter) {
        if (this.guesses.includes(letter) || this.wrongGuesses.includes(letter)) {
            return;
        }
        if (!allowedKeys.includes(`Key${letter.toUpperCase()}`)) {
            return;
        }
        const liElements = document.querySelectorAll('.key');
        liElements.forEach((li) => {
            if (li.id == `Key${letter.toUpperCase()}`) {
                li.style.backgroundColor = '#778da9';
            }
        })
        if (this.word.toLowerCase().includes(letter)) {
            this.guesses.push(letter)
            this.revealLetter(letter)
            this.checkForFullWord()
        } else {
            this.wrongCount++
            this.wrongGuesses.push(letter)
            this.updateHangmanImage()
            this.updateCounter(wordsContainer)
        }
        if (this.wrongCount === this.maxWrongCount) {
            this.endGame(false)
        }
    }

    revealLetter(letter) {
        const shiftKeys = document.querySelectorAll('.shift-key');
        this.word.split('').forEach((char, index) => {
            if (char.toLowerCase() === letter) {
                shiftKeys[index].innerText = char;
            }
        });
    }

    checkForFullWord() {
        const wordCont = document.getElementById('secret-key-container')
        if ([...wordCont.querySelectorAll(".shift-key")].every(li => li.innerText !== "_")) {
            this.endGame(true);
        }
    }

    updateCounter() {
        counter.innerHTML = `Wrong Letters:<span style='color:red'> ${this.wrongCount}/${this.maxWrongCount}</span>`

    }

    updateHangmanImage() {
        const images = document.querySelectorAll('.hangman-container img');
        images.forEach((img, index) => {
            img.style.opacity = index < this.wrongCount + 1 ? '1' : '0';
        });
    }

    showModal(message) {
        const modalText = document.getElementById('message');
        const modal = document.getElementById("modal");
        const overlay = document.getElementById("overlay");
        modalText.innerText = message;
        modal.classList.remove("hidden");
        overlay.classList.remove("hidden");
    }

    endGame(won) {
        const message = won ? "Congratulations! You've won!" : `Game Over! The correct word was ${this.word}`;
        this.showModal(message)
        document.addEventListener('click', (event) => {
            if (event.target.classList.contains('btn')) {
                modal.classList.add("hidden");
                overlay.classList.add("hidden");
                this.showModal('')
                this.resetGame()
            }
        })
    }

    resetGame() {
        window.location.reload();
    }
}

const game = new Game();

// UI
let heading = document.createElement('h1');
heading.innerHTML = 'Hangman Game';
heading.style.textAlign = 'center';
heading.style.fontSize = '40px';
document.body.appendChild(heading);

let container = document.createElement('div');
container.setAttribute('class', 'container');
document.body.appendChild(container);

let leftContainer = document.createElement('div');
leftContainer.setAttribute('class', 'left-container');
container.appendChild(leftContainer);

let hangmanContainer = document.createElement('div');
hangmanContainer.setAttribute('class', 'hangman-container');
hangmanContainer.style.width = '400px'
hangmanContainer.setAttribute('id', 'hangman-container');
leftContainer.appendChild(hangmanContainer);

let pillarImg = document.createElement('div');
pillarImg.setAttribute('class', 'pillar');
hangmanContainer.appendChild(pillarImg);
pillarImg.innerHTML = '<img src="./source/pillar.png" alt="pillar" />'

//Generate Images
game.generateImg(hangmanContainer);

let rightContainer = document.createElement('div');
rightContainer.setAttribute('class', 'right-container');
container.appendChild(rightContainer);

let wordsContainer = document.createElement('div');
wordsContainer.setAttribute('class', 'words-container');
rightContainer.appendChild(wordsContainer);

let secretWordContainer = document.createElement('div');
secretWordContainer.setAttribute('class', 'secret-key-container');
secretWordContainer.setAttribute('id', 'secret-key-container');
wordsContainer.appendChild(secretWordContainer);

//generate secret letters 
game.generateSecretLetters(secretWordContainer);

//Get hint
let hint = document.createElement('h2');
hint.setAttribute('id', 'hint');
wordsContainer.appendChild(hint);

game.getHint(hint);

let counter = document.createElement('h3')
counter.setAttribute('class', 'counter')
wordsContainer.appendChild(counter)
game.updateCounter(wordsContainer)

let keyboardContainer = document.createElement('div');
keyboardContainer.setAttribute('class', 'keyboard-container');
keyboardContainer.setAttribute('id', 'keyboard-container');
rightContainer.appendChild(keyboardContainer);
//generate keyboard 
game.generateKeyboard(keyboardContainer);

document.addEventListener('keydown', (event) => {
    const pressedKey = event.key.toLowerCase();
    game.keyboardClicked(pressedKey);

});

document.querySelectorAll('.key').forEach(key => {
    key.addEventListener('click', () => {
        game.keyboardClicked(key.innerText);
    });
});



let modal = document.createElement('div')
modal.setAttribute('class', 'modal-section')

modal.innerHTML = `  
    <div id="modal" class="modal hidden">
        <div>
            <h3 id='message'></h3>
        </div>
        <button class="btn">Play Again</button>
  </div> 
  <div id='overlay' class="overlay hidden"></div>`

document.body.appendChild(modal)



