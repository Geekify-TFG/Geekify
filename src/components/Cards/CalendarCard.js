import React, {useState} from 'react';
import {AppColors} from "../../resources/AppColors";
import {useHistory} from "react-router-dom";
import {AppTextsFontSize, AppTextsFontWeight, useTextStyles} from "../../resources/AppTexts";
import {makeStyles} from "@mui/styles";
import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography} from '@material-ui/core';
import Icons from "../../resources/Icons";
import IconProvider from "../IconProvider/IconProvider";
import axios from "axios";
import {MY_CALENDAR} from "../../resources/ApiUrls";
import {LabelsSnackbar} from "../../locale/en";
import {StorageManager} from "../../utils";
import SnackBarGeekify from "../SnackbarGeekify/SnackbarGeekify";

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
    },
    card: {
        maxWidth: 310,
        transition: "transform 0.15s ease-in-out",
        "&:hover": {transform: "scale3d(1.05, 1.05, 1)"},
    },


});


/**
 * @component
 * Component to create the card of the game
 *
 * @param {number} gameId: id of the game
 * @param {string} gameTitle: title of the game
 * @param {string} gameDescription: description of the game

 *
 * @constructor
 * <GameCard gameId={'12'} gameTitle={'TITLE'} gameDescription={'DESCRIPTION'} gameImage={2}/>
 *
 */
const CalendarCard = ({
                          gameId,
                          gameTitle,
                          gameDescription,
                          gameImage,
                          gameRating,
                          mainPage,
                          gameDate,
    getCalendarReleases
                      }) => {
    const storageManager = new StorageManager()
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const texts = useTextStyles();
    const history = useHistory()
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const [openSnackAddToCalendarReleases, setOpenSnackAddToCalendarReleases] = useState(false)
    const [openSnackRemoveToCalendarReleases, setOpenSnackRemoveToCalendarReleases] = useState(false)
    const [openSnackBarErrorLogin, setOpenSnackBarErrorLogin] = useState(false)


    const onClickHandler = () => {
        history.push({
            pathname: `/game/${gameId}`,
            state: {detail: gameId}
        })


    }

    const handleCloseSnackAddToCalendarReleases = async () => {
        setOpenSnackAddToCalendarReleases(false)
    }
    const handleCloseSnackRemoveToCalendarReleases = async () => {
        setOpenSnackRemoveToCalendarReleases(false)
    }

    const handleCloseSnackErrorLogin = async () => {
        setOpenSnackBarErrorLogin(false)
    }

    const handleAddToCalendarReleases = async () => {
        if (storageManager.getToken()) {
            try {
                var gameBody = {
                    "game_id": gameId,
                    "game_title": gameTitle,
                    "game_image": gameImage,
                    "game_date": gameDate
                }
                console.log(gameBody)
                const response = await axios.post(`${MY_CALENDAR(storageManager.getEmail())}`, gameBody)
                if (response.data.account.some(e => e.id === parseInt(gameId))) {
                    setOpenSnackAddToCalendarReleases(true)
                } else {
                    setOpenSnackRemoveToCalendarReleases(true)
                    setTimeout(() => {
                        getCalendarReleases()
                    }, 500)
                }
            } catch (e) {
                console.log('Error: ', e)
            }
        } else {
            setOpenSnackBarErrorLogin(true)
        }
    }

    return (
        <>
            <Card data-testid={"calendarCard"}
                  style={{height: '150px', width: '150px', position: "relative", borderRadius: 20}}
                  className={classes.card}>

                <CardActionArea style={{position: 'relative', height: '110px', width: '150px'}}
                                onClick={onClickHandler}>

                    <CardMedia
                        media="picture"
                        alt={gameTitle}
                        image={gameImage}
                        title={gameTitle}
                        style={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            height: '150px', width: '150px'
                        }}
                    />
                    <CardContent style={{
                        position: "relative",
                        backgroundColor: "transparent",
                        paddingTop: 0,
                        height: '150px'
                    }}>

                        <Grid container alignItems={"center"}>
                            <Grid item xs>
                                <Typography
                                    style={{
                                        overflowWrap: "hidden",
                                        color: AppColors.WHITE,
                                        height: '64px',
                                        fontWeight: 'bold'
                                    }}
                                    variant="h5" component="h2">
                                    {gameTitle}
                                </Typography> </Grid>
                        </Grid>


                    </CardContent>
                </CardActionArea>
                <CardActions style={{
                    position: "relative",
                    backgroundColor: "transparent",
                    paddingTop: 0
                }}>
                    <Grid onClick={() => handleAddToCalendarReleases()} item
                    >
                        <Button style={{
                            backgroundColor: AppColors.BACKGROUND,
                            borderRadius: 30,
                            border: '2px solid #6563FF',
                            borderColor: AppColors.PRIMARY,
                            maxWidth: '35px', maxHeight: '35px', minWidth: '35px', minHeight: '35px',
                        }}>

                            <IconProvider icon={<Icons.BOOKMARK style={{
                                marginTop: '0.1em',
                                verticalAlign: "middle",
                                display: "inline-flex",
                                color: AppColors.PRIMARY,
                            }} size="100px"/>}/>

                        </Button>

                    </Grid>
                </CardActions>

            </Card>

            <SnackBarGeekify handleClose={handleCloseSnackAddToCalendarReleases}
                             message={LabelsSnackbar.ADDED_TO_CALENDAR_RELEASES}
                             openSnack={openSnackAddToCalendarReleases}/>
            <SnackBarGeekify handleClose={handleCloseSnackRemoveToCalendarReleases} severity={'warning'}
                             message={LabelsSnackbar.REMOVE_TO_CALENDAR_RELEASES}
                             openSnack={openSnackRemoveToCalendarReleases}/>
            <SnackBarGeekify handleClose={handleCloseSnackErrorLogin} severity={'error'}
                             message={LabelsSnackbar.ERROR_LOGIN_COLLECTION}
                             openSnack={openSnackBarErrorLogin}/>
        </>
    )


}

CalendarCard.propTypes = {}

export default CalendarCard;
