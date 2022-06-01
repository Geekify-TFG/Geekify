import React from "react";
import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import { AppColors } from "../../resources/AppColors";

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
        <Card style={{ maxWidth: "50em", borderRadius: 20, backgroundColor: AppColors.BACKGROUND_DRAWER }}>
            <CardMedia
                component="img"
                height="140"
                image={article.urlToImage}
                alt="green iguana"
            />

            <CardHeader
                title={
                    <Typography
                        style={{ marginRight: "1em", fontSize: "20px", color: AppColors.PRIMARY }}>
                        {article.title}
                    </Typography>}
                subheader={<Typography
                    style={{ marginRight: "1em", fontSize: "12px", color: AppColors.BLACK }}>
                    {article.source.name}
                </Typography>}
            />
            <CardContent>
                <Typography style={{ color: AppColors.WHITE, fontSize: "18px", marginTop: "2px" }}>
                    {article.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button style={{ color: AppColors.PRIMARY }} onClick={() => toNews(article.url)} size="small">Read more</Button>
            </CardActions>
        </Card>
    )

}

NewsCard.propTypes = {
    article: PropTypes.object,
}

export default NewsCard;
