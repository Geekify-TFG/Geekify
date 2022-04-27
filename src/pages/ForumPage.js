/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-shadow */

import React, { useEffect, useState } from "react";
import {
    Avatar,
    Button, Fade,
    Grid,
    IconButton,
    InputAdornment,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText, Menu, MenuItem,
    TextField,
    Typography
} from "@material-ui/core";
import SearchBar from "../components/SearchBar/SearchBar";
import { makeStyles } from "@material-ui/core/styles";
import { AppColors } from "../resources/AppColors";
import { DialogTexts, LabelsForumsPage, LabelsSnackbar, menuOptions } from "../locale/en";
import { useHistory, useLocation } from "react-router-dom";
import ProfileButton from "../components/ProfileButton/ProfileButton";
import { StorageManager } from "../utils";
import axios from "axios";
import { DELETE_FORUM, GET_PUBLICATIONS, INFO_FORUM, JOIN_FORUM, POST_PUBLICATION } from "../resources/ApiUrls";
import DialogGeekify from "../components/DialogGeekify";
import SnackBarGeekify from "../components/SnackbarGeekify/SnackbarGeekify";
import PublicationCard from "../components/Cards/PublicationCard";
import accountIcon from "../img/account_icon.svg";
import CheckIcon from "@mui/icons-material/Check";
import CardGeekify from "../components/Cards/CardGeekify";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import {
    FacebookIcon,
    FacebookShareButton,
    TwitterIcon,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton
} from "react-share";
import IconProvider from "../components/IconProvider/IconProvider";
import Icons from "../resources/Icons";

const useStyles = makeStyles((theme) => ({

    singleBlogBg: {
        content: "",
        position: "relative",
        left: 0,
        right: 0,
        bottom: 0,
        background: "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)",
        opacity: ".5",
    }, imageIcon: {
        height: "100%"
    }, avatar: {
        border: "1px solid #C6D2E3",
        "&.MuiAvatar-img": {
            width: "20px",
            height: "20px",

        }

    }, root: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        "& > *:not(:last-child)": {
            marginRight: theme.spacing(2)
        }
    }, textFieldLabel: {
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: AppColors.PRIMARY,
                opacity: "0.2",
                borderRadius: 10,
            },
        }, "& .MuiInputBase-root": {
            color: AppColors.PRIMARY,
        }, "& .MuiInputLabel-root": {
            color: AppColors.PRIMARY,
        }, "& .MuiTextField-root": {
            height: "25em",
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

}))

function DeleteForumModal({
    showDeleteForumModal,
    setShowDeleteForumModal,
    loading,
    setLoading,
    forumId,
    setOpenSnackDeleteForum,
    openSnackDeleteForum,
}) {
    const history = useHistory()

    const handleClickSubmit = async () => {
        try {
            const response = await axios.delete(`${DELETE_FORUM(forumId)}`)

            setShowDeleteForumModal(false)
            setLoading(true)
            setOpenSnackDeleteForum(true)
            setTimeout(() => {
                history.push({
                    pathname: "/forums",
                })
            }, 1000)
        } catch (e) {
            console.log("Error: ", e)
        }
    }

    return (
        <DialogGeekify
            textCancelButton={DialogTexts.CANCEL}
            textConfirmButton={DialogTexts.DELETE}
            handleShow={setShowDeleteForumModal}
            handleConfirm={handleClickSubmit}
            title={DialogTexts.DELETE_COLLECTION}
            buttonColor={AppColors.RED}
            body={
                <>
                    <Typography variant="subtitle1" style={{ color: AppColors.WHITE }} gutterBottom>
                        {"Are you sure you want to delete this forum?"}
                    </Typography>
                </>
            }
            show={showDeleteForumModal}

        />
    )
}

