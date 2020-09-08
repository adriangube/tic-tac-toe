import React from "react";
import Square from "./Square";
import {calculateWinner} from "../domain/winner";

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true
        }
    }

    handleClick(i){
        const squares = [...this.state.squares];
        if(calculateWinner(squares) || squares[i]){
            return;
        }
        squares[i] = this.nextPlayer;
        this.setState({
            squares,
            xIsNext: !this.state.xIsNext
        })
    }

    renderSquare(i) {
        return (
            <Square
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
            />
        );
    }

    get nextPlayer(){
        return this.state.xIsNext ? 'X' : '0';
    }

    get status(){
        const winner = calculateWinner(this.state.squares);
        console.log({winner, squares: this.state.squares})
        return winner ?
            `Winner ${winner}` :
            `Next player ${this.nextPlayer}`;

    }

    render() {
        return (
            <div>
                <div className="status">{this.status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

export default Board;
