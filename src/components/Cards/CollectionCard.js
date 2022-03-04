import React from 'react';
import {AppColors} from "../../resources/AppColors";
import {useHistory} from "react-router-dom";
import {AppTextsFontSize, AppTextsFontWeight} from "../../resources/AppTexts";
import {makeStyles} from "@mui/styles";
import {Button, Card, CardActionArea, CardContent, CardMedia, Grid, Typography} from '@material-ui/core';
import Icons from "../../resources/Icons";
import IconProvider from "../IconProvider/IconProvider";

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
const CollectionCard = ({
                            collectionId,
                            collectionTitle,
                            collectionNumGames,
                            collectionImage,
                            height, width,
                        }) => {
    const classes = useStyles();
    const history = useHistory()
    console.log(width)

    const onClickHandler = () => {
        history.push({
            pathname: `/collection/${collectionId}`,
            state: {detail: collectionId}
        })


    }


    return (
        <Card style={{height: '212px', width: `${width}`, position: "relative", borderRadius: 20}}
              className={classes.card}>

            <CardActionArea style={{position: 'relative', height: '212px', width: `${width}`}} onClick={onClickHandler}>

                <CardMedia
                    media="picture"
                    alt={collectionTitle}
                    image={collectionImage}
                    title={collectionTitle}
                    style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        height: '212px',width: `${width}`
                    }}
                />
                <CardContent style={{
                    position: "relative",
                    backgroundColor: "transparent",
                    paddingTop: 0,
                    height: '250px'
                }}>
                    <Grid container>

                        <Grid item style={{paddingLeft: '8em'}}>
                            <Button style={{backgroundColor: AppColors.BACKGROUND, borderRadius: 20}} disabled={true}>
                                <IconProvider icon={<Icons.STAR style={{
                                    verticalAlign: "middle",
                                    display: "inline-flex",
                                    paddingRight: '4px',
                                    color: AppColors.PRIMARY,
                                }} size="100px"/>}/>
                                <Typography style={{color: AppColors.WHITE, marginBottom: 0}} gutterBottom variant="h5"
                                            component="h2">
                                    {collectionNumGames}
                                </Typography>
                            </Button>

                        </Grid>
                        <Grid item style={{paddingTop: '9em'}}>
                            <Typography style={{color: AppColors.WHITE, height: '64px'}} variant="h5" component="h2">
                                {collectionTitle}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </CardActionArea>
        </Card>
    )


}

CollectionCard.propTypes = {}

export default CollectionCard;
