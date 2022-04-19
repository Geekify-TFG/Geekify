import React, {useEffect, useState} from 'react';
import {
    Box,
    ButtonGroup,
    Card,
    CardMedia,
    Grid,
    Icon,
    IconButton,
    InputAdornment,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    TextField
} from "@material-ui/core";
import {Button, Typography} from "@mui/material";
import {
    COLLECTION_GAME,
    COMMENT_GAME,
    COMMENTS_OF_GAME,
    GAME,
    MY_BASE_PATH,
    MY_COLLECTIONS,
    RATE_GAME,
    USER_URL
} from "../resources/ApiUrls";
import axios from "axios";
import {useLocation} from "react-router-dom";
import SearchBar from "../components/SearchBar/SearchBar";
import {AppColors} from "../resources/AppColors";
import {DialogTexts, LabelsGamePage, LabelsSnackbar} from "../locale/en";
import {makeStyles} from "@mui/styles";
import {AppTextsFontSize, AppTextsFontWeight} from "../resources/AppTexts";
import CommentCard from "../components/Cards/CommentCard";
import CardGeekify from "../components/Cards/CardGeekify";
import CardAchievements from "../components/Cards/AchievementsCard";
import ProfileButton from "../components/ProfileButton/ProfileButton";
import DialogGeekify from "../components/DialogGeekify";
import SelectGeekify from "../components/SelectGeekify/SelectGeekify";
import {StorageManager} from "../utils";
import SnackBarGeekify from "../components/SnackbarGeekify/SnackbarGeekify";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import playIcon from "../img/platforms/playstation_icon.svg"
import windowsIcon from "../img/platforms/windows_icon.svg"
import xboxIcon from "../img/platforms/xbox_icon.svg"
import iosIcon from "../img/platforms/ios_icon.svg"
import linuxIcon from "../img/platforms/linux_icon.svg"
import nintendoIcon from "../img/platforms/nintendo_icon.svg"
import {Rating} from "@material-ui/lab";
import accountIcon from "../img/account_icon.svg"

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
    textFieldLabelDisabled: {
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: AppColors.PRIMARY,
                opacity: "0.2",
                borderRadius: 10,
            },
        },
        "& .MuiInputBase-root": {
            color: AppColors.SUBTEXT,
        },
        "& .MuiInputLabel-root": {
            color: AppColors.PRIMARY,
            borderRadius: 10,
        },
        color: AppColors.PRIMARY,
        backgroundColor: AppColors.PRIMARY,
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
    iconRoot: {
        textAlign: "center",
    }, imageIcon: {
        height: "100%",
    },
    buttonGroup: {
        display: "flex",
        flexDirection: "row",
        "& > *:not(:last-child)": {
            marginRight: '1em'
        }
    }

}));


function AddToCollection({
                             handleAddParticipant,
                             initialValues,
                             gameId,
                             collections,
                             showAddToCollectionModal,
                             setShowAddToCollectionModal,
                             openSnackAddToCollection, setOpenSnackAddToCollection
                         }) {
    const [collection, setCollection] = useState()
    const handleClickSubmit = async () => {
        try {
            var gameBody = {'game_id': gameId}
            await axios.put(`${MY_BASE_PATH}${COLLECTION_GAME(collection)}`, gameBody)
            setOpenSnackAddToCollection(true)
            setShowAddToCollectionModal(-999)
        } catch (e) {
            console.log('Error: ', e)
        }
    }
    const handleChangeCollection = (event) => {
        setCollection(event.target.value);
    };

    return (
        <DialogGeekify
            textCancelButton={DialogTexts.CANCEL}
            textConfirmButton={DialogTexts.SAVE}
            handleShow={setShowAddToCollectionModal}
            handleConfirm={handleClickSubmit}
            title={DialogTexts.ADD_TO_COLLECTIONS}
            buttonColor={AppColors.PRIMARY}
            body={
                <SelectGeekify value={collection} handleChange={handleChangeCollection} options={collections}
                               borderRadius={30} width={'3px'} label={"Collections"}/>
            }
            show={showAddToCollectionModal}

        />
    )
}

