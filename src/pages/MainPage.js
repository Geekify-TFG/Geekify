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


const MainPage = () => {
    const [games, setGames] = useState();

    //Function to get all the games
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
        <Grid container alignItems="center"
              direction={"column"}>
            {games && <GridGames games={games}/>}

        </Grid>
    )
}

export default MainPage;
