import React, {useState} from 'react';
import {AppColors} from "../../resources/AppColors";
import {useHistory} from "react-router-dom";
import {AppTextsFontSize, AppTextsFontWeight, textType, useTextStyles} from "../../resources/AppTexts";
import {makeStyles} from "@mui/styles";
import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Fade,
    Grid,
    Link,
    Menu,
    MenuItem,
    Typography
} from '@material-ui/core';
import TextGeekify from "../TextGeekify/TextGeekify";

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
    }


});

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
                      gameImage

                  }) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const texts = useTextStyles();
    const history = useHistory()
    const [drawerLink, setDrawerLink] = useState()
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };


    const onClickHandler = () => {
        history.push({
            pathname: `/game/${gameTitle}`,
            state: {detail: gameTitle,}
        })


    }


    const handleClose = () => {
        setAnchorEl(null);
    };

   

    return (
        <Card style={{height: '302px', width: '222px', position: "relative",borderRadius:20}} className={classes.card}>
            <CardActionArea style={{position: 'relative', height: '302px', width: '222px'}} onClick={onClickHandler}>
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
                    top: '8em',
                    backgroundColor: "transparent"
                }}>

                    <Typography style={{color: AppColors.WHITE}} gutterBottom variant="h5" component="h2">
                        {gameTitle}
                    </Typography>

                </CardContent>
            </CardActionArea>
        </Card>
    )


}

GameCard.propTypes = {}

export default GameCard;
