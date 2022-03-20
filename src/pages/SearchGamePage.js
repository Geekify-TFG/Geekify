import React, {useEffect, useState} from 'react';
import {Button, CircularProgress, Grid, Typography} from "@material-ui/core";
import {MY_BASE_PATH, MY_GAME_SEARCH, MY_GAMES} from "../resources/ApiUrls";
import axios from "axios";
import GridGames from "../components/GridGames/GridGames";
import {useHistory, useLocation} from "react-router-dom";
import SearchBar from "../components/SearchBar/SearchBar";
import {makeStyles} from "@material-ui/core/styles";
import eldenImage from "../img/elden_background.jpeg"
import {AppColors} from "../resources/AppColors";
import {LabelsMain} from "../locale/en";
import styled from "@emotion/styled";
import ProfileButton from "../components/ProfileButton/ProfileButton";

const ButtonToggle = styled(Button)`
  opacity: 1;
  background-color: #1D1D1D;
  color: #6563FF ${({active}) =>
          active &&
          `opacity: 1;
        background-color: ${AppColors.PRIMARY};
        color: white;
        &:hover {
            color: white;
            background-color: #6563FF;
          }
        `};

`;


const useStyles = makeStyles((theme) => ({

    singleBlogBg: {
        content: '',
        position: "relative",
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)',
        opacity: ".5",
    }, imageIcon: {
        height: '100%'
    }, avatar: {
        border: '1px solid #C6D2E3',
        "&.MuiAvatar-img": {
            width: '20px',
            height: '20px',

        }

    }, root: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        "& > *:not(:last-child)": {
            marginRight: theme.spacing(2)
        }
    }


}))

const SearchGamePage = () => {
    const [games, setGames] = useState();
    const location = useLocation();
    const title = location.state.value;
    console.log(title)
    const history = useHistory()
    const classes = useStyles();
    const sort_text = {popular: LabelsMain.POPULAR, released: LabelsMain.RELEASED, rating: LabelsMain.RATING};
    const sort_type = ["Popular", "Released", "Rating"];
    const [sortActive, setSortActive] = useState("popular");
    const [loading, setLoading] = useState(false);

    //Function to get all the games
    const getGames = async () => {
        try {
            var data = []
            const response = await axios.get(`${MY_BASE_PATH}${MY_GAME_SEARCH(title)}`);
            console.log(response.data.games.results)
            setGames(response.data.games.results)
            setLoading(false)

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
                    <Grid container direction={"row"} justifyContent={"space-between"} spacing={20}>
                        <Grid item style={{margin: '2em'}}>
                            <SearchBar searched={title}/>
                        </Grid>

                        <Grid item style={{margin: '2em'}}>
                            <ProfileButton/>
                        </Grid>


                    </Grid>
                    <Grid item style={{margin: '4em'}}>
                        <Typography style={{
                            fontSize: '100px',
                            color: AppColors.WHITE,
                            fontWeight: 'bold'
                        }}>{LabelsMain.LOREM}</Typography>
                        <Typography
                            style={{
                                fontSize: '80px',
                                color: AppColors.YELLOW_SUBTEXT,
                                fontWeight: 'bold'
                            }}>{LabelsMain.DOLOR}</Typography>
                    </Grid>
                </Grid>
                <Grid container
                      direction={"column"}>

                    {
                        loading ?
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                <CircularProgress/>
                            </div>
                            :
                            <Grid item>
                                {games && <GridGames games={games}/>}
                            </Grid>}
                </Grid>
            </Grid>
        </>
    )
}

export default SearchGamePage;
