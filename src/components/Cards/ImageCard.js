/* eslint-disable no-unused-vars */
import React from "react";
import { Card, CardMedia } from "@material-ui/core";
import PropTypes from "prop-types";
import { AppColors } from "../../resources/AppColors";
import PropTypes from "prop-types";

/**
 * Component to create comment cards.
 *
 * @component
 *
 * @param {object} props.children: content of the card
 * @param {string} props.bg: color of the card
 * @param {object} props.style: style of the card
 *
 * @returns {object} JSX
 */
const ImageCard = props => {
    const { children, bg, height, width, title, image } = props;
    return (
        <Card style={{ height: { height }, width: { width }, borderRadius: 20, position: "relative" }}>
            <CardMedia
                media="picture"
                alt={title}
                image={image}
                title={title}
                style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    height: { height }, width: { width }
                }}
            />

        </Card>
    )
}

ImageCard.propTypes = {
    bg: PropTypes.string,
    height: PropTypes.string,
    width: PropTypes.string,
    title: PropTypes.string,
    image: PropTypes.string,
}

ImageCard.defaultProps = {
    bg: AppColors.WHITE
};

export default ImageCard;
