import React, {useEffect, useState} from 'react';
import {
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
import {
    BASE_PATH,
    COLLECTION_GAME,
    GAME,
    GAME_ACHIEVEMENTS,
    GAME_IMAGES,
    MY_BASE_PATH,
    MY_COLLECTIONS
} from "../resources/ApiUrls";
import axios from "axios";
import {useHistory, useLocation} from "react-router-dom";
import SearchBar from "../components/SearchBar/SearchBar";
import {AppColors} from "../resources/AppColors";
import {DialogTexts, LabelsGamePage} from "../locale/en";
import {makeStyles} from "@mui/styles";
import {AppTextsFontSize, AppTextsFontWeight} from "../resources/AppTexts";
import accountIcon from "../img/account_icon.svg"
import CommentCard from "../components/Cards/CommentCard";
import Icons from "../resources/Icons";
import CardGeekify from "../components/Cards/CardGeekify";
import CardAchievements from "../components/Cards/AchievementsCard";
import ProfileButton from "../components/ProfileButton/ProfileButton";
import DialogGeekify from "../components/DialogGeekify";
import SelectGeekify from "../components/SelectGeekify/SelectGeekify";
import {StorageManager} from "../utils";

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


function AddToCollection({
                             handleAddParticipant,
                             initialValues,
                             gameId,
                             collections,
                             showAddToCollectionModal,
                             setShowAddToCollectionModal
                         }) {
    const [collection, setCollection] = useState()
    const handleClickSubmit = async () => {
        try {
            var gameBody = {'game_id': gameId}
            const response = await axios.put(`${MY_BASE_PATH}${COLLECTION_GAME(collection)}`, gameBody)
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
    const [images, setImages] = useState();
    const location = useLocation();
    const classes = useStyles();
    const [comment, setComment] = useState()
    const history = useHistory()
    const idGame = location.state.detail
    const [rating, setRating] = useState("");
    const [collections, setCollections] = useState()
    const storageManager = new StorageManager()

    const [showAddToCollectionModal, setShowAddToCollectionModal] = useState(-999)
    const handleChange = (event) => {
        setRating(event.target.value);
    };

    const handleAddToCollection = () => {
        setShowAddToCollectionModal(1)
    }

    const getGame = async () => {
        try {
            const response = await axios.get(`${BASE_PATH}${GAME(idGame)}`);
            setGame(response.data)
            getParentPlatforms(response.data)
        } catch (err) {
            console.log(err.message)
        }
    }

    const getAchievementsGame = async () => {
        try {
            const response = await axios.get(`${BASE_PATH}${GAME_ACHIEVEMENTS(idGame)}`);
            setAchievements(response.data.results)
        } catch (err) {
            console.log(err.message)
        }
    }

    const getImagesGame = async () => {
        try {
            const response = await axios.get(`${BASE_PATH}${GAME_IMAGES(idGame)}`);
            setImages(response.data.results)
        } catch (err) {
            console.log(err.message)
        }
    }

    const getParentPlatforms = async (parentPlatform) => {
        console.log(parentPlatform.parent_platforms)
        const platformIconsList = []

    }


    const getCollections = async () => {
        try {
            const config = {auth: {username: storageManager.getToken()}}

            const response = await axios.get(`${MY_BASE_PATH}${MY_COLLECTIONS(storageManager.getEmail())}`,config);
            setCollections(response.data.collections)
        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        getGame()
        getAchievementsGame()
        getImagesGame()
        getCollections()

    }, []);

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
                            <Card style={{height: '400px', width: '275px', position: "relative", borderRadius: 20}}
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

                            <FormControl className={classes.select} variant="outlined" margin='normal'
                                         style={{width: '9.75em'}}>
                                <InputLabel className={classes.select}
                                            id="demo-simple-select-label"/>
                                <Select className={classes.select} IconComponent={Icons.ARROW_DOWN}
                                        value={rating}
                                        displayEmpty
                                        renderValue={rating !== "" ? undefined : () => "Not rated yet"}
                                        onChange={handleChange}
                                        label="Rating"
                                        style={{width: 280}}
                                >

                                    <MenuItem style={{color: AppColors.PRIMARY}}
                                              value={4}>{LabelsGamePage.MASTERPIECE}</MenuItem>
                                    <MenuItem style={{color: AppColors.PRIMARY}}
                                              value={3}>{LabelsGamePage.VERY_GOOD}</MenuItem>
                                    <MenuItem style={{color: AppColors.PRIMARY}}
                                              value={2}>{LabelsGamePage.FINE}</MenuItem>
                                    <MenuItem style={{color: AppColors.PRIMARY}}
                                              value={1}>{LabelsGamePage.MEH}</MenuItem>
                                    <MenuItem style={{color: AppColors.PRIMARY}}
                                              value={0}>{LabelsGamePage.NOT_RECOMMENDED}</MenuItem>
                                </Select>
                            </FormControl>
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

                                <ButtonGroup style={{width: '500px', height: '40px'}} color="primary"
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

                                <Typography
                                    style={{
                                        color: AppColors.WHITE
                                    }}>{game.description_raw}</Typography>

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
                                                      primary={game.released}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText style={{color: AppColors.WHITE, marginRight: '9em'}}
                                                      primary={LabelsGamePage.PLATFORM}
                                        />
                                        <ListItemText style={{color: AppColors.SECONDARY}}
                                                      primary={game.playtime}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText style={{color: AppColors.WHITE, marginRight: '5em'}}
                                                      primary={LabelsGamePage.DURATION}
                                        />
                                        <ListItemText style={{color: AppColors.SECONDARY}}
                                                      primary={game.playtime}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText style={{color: AppColors.WHITE, marginRight: '5em'}}
                                                      primary={LabelsGamePage.DEVELOPER}
                                        />
                                        <ListItemText style={{color: AppColors.SECONDARY}}
                                                      primary={game.developers[0].name}
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

                        {achievements &&
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
                        ))}

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
                                label={`Publish about ${game.name}`}
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
                                            title={"A"}
                                            alt={"A"}
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
                />
            )}
        </>
    )
}

export default GamePage;
