/* eslint-disable no-unused-vars */
import React from "react";
import { Avatar, Card, CardContent, CardHeader, Grid, Paper, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import { AppColors } from "../../resources/AppColors";

/**
 * Component to create the review card
 *
 * @component
 *
 * @param {object} props.children: content of the card
 * @param {string} props.bg: color of the card
 * @param {object} props.height: height of the card
 * @param {object} props.width: width of the card
 * @param {object} props.game: game of the review card
 * @param {object} props.review: review of the review card
 * @param {object} props.avatar: avatar of the review card
 * @param {object} props.comment: comment of the review card
 * 
 * @returns {object} JSX
 *
 */

const ReviewCard = props => {
    const { children, bg, height, width, game, review, avatar, comment } = props;
    return (
        <Card
            className="w-100 mb-3"
            style={{
                boxShadow: "3px 3px 3px 1px rgba(0,0,0,.16)",
                borderRadius: 10,
                height: `${height}`,
                width: `${width}`,
                backgroundColor: bg,
                color: AppColors.PRIMARY
            }
            }>
            <CardHeader
                title={
                    <Paper
                        style={{ width: "10em", borderRadius: 20, backgroundColor: AppColors.PRIMARY }}>
                        <Typography
                            style={{ marginLeft: "1em", marginRight: "1em", fontSize: "20px", color: AppColors.WHITE }}>
                            {game}
                        </Typography>
                    </Paper>}
            />

            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={2}>
                        <Avatar sx={{ bgcolor: AppColors.RED }} src={avatar} aria-label="recipe">
                        </Avatar>
                    </Grid>
                    <Grid item xs={10}>
                        <Typography style={{ fontSize: "16px", color: AppColors.WHITE }}>{comment}</Typography>
                    </Grid>
                </Grid>

            </CardContent>

        </Card>
    )
}

ReviewCard.propTypes = {
    children: PropTypes.array.isRequired,
    bg: PropTypes.string,
    height: PropTypes.string,
    width: PropTypes.string,
    title: PropTypes.string,
    time: PropTypes.string,
    comment: PropTypes.string,
}

ReviewCard.defaultProps = {
    bg: AppColors.WHITE
};

export default ReviewCard;
