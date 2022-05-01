import React from "react";
import { Avatar, Card, CardContent, CardHeader, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import { AppColors } from "../../resources/AppColors";

/**
 * @component
 * 
 * Component to create comment cards.
 * 
 * @param {object} props.children: content of the card
 * @param {string} props.bg: color of the card
 * @param {string} props.title: title of the achievement
 * @param {string} props.height: height of the card
 * @param {string} props.width: width of the card
 * @param {string} props.description: description of the achievement
 * @param {string} props.image: image of the achievement
 * @param {string} props.percent: percent of the achievement
 * 
 * @returns {JSX.Element}
 *
 */
const CardAchivements = props => {
    const { bg, height, width, title, percent, description, image } = props;
    return (
        <Card
            className="w-100 mb-3"
            style={{
                boxShadow: "3px 3px 3px 1px rgba(0,0,0,.16)",
                borderRadius: 10,
                height: height,
                width: width,
                backgroundColor: bg,
                color: AppColors.PRIMARY
            }
            }>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe">
                        <img style={{ width: "40px", height: "40px" }} src={image} />
                    </Avatar>
                }

                title={<Typography style={{ fontSize: "20px", color: AppColors.WHITE }}>{title}</Typography>}
                subheader={<Typography
                    style={{ fontSize: "16px", color: AppColors.PRIMARY }}>{`${percent} %`}</Typography>}
            />

            <CardContent>
                <Typography style={{ fontSize: "16px", color: AppColors.WHITE }}>
                    {description}
                </Typography>
            </CardContent>

        </Card>
    )
}

CardAchivements.propTypes = {
    bg: PropTypes.string,
    height: PropTypes.string,
    width: PropTypes.string,
    title: PropTypes.string,
    percent: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string
}

export default CardAchivements;
