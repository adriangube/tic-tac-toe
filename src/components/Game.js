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
            xIsNext: true
        }
    }

    handleClick(i){
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = [...current.squares];

        if(calculateWinner(squares) || squares[i]){
            return;
        }
        squares[i] = this.nextPlayer;
        this.setState({
            history: [...history, ...[{squares}]],
            xIsNext: !this.state.xIsNext
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
        const current = history[history.length - 1];
        const status = this.status(current.squares);
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
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

export default Game;
