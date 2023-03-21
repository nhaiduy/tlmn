const scoreForm = document.getElementById('scoreForm');
const scoreInputs = [document.getElementById('player1'), document.getElementById('player2'), document.getElementById('player3'), document.getElementById('player4')];
const playerNameInputs = [document.getElementById('playerName1'), document.getElementById('playerName2'), document.getElementById('playerName3'), document.getElementById('playerName4')];
const playerLabels = [document.getElementById('playerLabel1'), document.getElementById('playerLabel2'), document.getElementById('playerLabel3'), document.getElementById('playerLabel4')];
const totalScores = [document.getElementById('totalPlayer1'), document.getElementById('totalPlayer2'), document.getElementById('totalPlayer3'), document.getElementById('totalPlayer4')];
const totalPlayerLabels = [
    document.getElementById('totalPlayerLabel1'),
    document.getElementById('totalPlayerLabel2'),
    document.getElementById('totalPlayerLabel3'),
    document.getElementById('totalPlayerLabel4')
];
const scoreHistory = document.querySelector('#scoreHistory tbody');
const roundTotal = document.createElement('div');
document.body.insertBefore(roundTotal, scoreForm.nextSibling);
let roundNumber = 1;

// Update player names when the input fields change
for (let i = 0; i < 4; i++) {
    playerNameInputs[i].addEventListener('input', function () {
        playerLabels[i].textContent = playerNameInputs[i].value || `Player ${i + 1}`;
        scoreInputs[i].previousElementSibling.textContent = playerNameInputs[i].value || `Player ${i + 1} Score`;
        totalPlayerLabels[i].textContent = playerNameInputs[i].value || `Player ${i + 1}`;
    });
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
            totalScores[i].textContent = parseInt(totalScores[i].textContent) + scores[i];
        }

        // Add score history
        const newRow = scoreHistory.insertRow();
        newRow.insertCell(0).textContent = roundNumber++;
        for (let i = 0; i < 4; i++) {
            const newCell = newRow.insertCell(i + 1);
            newCell.textContent = scores[i];
            newCell.contentEditable = true;
            newCell.dataset.oldValue = scores[i];
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

scoreHistory.addEventListener('input', function (event) {
    const target = event.target;
    if (target.tagName === 'TD') {
        const rowIndex = target.parentNode.rowIndex - 1;
        const cellIndex = target.cellIndex - 1;
        const oldValue = parseInt(target.dataset.oldValue) || 0;
        const newValue = parseInt(target.textContent) || 0;
        totalScores[cellIndex].textContent = parseInt(totalScores[cellIndex].textContent) - oldValue + newValue;
        target.dataset.oldValue = newValue;
    }
});
