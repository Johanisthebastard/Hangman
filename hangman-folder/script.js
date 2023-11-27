import { easyPeasy, mediumSquezy, hardyParty } from "./wordselect.js";
import words from "./svenska-ord.js";
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
let hangWord = "" ;
play.addEventListener('click', () => {
    startPage.classList.add('invisible')
	gamePage.classList.remove('invisible')
    const userName = document.querySelector("#userInput").value
    let difficulty = "";
    document.querySelectorAll(`input[name="level"]`).forEach(input => {
        if (input.checked) {
            difficulty = input.value
        }
    })
    const theDateData = new Date()
    const userHighscore = {
        name: userName,
        date: theDateData,
        difficulty: difficulty,
        score: 0,
        hints: false
    }
    if (difficulty === "easy") {
        hangWord = easyPeasy(words)
    }
    else if (difficulty === "medium") {
        hangWord = mediumSquezy(words)
    }
    else if (difficulty === "hard") {
        hangWord = hardyParty(words)
    }
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







