import React, {useEffect, useState} from 'react';
import {Avatar, Button, ButtonGroup, CircularProgress, Grid, Typography} from "@material-ui/core";
import {BASE_PATH, GAMES, GAMES_RATING, GAMES_RELEASED} from "../resources/ApiUrls";
import axios from "axios";
import GridGames from "../components/GridGames/GridGames";
import {useHistory} from "react-router-dom";
import SearchBar from "../components/SearchBar/SearchBar";
import {makeStyles} from "@material-ui/core/styles";
import eldenImage from "../img/elden_background.jpeg"
import {AppColors} from "../resources/AppColors";
import {LabelsMain} from "../locale/en";
import styled from "@emotion/styled";

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

const MainPage = () => {
    const [games, setGames] = useState();
    const history = useHistory()
    const classes = useStyles();
    const sort_type = [LabelsMain.POPULAR, LabelsMain.RELEASE, LabelsMain.RATING];
    const [sortActive, setSortActive] = useState('Popular');
    const [loading, setLoading] = useState(false);



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
                            <SearchBar/>
                        </Grid>

                        <Grid item style={{margin: '2em'}}>
                            <Button onClick={() =>history.push('/profile')} style={{
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
                    <Grid item style={{margin: '4em'}}>
                        <Typography style={{fontSize: '100px', color: AppColors.WHITE}}>{LabelsMain.LOREM}</Typography>
                        <Typography
                            style={{fontSize: '80px', color: AppColors.YELLOW_SUBTEXT}}>{LabelsMain.DOLOR}</Typography>
                    </Grid>
                </Grid>
                <Grid container
                      direction={"column"}>
                    <Grid item style={{marginLeft: '4em'}}>
                        <Typography
                            style={{fontSize: '40px', color: AppColors.WHITE}}>{LabelsMain.DISCOVERY}</Typography>
                    </Grid>
                    <Grid container>
                        <Grid item style={{marginBottom: '4em', marginLeft: '4em'}}>
                            <Typography
                                style={{fontSize: '20px', color: AppColors.SUBTEXT}}>{LabelsMain.SORT}</Typography>
                        </Grid>
                        <Grid item style={{marginLeft: '5em'}}>
                            <ButtonGroup style={{width: '500px'}} color="primary"
                                         aria-label="outlined primary button group">
                                {sort_type.map((type) => (
                                    <ButtonToggle active={sortActive === type}
                                                  onClick={() => (setSortActive(type))}>
                                        {type}
                                    </ButtonToggle>
                                ))}
                            </ButtonGroup>
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

export default MainPage;
