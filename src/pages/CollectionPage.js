import React, {useEffect, useState} from 'react';
import {
    Button,
    CircularProgress,
    Fade,
    FormControl,
    Grid,
    InputAdornment,
    Menu,
    MenuItem,
    Typography
} from "@material-ui/core";
import {MY_BASE_PATH, MY_COLLECTION} from "../resources/ApiUrls";
import axios from "axios";
import GridGames from "../components/GridGames/GridGames";
import {useHistory, useLocation} from "react-router-dom";
import SearchBar from "../components/SearchBar/SearchBar";
import {makeStyles} from "@material-ui/core/styles";
import {AppColors} from "../resources/AppColors";
import ProfileButton from "../components/ProfileButton/ProfileButton";
import IconProvider from "../components/IconProvider/IconProvider";
import Icons from "../resources/Icons";
import {DialogTexts, ErrorTexts, LabelsSnackbar, menuOptions} from "../locale/en";
import DialogGeekify from "../components/DialogGeekify";
import TextFieldGeekify from "../components/TextFieldGeekify/textFieldGeekify";
import SnackBarGeekify from "../components/SnackbarGeekify/SnackbarGeekify";
import {StorageManager} from "../utils";
import ErrorIcon from "@material-ui/icons/Error";


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


function EditCollectionModal({
                                 gameId,
                                 collections,
                                 showEditCollection,
                                 setShowEditCollection,
                                 loading, setLoading,
                                 openSnackEditCollection,
                                 setOpenSnackEditCollection,
                                 collection,
                                 collectionId, getCollection
                             }) {
    const [titleCollection, setTitleCollection] = useState(collection.title)
    const [imageCollection, setImageCollection] = useState(collection.image)
    const [showErrorURL, setShowErrorURL] = useState(false)
    const storageManager = new StorageManager()

    const handleClickSubmit = async () => {
        var image = imageCollection === undefined ? collection.image : imageCollection
        if (isValidURL(image)) {
            try {
                const config = {auth: {username: storageManager.getToken()}}

                var collectionBody = {'title': titleCollection, 'image': image}
                const response = await axios.put(`${MY_BASE_PATH}${MY_COLLECTION(collectionId)}`, collectionBody, config)
                setShowEditCollection(-999)
                setLoading(true)
                setOpenSnackEditCollection(true)
                getCollection()
            } catch (e) {
                console.log('Error: ', e)
            }
        } else {
            setShowErrorURL(true)
        }

    }

    const isValidURL = (string) => {
        var res
        if (string === undefined) res = null
        else {
            res = string.match(/(https?:\/\/.*\.(?:png|jpg))/i);
        }
        return (res != null)
    }


    const handleInputChangeTitle = e => {
        const {name, value} = e.target
        setTitleCollection(value)
    }
    const handleInputChangeImage = e => {
        const {name, value} = e.target
        setImageCollection(value)
    }
    return (
        <DialogGeekify
            textCancelButton={DialogTexts.CANCEL}
            textConfirmButton={DialogTexts.SAVE}
            handleShow={setShowEditCollection}
            handleConfirm={handleClickSubmit}
            buttonColor={AppColors.PRIMARY}
            title={DialogTexts.EDIT_COLLECTION}
            body={
                <Grid container>
                    <FormControl margin='normal' style={{width: '100%'}}>
                        <TextFieldGeekify
                            value={collection.title}
                            name='Title of collection'
                            default
                            handleChange={handleInputChangeTitle}
                            label='Title of collection'
                        />
                    </FormControl>
                    <FormControl margin='normal' style={{width: '100%'}}>

                        <TextFieldGeekify
                            value={collection.image}
                            name='Link of the background image'
                            default
                            handleChange={handleInputChangeImage}
                            label='Link of the background image'
                            error={showErrorURL}
                            helperText={showErrorURL && ErrorTexts.URL_COLLECTION}
                            inputProps={{
                                endAdornment: showErrorURL && <InputAdornment position="end"><ErrorIcon
                                    style={{color: AppColors.RED}}/></InputAdornment>,
                            }}
                        />
                    </FormControl>

                </Grid>
            }
            show={showEditCollection}

        />
    )
}


function DeleteCollectionModal({
                                   collectionId,
                                   showDeleteCollection,
                                   setShowDeleteCollection,
                                   getCollections,
                                   loading, setLoading,
                                   openSnackDeleteCollection,
                                   setOpenSnackDeleteCollection
                               }) {
    const history = useHistory()

    const handleClickSubmit = async () => {
        try {
            const response = await axios.delete(`${MY_BASE_PATH}${MY_COLLECTION(collectionId)}`)

            setShowDeleteCollection(false)
            setLoading(true)
            setOpenSnackDeleteCollection(true)
            setTimeout(() => {
                history.push({
                    pathname: '/collections',
                })
            }, 1000)
        } catch (e) {
            console.log('Error: ', e)
        }
    }


    return (
        <DialogGeekify
            textCancelButton={DialogTexts.CANCEL}
            textConfirmButton={DialogTexts.DELETE}
            handleShow={setShowDeleteCollection}
            handleConfirm={handleClickSubmit}
            title={DialogTexts.DELETE_COLLECTION}
            buttonColor={AppColors.RED}
            body={
                <>
                    <Typography variant="subtitle1" style={{color: AppColors.WHITE}} gutterBottom>
                        {"Are you sure you want to delete this collection?"}
                    </Typography>
                </>
            }
            show={showDeleteCollection}

        />
    )
}


