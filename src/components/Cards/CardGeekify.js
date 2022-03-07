import React from "react";
import {Card} from '@material-ui/core';
import PropTypes from 'prop-types';
import {AppColors} from "../../resources/AppColors";

/**
 * Component to create custom cards.
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
 * <CardGeekify bg={bg} style={style}> {children} </CardGeekify>
 */
const CardGeekify = props => {
    const {children, bg, height, width} = props;
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
            {children}
        </Card>
    )
}

CardGeekify.propTypes = {
    children: PropTypes.array.isRequired,
    bg: PropTypes.string,
    height: PropTypes.string,
    width: PropTypes.string,
}

CardGeekify.defaultProps = {
    bg: AppColors.WHITE
};

export default CardGeekify;
