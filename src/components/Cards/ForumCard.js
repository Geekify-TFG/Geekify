import React from 'react';
import {AppColors} from "../../resources/AppColors";
import {useHistory} from "react-router-dom";
import {makeStyles} from "@mui/styles";
import {Avatar, Button, Card, CardActionArea, CardContent, CardMedia, Grid, Paper, Typography} from '@material-ui/core';
import {useTheme} from '@mui/material/styles';

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
                       height, width,
                       paddingLeft
                   }) => {
    const classes = useStyles();
    const history = useHistory()

    const onClickHandler = () => {
        history.push({
            pathname: `/forum/${forumId}`,
            state: {detail: forumId, title: forumTitle}
        })


    }
    const theme = useTheme();


    return (
        <Card elevation={0} className={classes.root}>
            <CardActionArea style={{marginRight: '2em', height: '120px', width: '120px'}} onClick={onClickHandler}>

                <CardMedia
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
                            <Typography style={{color: AppColors.WHITE, fontSize: '30px'}}>
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
                    }}>
                        <Typography style={{fontSize: '20px', color: AppColors.WHITE}}>
                            Unirse al grupo
                        </Typography>
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

        </Card>
    )


}

ForumCard.propTypes = {}

export default ForumCard;
