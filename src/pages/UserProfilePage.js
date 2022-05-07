/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable camelcase */
import React, { useEffect, useState, useRef } from "react";
import {
    Avatar,
    ButtonGroup,
    CircularProgress,
    FormControl,
    Grid,
    InputLabel,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    MenuItem,
    Select,
    TextField,
    IconButton,
} from "@material-ui/core";
import { Button, Typography } from "@mui/material";
import SearchBar from "../components/SearchBar/SearchBar";
import { AppColors } from "../resources/AppColors";
import { DialogTexts, LabelsProfilePage, LabelsSnackbar } from "../locale/en";
import { makeStyles } from "@mui/styles";
import { AppTextsFontSize, AppTextsFontWeight } from "../resources/AppTexts";
import { followingUsersMock } from "../mocks/FollowingUsersMock";
import CardGeekify from "../components/Cards/CardGeekify";
import ReviewCard from "../components/Cards/ReviewCard";
import ProfileButton from "../components/ProfileButton/ProfileButton";
import axios from "axios";
import { INFO_URL, LIST_GAMES } from "../resources/ApiUrls";
import { StorageManager } from "../utils";
import ButtonFilled from "../components/ButtonFilled/ButtonFilled";
import DialogGeekify from "../components/DialogGeekify";
import Icons from "../resources/Icons";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Photo } from "@material-ui/icons";
import SnackBarGeekify from "../components/SnackbarGeekify/SnackbarGeekify";
import eldenImage from "../img/elden_background.jpeg"
import tlouImage from "../img/tlou_background.jpeg";

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)",
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
            cursor: "pointer",
            textDecoration: `underline ${AppColors.WHITE}`
        }
    }, cardHeaderRoot: {
        overflow: "hidden"
    },
    cardHeaderContent: {
        overflow: "hidden"
    },
    textFieldLabel: {
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
        backgroundColor: AppColors.BACKGROUND,
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
    buttonGroup: {
        flexDirection: "column",
        "& > *:not(:last-child)": {
            marginTop: "1em"
        }
    },
    textFieldLabelDatePicker: {
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
        },
        color: AppColors.PRIMARY,
        backgroundColor: AppColors.BACKGROUND,
        borderRadius: 10,
    }

}));

