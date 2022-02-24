import React, {useEffect, useState} from 'react';
import {Grid, Paper} from "@material-ui/core";
import {Button, Container, styled, Typography} from "@mui/material";
import logo from "../logo.svg";
import {BASE_PATH, GAMES} from "../resources/ApiUrls";
import axios from "axios";
import GridGames from "../components/GridGames/GridGames";

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


const GamePage = () => {
    const [games, setGames] = useState();

    const getGames = async () => {
        try {
            var data = []
            const response = await axios.get(`${BASE_PATH}${GAMES}`);
            console.log(response.data.results)
            setGames(response.data.results)
        } catch (err) {
            console.log(err.message)
        }
    }
    useEffect(() => {
        getGames()
    }, []);

    return (
        <Container maxWidth="sm" className="App">
            <Paper>
                <img src={logo} className="App-logo" alt="logo" />
                <Typography variant="h4" component="h1" gutterBottom>
                    Geekify project v5
                </Typography>
                <Button variant="contained" color="primary">
                    Primary Button
                </Button>
                <Button variant="contained" color="secondary">
                    Secondary Button
                </Button>
            </Paper>
        </Container>
    )
}

export default GamePage;
