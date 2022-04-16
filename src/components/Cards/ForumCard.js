import React, {useEffect, useState} from 'react';
import {AppColors} from "../../resources/AppColors";
import {useHistory} from "react-router-dom";
import {makeStyles} from "@mui/styles";
import {Avatar, Button, Card, CardActionArea, CardContent, CardMedia, Grid, Paper, Typography} from '@material-ui/core';
import {useTheme} from '@mui/material/styles';
import axios from "axios";
import {CREATE_COLLECTION, JOIN_FORUM, MY_BASE_PATH} from "../../resources/ApiUrls";
import {StorageManager} from "../../utils";
import {LabelsSnackbar} from "../../locale/en";
import SnackBarGeekify from "../SnackbarGeekify/SnackbarGeekify";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        width: '40em',
        backgroundColor: AppColors.BACKGROUND
    },
    details: {
        marginLeft: 0,
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
        paddingLeft: '2px'
    },
    cover: {
        width: 151,
        margin: '1em',
        borderRadius: 30
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '2em',
        marginLeft: '1em',
    },
    playIcon: {
        height: 38,
        width: 38,
    },

}));

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
const ForumCard = ({
                       forumId,
                       forumTitle,
                       forumDescription,
                       forumNumUsers,
                       forumImage,
                       forumGenre,
                       forumGame,
                       height, width,
                       paddingLeft,
                       followingForums,
                       getForumsFollowed
                   }) => {
    const classes = useStyles();
    const history = useHistory()
    const storageManager = new StorageManager()
    const [openSnackFollowedForum,setOpenSnackFollowedForum]= useState()
    const theme = useTheme();

    const onClickHandler = () => {
        history.push({
            pathname: `/forum/${forumId}`,
            state: {detail: forumId, title: forumTitle}
        })
    }
    const handleClickJoinForum =async()=>{
        try {
            var body = {'forums_followed': forumId}
            const config = {auth: {username: storageManager.getToken()}}
            const response = await axios.post(`${JOIN_FORUM(storageManager.getEmail())}`, body, config)
            setOpenSnackFollowedForum(true)
            getForumsFollowed()
        } catch (e) {
            console.log('Error: ', e)
        }
    }

    const handleCloseSnackDeleteCollection = async () => {
        setOpenSnackFollowedForum(false)
    }

    return (
        <Card elevation={0} className={classes.root}>
            <CardActionArea style={{marginRight: '2em', height: '120px', width: '120px'}} onClick={onClickHandler}>

                <CardMedia
                    data-testid={"btnEnterForum"}
                    className={classes.cover}
                    image={forumImage}
                    style={{height: '120px', width: '120px'}}
                    title="Live from space album cover"
                />
            </CardActionArea>
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Grid container justifyContent={"space-between"} direction={"row"}>
                        <Grid item>
                            <Typography style={{color: AppColors.WHITE, fontSize: '25px', fontWeight: 'bold'}}>
                                {forumTitle}
                            </Typography>
                        </Grid>
                        <Grid item style={{marginTop: '0.5em'}}>
                            <Paper
                                style={{width: '5em', borderRadius: 20, backgroundColor: AppColors.BACKGROUND_DRAWER}}>
                                <Grid container>
                                    <Avatar style={{
                                        width: '36px',
                                        height: '36px',
                                        backgroundColor: AppColors.BACKGROUND_DRAWER
                                    }}>
                                    </Avatar>
                                    <Typography style={{color: AppColors.WHITE, fontSize: '20px', marginTop: '2px'}}>
                                        {forumNumUsers}
                                    </Typography>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Typography style={{color: AppColors.WHITE, fontSize: '20px'}}>
                        {forumDescription}
                    </Typography>

                </CardContent>
                <div className={classes.controls}>
                    <Button style={{
                        backgroundColor: AppColors.PRIMARY,
                        borderRadius: 30,
                        border: '2px solid #6563FF',
                        borderColor: AppColors.PRIMARY,
                        height: '2em',
                        textTransform: 'none',
                        marginRight: '1em',
                    }} onClick={handleClickJoinForum}>
                        {!followingForums ? <Typography style={{fontSize: '20px', color: AppColors.WHITE}}>
                            Join the forum
                        </Typography>:
                            <Typography style={{fontSize: '20px', color: AppColors.WHITE}}>
                                You are in the forum
                            </Typography>}
                    </Button>
                    <Paper
                        style={{width: 'auto', borderRadius: 20, backgroundColor: AppColors.BACKGROUND_DRAWER}}>
                        <Typography
                            style={{marginLeft: '1em', marginRight: '1em', fontSize: '20px', color: AppColors.WHITE}}>
                            {forumGenre.toUpperCase()}
                        </Typography>
                    </Paper>

                </div>
            </div>
            <SnackBarGeekify handleClose={handleCloseSnackDeleteCollection}
                             message={LabelsSnackbar.FOLLOW_FORUM}
                             openSnack={openSnackFollowedForum}/>
        </Card>

    )


}

ForumCard.propTypes = {}

export default ForumCard;
