 // function för att spara highscore till local storage
 function saveGameResult(username, wordLength, wrongGuesses, date, won) {
	const gameResults = JSON.parse(localStorage.getItem('gameResults')) || [];
	gameResults.push({ username, wordLength, wrongGuesses, date, won });
	gameResults.sort((a, b) => {
		if (a.wrongGuesses !== b.wrongGuesses) {
			return a.wrongGuesses - b.wrongGuesses;
		} else {
			return new Date(b.date) - new Date(a.date);
		}
	})
	localStorage.setItem('gameResults', JSON.stringify(gameResults));
}
// function för att visa game result på poängvyn
function displayGameResults(sortByDate) {
	const gameResultContainer = document.querySelector('.gameResult-container')
	const gameResults = JSON.parse(localStorage.getItem('gameResults')) || []
	gameResultContainer.innerHTML = '';

	if (sortByDate) {
		gameResults.sort((a, b) => new Date(b.date) - new Date(a.date))

	}
	gameResults.forEach((entry, index) => {
		const tableRow = document.createElement('tr')
		tableRow.innerHTML = `
    <th scope="row">${entry.username}</th>
    <td>${entry.wordLength}</td>
    <td>${entry.wrongGuesses}</td>
   <td>${new Date(entry.date).toLocaleString()}</td>
    <td>${entry.won ? 'Won' : 'Lost'}</td>
`;
		gameResultContainer.appendChild(tableRow)
	})
}
saveGameResult(playerName, wordLength, wrongGuesses, gameDate, gameWon)
displayGameResults(false)