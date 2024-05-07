const game = (function(){
    let gameBoard = [];
    const player1Move = "X";
    const player2Move = "O";
    let currentMove = player1Move;
    let gameEndFlag = true;
    let moves = 0;

    const init = () => {
        gameBoard = [
            ["","",""],
            ["","",""],
            ["","",""],
        ];
        gameEndFlag = false;
        currentMove = player1Move;
        moves = 0;
    };

    const checkGameEnd = () => {
        if(moves===9) return 0;
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
    };

    const playRound = (move) => {
        const row = Math.floor(move/3);
        const col = move%3;

        if(!gameEndFlag && gameBoard[row][col]===""){
            gameBoard[row][col] = currentMove;
            moves++;

            if(currentMove===player1Move) currentMove = player2Move;
            else currentMove = player1Move;

            const status = checkGameEnd();

            if(status===1){
                gameEndFlag=true;
                console.log("Player 1 wins!");
            }
            else if(status === 2){
                gameEndFlag = true;
                console.log("Player 2 wins!");
            }
            else if(status===0){
                gameEndFlag=true;
                console.log("Tie!");
            }
            
            console.log(gameBoard);
        }
    };

    return {init,playRound};
})();


const display = (function(){
    
})();