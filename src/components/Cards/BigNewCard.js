import React from 'react';
import {useHistory} from "react-router-dom";
import {makeStyles} from "@mui/styles";
import {Button, Card, CardActionArea, CardActions, CardHeader, CardMedia} from '@material-ui/core';
import {useTheme} from '@mui/material/styles';
import {AppColors} from "../../resources/AppColors";
import {Typography} from "@mui/material";

const useStyles = makeStyles(theme => ({
    root: {
        position: "relative",
        transition: "transform 0.15s ease-in-out",
        "&:hover": { transform: "scale3d(1.05, 1.05, 1)",cursor:'pointer' },
    },
    font: {
        position: "absolute",
        width: "100%",
        textAlign: "center",
        color: AppColors.WHITE,
        backgroundColor: "none",
        fontFamily: "Roboto",
    }
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
const BigNewCard = ({
                        height, width,
                        article, top,
                        fontSize,subFontSize
                    }) => {
    const classes = useStyles();
    const history = useHistory()

    const theme = useTheme();

    const toNews = (urlArticle) => {
        window.open(urlArticle, '_blank')
    }

    return (
        <Card className={classes.root} style={{height: `${height}`, width: `${width}`, position: "relative"}}>
            <CardMedia
                style={{height: `${height}`, width: `${width}`, position: "relative"}}
                component="img"
                alt="Contemplative Reptile"
                image={article.urlToImage}
                title="Contemplative Reptile"
                onClick={()=>toNews(article.url)}
            />
            <CardHeader
                style={{top: `${top}`}}
                className={classes.font}
                title={<Typography style={{fontWeight: 'bold', fontSize: `${fontSize}`}}>{article.title}</Typography>}
                subheader={<Typography style={{fontWeight: 'bold', fontSize: `${subFontSize}`}}>{article.source.name}</Typography>}
            />

        </Card>
    )


}

BigNewCard.propTypes = {}

export default BigNewCard;
