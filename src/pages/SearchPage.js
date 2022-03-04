import React, {useEffect, useState} from 'react';
import {Avatar, Button, CircularProgress, Grid, Select, Slider, Typography} from "@material-ui/core";
import {BASE_PATH, GAMES, GAMES_RATING, GAMES_RELEASED} from "../resources/ApiUrls";
import axios from "axios";
import GridGames from "../components/GridGames/GridGames";
import {useHistory} from "react-router-dom";
import SearchBar from "../components/SearchBar/SearchBar";
import {makeStyles} from "@material-ui/core/styles";
import {AppColors} from "../resources/AppColors";
import {LabelsMain, LabelsSearchPage} from "../locale/en";
import styled from "@emotion/styled";
import Icons from "../resources/Icons";
import SelectGeekify from "../components/SelectGeekify/SelectGeekify";
import {platformsMock, genresMock, numPlayersMock } from "../mocks/SearchMocks"
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
    },
    select: {
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: AppColors.PRIMARY,
                opacity: "0.2",
                borderRadius: 10,

            },
        },
        "& .MuiInputBase-root": {
            color: AppColors.WHITE,

        },
        "& .MuiInputLabel-root": {
            color: AppColors.WHITE,
            backgroundColor: "transparent"

        },
        "&:before": {
            color: AppColors.WHITE,
        },
        "&:after": {
            borderBottomColor: AppColors.WHITE,
        },
        "& .MuiSvgIcon-root": {
            color: AppColors.PRIMARY,
        },
        color: AppColors.WHITE,
        backgroundColor: AppColors.BACKGROUND_DRAWER,
        borderRadius: 10,
    },


}))


const SearchPage = () => {
    const [games, setGames] = useState();
    const history = useHistory()
    const classes = useStyles();
    const sort_type = [LabelsMain.POPULAR, LabelsMain.RELEASE, LabelsMain.RATING];
    const [sortActive, setSortActive] = useState('Popular');
    const [loading, setLoading] = useState(false);
    const [releaseYear, setReleaseYear] = useState([2017, 2022]);
    const [rating, setRating] = useState([0, 5]);
    const [platforms, setPlatform] = useState();
    const [genres, setGenres] = useState();
    const [numPlayers, setNumPlayers] = useState();

    //Function to get all the games
    const getGames = async () => {
        try {
            var data = []
            const response = await axios.get(`${BASE_PATH}${GAMES}`);
            setGames(response.data.results)
            setLoading(false)

        } catch (err) {
            console.log(err.message)
        }
    }


    const getGamesRelease = async () => {
        try {
            var data = []
            const response = await axios.get(`${BASE_PATH}${GAMES_RELEASED}`);
            setGames(response.data.results)
            setLoading(false)

        } catch (err) {
            console.log(err.message)
        }
    }

    const getGamesRating = async () => {
        try {
            var data = []
            console.log(`${BASE_PATH}${GAMES_RATING}`)
            const response = await axios.get(`${BASE_PATH}${GAMES_RATING}`);
            setGames(response.data.results)
            setLoading(false)

        } catch (err) {
            console.log(err.message)
        }
    }


    useEffect(() => {

        setLoading(true)
        switch (sortActive) {
            case LabelsMain.POPULAR:
                getGames()
                break
            case LabelsMain.RELEASE:
                getGamesRelease()
                break
            case LabelsMain.RATING:
                getGamesRating()
                break
        }
    }, [sortActive]);

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



    return (
        <>
            <Grid container alignItems={"center"}>
                <Grid container alignItems="flex-start"
                      direction={"column"} style={{}}>
                    <Grid container direction={"row"} justifyContent={"flex-end"} spacing={20}>
                        <Grid item style={{margin: '2em'}}>
                            <Button style={{
                                backgroundColor: AppColors.BACKGROUND_DRAWER,
                                borderRadius: 30,
                                border: '2px solid #6563FF',
                                borderColor: AppColors.PRIMARY,
                                height: '3.5em'
                            }}>
                                <Avatar style={{width: '36px', height: '36px', backgroundColor: AppColors.PRIMARY}}>
                                </Avatar>
                                <Typography style={{fontSize: '12px', color: AppColors.WHITE, paddingLeft: '1em'}}>Jordi
                                    Romero</Typography>

                            </Button>
                        </Grid>


                    </Grid>
                    <Grid container justifyContent={'center'}>
                        <Grid style={{marginBottom: '4em'}}>
                            <SearchBar size={true}/>
                        </Grid>
                    </Grid>


                </Grid>
                <Grid container
                      direction={"column"}>
                    <Grid container spacing={4}>
                        <Grid item style={{marginBottom: '4em', marginLeft: '4em'}}>
                            <Typography style={{
                                fontSize: '20px',
                                color: AppColors.SUBTEXT
                            }}>{LabelsSearchPage.RELEASE_YEAR}</Typography>
                            <Typography style={{
                                fontSize: '12px',
                                color: AppColors.SUBTEXT
                            }}>{`${releaseYear[0]}-${releaseYear[1]}`}</Typography>
                            <Slider
                                min={1995}
                                max={2022}
                                value={releaseYear}
                                onChange={handleChangeReleaseYear}
                            />
                        </Grid>

                        <Grid item style={{marginBottom: '4em', marginLeft: '4em'}}>
                            <Typography style={{
                                fontSize: '20px',
                                color: AppColors.SUBTEXT
                            }}>{LabelsSearchPage.RATING}</Typography>
                            <Typography style={{
                                fontSize: '12px',
                                color: AppColors.SUBTEXT
                            }}>{`${rating[0]}-${rating[1]}`}</Typography>
                            <Slider
                                min={0}
                                max={5}
                                value={rating}
                                onChange={handleChangeRating}
                            />
                        </Grid>

                        <Grid item style={{marginBottom: '4em', marginLeft: '4em'}}>
                            <SelectGeekify value={platforms} handleChange={handleChangePlatform} options={platformsMock} borderRadius={30} width={'201px'} label={LabelsSearchPage.PLATFORM}/>
                        </Grid>

                        <Grid item style={{marginBottom: '4em', marginLeft: '4em'}}>
                            <SelectGeekify value={genres} handleChange={handleChangeGenres} options={genresMock} borderRadius={30} width={'3px'} label={LabelsSearchPage.GENRES}/>
                        </Grid>


                        <Grid item style={{marginBottom: '4em', marginLeft: '4em'}}>
                            <SelectGeekify value={numPlayers} handleChange={handleChangeNumPlayers} options={numPlayersMock} borderRadius={30} width={'400px'} label={LabelsSearchPage.NUMBER_PLAYERS}/>
                        </Grid>


                    </Grid>
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

export default SearchPage;