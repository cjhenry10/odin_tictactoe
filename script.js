const game = (() => {
    let gameBoard = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];
    const getGameBoard = () => gameBoard;
    const resetBoard = () => {gameBoard = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];}
    const changeCell = (i, symbol) => {
        if (gameBoard[i] != "X" && gameBoard[i] != "O") {
            gameBoard[i] = symbol;
        }
    }
    const gameElement = document.getElementById("game");
    const gameOver = document.getElementById("play-again");
    const start = () => {
        turn = null;
        while (gameElement.firstChild) {
            gameElement.removeChild(gameElement.firstChild);
        }
        while (gameOver.firstChild) {
            gameOver.removeChild(gameOver.firstChild);
        }
        for (let i = 0; i < 9; i++) {
            let newCell = document.createElement("div");
            newCell.classList.add("col-4");
            newCell.classList.add("game-active");
            newCell.id = `${i}`;
            newCell.onclick = () => {
                if (turn != 1 && newCell.textContent == "") {
                    player1.takeTurn(i);
                    newCell.textContent = player1.symbol;
                    game.checkWinner(player1.symbol);
                }
                else if (turn != 2 && newCell.textContent == "") {
                    player2.takeTurn(i);
                    newCell.textContent = player2.symbol;
                    game.checkWinner(player2.symbol);
                }
            }
            gameElement.appendChild(newCell);
        }
    }

    const handleWinner = (symbol) => {
        let cells = gameElement.childNodes;
        cells.forEach((cell) => {
            cell.onclick = null;
            if (cell.classList) {
                cell.classList.remove("game-active");
            }
        } )
        let winMessage = document.createElement("p");
        winMessage.textContent = `${symbol} wins!`
        let playAgain = document.createElement("button");
        playAgain.textContent = "Play Again";
        playAgain.onclick = () => {
            resetBoard();
            start();
        }
        gameOver.appendChild(winMessage);
        gameOver.appendChild(playAgain);
    }

    const checkWinner = (symbol) => {
        switch (true) {
            case (gameBoard[0] === symbol):
                switch (true) {
                    case (gameBoard[1] === symbol && gameBoard[2] === symbol):
                        console.log(`${symbol} is the winner!`);
                        handleWinner(symbol);
                        break;
                    case (gameBoard[3] === symbol && gameBoard[6] === symbol):
                        console.log(`${symbol} is the winner!`);
                        handleWinner(symbol);
                        break;
                    default:
                        console.log("no winner yet");
                        break;
                }
                // break;
            case (gameBoard[8] === symbol):
                switch (true) {
                    case (gameBoard[7] === symbol && gameBoard[6] === symbol):
                        console.log(`${symbol} is the winner!`);
                        handleWinner(symbol);
                        break;
                    case (gameBoard[5] === symbol && gameBoard[2] === symbol):
                        console.log(`${symbol} is the winner!`);
                        handleWinner(symbol);
                        break;
                }
                // break;
            case (gameBoard[4] === symbol):
                switch (true) {
                    case (gameBoard[0] === symbol && gameBoard[8] === symbol):
                        console.log(`${symbol} is the winner!`);
                        handleWinner(symbol);
                        break;
                    case (gameBoard[2] === symbol && gameBoard[6] === symbol):
                        console.log(`${symbol} is the winner!`);
                        handleWinner(symbol);
                        break;
                    case (gameBoard[7] === symbol && gameBoard[1] === symbol):
                        console.log(`${symbol} is the winner!`);
                        handleWinner(symbol);
                        break;
                    case (gameBoard[3] === symbol && gameBoard[5] === symbol):
                        console.log(`${symbol} is the winner!`);
                        handleWinner(symbol);
                        break;
                }
                break;
            default:
                console.log("no winner yet");
        }
    }

    return {
        getGameBoard,
        resetBoard,
        changeCell,
        start,
        checkWinner
    };
})();

let turn = null;
const player = (id, symbol) => {
    const takeTurn = (i) => {
        if (id != turn) {
            if (game.getGameBoard()[i] != "X" && game.getGameBoard()[i] != "O") {
                game.changeCell(i, symbol);
                turn = id;
                console.log(`turn ${turn}. player ${id} just went`);
            }
            else console.log("space in use");
        }
        else console.log("not your turn");
    }
    // const turnHandler = () => {
    //     turn = this.id;
    // }
    return {id, symbol, takeTurn}
}

const player1 = player(1, "X");
const player2 = player(2, "O");





game.start();