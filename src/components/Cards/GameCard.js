import React, {useEffect, useState} from 'react';
import {AppColors} from "../../resources/AppColors";
import {useHistory} from "react-router-dom";
import {AppTextsFontSize, AppTextsFontWeight, useTextStyles} from "../../resources/AppTexts";
import {makeStyles} from "@mui/styles";
import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    Paper,
    Typography
} from '@material-ui/core';
import Icons from "../../resources/Icons";
import IconProvider from "../IconProvider/IconProvider";
import axios from "axios";
import {COLLECTION_GAME, MY_BASE_PATH, MY_COLLECTIONS} from "../../resources/ApiUrls";
import DialogGeekify from "../DialogGeekify";
import {DialogTexts, LabelsSnackbar} from "../../locale/en";
import SelectGeekify from "../SelectGeekify/SelectGeekify";
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
    card:{
        maxWidth: 310,
        transition: "transform 0.15s ease-in-out",
        "&:hover": { transform: "scale3d(1.05, 1.05, 1)" },
    },


});


function AddToCollection({
                             handleAddParticipant,
                             initialValues,
                             gameId,
                             showAddToCollectionModal,
                             setShowAddToCollectionModal,
                             openSnackAddToCollection, setOpenSnackAddToCollection
                         }) {
    const storageManager = new StorageManager()
    const [collections, setCollections] = useState()
    const [collection, setCollection] = useState()
    const handleClickSubmit = async () => {
        try {
            var gameBody = {'game_id': gameId}
            const response = await axios.put(`${MY_BASE_PATH}${COLLECTION_GAME(collection)}`, gameBody)
            setOpenSnackAddToCollection(true)
            setShowAddToCollectionModal(-999)
        } catch (e) {
            console.log('Error: ', e)
        }
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

    const handleChangeCollection = (event) => {
        setCollection(event.target.value);
    };

    useEffect(() => {
        getCollections()
    }, [])

    return (
        <>
            {collections && <DialogGeekify
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

            />}
        </>
    )
}

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
const GameCard = ({
                      gameId,
                      gameTitle,
                      gameDescription,
                      gameImage,
                      gameRating,
                      mainPage,

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
    const [showAddToCollectionModal, setShowAddToCollectionModal] = useState(-999)
    const [openSnackAddToCollection, setOpenSnackAddToCollection] = useState(false)
    const [openSnackBarErrorLogin, setOpenSnackBarErrorLogin] = useState(false)


    const onClickHandler = () => {
        history.push({
            pathname: `/game/${gameId}`,
            state: {detail: gameId}
        })


    }

    const handleCloseSnackAddToCollection = async () => {
        setOpenSnackAddToCollection(false)
    }

    const handleCloseSnackErrorLogin = async () => {
        setOpenSnackBarErrorLogin(false)
    }

    const handleAddToCollection = () => {
        if (storageManager.getToken()) {
            setShowAddToCollectionModal(1)
        } else {
            setOpenSnackBarErrorLogin(true)
        }
    }

    return (
        <>
            <Card data-testid={"gameCard"}
                  style={{height: '302px', width: '222px', position: "relative", borderRadius: 20}}
                  className={classes.card}>

                <CardActionArea style={{position: 'relative', height: '250px', width: '222px'}}
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
                            height: '302px', width: '222px'
                        }}
                    />
                    <CardContent style={{
                        position: "relative",
                        backgroundColor: "transparent",
                        paddingTop: 0,
                        height: '250px'
                    }}>
                        <Grid container>

                            <Grid item style={{paddingLeft: '8em', paddingTop: '0.5em'}}>
                                <Paper style={{
                                    backgroundColor: AppColors.BACKGROUND,
                                    borderRadius: 20,
                                    width: '7em',
                                    height: '2.5em'
                                }}
                                >
                                    <Grid container style={{paddingLeft: '0.5em', paddingTop: '0.15em'}}>
                                        <IconProvider icon={<Icons.STAR style={{
                                            paddingTop: '0.15em',
                                            verticalAlign: "middle",
                                            display: "inline-flex",
                                            paddingRight: '4px',
                                            color: AppColors.PRIMARY,
                                        }} size="100px"/>}/>
                                        <Typography
                                            style={{color: AppColors.WHITE, marginBottom: 0, fontWeight: 'bold'}}
                                            gutterBottom
                                            variant="h5"
                                            component="h2">
                                            {gameRating}
                                        </Typography>
                                    </Grid>
                                </Paper>

                            </Grid>
                            <Grid container alignItems="center"
                                  justifyContent="center">
                                <Grid item style={{paddingTop: '9em'}}>
                                    <Typography style={{color: AppColors.WHITE, height: '64px', fontWeight: 'bold'}}
                                                variant="h5" component="h2">
                                        {gameTitle}
                                    </Typography>
                                </Grid>
                            </Grid>

                        </Grid>
                    </CardContent>
                </CardActionArea>
                {mainPage && <CardActions style={{
                    position: "relative",
                    backgroundColor: "transparent",
                    paddingTop: 0
                }}>
                    <Grid onClick={() => handleAddToCollection()} item
                          style={{paddingLeft: '11em', paddingTop: '0.8em'}}>
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
                </CardActions>}

            </Card>
            {showAddToCollectionModal >= 0 && (
                <AddToCollection
                    showAddToCollectionModal={showAddToCollectionModal}
                    setShowAddToCollectionModal={setShowAddToCollectionModal}
                    gameId={gameId}
                    setOpenSnackAddToCollection={setOpenSnackAddToCollection}
                    openSnackAddToCollection={openSnackAddToCollection}
                />
            )}
            <SnackBarGeekify handleClose={handleCloseSnackAddToCollection}
                             message={LabelsSnackbar.ADDED_TO_COLLECTION}
                             openSnack={openSnackAddToCollection}/>
            <SnackBarGeekify handleClose={handleCloseSnackErrorLogin} severity={'error'}
                             message={LabelsSnackbar.ERROR_LOGIN_COLLECTION}
                             openSnack={openSnackBarErrorLogin}/>
        </>
    )


}

GameCard.propTypes = {}

export default GameCard;
