import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '15ch',
        },
    },
}));

function PlayerPrediction(value) {
    const classes = useStyles();
    return (
        <form className={classes.root} noValidate autoComplete="off">
            <h2>Jugador {value}</h2>
            <TextField id="standard-basic" label="ELO"/>
        </form>
    );
}

export default PlayerPrediction;