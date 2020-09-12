import React from "react";
import ClearIcon from '@material-ui/icons/Clear';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import blue from "@material-ui/core/colors/blue";
import red from "@material-ui/core/colors/red";
function Square (props) {
    const Value =
        props.value === "X" ? <ClearIcon style={{ fontSize: 80, color: blue[400] }}/>
        : props.value === "0" ? <RadioButtonUncheckedIcon style={{ fontSize: 80, color: red[400] }}/>
        : "";
    return (
        <button className={`square ${props.value ? 'full' : ''}`} onClick={props.onClick}>
            {Value}
        </button>
    );
}

export default Square;
