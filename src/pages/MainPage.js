import React, {useEffect, useState} from 'react';
import {Grid, Typography} from "@material-ui/core";
import {BASE_PATH, GAMES} from "../resources/ApiUrls";
import axios from "axios";
import GridGames from "../components/GridGames/GridGames";
import {useHistory} from "react-router-dom";
import SearchBar from "../components/SearchBar/SearchBar";
import {makeStyles} from "@material-ui/core/styles";
import eldenImage from "../img/elden_background.jpeg"
import ButtonFilled from "../components/ButtonFilled/ButtonFilled";
import {AppColors} from "../resources/AppColors";
import IconProvider from "../components/IconProvider/IconProvider";

const useStyles = makeStyles((theme) => ({

    singleBlogBg: {
        content: '',
        position: "relative",
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)',
        opacity: ".5",
    },


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
            <Grid container alignItems={"center"}>
                <Grid container alignItems="flex-start"
                      direction={"column"} style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0), rgba(29,29,29,1)),url(${eldenImage})`,
                    backgroundSize: "cover",

                }}>
                    <Grid container direction={"row"}>
                        <Grid item style={{margin: '2em'}}>
                            <SearchBar/>
                        </Grid>


                    </Grid>
                    <Grid item style={{margin: '4em'}}>
                        <Typography style={{fontSize: '100px'}}>Lorem Ipsum</Typography>
                        <Typography style={{fontSize: '100px'}}>Dolor sit amet</Typography>
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
