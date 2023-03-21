const playerNameInputs = [
    document.getElementById('playerName1'),
    document.getElementById('playerName2'),
    document.getElementById('playerName3'),
    document.getElementById('playerName4')
];

const playerLabels = [
    document.getElementById('playerLabel1'),
    document.getElementById('playerLabel2'),
    document.getElementById('playerLabel3'),
    document.getElementById('playerLabel4')
];

const totalScores = [
    document.getElementById('totalScore1'),
    document.getElementById('totalScore2'),
    document.getElementById('totalScore3'),
    document.getElementById('totalScore4')
];

const scoreForm = document.getElementById('scoreForm');
const scoreHistory = document.getElementById('scoreHistory');
let roundNumber = 1;

playerNameInputs.forEach((input, index) => {
    input.addEventListener('input', () => {
        playerLabels[index].textContent = input.value || 'Player ' + (index + 1);
        totalScores[index].querySelector('#totalPlayerLabel' + (index + 1)).textContent = input.value || 'Player ' + (index + 1);
    });
});

scoreForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const scores = [
        parseInt(document.getElementById('player1').value),
        parseInt(document.getElementById('player2').value),
        parseInt(document.getElementById('player3').value),
        parseInt(document.getElementById('player4').value)
    ];

    // Update total scores
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
        newCell.dataset.oldValue = scores[i]; // Save the old value
    }

    // Reset form
    scoreForm.reset();
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
