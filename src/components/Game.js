import React from "react";
import Board from "./Board";
import {calculateWinner} from "../domain/winner";

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true
        }
    }

    handleClick(i){
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length -1];
        const squares = [...current.squares];

        if(calculateWinner(squares) || squares[i]){
            return;
        }
        squares[i] = this.nextPlayer;
        this.setState({
            history: [...history, ...[{squares}]],
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        })
    }

    jumpTo(step){
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        })
    }

    status(squares){
        const winner = calculateWinner(squares);
        return winner ?
            `Winner ${winner}` :
            `Next player ${this.nextPlayer}`;
    }


    get nextPlayer(){
        return this.state.xIsNext ? 'X' : '0';
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const status = this.status(current.squares);
        const moves = history.map((step, move) => {
            const description = move ?
                `Go to move #${move}` :
                `Go to game start`;
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{description}</button>
                </li>
            );
        });
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

export default Game;
