const game = (function(){
    let gameBoard = [
        ["","",""],
        ["","",""],
        ["","",""],
    ];
    const player1Move = "X";
    const player2Move = "O";
    let currentMove = player1Move;
    let gameEndFlag = true;
    let moves = 0;

    const reset = () => {
        gameBoard = [
            ["","",""],
            ["","",""],
            ["","",""],
        ];
        gameEndFlag = false;
        currentMove = player1Move;
        moves = 0;
        display.reset();
    };

    const init = () => {
        display.init();
        reset();
    };

    const checkGameEnd = () => {
        let mainDiagonalStart = gameBoard[0][0];
        let mainDiagonalMatch = 1;
        for(let i=0;i<3;i++){
            let rowStart = gameBoard[i][0];
            let colStart = gameBoard[0][i];
            let rowMatch = 1;
            let colMatch =1;
            for(let j=1;j<3;j++){
                if(rowStart===gameBoard[i][j]) rowMatch++;
                if(colStart==gameBoard[j][i]) colMatch++;
                if(i===j && gameBoard[i][j]===mainDiagonalStart) mainDiagonalMatch++;
            }
            if(rowMatch===3){
                if(rowStart==="X") return 1;
                else if(rowStart==="O") return 2;
            }
            if(colMatch===3){
                if(colStart==="X") return 1;
                else if(colStart==="O") return 2;
            }
        }

        if(mainDiagonalMatch===3){
            if(mainDiagonalStart==="X") return 1;
            else if(mainDiagonalStart==="O") return 2;
        }

        if(gameBoard[0][2]===gameBoard[1][1] && gameBoard[1][1]===gameBoard[2][0]){
            if(gameBoard[0][2]==="X") return 1;
            else if(gameBoard[0][2]==="O") return 2;
        }

        if(moves===9) return 0;
    };

    const playRound = (move) => {
        const row = Math.floor(move/3);
        const col = (move)%3;

        if(!gameEndFlag && gameBoard[row][col]===""){
            display.renderMove(move,currentMove);
            gameBoard[row][col] = currentMove;
            moves++;

            if(currentMove===player1Move) currentMove = player2Move;
            else currentMove = player1Move;

            const status = checkGameEnd();

            if(status===0 || status===1 || status===2){
                gameEndFlag = true;
                display.renderResult(status);
            }
        }
    };

    return {init,reset,playRound};
})();

const display = (function(){
    const grid = document.querySelectorAll(".grid div");
    const overlay = document.querySelector(".overlay");
    const resultSection = document.querySelector(".overlay h2");

    const init = () => {
        for(let cell of grid){
            cell.addEventListener("click",(event)=>{
                const move = parseInt(event.target.id.split("-")[1])-1;
                game.playRound(move);
            });
        }
    };
    
    const reset = () => {
        for(let cell of grid){
            cell.textContent = "";
        }
    };

    const renderMove = (cellId,move) => {
        grid[cellId].textContent = move;
    }

    const renderResult = (status) => {
        if(status===0){
            resultSection.textContent = "Tie!"
        }
        else resultSection.textContent = `Player-${status} Wins!`;

        overlay.style.display = "flex";
    }

    return {init, reset, renderMove, renderResult};
})();

game.init();
