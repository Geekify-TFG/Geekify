import React, {useEffect, useState} from 'react';
import {Grid, Paper, Typography} from "@material-ui/core";
import {styled} from "@mui/material";
import {BASE_PATH, GAMES} from "../resources/ApiUrls";
import axios from "axios";
import GridGames from "../components/GridGames/GridGames";
import {useHistory} from "react-router-dom";
import SearchBar from "../components/SearchBar/SearchBar";
import TextGeekify from "../components/TextGeekify/TextGeekify";
import {textType} from "../resources/AppTexts";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({

    appBg:{
       backgroundImage:"linear-gradient(to bottom,  rgba(161, 161, 161, 0.33), rgba(117, 19, 93, 0.81)),var(--img)"

    }
}))

const MainPage = () => {
    const [games, setGames] = useState();
    const history = useHistory()
    const classes = useStyles();

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
        <>
            <Grid container alignItems={"center"} className={classes.appBg} style={{"--img": "url('https://images.unsplash.com/photo-1610907083431-d36d8947c8e2')"}}>
                <Grid item style={{margin: '2em'}}>
                    <SearchBar/>
                </Grid>
                <Grid container alignItems="flex-start"
                      direction={"column"}>
                    <Grid item style={{margin: '4em'}}>
                        <Typography style={{fontSize:'100px'}}>Lorem Ipsum</Typography>
                        <Typography style={{fontSize:'100px'}}>Dolor sit amet</Typography>
                    </Grid>
                </Grid>
                <Grid container alignItems="center"
                      direction={"column"}>
                    {games && <GridGames games={games}/>}

                </Grid>
            </Grid>
        </>
    )
}

export default MainPage;
