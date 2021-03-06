/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

import React, { useEffect, useState } from "react";
import { CircularProgress, Grid, Slider, Typography } from "@material-ui/core";
import { MY_BASE_PATH, MY_GAME_SEARCH, MY_GAMES } from "../resources/ApiUrls";
import axios from "axios";
import GridGames from "../components/GridGames/GridGames";
import { useLocation } from "react-router-dom";
import SearchBar from "../components/SearchBar/SearchBar";
//import { makeStyles } from "@material-ui/core/styles";
import { AppColors } from "../resources/AppColors";
import { LabelsSearchPage } from "../locale/en";
import { genresMock, numPlayersMock, platformsMock } from "../mocks/SearchMocks"
import ProfileButton from "../components/ProfileButton/ProfileButton";
import ButtonFilled from "../components/ButtonFilled/ButtonFilled";
import MultipleSelectGeekify from "../components/MultipleSelectGeekify/MultipleSelectGeekify";

const SearchPage = () => {
    const [games, setGames] = useState();
    const location = useLocation();
    let title = ""
    if (location.state)
        title = location.state.value;

    const [firstLoading, setFirstLoading] = useState(false);

    const [loading, setLoading] = useState(false);
    const [releaseYear, setReleaseYear] = useState([2017, 2022]);
    const [rating, setRating] = useState([0, 5]);
    const [platforms, setPlatform] = React.useState([]);
    const [genres, setGenres] = useState([]);
    const [numPlayers, setNumPlayers] = useState([]);

    //Function to get all the games
    const getGames = async () => {
        //setFirstLoading(true)
        try {
            let response
            if (title) {
                response = await axios.get(`${MY_BASE_PATH}${MY_GAME_SEARCH(title)}`);
                setGames(response.data.games.results)

            } else {
                response = await axios.get(`${MY_BASE_PATH}${MY_GAMES}`);
                setGames(response.data.games[0].results)

            }
            setLoading(false)
        } catch (err) {
            console.log(err.message)
        }
        //setFirstLoading(false)
    }

    useEffect(() => {
        setLoading(true)
        getGames()

    }, [title]);

    const handleChangeReleaseYear = (event, newValue) => {
        setReleaseYear(newValue);
    };

    const handleChangeRating = (event, newValue) => {
        setRating(newValue);
    };

    const handleChangePlatform = (event) => {
        setPlatform(event.target.value);

    };

    const handleChangeGenres = (event) => {
        setGenres(event.target.value);
    };

    const handleChangeNumPlayers = (event) => {
        setNumPlayers(event.target.value);
    };

    const handleClickApplyFilters = async () => {
        setLoading(true)

        var dict = []
        dict.push({
            key: "dates",
            value: releaseYear
        })
        dict.push({
            key: "metacritic",
            value: rating
        })
        dict.push({
            key: "parent_platforms",
            values: platforms
        })
        dict.push({
            key: "genres",
            values: genres
        })
        dict.push({
            key: "tags",
            values: numPlayers
        })
        var url = "/filters?"
        for (const element of dict) {
            if (element.value) {
                for (let j = 0; j < element.value.length; j++) {
                    url += `${element.key}`
                    url += `=${element.value[j]}&`
                }
            } else {
                for (let x = 0; x < element.values.length; x++) {
                    url += `${element.key}`
                    url += `=${element.values[x].value}&`
                }

            }
        }
        const editedText = url.slice(0, -1) //"abcde"

        try {
            var response = await axios.get(`${MY_BASE_PATH}${MY_GAMES}${editedText}`);
            setGames(response.data.games.results)
        } catch (err) {
            console.log(err.message)
        }
        setLoading(false)
    }

    return (
        <>
            <Grid container alignItems={"center"}>
                <Grid container alignItems="flex-start"
                    direction={"column"} >
                    <Grid container direction={"row"} justifyContent={"flex-end"} spacing={20}>
                        <Grid item style={{ margin: "2em" }}>
                            <ProfileButton />

                        </Grid>

                    </Grid>
                    <Grid container justifyContent={"center"}>
                        <Grid style={{ marginBottom: "4em" }}>
                            <SearchBar searched={title} size={true} />
                        </Grid>
                    </Grid>

                </Grid>
                <Grid container
                    direction={"column"}>
                    <Grid container spacing={4}>
                        <Grid item style={{ marginBottom: "0em", marginLeft: "4em" }}>
                            <Typography style={{
                                fontSize: "20px",
                                color: AppColors.SUBTEXT
                            }}>{LabelsSearchPage.RELEASE_YEAR}</Typography>
                            <Typography style={{
                                fontSize: "12px",
                                color: AppColors.SUBTEXT
                            }}>{`${releaseYear[0]}-${releaseYear[1]}`}</Typography>
                            <Slider
                                min={1995}
                                max={2022}
                                value={releaseYear}
                                onChange={handleChangeReleaseYear}
                            />
                        </Grid>

                        <Grid item style={{ marginBottom: "0em", marginLeft: "4em" }}>
                            <Typography style={{
                                fontSize: "20px",
                                color: AppColors.SUBTEXT
                            }}>{LabelsSearchPage.RATING}</Typography>
                            <Typography style={{
                                fontSize: "12px",
                                color: AppColors.SUBTEXT
                            }}>{`${rating[0]}-${rating[1]}`}</Typography>
                            <Slider
                                min={0}
                                max={5}
                                value={rating}
                                onChange={handleChangeRating}
                            />
                        </Grid>

                        <Grid item style={{ marginBottom: "0em", marginLeft: "4em" }}>
                            <MultipleSelectGeekify value={platforms} handleChange={handleChangePlatform}
                                options={platformsMock}
                                borderRadius={30} width={"9.75em"} label={LabelsSearchPage.PLATFORM} />
                        </Grid>

                        <Grid item style={{ marginBottom: "0em", marginLeft: "4em" }}>
                            <MultipleSelectGeekify value={genres} handleChange={handleChangeGenres} options={genresMock}
                                borderRadius={30} width={"9.75em"} label={LabelsSearchPage.GENRES} />
                        </Grid>

                        <Grid item style={{ marginBottom: "0em", marginLeft: "4em" }}>
                            <MultipleSelectGeekify value={numPlayers} handleChange={handleChangeNumPlayers}
                                options={numPlayersMock} borderRadius={30} width={"9.75em"}
                                label={LabelsSearchPage.NUMBER_PLAYERS} />
                        </Grid>
                        <Grid item style={{ marginLeft: "4em" }}>
                            <ButtonFilled onClick={handleClickApplyFilters} text={LabelsSearchPage.APPLY_FILTERS} />

                        </Grid>

                    </Grid>
                    {
                        loading ?
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <CircularProgress />
                            </div>
                            :
                            <Grid item>
                                {games && <GridGames mainPage={true} games={games} />}
                            </Grid>}
                </Grid>
            </Grid>
        </>
    )
}
export default SearchPage;