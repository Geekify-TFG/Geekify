import React from "react";
import { AppColors } from "../../resources/AppColors";
import { useHistory } from "react-router-dom";
import { AppTextsFontSize, AppTextsFontWeight } from "../../resources/AppTexts";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from "@material-ui/core";
import Icons from "../../resources/Icons";
import IconProvider from "../IconProvider/IconProvider";
import PropTypes from "prop-types"

const useStyles = makeStyles({
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
    }

});

/**
 * @component
 * Component to create the cards of the collections
 * @param {string} collectionId: id of the collection
 * @param {string} collectionTitle: title of the collection
 * @param {string} collectionNumGames: games on the collection
 * @param {string} collectionImage: image of the collection
 * @param {string} width: width of the card
 * @param {string} paddingLeft: paddingLeft of the card
 *
 */
const CollectionCard = props => {
    const { collectionId, collectionTitle, collectionNumGames, collectionImage, width, paddingLeft } = props
    const classes = useStyles();
    const history = useHistory()

    const onClickHandler = () => {
        history.push({
            pathname: `/collection/${collectionId}`,
            state: { detail: collectionId, title: collectionTitle }
        })

    }
    return (
        <Card data-testid={"collectionCard"}
            style={{ height: "212px", width: `${width}`, position: "relative", borderRadius: 20 }}
            className={classes.card}>

            <CardActionArea style={{ position: "relative", height: "212px", width: `${width}` }} onClick={onClickHandler}>

                <CardMedia
                    media="picture"
                    alt={collectionTitle}
                    image={collectionImage}
                    title={collectionTitle}
                    style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        height: "212px", width: `${width}`
                    }}
                />
                <CardContent style={{
                    position: "relative",
                    backgroundColor: "transparent",
                    paddingTop: 0,
                    height: "250px"
                }}>
                    <Grid container>

                        <Grid item style={{ paddingLeft: `${paddingLeft}`, paddingTop: "1em" }}>
                            <Button style={{ backgroundColor: AppColors.BACKGROUND, borderRadius: 20 }} disabled={true}>
                                <IconProvider icon={<Icons.BOOKMARK style={{
                                    verticalAlign: "middle",
                                    display: "inline-flex",
                                    paddingRight: "4px",
                                    color: AppColors.PRIMARY,
                                }} size="100px" />} />
                                <Typography style={{ color: AppColors.WHITE, marginBottom: 0 }} gutterBottom variant="h5"
                                    component="h2">
                                    {collectionNumGames}
                                </Typography>
                            </Button>

                        </Grid>
                        <Grid item style={{ paddingTop: "8em" }}>
                            <Button
                                style={{ textTransform: "none", backgroundColor: AppColors.BACKGROUND, borderRadius: 20 }}
                                disabled={true}>

                                <Typography style={{ color: AppColors.WHITE }} variant="h5" component="h2">
                                    {collectionTitle}
                                </Typography>
                            </Button>

                        </Grid>
                    </Grid>
                </CardContent>
            </CardActionArea>
        </Card>
    )

}

CollectionCard.propTypes = {
    collectionId: PropTypes.string.isRequired,
    collectionTitle: PropTypes.string.isRequired,
    collectionNumGames: PropTypes.string.isRequired,
    collectionImage: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired,
    paddingLeft: PropTypes.string.isRequired
}

export default CollectionCard;
