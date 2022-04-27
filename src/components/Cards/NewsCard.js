import React from "react";
import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@material-ui/core";

/**
 * @component
 * Component to create the card of the game
 *
 * @param {number} gameId: id of the game
 * @param {string} gameTitle: title of the game
 * @param {string} gameDescription: description of the game

 *
 * @constructor
 * <GameCard gameId={"12"} gameTitle={"TITLE"} gameDescription={"DESCRIPTION"} gameImage={2}/>
 *
 */
const NewsCard = ({
    article
}) => {

    const toNews = (urlArticle) => {
        window.open(urlArticle, "_blank")
    }

    return (
        <Card style={{ maxWidth: "50em" }}>
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
                <Button onClick={() => toNews(article.url)} size="small">Read more</Button>
            </CardActions>
        </Card>
    )

}

NewsCard.propTypes = {}

export default NewsCard;
