/* eslint-disable no-unused-vars */
import React from "react";
import { Card, Grid } from "@material-ui/core";
import PropTypes from "prop-types";
import { AppColors } from "../../resources/AppColors";

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
const ImagesCard = props => {
    const { bg, height, width, title, images } = props;
    return (
        <Card style={{
            height: `${height}`,
            width: `${width}`,
            borderRadius: 20,
            position: "relative",
            backgroundColor: AppColors.BACKGROUND_DRAWER
        }}>
            <Grid container direction={"column"}>
                <img
                    alt="icon"
                    src={images}
                    style={{ height: `${height}`, width: `${width}` }}
                />

            </Grid>


        </Card>
    )
}

ImagesCard.propTypes = {
    bg: PropTypes.string,
    height: PropTypes.string,
    width: PropTypes.string,
    title: PropTypes.string,
    images: PropTypes.string,
}

ImagesCard.defaultProps = {
    bg: AppColors.WHITE
};

export default ImagesCard;