const CollectionPage = () => {
    const [games, setGames] = useState();
    const history = useHistory()
    const location = useLocation();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const [loading, setLoading] = useState(false);
    const [collection, setCollection] = useState(false);
    const [showDeleteCollectionModal, setShowDeleteCollectionModal] = useState(false);
    const [showEditCollectionModal, setShowEditCollectionModal] = useState(-999);
    const [openSnackDeleteCollection, setOpenSnackDeleteCollection] = useState(false);
    const [openSnackEditCollection, setOpenSnackEditCollection] = useState(false);
    const titleCollection = location.state.title
    const idCollection = location.state.detail
    const storageManager = new StorageManager()

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const handleOnEdit = () => {
        setShowEditCollectionModal(1)
    }

    const handleOnDelete = () => {
        setShowDeleteCollectionModal(true)
    }

    const handleCloseSnackDeleteCollection = async () => {
        setOpenSnackDeleteCollection(false)
    }

    const handleCloseSnackEditCollection = async () => {
        setOpenSnackEditCollection(false)
    }

    //Function to get all the games
    const getGames = async () => {
        try {
            var data = []
            const config = {auth: {username: storageManager.getToken()}}
            const response = await axios.get(`${MY_BASE_PATH}${MY_COLLECTION(idCollection)}`, config);
            setCollection(response.data.collection.value)
            setGames(response.data.collection.value.games)
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
                            <ProfileButton/>
                        </Grid>


                    </Grid>

                </Grid>
                <Grid container
                      direction={"column"}>
                    <Grid container justifyContent={"space-between"}>
                        <Grid item style={{marginLeft: '4em'}}>
                            <Typography
                                style={{fontSize: '40px', color: AppColors.WHITE}}>{collection.title}</Typography>
                        </Grid>
                        <Grid item style={{marginRight: '4em'}}>
                            <Button data-testid={"menuButton"} style={{
                                color: AppColors.WHITE,
                                marginTop: '1em',
                                backgroundColor: AppColors.BACKGROUND_DRAWER
                            }} aria-controls="fade-menu"
                                    aria-haspopup="true" onClick={handleClick}>
                                <IconProvider icon={<Icons.MORE style={{
                                    verticalAlign: "middle",
                                    display: "inline-flex",
                                }} size="4em"/>}/>
                            </Button>
                            <Menu
                                style={{
                                    boxShadow: "3px 3px 3px 1px rgba(0,0,0,.16)"
                                }}
                                color={AppColors.WHITE}
                                id="fade-menu"
                                anchorEl={anchorEl}
                                anchorOrigin={{vertical: "bottom", horizontal: "right"}}
                                keepMounted
                                open={open}
                                onClose={handleClose}
                                TransitionComponent={Fade}>
                                <MenuItem data-testid="editOption" style={{color: AppColors.PRIMARY}}
                                          onClick={() => {
                                              handleOnEdit();
                                              handleClose()
                                          }}> {menuOptions.EDIT} </MenuItem>

                                <MenuItem data-testid="deleteOption" style={{color: AppColors.PRIMARY}}
                                          onClick={() => {
                                              handleOnDelete();
                                              handleClose()
                                          }}> {menuOptions.DELETE}</MenuItem>
                            </Menu>
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
            <SnackBarGeekify handleClose={handleCloseSnackDeleteCollection}
                             message={LabelsSnackbar.COLLECTION_DELETED}
                             openSnack={openSnackDeleteCollection}/>
            <SnackBarGeekify handleClose={handleCloseSnackEditCollection}
                             message={LabelsSnackbar.COLLECTION_EDITED}
                             openSnack={openSnackEditCollection}/>

            {showDeleteCollectionModal && (
                <DeleteCollectionModal
                    showDeleteCollection={showDeleteCollectionModal}
                    setShowDeleteCollection={setShowDeleteCollectionModal}
                    loading={loading}
                    setLoading={setLoading}
                    collectionId={idCollection}
                    setOpenSnackDeleteCollection={setOpenSnackDeleteCollection}
                    openSnackDeleteCollection={openSnackDeleteCollection}
                />
            )}

            {showEditCollectionModal && (
                <EditCollectionModal
                    showEditCollection={showEditCollectionModal}
                    setShowEditCollection={setShowEditCollectionModal}
                    loading={loading}
                    setLoading={setLoading}
                    collectionId={idCollection}
                    setOpenSnackEditCollection={setOpenSnackEditCollection}
                    openSnackEditCollection={openSnackEditCollection}
                    collection={collection}
                    getCollection={getGames}
                />
            )}
        </>
    )
}

export default CollectionPage;
