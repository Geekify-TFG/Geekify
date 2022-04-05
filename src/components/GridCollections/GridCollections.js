import React, {useState} from 'react';
import {Card, CardActionArea, CardMedia, Container, FormControl, Grid, InputAdornment} from '@material-ui/core';
import {useHistory} from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles'
import {useTextStyles} from "../../resources/AppTexts";
import CollectionCard from "../Cards/CollectionCard";
import addIcon from '../../img/add_icon.svg'
import {AppColors} from "../../resources/AppColors";
import axios from "axios";
import {CREATE_COLLECTION, MY_BASE_PATH} from "../../resources/ApiUrls";
import DialogGeekify from "../DialogGeekify";
import {DialogTexts, ErrorTexts, LabelsSnackbar} from "../../locale/en";
import TextFieldGeekify from "../TextFieldGeekify/textFieldGeekify";
import ErrorIcon from '@material-ui/icons/Error'
import SnackBarGeekify from "../SnackbarGeekify/SnackbarGeekify";
import {StorageManager} from "../../utils";

function CreateCollection({
                              gameId,
                              collections,
                              showCreateCollection,
                              setShowCreateCollection,
                              getCollections,
                              loading, setLoading,
                              openSnackCreateCollection,
                              setopenSnackCreateCollection
                          }) {
    const [nameCollection, setNameCollection] = useState()
    const [showEmailError, setShowEmailError] = useState(false)
    const storageManager = new StorageManager()

    const handleClickSubmit = async () => {
        try {
            var collectionBody = {'title': nameCollection,'user_email':storageManager.getEmail()}
            const config = {auth: {username: storageManager.getToken()}}

            const response = await axios.post(`${MY_BASE_PATH}${CREATE_COLLECTION}`, collectionBody, config)
            setShowCreateCollection(-999)
            setLoading(true)
            setopenSnackCreateCollection(true)
            getCollections()
        } catch (e) {
            console.log('Error: ', e)
        }
    }

    const handleInputChange = e => {
        const {name, value} = e.target
        setNameCollection(value)
    }
    return (
        <DialogGeekify
            textCancelButton={DialogTexts.CANCEL}
            textConfirmButton={DialogTexts.SAVE}
            handleShow={setShowCreateCollection}
            handleConfirm={handleClickSubmit}
            title={DialogTexts.CREATE_COLLECTION}
            body={
                <FormControl margin='normal' style={{width: '100%'}}>
                    <TextFieldGeekify
                        name='Collection'
                        handleChange={handleInputChange}
                        label={"Collection"}
                        error={showEmailError}
                        helperText={showEmailError && ErrorTexts.CREATE_COLLECTION}
                        inputProps={{
                            endAdornment: showEmailError && <InputAdornment position="end"><ErrorIcon
                                style={{color: AppColors.RED}}/></InputAdornment>,
                        }}
                    />
                </FormControl>
            }
            show={showCreateCollection}

        />
    )
}


/**
 * @component
 * Component to show all the games
 *
 * @param {object} games: JSON with all the data available of the game
 *
 * @example
 * const games = {your JSON games data}
 * <GridGames games={games}/>
 */

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2)
    },
    card: {
        minWidth: 275,
        border: `4px solid #7B7983`,
    }
}))

const GridCollections = ({loading, setLoading, getCollections, collections}) => {
    const history = useHistory()
    const texts = useTextStyles();
    const classes = useStyles();
    const [redirectTo, setRedirectTo] = useState([false, -1]);
    const [showCreateCollection, setShowCreateCollection] = useState(-999)
    const [openSnackCreateCollection, setopenSnackCreateCollection] = useState(false)
    const storageManager = new StorageManager()
    const onClickAddNewCollection = async () => {
        if(storageManager.getToken()){
            setShowCreateCollection(1)
        }
        else{
            alert("Create an account")
        }
    }
    const handleCloseSnackCreateCollection = async () => {
        setopenSnackCreateCollection(false)
    }

    const [collection, setCollection] = useState(collections);
    return (
        <Container fluid style={{margin: 0, maxWidth: '100%'}}>
            <div className={classes.root}>

                <Grid
                    align="center"
                    container
                    spacing={2}
                    direction="row"
                    alignItems={"center"}
                    justify="flex-start">

                    {
                        collection.map((elem, index) => (
                            <Grid item key={collection.indexOf(elem)}
                                  xs={12}
                                  sm={12}
                                  md={6}
                                  lg={6}
                                  xl={3}
                            >
                                <CollectionCard paddingLeft={'23em'} width={'400px'} collectionId={elem.id}
                                                collectionTitle={elem.value.title}
                                                collectionNumGames={elem.value.numGames}
                                                collectionImage={elem.value.image}/>

                            </Grid>
                        ))}
                    <Grid item
                          xs={12}
                          sm={12}
                          md={6}
                          lg={6}
                          xl={3}
                    >
                        <Card data-testid={"createCollection"}
                              style={{
                                  backgroundColor: AppColors.BACKGROUND,
                                  borderRadius: 20,
                                  borderColor: AppColors.GRAY,
                                  height: '212px',
                                  width: '400px',
                                  position: "relative",
                                  boxShadow: "none"
                              }}
                              className={classes.card}>

                            <CardActionArea style={{position: 'relative', height: '212px', width: '400px'}}
                                            onClick={onClickAddNewCollection}>

                                <CardMedia
                                    media="picture"
                                    alt={"A"}
                                    image={addIcon}
                                    title={"collectionTitle"}
                                    style={{
                                        color: AppColors.RED,
                                        height: '100px', width: '100px'
                                    }}
                                />
                            </CardActionArea>
                        </Card>

                    </Grid>
                </Grid>
            </div>
            {showCreateCollection >= 0 && (
                <CreateCollection
                    showCreateCollection={showCreateCollection}
                    setShowCreateCollection={setShowCreateCollection}
                    getCollections={getCollections}
                    loading={loading}
                    setLoading={setLoading}
                    openSnackCreateCollection={openSnackCreateCollection}
                    setopenSnackCreateCollection={setopenSnackCreateCollection}
                />
            )}
            <SnackBarGeekify handleClose={handleCloseSnackCreateCollection}
                             message={LabelsSnackbar.COLLECTION_CREATED}
                             openSnack={openSnackCreateCollection}/>
        </Container>

    )
}

export default GridCollections;
