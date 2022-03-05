import React, {useEffect, useState} from 'react';
import {Avatar, Button, CircularProgress, Grid, Typography} from "@material-ui/core";
import {BASE_PATH, GAMES} from "../resources/ApiUrls";
import axios from "axios";
import GridGames from "../components/GridGames/GridGames";
import {useHistory, useLocation} from "react-router-dom";
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

const CollectionPage = () => {
    const [games, setGames] = useState();
    const history = useHistory()
    const location = useLocation();

    const [loading, setLoading] = useState(false);
    const titleCollection = location.state.title

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


    useEffect(() => {

        getGames()
    }, []);

    return (
        <>
            <Grid container alignItems={"center"}>
                <Grid container alignItems="flex-start"
                      direction={"column"} style={{
                    backgroundSize: "cover",

                }}>
                    <Grid container direction={"row"} justifyContent={"space-between"} spacing={20}>
                        <Grid item style={{margin: '2em'}}>
                            <SearchBar/>
                        </Grid>

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

                </Grid>
                <Grid container
                      direction={"column"}>
                    <Grid item style={{marginLeft: '4em'}}>
                        <Typography
                            style={{fontSize: '40px', color: AppColors.WHITE}}>{titleCollection}</Typography>
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

export default CollectionPage;
