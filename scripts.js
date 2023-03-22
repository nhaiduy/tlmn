const scoreForm = document.getElementById('scoreForm');
const scoreInputs = [document.getElementById('player1'), document.getElementById('player2'), document.getElementById('player3'), document.getElementById('player4')];
const playerNameInputs = [document.getElementById('playerName1'), document.getElementById('playerName2'), document.getElementById('playerName3'), document.getElementById('playerName4')];
const playerLabels = {
    total: [
      document.querySelector('#totalPlayer1 #playerLabel1'),
      document.querySelector('#totalPlayer2 #playerLabel2'),
      document.querySelector('#totalPlayer3 #playerLabel3'),
      document.querySelector('#totalPlayer4 #playerLabel4'),
    ],
    history: [
      document.querySelector('#scoreHistory thead #playerLabel1'),
      document.querySelector('#scoreHistory thead #playerLabel2'),
      document.querySelector('#scoreHistory thead #playerLabel3'),
      document.querySelector('#scoreHistory thead #playerLabel4'),
    ],
    round: [
      document.querySelector('#player1wrapper label'),
      document.querySelector('#player2wrapper label'),
      document.querySelector('#player3wrapper label'),
      document.querySelector('#player4wrapper label'),
    ],
};
const totalScores = [document.getElementById('totalPlayer1'), document.getElementById('totalPlayer2'), document.getElementById('totalPlayer3'), document.getElementById('totalPlayer4')];
const scoreHistory = document.querySelector('#scoreHistory tbody');
const roundTotal = document.createElement('div');
document.body.insertBefore(roundTotal, scoreForm.nextSibling);
let roundNumber = 1;

// Update player names when the input fields change
function updatePlayerNames() {
    for (let i = 0; i < 4; i++) {
        const playerName = playerNameInputs[i].value || `Player ${i + 1}`;
        playerLabels.total[i].textContent = playerName;
        playerLabels.history[i].textContent = playerName;
        playerLabels.round[i].textContent = `${playerName}:`;
    }
}

for (let i = 0; i < 4; i++) {
    playerNameInputs[i].addEventListener('input', updatePlayerNames);
}

// Display the total sum of this round's points
function updateRoundTotal() {
    const scores = scoreInputs.map(input => parseInt(input.value) || 0);
    const sum = scores.reduce((a, b) => a + b, 0);
    roundTotal.textContent = `Round Total: ${sum}`;
}

for (let i = 0; i < 4; i++) {
    scoreInputs[i].addEventListener('input', updateRoundTotal);
}

// Handle score submission
scoreForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const scores = scoreInputs.map(input => parseInt(input.value) || 0);
    const sum = scores.reduce((a, b) => a + b, 0);

    if (sum === 0) {
        for (let i = 0; i < 4; i++) {
            const currentScore = parseInt(playerLabels.total[i].textContent.split(':')[1]) || 0;
            playerLabels.total[i].textContent = `${playerNameInputs[i].value || `Player ${i + 1}`}: ${currentScore + scores[i]}`;
        }    

        // Add score history
        const newRow = scoreHistory.insertRow();
        newRow.insertCell(0).textContent = roundNumber++;
        for (let i = 0; i < 4; i++) {
            newRow.insertCell(i + 1).textContent = scores[i];
        }

        // Reset input fields
        for (let i = 0; i < 4; i++) {
            scoreInputs[i].value = '';
        }
        
        // Clear the round total
        roundTotal.textContent = '';

    } else {
        alert('The sum of scores should be zero. Please double-check your inputs.');
    }
});