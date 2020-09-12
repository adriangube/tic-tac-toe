import React, {Fragment} from "react";
import Board from "./Board";
import {calculateWinner} from "../domain/winner";
import blue from "@material-ui/core/colors/blue";
import red from "@material-ui/core/colors/red";
import ClearIcon from '@material-ui/icons/Clear';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import Button from "@material-ui/core/Button";
import ReplayIcon from '@material-ui/icons/Replay';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {calculateIfGameIsOver} from "../domain/end-of-game";
import GitHubIcon from '@material-ui/icons/GitHub';

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

    getPlayerIcon(player, fontSize= 50){
        return player === "X"
            ? <ClearIcon style={{ fontSize, color: blue[400] }}/>
            : <RadioButtonUncheckedIcon style={{ fontSize, color: red[400] }}/>
    }

    status(squares){
        const winner = calculateWinner(squares);
        const tiedGame = !winner && calculateIfGameIsOver(squares);
        return winner ?
          <Fragment>
              <span>Winner player</span>
              {this.getPlayerIcon(winner)}
          </Fragment>
            :
            tiedGame
                ? <Fragment>
                    <span>The game is tied</span>
                </Fragment>
                : <Fragment>
                <span>Next player</span>
                {this.getPlayerIcon(this.nextPlayer)}
            </Fragment>
    }


    get nextPlayer(){
        return this.state.xIsNext ? 'X' : '0';
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const status = this.status(current.squares);

        return (
            <Fragment>
                <AppBar className="app-bar" position="static">
                    <Toolbar>
                        <Typography variant="h6">
                            Tic Tac Toe
                        </Typography>
                        <Button color="inherit" onClick={ () => window.open("https://github.com/adriangube/tic-tac-toe")}>
                            <GitHubIcon/>
                        </Button>
                    </Toolbar>
                </AppBar>
                <div className="game">
                    <div className="game-status">{status}</div>
                    <div className="game-board">
                        <Board
                            squares={current.squares}
                            onClick={(i) => this.handleClick(i)}
                        />
                    </div>

                    <div className={`game-actions ${calculateIfGameIsOver(current.squares) ? 'visible' : ''}`}>
                        <div className="game-actions-label">Play Again</div>
                        <Button color="primary"  variant="contained" onClick={() => this.jumpTo(0)}>
                            <ReplayIcon/>
                        </Button>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Game;
