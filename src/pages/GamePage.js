import React, {useEffect, useState} from 'react';
import {Avatar, ButtonGroup, Card, CardMedia, Grid} from "@material-ui/core";
import {Button, Typography} from "@mui/material";
import {BASE_PATH, GAME} from "../resources/ApiUrls";
import axios from "axios";
import {useHistory, useLocation} from "react-router-dom";
import SearchBar from "../components/SearchBar/SearchBar";
import {AppColors} from "../resources/AppColors";
import {LabelsMain} from "../locale/en";
import {makeStyles} from "@mui/styles";
import {AppTextsFontSize, AppTextsFontWeight} from "../resources/AppTexts";


const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    text: {
        fontSize: AppTextsFontSize.SIZE_BODY,
        fontWeight: AppTextsFontWeight.WEIGHT_LIGHT
    },
    pos: {
        marginBottom: 12,
    },
    link: {
        overflowX: "auto",
        "&:hover": {
            cursor: 'pointer',
            textDecoration: `underline ${AppColors.WHITE}`
        }
    }, cardHeaderRoot: {
        overflow: "hidden"
    },
    cardHeaderContent: {
        overflow: "hidden"
    }


});

const GamePage = () => {
    const [game, setGame] = useState();
    const location = useLocation();
    const classes = useStyles();

    const history = useHistory()
    const idGame = location.state.detail

    const getGame = async () => {
        try {
            const response = await axios.get(`${BASE_PATH}${GAME(idGame)}`);
            console.log(response.data)
            setGame(response.data)
        } catch (err) {
            console.log(err.message)
        }
    }
    useEffect(() => {
        getGame()
    }, []);

    return (
        <>
            {game && <Grid container alignItems={"center"}>
                <Grid container alignItems="flex-start"
                      direction={"column"} style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0), rgba(101,99,255,1))`,
                    backgroundSize: "cover",

                }}>
                    <Grid container direction={"row"} justifyContent={"space-between"}  spacing={20}>
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
                    <Grid container direction={"row"}>

                        <Grid item style={{margin: '4em'}}>
                            <Card style={{height: '400px', width: '300px', position: "relative", borderRadius: 20}}
                                  className={classes.card}>
                                <CardMedia
                                    media="picture"
                                    alt={game.name}
                                    image={game.background_image}
                                    title={game.name}
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        right: 0,
                                        height: '400px', width: '300px'
                                    }}
                                />

                            </Card>
                        </Grid>
                        <Grid item style={{margin: '4em', marginLeft: 0}}>
                            <Button style={{backgroundColor: AppColors.BACKGROUND, borderRadius: 20}} disabled={true}>
                                <Typography style={{color: AppColors.WHITE, marginBottom: 0}} gutterBottom variant="h5"
                                            component="h2">
                                    {game.genres[0].name}
                                </Typography>
                            </Button>
                            <Typography
                                style={{
                                    fontSize: '40px',
                                    color: AppColors.WHITE
                                }}>{game.name.toUpperCase()}</Typography>
                            <ButtonGroup style={{width: '500px'}} color="primary"
                                         aria-label="outlined primary button group">
                                {game.tags.slice(0,3).map((type) => (
                                    <Button style={{backgroundColor: AppColors.WHITE, borderRadius: 20,}} disabled={true}>
                                        <Typography style={{color: AppColors.BLACK, marginBottom: 0}} gutterBottom variant="h8"
                                                    >
                                            {type.name}
                                        </Typography>
                                    </Button>
                                ))}
                            </ButtonGroup>

                        </Grid>
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


                    </Grid>

                </Grid>
            </Grid>}
        </>
    )
}

export default GamePage;
