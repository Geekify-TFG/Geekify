/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useState } from "react";
import { AppColors } from "../../resources/AppColors";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Button, Card, CardActionArea, CardContent, CardMedia, Grid, Paper, Typography } from "@material-ui/core";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import { JOIN_FORUM } from "../../resources/ApiUrls";
import { StorageManager } from "../../utils";
import { LabelsSnackbar } from "../../locale/en";
import SnackBarGeekify from "../SnackbarGeekify/SnackbarGeekify";

const useStyles = makeStyles({
    root: {
        display: "flex",
        backgroundColor: AppColors.BACKGROUND
    },
    details: {
        marginLeft: 0,
        flexDirection: "column",
    },
    content: {
        flex: "1 0 auto",
        paddingLeft: "2px"
    },
    cover: {
        width: 151,
        margin: "1em",
        borderRadius: 30
    },
    controls: {
        display: "flex",
        alignItems: "center",
        marginBottom: "2em",
        marginLeft: "1em",
    },
    playIcon: {
        height: 38,
        width: 38,
    },

}, { index: 1 });

/**
 * @component
 * Component to create the card of the forum
 *
 * @param {string} props.forumId: id of the forum
 * @param {string} props.forumTitle: title of the forum
 * @param {string} props.forumDescription: description of the forum
 * @param {string} props.forumNumUsers: num users of the forum
 * @param {string} props.forumImage: image of the forum
 * @param {string} props.forumGenre: genre of the forum
 * @param {string} props.forumGame: game of the forum
 * @param {string} props.followingForums: forums that the user is following
 * @param {function} props.getForumsFollowed: function to get the forums that the user is following
 * 
 * @returns {object} JSX
 */
const ForumCard = props => {
    const { forumId, forumTitle, forumDescription, forumNumUsers, forumImage, forumGenre, followingForums, getForumsFollowed, width } = props;
    const classes = useStyles();
    const history = useHistory()
    const storageManager = new StorageManager()
    const [openSnackFollowedForum, setOpenSnackFollowedForum] = useState()
    const [openSnackUnfollowedForum, setOpenSnackUnfollowedForum] = useState()
    const [openSnackFollowLogin, setOpenSnackFollowLogin] = useState()

    const onClickHandler = () => {
        history.push({
            pathname: `/forum/${forumId}`,
            state: { detail: forumId, title: forumTitle }
        })
    }
    const handleClickJoinForum = async () => {
        if (storageManager.getToken()) {
            try {
                var body = { "forums_followed": forumId }
                const config = { auth: { username: storageManager.getToken() } }
                const response = await axios.post(`${JOIN_FORUM(storageManager.getEmail())}`, body, config)
                if (response.data.account.value.forums_followed.includes(forumId)) {
                    setOpenSnackFollowedForum(true)

                } else {
                    setOpenSnackUnfollowedForum(true)

                }
                getForumsFollowed()
            } catch (e) {
                console.log("Error: ", e)
            }
        } else {
            setOpenSnackFollowLogin(true)
        }
    }

    const handleCloseSnackFollowedForum = async () => {
        setOpenSnackFollowedForum(false)
    }
    const handleCloseSnackUnfollowedForum = async () => {
        setOpenSnackUnfollowedForum(false)
    }
    const handleCloseSnackFollowLogin = async () => {
        setOpenSnackFollowLogin(false)
    }

    return (
        <Card style={{ width: width }} elevation={0} className={classes.root}>
            <CardActionArea style={{ marginRight: "2em", height: "120px", width: "120px" }} onClick={onClickHandler}>

                <CardMedia
                    data-testid={"btnEnterForum"}
                    className={classes.cover}
                    image={forumImage}
                    style={{ height: "120px", width: "120px" }}
                    title="Live from space album cover"
                />
            </CardActionArea>
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Grid container justifyContent={"space-between"} direction={"row"}>
                        <Grid item>
                            <Typography onClick={onClickHandler} style={{ cursor: "pointer", color: AppColors.WHITE, fontSize: "25px", fontWeight: "bold" }}>
                                {forumTitle}
                            </Typography>
                        </Grid>
                        <Grid item style={{ marginTop: "0.5em" }}>
                            <Paper
                                style={{ width: "5em", borderRadius: 20, backgroundColor: AppColors.BACKGROUND_DRAWER }}>
                                <Grid container>
                                    <Avatar style={{
                                        width: "36px",
                                        height: "36px",
                                        backgroundColor: AppColors.BACKGROUND_DRAWER
                                    }}>
                                    </Avatar>
                                    <Typography style={{ color: AppColors.WHITE, fontSize: "20px", marginTop: "2px" }}>
                                        {forumNumUsers}
                                    </Typography>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Typography style={{ color: AppColors.WHITE, fontSize: "20px" }}>
                        {forumDescription}
                    </Typography>

                </CardContent>
                <div className={classes.controls}>
                    <Button style={{
                        backgroundColor: AppColors.PRIMARY,
                        borderRadius: 30,
                        border: "2px solid #6563FF",
                        borderColor: AppColors.PRIMARY,
                        height: "2em",
                        textTransform: "none",
                        marginRight: "1em",
                    }} onClick={handleClickJoinForum}>
                        {!followingForums ? <Typography style={{ fontSize: "20px", color: AppColors.WHITE }}>
                            Join the forum
                        </Typography> :
                            <Typography style={{ fontSize: "20px", color: AppColors.WHITE }}>
                                You are in the forum
                            </Typography>}
                    </Button>
                    <Paper
                        style={{ width: "auto", borderRadius: 20, backgroundColor: AppColors.BACKGROUND_DRAWER }}>
                        <Typography
                            style={{ marginLeft: "1em", marginRight: "1em", fontSize: "20px", color: AppColors.WHITE }}>
                            {forumGenre.toUpperCase()}
                        </Typography>
                    </Paper>

                </div>
            </div>
            <SnackBarGeekify handleClose={handleCloseSnackFollowedForum}
                message={LabelsSnackbar.FOLLOW_FORUM}
                openSnack={openSnackFollowedForum} />
            <SnackBarGeekify handleClose={handleCloseSnackUnfollowedForum} severity={"warning"}
                message={LabelsSnackbar.UNFOLLOW_FORUM}
                openSnack={openSnackUnfollowedForum} />
            <SnackBarGeekify handleClose={handleCloseSnackFollowLogin} severity={"warning"}
                message={LabelsSnackbar.FOLLOW_FORUM_LOGIN}
                openSnack={openSnackFollowLogin} />
        </Card>

    )

}

ForumCard.propTypes = {}

export default ForumCard;
