/* eslint-disable no-console */
/* eslint-disable camelcase */
import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, CircularProgress, Grid, Tooltip, Typography } from "@material-ui/core";
import { MY_BASE_PATH, MY_GAMES, MY_GAMES_FILTER, MY_GAMES_CATEGORIES } from "../resources/ApiUrls";
import axios from "axios";
import GridGames from "../components/GridGames/GridGames";
import SearchBar from "../components/SearchBar/SearchBar";
import eldenImage from "../img/elden_background.jpeg"
import { AppColors } from "../resources/AppColors";
import { LabelsMain } from "../locale/en";
import styled from "@emotion/styled";
import ProfileButton from "../components/ProfileButton/ProfileButton";
import { StorageManager } from "../utils";

const ButtonToggle = styled(Button)`
  opacity: 1;
  background-color: #1D1D1D;
  color: #6563FF ${({ active }) =>
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

const MainPage = () => {
    const [games, setGames] = useState();
    const storageManager = new StorageManager();
    const [sortActive, setSortActive] = useState("popular");
    const [loading, setLoading] = useState(false);
    const sort_text = { popular: LabelsMain.POPULAR, released: LabelsMain.RELEASED, rating: LabelsMain.RATING, favCategories: LabelsMain.FAV_CATEGORIES };
    const text = { popular: LabelsMain.TEXT_POPULAR, released: LabelsMain.TEXT_RELEASED_DATE, rating: LabelsMain.TEXT_RATING, favCategories: LabelsMain.TEXT_FAV_CATEGORIES };

    //Function to get all the games
    const getGames = async () => {
        try {
            const response = await axios.get(`${MY_BASE_PATH}${MY_GAMES}`);
            setGames(response.data.games[0].results)
            setLoading(false)

        } catch (err) {
            console.log(err.message)
        }
    }

    const getGamesFilter = async () => {
        try {
            const response = await axios.get(`${MY_BASE_PATH}${MY_GAMES_FILTER(sortActive)}`);
            setGames(response.data.games.results)
            setLoading(false)

        } catch (err) {
            console.log(err.message)
        }
    }

    const getGamesFavCategories = async () => {
        try {
            const response = await axios.get(`${MY_BASE_PATH}${MY_GAMES_CATEGORIES(storageManager.getEmail())}`);
            setGames(response.data.games)
            setLoading(false)

        } catch (err) {
            console.log(err.message)
            setLoading(false)
            setGames([])
        }
    }
    useEffect(() => {
        setLoading(true)
        switch (sortActive) {
            case "popular":
                getGames()
                break
            case "released":
                getGamesFilter()
                break
            case "rating":
                getGamesFilter()
                break
            case "favCategories":
                getGamesFavCategories()
                break
        }
    }, [sortActive]);

    return (
        <>

            <Grid container alignItems={"center"}>
                <Grid container alignItems="flex-start"
                    direction={"column"} style={{
                        backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0), rgba(29,29,29,1)),url(${eldenImage})`,
                        backgroundSize: "cover",

                    }}>
                    <Grid container direction={"row"} justifyContent={"space-between"} spacing={20}>
                        <Grid item style={{ margin: "2em" }}>
                            <SearchBar />
                        </Grid>

                        <Grid item style={{ margin: "2em" }}>
                            <ProfileButton />
                        </Grid>

                    </Grid>
                    <Grid item style={{ margin: "4em" }}>
                        <Typography style={{
                            fontSize: "100px",
                            color: AppColors.YELLOW_SUBTEXT,
                            fontWeight: "bold"
                        }}>{LabelsMain.WELCOME}</Typography>

                    </Grid>
                </Grid>
                <Grid container
                    direction={"column"}>
                    <Grid item style={{ marginLeft: "4em" }}>
                        <Typography
                            style={{
                                fontSize: "40px",
                                color: AppColors.WHITE,
                                fontWeight: "bold"
                            }}>{LabelsMain.DISCOVERY}</Typography>
                    </Grid>
                    <Grid container>
                        <Grid item style={{ marginBottom: "4em", marginLeft: "4em" }}>
                            <Typography
                                style={{ fontSize: "20px", color: AppColors.SUBTEXT }}>{LabelsMain.SORT}</Typography>
                        </Grid>
                        <Grid item style={{ marginLeft: "5em" }}>
                            <ButtonGroup style={{ width: "500px" }} color="primary"
                                aria-label="outlined primary button group">
                                {Object.entries(sort_text).map(([key, value]) => (
                                    <>
                                        <Tooltip title={<Typography>{text[key]}</Typography>}>
                                            <ButtonToggle key={key.id} active={sortActive === key}
                                                onClick={() => (setSortActive(key))}>
                                                {value}
                                            </ButtonToggle>
                                        </Tooltip>
                                    </>

                                ))}
                            </ButtonGroup>
                        </Grid>

                    </Grid>

                    {loading ?
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <CircularProgress />
                        </div>
                        :
                        <Grid item>
                            {games && games.length != 0 ? < GridGames mainPage={true} games={games} /> :
                                <Grid container justifyContent={"center"}>
                                    <Typography style={{
                                        fontSize: "30px",
                                        color: AppColors.PRIMARY,
                                        fontWeight: "bold"
                                    }}>{LabelsMain.NO_FAV_CATEGORIES}</Typography>
                                </Grid>}
                        </Grid>}

                </Grid>
            </Grid>
        </>
    )
}

export default MainPage;
