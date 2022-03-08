import React, {useEffect, useState} from 'react';
import {
    Avatar,
    ButtonGroup,
    Card,
    CardMedia,
    FormControl,
    Grid,
    InputAdornment,
    InputLabel,
    List,
    ListItem,
    ListItemText,
    MenuItem,
    Select,
    TextField
} from "@material-ui/core";
import {Button, Typography} from "@mui/material";
import {BASE_PATH, GAME, GAME_ACHIEVEMENTS, GAME_IMAGES} from "../resources/ApiUrls";
import axios from "axios";
import {useHistory, useLocation} from "react-router-dom";
import SearchBar from "../components/SearchBar/SearchBar";
import {AppColors} from "../resources/AppColors";
import {LabelsGamePage} from "../locale/en";
import {makeStyles} from "@mui/styles";
import {AppTextsFontSize, AppTextsFontWeight} from "../resources/AppTexts";
import accountIcon from "../img/account_icon.svg"
import CommentCard from "../components/Cards/CommentCard";
import Icons from "../resources/Icons";
import CardGeekify from "../components/Cards/CardGeekify";
import CardAchievements from "../components/Cards/AchievementsCard";

const useStyles = makeStyles((theme) => ({
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
    textFieldLabel: {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: AppColors.PRIMARY,
                opacity: '0.2',
                borderRadius: 10,
            },
        }, '& .MuiInputBase-root': {
            color: AppColors.PRIMARY,
        }, '& .MuiInputLabel-root': {
            color: AppColors.PRIMARY,
        }, '& .MuiTextField-root': {
            height: '25em',
        },
        color: AppColors.PRIMARY,
        backgroundColor: AppColors.BACKGROUND_DRAWER,
        borderRadius: 10,
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


}));

const ProfilePage = () => {
    const [game, setGame] = useState();
    const [achievements, setAchievements] = useState();
    const [images, setImages] = useState();
    const classes = useStyles();
    const [comment, setComment] = useState()
    const history = useHistory()
    const [rating, setRating] = useState("");

    const handleChange = (event) => {
        setRating(event.target.value);
    };





    return (
        <>
            <Grid container alignItems={"center"}>
                <Grid container alignItems="flex-start"
                      direction={"column"} style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0), rgba(101,99,255,1))`,
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
                    <Grid container direction={"row"} style={{flexWrap: "nowrap"}}>
                        <Grid item style={{margin: '4em', marginRight: '2em'}}>
                            <Card style={{height: '400px', width: '275px', position: "relative", borderRadius: 20}}
                                  className={classes.card}>
                                <CardMedia
                                    media="picture"
                                    image={'https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg'}
                                    title={"A"}
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        right: 0,
                                        height: '400px', width: '300px'
                                    }}
                                />

                            </Card>

                           
                        </Grid>
                        <Grid container direction={"column"} item style={{margin: '4em', marginLeft: 0}}>
                            <Grid item style={{marginBottom: '1em'}}>
                                <Button
                                    style={{backgroundColor: AppColors.BACKGROUND, borderRadius: 20, maxWidth: '10em'}}
                                    disabled={true}>
                                    <Typography style={{color: AppColors.WHITE, marginBottom: 0, fontSize: '14px'}}
                                                gutterBottom
                                    >
                                        {"name"}
                                    </Typography>
                                </Button>
                            </Grid>
                            <Grid item>
                                <Grid item style={{marginBottom: '1em'}}>

                                    <Typography
                                        style={{
                                            fontSize: '35px',
                                            color: AppColors.WHITE
                                        }}>{"game.name.toUpperCase()"}</Typography>
                                </Grid>
                            </Grid>
                            <Grid item style={{marginBottom: '1em'}}>


                            </Grid>
                            <Grid item style={{marginBottom: '1em'}}>

                                <Typography
                                    style={{
                                        fontSize: '20px',
                                        color: AppColors.WHITE
                                    }}>{LabelsGamePage.DESCRIPTION}</Typography>
                            </Grid>

                            <Grid item style={{marginBottom: '1em'}}>

                                <Typography
                                    style={{
                                        color: AppColors.WHITE
                                    }}>{"game.description_raw"}</Typography>

                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>
                <Grid container
                      direction={"row"} style={{marginTop: '2em', marginBottom: '2em'}}>
                    <Grid item style={{marginLeft: '4em'}}>
                        <CardGeekify bg={AppColors.BACKGROUND_CARD} borderRadius={20} height={'auto'} width={'350px'}>
                            <Grid
                                container
                            >
                                <List style={{marginLeft: '1em', marginTop: '0.5em'}}>
                                    <ListItem>
                                        <ListItemText style={{color: AppColors.WHITE, marginRight: '5em'}}
                                                      primary={LabelsGamePage.RELEASE}
                                        />
                                        <ListItemText style={{color: AppColors.SECONDARY}}
                                                      primary={"game.released"}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText style={{color: AppColors.WHITE, marginRight: '9em'}}
                                                      primary={LabelsGamePage.PLATFORM}
                                        />
                                        <ListItemText style={{color: AppColors.SECONDARY}}
                                                      primary={"game.released"}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText style={{color: AppColors.WHITE, marginRight: '5em'}}
                                                      primary={LabelsGamePage.DURATION}
                                        />
                                        <ListItemText style={{color: AppColors.SECONDARY}}
                                                      primary={"game.released"}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText style={{color: AppColors.WHITE, marginRight: '5em'}}
                                                      primary={LabelsGamePage.DEVELOPER}
                                        />
                                        <ListItemText style={{color: AppColors.SECONDARY}}
                                                      primary={"game.released"}
                                        />
                                    </ListItem>

                                    <ListItem>
                                        <ListItemText style={{color: AppColors.WHITE, marginRight: '5em'}}
                                                      primary={LabelsGamePage.PUBLISHER}
                                        />
                                        <ListItemText style={{color: AppColors.SECONDARY}}
                                                      primary={"game.released"}
                                        />
                                    </ListItem>
                                </List>


                            </Grid>

                        </CardGeekify>

                        <Typography
                            style={{
                                fontSize: '20px',
                                color: AppColors.WHITE
                            }}>{LabelsGamePage.ACHIEVEMENTS}</Typography>



                    </Grid>
                    <Grid item style={{marginLeft: '2em'}}>
                        <Grid item style={{marginBottom: '4em',}}>
                            <Typography
                                style={{
                                    fontSize: '20px',
                                    color: AppColors.WHITE
                                }}>{LabelsGamePage.COMMUNITY}</Typography>
                            <TextField
                                style={{width: '350px'}}
                                onChange={(e) => setComment(e.target.value)}
                                type="text"
                                label={`Publish about `}
                                margin="normal"
                                variant="outlined"
                                multiline
                                className={classes.textFieldLabel}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">

                                            <img alt='icon'
                                                 src={accountIcon}/>
                                        </InputAdornment>

                                    ),
                                }}
                            />
                            <CommentCard width={'350px'} time={"2 minutes ago"} title={"Hola"}
                                         comment={LabelsGamePage.COMMENT_EXAMPLE} bg={AppColors.BACKGROUND_DRAWER}/>
                        </Grid>


                    </Grid>
                    <Grid item style={{marginLeft: '2em'}}>
                        <Grid item style={{marginBottom: '4em',}}>


                        </Grid>


                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default ProfilePage;
