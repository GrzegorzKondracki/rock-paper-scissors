const game = {
    playerHand: '',
    aiHand: '',
}

const gameSummary = {
    numbers: 0,
    wins: 0,
    losses: 0,
    draws: 0,
}

const hands = [...document.querySelectorAll('.images img')];

function aiHand() {
    return hands[Math.floor(Math.random() * 3)].dataset.option;
};

function selectedHand() {
    game.playerHand = this.dataset.option
    hands.forEach(hand => hand.style.boxShadow = '');
    this.style.boxShadow = '0 0 5px 5px cornflowerblue';
}

function checkResult(player, ai) {
    if (player == ai) {
        return 'draw';
    } else if ((player == 'papier' && ai == 'kamień') || (player == 'kamień' && ai === 'nożyce') || (player == 'nożyce' && ai == 'papier')) {
        return 'win';
    } else { return 'loss' }
}

function publishResult(player, ai, result) {
    document.querySelector('[data-summary="your-choice"]').textContent = player;

    document.querySelector('[data-summary="ai-choice"]').textContent = ai;

    document.querySelector('p.numbers span').textContent = ++gameSummary.numbers;

    if (result === "win") {
        document.querySelector('p.wins span').textContent = ++gameSummary.wins;
        document.querySelector('[data-summary="who-win"]').textContent = "Ty!"
        document.querySelector('[data-summary="who-win"]').style.color = "green";
    } else if (result === "loss") {
        document.querySelector('p.losses span').textContent = ++gameSummary.losses;
        document.querySelector('[data-summary="who-win"]').textContent = "Komputer"
        document.querySelector('[data-summary="who-win"]').style.color = "red";
    } else {
        document.querySelector('p.draws span').textContent = ++gameSummary.draws;
        document.querySelector('[data-summary="who-win"]').textContent = "Remis"
        document.querySelector('[data-summary="who-win"]').style.color = "gray";
    }
}

function endGame() {
    document.querySelector(`[data-option="${game.playerHand}"]`).style.boxShadow = "";
    game.playerHand = '';
    game.aiHand = '';
}

function startGame() {
    if (!game.playerHand) {
        return alert('wybierz dłoń!');
    }
    game.aiHand = aiHand();
    const gameResult = checkResult(game.playerHand, game.aiHand);
    publishResult(game.playerHand, game.aiHand, gameResult);
    endGame();
}

hands.forEach((hand) => {
    hand.addEventListener('click', selectedHand)
});

document.querySelector('button').addEventListener('click', startGame);

