
/*

---- TO DO ------

1. Länka Play knappen så att det sparar username + nivå samt bytter section(ändrar css klass till Display: none)


*/

//Knapp som döljer första sidan
//Saknar: Spara ner värdet
const startPage = document.querySelector('#startSection')
const gamePage = document.querySelector('#gamePage')
const scorePage = document.querySelector('#highScorePage')


const play = document.querySelector('#play-btn')



// const gubbe = document.querySelector('.gubbe')

play.addEventListener('click', () => {

	startPage.classList.add('invisible')
	gamePage.classList.remove('invisible')

	//Osäker på dessa men en skiss
	// localStorage.setItem("Name", input.name);
	// localStorage.setItem("Level", input.level);

})


// Game > Highscore Page
const scoreButton = document.querySelector('#highScore-btn')
scoreButton.addEventListener('click', () => {

	gamePage.classList.add('invisible')
	highScorePage.classList.remove('invisible')

})

// Highscore > Game Page (toggle back?)

const backToGame = document.querySelector('#backToGameBtn')
backToGame.addEventListener('click', () => {

	highScorePage.classList.add('invisible')
	gamePage.classList.remove('invisible')

})





const svgElement = document.querySelector('.gubbe svg');
const ground = svgElement.querySelector('#ground');
const scaffold = svgElement.querySelector('#scaffold');
const head = svgElement.querySelector('#head');
const body = svgElement.querySelector('#body');
const arms = svgElement.querySelector('#arms');
const legs = svgElement.querySelector('#legs');

const parts = [ground, scaffold, head, body, arms, legs];
let currentIndex = 0; // Håller reda på vilken del som visas näst


// Döljer gubbben från start
parts.forEach(part => part.classList.add('invisible'));

// Varje klick lägger till en kroppsdel
killBtn = document.querySelector('#kill-btn')
killBtn.addEventListener('click', () => {

    // Visa nuvarande del
    if (currentIndex < parts.length) {
        parts[currentIndex].classList.remove('invisible');
        currentIndex++; // Öka indexet för nästa klick

    } else {
        // Återställ indexet om alla delar har visats
        parts.forEach(part => part.classList.add('invisible'));
        currentIndex = 0;
    }
});







