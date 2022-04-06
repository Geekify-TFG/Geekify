import React from 'react';
import {AppColors} from "../../resources/AppColors";
import {useHistory} from "react-router-dom";
import {makeStyles} from "@mui/styles";
import {Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography} from '@material-ui/core';
import {useTheme} from '@mui/material/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        width: '40em',
        backgroundColor: AppColors.WHITE
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
const NewsCard = ({
                      article
                  }) => {
    const classes = useStyles();
    const history = useHistory()

    const theme = useTheme();

    const toNews = (urlArticle) => {
            window.open(urlArticle, '_blank')
    }

    return (
        <Card style={{maxWidth: '50em'}}>
            <CardMedia
                component="img"
                height="140"
                image={article.urlToImage}
                alt="green iguana"
            />
            <CardHeader
                title={article.title}
                subheader={article.source.name}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {article.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button onClick={()=>toNews(article.url)} size="small">Read more</Button>
            </CardActions>
        </Card>
    )


}

NewsCard.propTypes = {}

export default NewsCard;