const ForumPage = () => {
    const [forumPosts2, setForumPosts2] = useState([]);
    const [forum, setForum] = useState();
    const [loading, setLoading] = useState(false);
    const [followingForums, setFollowingForums] = useState(null);
    const [showDeleteForumModal, setShowDeleteForumModal] = useState();
    const [publication, setPublication] = useState();
    const [openSnackDeleteForum, setOpenSnackDeleteForum] = useState();
    const [openSnackBarPublication, setOpenSnackBarPublication] = useState();
    const forumId = new URL(window.location).pathname.split("/")[2]
    const classes = useStyles();
    const history = useHistory()
    const [flag, setFlag] = useState(false)
    const storageManager = new StorageManager()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    //Function to get all the games
    const getForum = async () => {
        try {
            const response = await axios.get(`${INFO_FORUM(forumId)}`);
            setForum(response.data.forum.value)
            setLoading(false)

        } catch (err) {
            console.log(err.message)
        }
    }

    //Function to get all the games
    const getPublications = async () => {
        try {
            const response2 = await axios.get(`${GET_PUBLICATIONS(forumId)}`);
            setForumPosts2(response2.data.publications)
            setLoading(false)

        } catch (err) {
            console.log(err.message)
        }
    }

    const getForumsFollowed = async () => {
        try {
            const config = { auth: { username: storageManager.getToken() } }
            const response = await axios.get(`${JOIN_FORUM(storageManager.getEmail())}`, config)
            setFollowingForums(response.data.forums_followed)
        } catch (e) {
            console.log("Error: ", e)
        }
    }

    const postPublication = async () => {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0");
        const yyyy = today.getFullYear();
        const date = dd + "/" + mm + "/" + yyyy;
        try {
            const body = {
                date: date,
                content: publication,
                user: storageManager.getEmail(),
            };
            const config = { auth: { username: storageManager.getToken() } }
            const response = await axios.post(`${POST_PUBLICATION(forumId)}`, body, config);
            setLoading(true)
            setOpenSnackBarPublication(true)
            getPublications()
        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        getForum()
        getPublications()
        getForumsFollowed()
    }, []);

    useEffect(() => {
        getForum()
        getPublications()
        getForumsFollowed()
    }, [flag]);

    const handleDeleteForum = () => {
        setShowDeleteForumModal(true)
    }

    const handleEditForum = () => {
        history.push({
            pathname: `/forum/${forumId}/edit`,
            state: { detail: forumId }
        })
    }

    const handleCloseSnackDeleteForum = async () => {
        setOpenSnackDeleteForum(false)
    }
    const handleCloseSnackPublication = async () => {
        setOpenSnackBarPublication(false)
    }

    const handleGoForum = (elem) => {
        setFlag(true)
        history.push({
            pathname: `/forum/${elem.id}`,
            state: { title: elem.value.title, detail: elem.id }
        })
    }

    return (
        <>
            {forum && <Grid container alignItems={"center"}>
                <Grid container alignItems="flex-start"
                    direction={"column"} style={{
                        height: "20em",
                        backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0), rgba(29,29,29,1)),url(${forum.image})`,
                        backgroundSize: "cover",
                    }}>
                    <Grid container direction={"row"} justifyContent={"space-between"} spacing={20}>
                        <Grid item style={{ margin: "2em" }}>
                            <SearchBar />
                        </Grid>

                        <Grid item style={{ margin: "2em" }}>
                            <ProfileButton />
                        </Grid>
                    </Grid>

                </Grid>
                <Grid container
                    direction={"row"} style={{ marginTop: "2em", marginBottom: "2em" }}>
                    <Grid item style={{ marginLeft: "2em" }}>
                        <Grid container direction={"row"} justifyContent={"space-between"}>

                            <Typography
                                style={{
                                    fontSize: "40px",
                                    color: AppColors.WHITE
                                }}>{(`${forum.title}`).toUpperCase()}</Typography>
                            <Button data-testid={"menuButton"} style={{
                                color: AppColors.WHITE,
                                marginTop: "1em",
                                backgroundColor: AppColors.BACKGROUND_DRAWER
                            }} aria-controls="fade-menu"
                                aria-haspopup="true" onClick={handleClick}>
                                <IconProvider icon={<Icons.MORE style={{
                                    verticalAlign: "middle",
                                    display: "inline-flex",
                                }} size="4em" />} />
                            </Button>

                            <Menu
                                style={{
                                    boxShadow: "3px 3px 3px 1px rgba(0,0,0,.16)"
                                }}
                                color={AppColors.WHITE}
                                id="fade-menu"
                                anchorEl={anchorEl}
                                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                                keepMounted
                                open={open}
                                onClose={handleClose}
                                TransitionComponent={Fade}>
                                <MenuItem data-testid="editOption" style={{ color: AppColors.PRIMARY }}
                                    onClick={() => {
                                        handleEditForum();
                                        handleClose()
                                    }}> {menuOptions.EDIT} </MenuItem>

                                <MenuItem data-testid="deleteOption" style={{ color: AppColors.PRIMARY }}
                                    onClick={() => {
                                        handleDeleteForum();
                                        handleClose()
                                    }}> {menuOptions.DELETE}</MenuItem>
                            </Menu>

                            {/*{forum && storageManager.getEmail() === forum.admin &&
                            <Button
                                data-testid={"btnEditForum"}
                                style={{
                                    backgroundColor: AppColors.PRIMARY,
                                    borderRadius: 20,
                                    maxWidth: "10em"
                                }}
                                onClick={handleEditForum}
                            >
                                <Typography style={{color: AppColors.WHITE, marginBottom: 0, fontSize: "14px"}}
                                            gutterBottom
                                >
                                    {LabelsForumsPage.EDIT_FORUM}
                                </Typography>
                            </Button>}

                            {forum && storageManager.getEmail() === forum.admin &&
                            <Button
                                data-testid={"btnDeleteForum"}
                                style={{
                                    backgroundColor: AppColors.RED,
                                    borderRadius: 20,
                                    maxWidth: "10em"
                                }}
                                onClick={handleDeleteForum}
                            >
                                <Typography style={{color: AppColors.WHITE, marginBottom: 0, fontSize: "14px"}}
                                            gutterBottom
                                >
                                    {LabelsForumsPage.DELETE_FORUM}
                                </Typography>
                            </Button>}*/}
                        </Grid>
                        <Grid container style={{ marginTop: "1em" }} direction={"row"}>
                            <FacebookShareButton
                                url={`https://localhost:3000/forum/${forumId}`}
                                quote={"Look what forum I just discovered"}
                                hashtag={"#Geekify"}
                            >
                                <FacebookIcon size={32} round />
                            </FacebookShareButton>
                            <WhatsappShareButton
                                title={"Look what forum I just discovered"}
                                url={`https://localhost:3000/forum/${forumId}`}
                                hashtags={"#Geekify"}
                            >
                                <WhatsappIcon size={32} round />
                            </WhatsappShareButton>
                            <TwitterShareButton
                                title={"Look what forum I just discovered"}
                                url={`https://localhost:3000/forum/${forumId}`}
                                hashtags={"#Geekify"}
                            >
                                <TwitterIcon size={32} round />
                            </TwitterShareButton>
                        </Grid>
                        {!loading && <Grid item>

                            <TextField
                                data-testid="textfieldPublication"
                                style={{ width: "45em" }}
                                onChange={(e) => setPublication(e.target.value)}
                                type="text"
                                disabled={!storageManager.getToken()}
                                placeholder={storageManager.getToken() ? "" : "You must be logged to comment"}
                                label={"Publish about something"}
                                margin="normal"
                                variant="outlined"
                                multiline
                                className={classes.textFieldLabel}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">

                                            <img alt="icon" style={{ width: "36px", height: "36px", borderRadius: 20 }}
                                                src={storageManager.getToken() ? storageManager.getImage() : accountIcon} />
                                        </InputAdornment>

                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">

                                            <IconButton data-testid={"postPublication"}
                                                style={{ color: AppColors.PRIMARY }}
                                                onClick={() => postPublication()}>
                                                <KeyboardReturnIcon />
                                            </IconButton>
                                        </InputAdornment>

                                    ),
                                }}
                            />
                        </Grid>}

                        {forumPosts2 &&
                            Object.entries(forumPosts2).map(publication => (
                                <Grid key={publication[0].id} item style={{ paddingLeft: 0, paddingBottom: "2em" }}
                                >
                                    <PublicationCard width={"45em"}
                                        bg={AppColors.BACKGROUND_DRAWER}
                                        publicationKey={publication[0]}
                                        publication={publication[1]}
                                        getPublications={getPublications}
                                        favorited={publication[1].likes.includes(storageManager.getEmail())}
                                    />
                                </Grid>
                            ))}
                    </Grid>

                    <Grid item style={{ marginLeft: "4em" }}>
                        <Grid item style={{ marginBottom: "4em", }}>
                            <CardGeekify bg={AppColors.BACKGROUND_DRAWER} borderRadius={50} height={"auto"}
                                width={"350px"}>
                                <Grid
                                    container
                                >
                                    <Grid item style={{ backgroundColor: AppColors.PRIMARY, width: "350px", height: "60px" }}>

                                        <Typography
                                            style={{
                                                fontSize: "20px",
                                                color: AppColors.WHITE,
                                                marginLeft: "3em",
                                                marginTop: "1em"
                                            }}>{LabelsForumsPage.FOLLOWING_GROUPS.toUpperCase()}</Typography>
                                    </Grid>

                                    {followingForums ? <List style={{ marginLeft: "1em", marginTop: "0.5em" }}>
                                        {followingForums &&
                                            followingForums.map(elem => (
                                                <ListItem key={elem.value}>
                                                    <ListItemAvatar>
                                                        <Avatar alt="Remy Sharp" src={elem.value.image} />
                                                    </ListItemAvatar>
                                                    <ListItemText onClick={() => handleGoForum(elem)}
                                                        style={{ color: AppColors.WHITE, marginRight: "5em" }}
                                                        primary={elem.value.title}
                                                    />
                                                    <ListItemText style={{ color: AppColors.GRAY }}
                                                        primary={elem.value.game}
                                                    />
                                                </ListItem>

                                            ))}

                                    </List> :
                                        <Typography
                                            style={{
                                                fontSize: "30px",
                                                color: AppColors.PRIMARY,
                                                marginLeft: "1.5em",
                                                marginTop: "1em"
                                            }}>{LabelsForumsPage.FOLLOWING_GROUPS_NOT_LOGGED}</Typography>
                                    }
                                </Grid>

                            </CardGeekify>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>}
            <SnackBarGeekify handleClose={handleCloseSnackDeleteForum}
                message={LabelsSnackbar.FORUM_DELETED}
                openSnack={openSnackDeleteForum} />
            <SnackBarGeekify handleClose={handleCloseSnackPublication}
                message={LabelsSnackbar.PUBLICATION_SUCCESSFULLY}
                openSnack={openSnackBarPublication} />
            {showDeleteForumModal && (
                <DeleteForumModal
                    showDeleteForumModal={showDeleteForumModal}
                    setShowDeleteForumModal={setShowDeleteForumModal}
                    loading={loading}
                    setLoading={setLoading}
                    forumId={forumId}
                    setOpenSnackDeleteForum={setOpenSnackDeleteForum}
                    openSnackDeleteForum={openSnackDeleteForum}
                />
            )}
        </>
    )
}

export default ForumPage;
