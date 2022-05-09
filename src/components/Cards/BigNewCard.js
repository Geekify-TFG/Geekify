import React from "react";
import { makeStyles } from "@mui/styles";
import { Card, CardHeader, CardMedia } from "@material-ui/core";
import { AppColors } from "../../resources/AppColors";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";

const useStyles = makeStyles(() => ({
    root: {
        position: "relative",
        transition: "transform 0.15s ease-in-out",
        "&:hover": { transform: "scale3d(1.05, 1.05, 1)", cursor: "pointer" },
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
 * @param {number} height: height of the card
 * @param {number} width: width of the card
 * @param {string} article: article of the card
 * @param {string} fontSize: fontSize of the card
 * @param {string} subFontSize: subFontSize of the card
 * @param {string} top: marginTop of the card
 *
 */
const BigNewCard = ({
    height, width,
    article, top,
    fontSize, subFontSize
}) => {
    const classes = useStyles();

    const toNews = (urlArticle) => {
        window.open(urlArticle, "_blank")
    }

    return (
        <>
            <Card className={classes.root} style={{ height: `${height}`, width: `${width}`, position: "relative" }}>
                <CardMedia
                    media="picture"
                    alt={article.title}
                    title={article.title}
                    style={{
                        height: `${height}`, width: `${width}`, position: "absolute",
                        backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0), rgba(29,29,29,1)),url(${article.urlToImage
                            })`,
                    }}
                    onClick={() => toNews(article.url)}
                />
                <CardHeader
                    style={{ top: `${top}` }}
                    className={classes.font}
                    title={<Typography style={{ fontWeight: "bold", fontSize: `${fontSize}`, color: AppColors.PRIMARY }}>{article.title}</Typography>}
                    subheader={<Typography
                        style={{ fontWeight: "bold", fontSize: `${subFontSize}`, color: AppColors.WHITE }}>{article.source.name}</Typography>}
                />

            </Card>
        </>
    )

}

BigNewCard.propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
    article: PropTypes.object,
    top: PropTypes.number,
    fontSize: PropTypes.string,
    subFontSize: PropTypes.string,
}

export default BigNewCard;
