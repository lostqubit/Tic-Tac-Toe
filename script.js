const players = (function(){
    let player1 = "Player-1";
    let player2 = "Player-2";

    const setNames =(name1,name2) => {
        if(name1!=="") player1 = name1;
        else player1 = "Player-1";
        if(name2!=="") player2 = name2;
        else player2 = "Player-2";
    };

    const getNames = () => {
        return [player1,player2];
    };

    return {setNames,getNames};
})();

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
        gameEndFlag = true;
        currentMove = player1Move;
        moves = 0;
        display.reset();
    };

    const startGame = () => {
        gameEndFlag = false;
    }

    const init = () => {
        display.init();
        reset();
        startGame();
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

    return {init,reset,startGame, playRound};
})();

const display = (function(){
    const grid = document.querySelectorAll(".grid div");
    const overlay = document.querySelector(".overlay");
    const resultSection = document.querySelector(".overlay h2");
    const playAgainButton = document.querySelector(".overlay button");

    let initFlag = false;
    
    const startButton = document.querySelector(".container button");
    const nameForm = document.querySelector("form");
    const p1Name = document.querySelector("#player-1");
    const p2Name = document.querySelector("#player-2");
    nameForm.addEventListener("submit", (event) => {
        event.preventDefault();
        if(startButton.textContent === "Start") {
            const data = new FormData(event.target);
            players.setNames(data.get("player-1"),data.get("player-2"));
            const names = players.getNames();
            p1Name.value = names[0];
            p2Name.value = names[1];
            p1Name.readOnly = true;
            p2Name.readOnly = true;
            p1Name.style.opacity = 0.5;
            p2Name.style.opacity = 0.5;
            if(initFlag===false) game.init();
            else{
                game.reset();
                game.startGame();
            }
            initFlag = true;
            startButton.textContent = "Clear";
        }
        else{
            p1Name.readOnly = false;
            p2Name.readOnly = false;
            p1Name.style.opacity = 1;
            p2Name.style.opacity = 1;
            game.reset();
            startButton.textContent = "Start";
        }
    });

    const init = () => {
        for(let cell of grid){
            cell.addEventListener("click",(event)=>{
                const move = parseInt(event.target.id.split("-")[1])-1;
                game.playRound(move);
            });
        }

        overlay.addEventListener("click",() => {
            overlay.style.display = "none";
        })

        playAgainButton.addEventListener("click",(event)=>{
            event.stopPropagation();
            overlay.style.display = "none";
            game.reset();
            startButton.textContent = "Start";
            p1Name.readOnly = false;
            p2Name.readOnly = false;
            p1Name.style.opacity = 1;
            p2Name.style.opacity = 1;
        });
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
        const playerNames = players.getNames();
        if(status===0){
            resultSection.textContent = "Tie!"
        }
        else if(status == 1) resultSection.textContent = `${playerNames[0]} Wins!`;
        else resultSection.textContent = `${playerNames[1]} Wins!`;

        overlay.style.display = "flex";
    }

    return {init, reset, renderMove, renderResult};
})();

