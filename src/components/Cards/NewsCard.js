import React from "react";
import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@material-ui/core";
import PropTypes from "prop-types";

/**
 * @component
 * Component to create the card of the article
 *
 * @param {object} props.article: article of the card
 * 
 * @returns {object} JSX
 */
const NewsCard = props => {
    const { article } = props
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

NewsCard.propTypes = {
    article: PropTypes.object,
}

export default NewsCard;
