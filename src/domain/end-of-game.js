import {calculateWinner} from "./winner";

export const calculateIfGameIsOver = (squares) => {
    if(calculateWinner(squares)){
        return true;
    }
    let gameIsOver = true;
    for(let i = 0; i < 8; i++){
        if(squares[i] === null){
            gameIsOver = false;
        }
    }
    return gameIsOver;
}