const GamePage = () => {
    const [game, setGame] = useState();
    const [achievements, setAchievements] = useState();
    const [comments, setComments] = useState()
    const [comment, setComment] = useState()
    const [platforms, setPlatforms] = useState()
    const [showMore, setShowMore] = useState()
    const [images, setImages] = useState();
    const location = useLocation();
    const classes = useStyles();
    const idGame = location.state.detail
    const [rating, setRating] = useState("");
    const [hover, setHover] = React.useState(-1);
    const [collections, setCollections] = useState()
    const [likes, setLikes] = useState()
    const storageManager = new StorageManager()
    const [openSnackAddToCollection, setOpenSnackAddToCollection] = useState(false)
    const [openSnackBarErrorLogin, setOpenSnackBarErrorLogin] = useState(false)
    const [openSnackBarComment, setOpenSnackBarComment] = useState(false)
    const [openSnackRateNotLogged, setOpenSnackRateNotLogged] = useState(false)
    const [openSnackRateLogged, setOpenSnackRateLogged] = useState(false)
    const [loading, setLoading] = useState(false)
    const [showAddToCollectionModal, setShowAddToCollectionModal] = useState(-999)
    const handleChange = async (event) => {
        try {
            if (rating === "") {
                var gameBody = {'rate': event.target.value, 'user': storageManager.getEmail()}
                await axios.post(`${MY_BASE_PATH}${RATE_GAME(idGame)}`, gameBody)
                setOpenSnackRateLogged(true)
            } else {
                var gameBody = {'rate': event.target.value, 'user': storageManager.getEmail()}
                await axios.put(`${MY_BASE_PATH}${RATE_GAME(idGame)}`, gameBody)
                setOpenSnackRateLogged(true)
            }
            setRating(event.target.value);
        } catch (e) {
            console.log('Error: ', e)
        }

    };
    const handleCloseSnackAddToCollection = async () => {
        setOpenSnackAddToCollection(false)
    }


    const handleCloseSnackErrorLogin = async () => {
        setOpenSnackBarErrorLogin(false)
    }

    const handleCloseSnackComment = async () => {
        setOpenSnackBarComment(false)
    }

    const handleCloseSnackRateNotLogged = async () => {
        setOpenSnackRateNotLogged(false)
    }

    const handleCloseSnackRateLogged = async () => {
        setOpenSnackRateLogged(false)
    }


    const handleAddToCollection = () => {
        if (storageManager.getToken()) {
            setShowAddToCollectionModal(1)
        } else {
            setOpenSnackBarErrorLogin(true)
        }
    }

    const getGame = async () => {
        try {
            const response = await axios.get(`${MY_BASE_PATH}${GAME(idGame)}`);
            setGame(response.data.gameDetail[0])
            if ((Object.values(response.data.gameDetail[1])[0]).length === 0) {
                setAchievements(undefined)
            } else {
                setAchievements(Object.values(response.data.gameDetail[1])[0])
            }
            setImages(Object.values(response.data.gameDetail[2])[0])
            getParentPlatforms(response.data.gameDetail[0])
        } catch (err) {
            console.log(err.message)
        }
    }

    const getComments = async () => {
        try {
            const response = await axios.get(`${MY_BASE_PATH}${COMMENTS_OF_GAME(idGame)}`);
            setComments(Object.values(response.data.comments))
            setLoading(false)
        } catch (err) {
            console.log(err.message)
        }
    }


    const getParentPlatforms = async (parentPlatform) => {
        const platformIconsList = []
        parentPlatform.parent_platforms.forEach(function (item) {
                switch (item.platform.id) {
                    case 1:
                        platformIconsList.push(windowsIcon)
                        break;
                    case 2:
                        platformIconsList.push(playIcon)
                        break;
                    case 3:
                        platformIconsList.push(xboxIcon)
                        break;
                    case 4:
                        platformIconsList.push(iosIcon)
                        break;
                    case 5:
                        platformIconsList.push(iosIcon)
                        break;
                    case 6:
                        platformIconsList.push(linuxIcon)
                        break;
                    case 7:
                        platformIconsList.push(nintendoIcon)
                        break;
                    default:
                        return "";
                }
            }
        )
        setPlatforms(platformIconsList)
    }


    const getCollections = async () => {
        try {
            const config = {auth: {username: storageManager.getToken()}}

            const response = await axios.get(`${MY_BASE_PATH}${MY_COLLECTIONS(storageManager.getEmail())}`, config);
            setCollections(response.data.collections)
        } catch (err) {
            console.log(err.message)
        }
    }

    const getUser = async () => {
        try {
            const response = await axios.get(`${MY_BASE_PATH}${USER_URL(storageManager.getEmail())}`);
            var rate = response.data.account.likes
            let obj = rate.find(o => o.game_id === `${idGame}`);
            if (obj) {
                setRating(obj.rating)
            }
            setLikes(response.data.account.likes)

        } catch (err) {
            console.log(err.message)
        }
    }

    const postComment = async () => {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();
        let date = dd + '/' + mm + '/' + yyyy;
        try {
            const body = {
                date: date,
                content: comment,
                user: storageManager.getEmail(),
                game_id: idGame
            };
            console.log(body)
            const config = {auth: {username: storageManager.getToken()}}
            const response = await axios.post(`${MY_BASE_PATH}${COMMENT_GAME(idGame)}`, body, config);
            console.log(response)
            setLoading(true)
            setOpenSnackBarComment(true)
            getComments()
        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        getGame()
        getComments()
        if (storageManager.getToken()) {
            getCollections()
            getUser()
        }
    }, []);


    const labels = {
        1: LabelsGamePage.NOT_RECOMMENDED,
        2: LabelsGamePage.MEH,
        3: LabelsGamePage.FINE,
        4: LabelsGamePage.VERY_GOOD,
        5: LabelsGamePage.MASTERPIECE,
    };

    function getLabelText(value) {
        return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
    }

    return (
        <>
            {game && <Grid container alignItems={"center"}>
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
                            <ProfileButton/>

                        </Grid>
                    </Grid>
                    <Grid container direction={"row"} style={{flexWrap: "nowrap"}}>
                        <Grid item style={{margin: '4em', marginRight: '2em'}}>
                            <Card style={{height: '380px', width: '275px', position: "relative", borderRadius: 20}}
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
                            <Typography
                                style={{color: AppColors.WHITE, marginBottom: 0, marginTop: '1em', fontSize: '20px'}}
                                gutterBottom
                            >
                                {"Rate the game!"}
                            </Typography>
                            <Box
                                onClick={() => (!storageManager.getToken() ? setOpenSnackRateNotLogged(true) : null)}

                                sx={{
                                    color: AppColors.BACKGROUND_DRAWER,
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <Rating
                                    name="simple-controlled"
                                    value={rating}
                                    onChange={handleChange}
                                    disabled={!storageManager.getToken()}
                                    size="large"
                                    getLabelText={getLabelText}
                                    onChangeActive={(event, newHover) => {
                                        setHover(newHover);
                                    }}
                                />
                                {rating !== null && (
                                    <Box sx={{ml: 2}}><Typography style={{
                                        color: AppColors.WHITE,
                                        marginBottom: 0,
                                        fontSize: '20px'
                                    }}>{labels[hover !== -1 ? hover : rating]}</Typography></Box>
                                )}
                            </Box>
                            {/*<FormControl className={classes.select} variant="outlined" margin='normal'
                                         style={{width: '9.75em'}}>
                                <InputLabel className={classes.select}
                                            id="demo-simple-select-label"/>
                                <Select data-testid={"selectRate"} className={classes.select}
                                        IconComponent={Icons.ARROW_DOWN}
                                        value={rating}
                                        displayEmpty
                                        disabled={!storageManager.getToken()}
                                        renderValue={rating !== "" ? undefined : () => "Not rated yet"}
                                        onChange={handleChange}
                                        onClick={() => (!storageManager.getToken() ? setOpenSnackRateNotLogged(true) : null)}
                                        label="Rating"
                                        style={{width: 280}}
                                >

                                    <MenuItem data-testid={"menuItemRate4"} style={{color: AppColors.PRIMARY}}
                                              value={4}>{LabelsGamePage.MASTERPIECE}</MenuItem>
                                    <MenuItem data-testid={"menuItemRate3"} style={{color: AppColors.PRIMARY}}
                                              value={3}>{LabelsGamePage.VERY_GOOD}</MenuItem>
                                    <MenuItem style={{color: AppColors.PRIMARY}}
                                              value={2}>{LabelsGamePage.FINE}</MenuItem>
                                    <MenuItem style={{color: AppColors.PRIMARY}}
                                              value={1}>{LabelsGamePage.MEH}</MenuItem>
                                    <MenuItem style={{color: AppColors.PRIMARY}}
                                              value={0}>{LabelsGamePage.NOT_RECOMMENDED}</MenuItem>
                                </Select>
                            </FormControl>*/}
                        </Grid>
                        <Grid container direction={"column"} item style={{margin: '4em', marginLeft: 0}}>
                            <Grid item style={{marginBottom: '1em'}}>
                                <Button
                                    style={{backgroundColor: AppColors.BACKGROUND, borderRadius: 20, maxWidth: '10em'}}
                                    disabled={true}>
                                    <Typography style={{color: AppColors.WHITE, marginBottom: 0, fontSize: '14px'}}
                                                gutterBottom
                                    >
                                        {game.genres[0].name}
                                    </Typography>
                                </Button>
                            </Grid>
                            <Grid item>
                                <Grid container direction={"row"} justifyContent={"space-between"}
                                      style={{marginBottom: '1em'}}>

                                    <Typography
                                        style={{
                                            fontSize: '35px',
                                            color: AppColors.WHITE
                                        }}>{game.name.toUpperCase()}</Typography>

                                    <Button
                                        data-testid={"BtnAddToCollection"}
                                        style={{
                                            backgroundColor: AppColors.BACKGROUND,
                                            borderRadius: 20,
                                            maxWidth: '10em'
                                        }}
                                        onClick={handleAddToCollection}
                                    >
                                        <Typography style={{color: AppColors.WHITE, marginBottom: 0, fontSize: '14px'}}
                                                    gutterBottom
                                        >
                                            {"Add to your collection"}
                                        </Typography>
                                    </Button>

                                </Grid>
                            </Grid>
                            <Grid item style={{marginBottom: '1em'}}>

                                <ButtonGroup style={{width: '500px', height: '40px'}} className={classes.buttonGroup} color="primary"
                                             aria-label="outlined primary button group">
                                    {game.tags.slice(0, 3).map((type) => (
                                        <Button style={{backgroundColor: AppColors.WHITE, borderRadius: 20,}}
                                                disabled={true}>
                                            <Typography style={{color: AppColors.BLACK, marginBottom: 0}} gutterBottom

                                            >
                                                {type.name}
                                            </Typography>
                                        </Button>
                                    ))}
                                </ButtonGroup>
                            </Grid>
                            <Grid item style={{marginBottom: '1em'}}>

                                <Typography
                                    style={{
                                        fontSize: '20px',
                                        color: AppColors.WHITE
                                    }}>{LabelsGamePage.DESCRIPTION}</Typography>
                            </Grid>

                            <Grid item style={{marginBottom: '1em'}}>
                                {showMore ?
                                    <Typography
                                        style={{
                                            color: AppColors.WHITE
                                        }}>{game.description_raw}</Typography>
                                    :
                                    <Typography
                                        style={{
                                            color: AppColors.WHITE
                                        }}>{game.description_raw.substring(0, 300) + "..."}</Typography>
                                }

                                <Button style={{
                                    fontWeight:'bold',
                                    color: AppColors.BACKGROUND_DRAWER
                                }}
                                        onClick={() => setShowMore(!showMore)}>{showMore ? "Show less" : "Show more"}</Button>

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
                                                      primary={game.released.split('-').reverse().join('-')}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText style={{color: AppColors.WHITE, marginRight: '9em'}}
                                                      primary={LabelsGamePage.PLATFORM}
                                        />
                                        {platforms && platforms.map(elem => (
                                            <ListItemIcon style={{minWidth: 0}}>

                                                <Icon classes={classes.iconRoot}>
                                                    <img
                                                        style={{paddingLeft: '2px'}}
                                                        alt="icon"
                                                        className={classes.imageIcon}

                                                        src={elem}
                                                    />
                                                </Icon>
                                            </ListItemIcon>

                                        ))}

                                    </ListItem>
                                    <ListItem>
                                        <ListItemText style={{color: AppColors.WHITE, marginRight: '5em'}}
                                                      primary={LabelsGamePage.DURATION}
                                        />
                                        <ListItemText style={{color: AppColors.SECONDARY}}
                                                      primary={game.playtime + " hours"}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText style={{color: AppColors.WHITE, marginRight: '5em'}}
                                                      primary={LabelsGamePage.DEVELOPER}
                                        />
                                        <ListItemText style={{color: AppColors.SECONDARY}}
                                                      primary={game.developers == [] ? "-" : game.developers[0].name}
                                        />
                                    </ListItem>

                                    <ListItem>
                                        <ListItemText style={{color: AppColors.WHITE, marginRight: '5em'}}
                                                      primary={LabelsGamePage.PUBLISHER}
                                        />
                                        <ListItemText style={{color: AppColors.SECONDARY}}
                                                      primary={game.publishers[0].name}
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

                        {achievements ?
                            achievements.map(elem => (
                                <Grid item style={{marginBottom: '1em'}} key={achievements.indexOf(elem)}
                                >
                                    <CardAchievements
                                        bg={AppColors.BACKGROUND_DRAWER}
                                        width={'350px'}
                                        title={elem.name}
                                        description={elem.description}
                                        percent={elem.percent}
                                        image={elem.image}

                                    />
                                </Grid>
                            )) : <Grid container style={{width: '350px', marginBottom: '1em'}}
                            >
                                <Typography style={{
                                    fontSize: '30px',
                                    color: AppColors.PRIMARY,
                                    fontWeight: 'bold'
                                }}>{LabelsGamePage.NO_ACHIEVEMENTS}</Typography>
                            </Grid>}

                    </Grid>
                    <Grid item style={{marginLeft: '2em'}}>
                        {!loading && <Grid item style={{marginBottom: '4em',}}>
                            <Typography
                                style={{
                                    fontSize: '20px',
                                    color: AppColors.WHITE
                                }}>{LabelsGamePage.COMMUNITY}</Typography>
                            <TextField
                                data-testid="textfieldComment"
                                style={{width: '350px'}}
                                onChange={(e) => setComment(e.target.value)}
                                type="text"
                                disabled={!storageManager.getToken()}
                                placeholder={storageManager.getToken() ? "" : "You must be logged to comment"}
                                label={`Publish about ${game.name}`}
                                margin="normal"
                                variant="outlined"
                                multiline
                                className={classes.textFieldLabel}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">

                                            <img style={{
                                                borderRadius: 20,
                                                width: '36px',
                                                height: '36px',
                                                backgroundColor: AppColors.PRIMARY
                                            }}
                                                 src={storageManager.getToken ? storageManager.getImage(): accountIcon}/>
                                        </InputAdornment>

                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">

                                            <IconButton data-testid={"postComment"} style={{color: AppColors.PRIMARY}}
                                                        onClick={() => postComment()}>
                                                <KeyboardReturnIcon/>
                                            </IconButton>
                                        </InputAdornment>

                                    ),
                                }}
                            />

                            {comments ? comments.map(elem => (
                                    <Grid item style={{marginBottom: '1em'}} key={comments.indexOf(elem)}
                                    >
                                        <CommentCard width={'350px'} time={"2 minutes ago"} title={"Hola"}
                                                     comment={elem} bg={AppColors.BACKGROUND_DRAWER}/>
                                    </Grid>
                                )) :
                                <Grid container style={{width: '350px', marginBottom: '1em'}}
                                >
                                    <Typography style={{
                                        fontSize: '30px',
                                        color: AppColors.PRIMARY,
                                        fontWeight: 'bold'
                                    }}>{LabelsGamePage.NO_COMMENTS}</Typography>
                                </Grid>
                            }

                        </Grid>}


                    </Grid>
                    <Grid item style={{marginLeft: '2em'}}>
                        <Grid item style={{marginBottom: '4em',}}>

                            {images &&
                            images.map(elem => (
                                <Grid item style={{marginBottom: '1em'}} key={images.indexOf(elem)}

                                >
                                    <Card style={{
                                        height: '400px',
                                        width: '275px',
                                        position: "relative",
                                        borderRadius: 20
                                    }}
                                          className={classes.card}>
                                        <CardMedia
                                            image={elem.image}
                                            title={elem.image}
                                            alt={elem.image}
                                            style={{
                                                position: "absolute",
                                                top: 0,
                                                right: 0,
                                                height: '400px', width: '300px'
                                            }}
                                        />

                                    </Card>
                                </Grid>
                            ))}
                        </Grid>


                    </Grid>
                </Grid>
            </Grid>}
            {showAddToCollectionModal >= 0 && (
                <AddToCollection
                    showAddToCollectionModal={showAddToCollectionModal}
                    setShowAddToCollectionModal={setShowAddToCollectionModal}
                    gameId={idGame}
                    collections={collections}
                    setOpenSnackAddToCollection={setOpenSnackAddToCollection}
                    openSnackAddToCollection={openSnackAddToCollection}
                />
            )}
            <SnackBarGeekify handleClose={handleCloseSnackAddToCollection}
                             message={LabelsSnackbar.ADDED_TO_COLLECTION}
                             openSnack={openSnackAddToCollection}/>
            <SnackBarGeekify handleClose={handleCloseSnackErrorLogin} severity={'warning'}
                             message={LabelsSnackbar.ERROR_LOGIN_COLLECTION}
                             openSnack={openSnackBarErrorLogin}/>
            <SnackBarGeekify handleClose={handleCloseSnackComment}
                             message={LabelsSnackbar.COMMENTED_SUCCESSFULLY}
                             openSnack={openSnackBarComment}/>
            <SnackBarGeekify data-testid={"snackbarRate"} handleClose={handleCloseSnackRateLogged}
                             message={LabelsSnackbar.RATED_SUCCESSFULLY}
                             openSnack={openSnackRateLogged}/>
            <SnackBarGeekify data-test handleClose={handleCloseSnackRateNotLogged} severity={'warning'}
                             message={LabelsSnackbar.RATED_ERROR_LOGGED}
                             openSnack={openSnackRateNotLogged}/>
        </>
    )
}

export default GamePage;
