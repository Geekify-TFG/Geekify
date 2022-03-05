import React from "react";
import {Avatar, Card, CardContent, CardHeader, CardMedia, Typography} from '@material-ui/core';
import PropTypes from 'prop-types';
import {AppColors} from "../../resources/AppColors";

/**
 * Component to create comment cards.
 *
 * @component
 *
 * @param {object} props.children: content of the card
 * @param {string} props.bg: color of the card
 * @param {object} props.style: style of the card
 *
 * @example
 * const children = <CardGeekify.Body> ... </CardGeekify.Body>;
 * const bg = 'light';
 * const style = {height: '18rem', width: '18rem'};
 *
 * <CommentCard bg={bg} style={style}> {children} </CardGeekify>
 */
const ImageCard = props => {
    const {children, bg, height, width, title, image} = props;
    return (
        <Card style={{height: {height}, width: {width}, borderRadius: 20,position:'relative'}}>
            <CardMedia
                media="picture"
                alt={title}
                image={image}
                title={title}
                style={{
                    position:"absolute",
                    top: 0,
                    right: 0,
                    height: {height}, width: {width}
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