const UserProfilePage = () => {
    const storageManager = new StorageManager();
    // const email = storageManager.getEmail()
    const classes = useStyles();
    const [infoUser, setInfoUser] = useState()
    const [followingUsers, setFollowingUsers] = useState();
    const [showEditProfileModal, setShowEditProfileModal] = useState(-999)
    const [showEditImageModal, setShowEditImageModal] = useState(-999)
    const [openSnackEditProfile, setOpenSnackEditProfile] = useState(false)
    const [loading, setLoading] = useState(true)
    const email = useRef();

    const retriveStorageData = async () => {
        const newItem = JSON.parse(localStorage.getItem("userDetails"));
        console.log(newItem.detail)
        email.current = newItem.detail;
    }

    useEffect(() => {
        retriveStorageData();

    }, [])

    const getInfouser = async () => {
        try {
            const response = await axios.get(`${INFO_URL(email.current)}`);
            console.log(response.data.account.value)
            setInfoUser(response.data.account.value)
            setLoading(false)
        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        setFollowingUsers(followingUsersMock)
        getInfouser()
    }, [email.current]);

    const onClickHandler = (userEmail) => {
        console.log(userEmail)
        //localStorage.setItem("userRoute")
        const newObj = { "detail": userEmail }
        localStorage.setItem("userDetails", JSON.stringify(newObj));

        history.push({
            pathname: `/user/${userEmail.split("@")[0]}`,
            state: { detail: userEmail }
        })

    }
    console.log(infoUser)

    return (
        <>
            {loading ? (
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <CircularProgress />
                </div>) : <Grid container justifyContent={"space-between"} alignItems={"center"}>
                <Grid container alignItems="flex-start"
                    direction={"column"} style={{
                        height: "15em",
                        backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0), rgba(29,29,29,1)),url(${infoUser.all_games ? infoUser.all_games[0].background_image : tlouImage})`,
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
                <Grid container alignItems="flex-start"
                    direction={"column"} style={{
                        width: "100%",
                        backgroundColor: AppColors.BACKGROUND,
                    }}>
                    <Grid item style={{ marginLeft: "2em" }}>
                        <Grid container alignItems={"center"} spacing={8}
                        >
                            {infoUser.photo && <Grid item xs={4}>
                                <IconButton>
                                    <Avatar style={{ width: "150px", height: "150px", backgroundColor: AppColors.PRIMARY }}
                                        src={infoUser.photo} />
                                </IconButton>
                            </Grid>}
                            {infoUser.name && <Grid item xs={6} >
                                <Typography
                                    style={{
                                        fontSize: "40px",
                                        color: AppColors.WHITE
                                    }}>{infoUser.name}</Typography>
                            </Grid>}
                            <Grid item xs={2}>
                                <ButtonFilled width={"20em"} text={LabelsProfilePage.FOLLOW_USER}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container
                        direction={"row"} style={{ marginTop: "2em", marginBottom: "2em" }}>
                        <Grid item style={{ marginLeft: "2em" }}>
                            <CardGeekify bg={AppColors.BACKGROUND_DRAWER} borderRadius={20} height={"auto"}
                                width={"20em"}>
                                {infoUser.gender != null ? <Grid
                                    container style={{ width: "20em" }}
                                >
                                    <List style={{ marginLeft: "1em", marginTop: "0.5em" }}>
                                        <ListItem>
                                            <ListItemText style={{ color: AppColors.WHITE, marginRight: "5em" }}
                                                primary={LabelsProfilePage.GENDER}
                                            />
                                            <ListItemText style={{ color: AppColors.PRIMARY }}
                                                primary={infoUser.gender}
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText style={{ color: AppColors.WHITE, marginRight: "5em" }}
                                                primary={LabelsProfilePage.BIRTHDAY}
                                            />
                                            <ListItemText style={{ color: AppColors.PRIMARY }}
                                                primary={infoUser.birthday}
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText style={{ color: AppColors.WHITE, marginRight: "5em" }}
                                                primary={LabelsProfilePage.LOCATION}
                                            />
                                            <ListItemText style={{ color: AppColors.PRIMARY }}
                                                primary={infoUser.location}
                                            />
                                        </ListItem>
                                        <List style={{ paddingLeft: 0 }} subheader={<li />}>
                                            <li>
                                                <ul style={{ paddingLeft: "15px" }}>
                                                    <ListItemText style={{ color: AppColors.WHITE, marginRight: "5em" }}
                                                        primary={LabelsProfilePage.FAV_CATEGORIES}
                                                    />
                                                    <ButtonGroup className={classes.buttonGroup} color="primary"
                                                    >
                                                        {infoUser.fav_categories.map(elem => (
                                                            <Button key={elem.id} style={{
                                                                backgroundColor: AppColors.PRIMARY,
                                                                borderRadius: 20,
                                                                marginTop: "1em"
                                                            }}
                                                                disabled={true}>
                                                                <Typography
                                                                    style={{ color: AppColors.WHITE, marginBottom: 0 }}
                                                                    gutterBottom
                                                                >
                                                                    {elem}
                                                                </Typography>
                                                            </Button>
                                                        ))}
                                                    </ButtonGroup>
                                                </ul>
                                            </li>
                                        </List>
                                    </List>
                                </Grid> :
                                    <Grid>
                                        <Typography
                                            style={{
                                                fontSize: "20px",
                                                color: AppColors.WHITE,
                                                margin: "1em"
                                            }}>{LabelsProfilePage.NO_INFO_YET_USER}</Typography>
                                    </Grid>}

                            </CardGeekify>
                        </Grid>
                        <Grid item style={{ marginLeft: "1em" }}>
                            <Typography
                                style={{
                                    fontSize: "40px",
                                    color: AppColors.WHITE,
                                    fontWeight: "bold"
                                }}>Favorite games</Typography>
                            {infoUser.top_games.length != 0 ? <Carousel width={"30em"} showThumbs={false}>
                                {infoUser.all_games.map(elem => (
                                    <div key={elem.id}>
                                        <img
                                            alt="icon"
                                            src={elem.background_image}
                                        />
                                    </div>
                                ))}</Carousel> :
                                <Carousel width={"30em"} showThumbs={false}>
                                    <div >
                                        <img
                                            alt="icon"
                                            src={eldenImage}
                                        />
                                    </div>
                                </Carousel>
                            }
                        </Grid>
                        {/* <Grid item style={{ marginLeft: "2em" }}>
                            {Object.keys(infoUser.comment)[0] !== "None" &&
                                <ReviewCard width={"450px"} height={"228px"}
                                    game={Object.values(infoUser.comment)[0].game_comment["name"]}
                                    comment={Object.values(infoUser.comment)[0].content} avatar={infoUser.photo}
                                    bg={AppColors.BACKGROUND_DRAWER} />
                            }
                        </Grid> */}
                        <Grid item style={{ marginBottom: "4em", marginLeft: "1em" }}>
                            <CardGeekify bg={AppColors.BACKGROUND_DRAWER} borderRadius={50} height={"auto"}
                                width={"292px"}>
                                <Grid
                                    container
                                >
                                    <Grid item style={{ backgroundColor: AppColors.PRIMARY, width: "292px", height: "60px" }}>
                                        <Typography
                                            style={{
                                                fontSize: "20px",
                                                color: AppColors.WHITE,
                                                marginLeft: "4em",
                                                marginTop: "1em"
                                            }}>{LabelsProfilePage.FOLLOWING.toUpperCase()}</Typography>
                                    </Grid>

                                    <List style={{ marginLeft: "1em", marginTop: "0.5em" }}>
                                        {infoUser && infoUser.followed_users != null ?
                                            infoUser.followed_users.map((elem, key) => (
                                                <ListItem key={elem} onClick={() => onClickHandler(elem.email)}>
                                                    <ListItemAvatar>
                                                        <Avatar style={{ cursor: "pointer" }} alt="Remy Sharp" src={elem.photo} />
                                                    </ListItemAvatar>
                                                    <ListItemText style={{ color: AppColors.WHITE }}
                                                        classes={{ secondary: AppColors.WHITE }}
                                                        primary={<Typography style={{
                                                            fontSize: "18px",
                                                            color: AppColors.WHITE,
                                                            cursor: "pointer",
                                                        }}>{elem.email.split("@")[0]}</Typography>}

                                                    />
                                                </ListItem>

                                            )) :
                                            <Grid>
                                                <Typography
                                                    style={{
                                                        fontSize: "20px",
                                                        color: AppColors.WHITE,
                                                        margin: "1em"
                                                    }}>{LabelsProfilePage.NO_FOLLOWER_USERS_YET_USER}</Typography>
                                            </Grid>

                                        }

                                    </List>
                                </Grid>

                            </CardGeekify>
                        </Grid>

                    </Grid>

                </Grid>

            </Grid>}

        </>
    )
}

export default UserProfilePage;
