import React from "react";
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
const SliderGeekify = props => {
    const {min} = props;
    return (
        <Slider>


        </Slider>
    )
}

SliderGeekify.propTypes = {
    children: PropTypes.array.isRequired,
    bg: PropTypes.string,
    height: PropTypes.string,
    width: PropTypes.string,
}

SliderGeekify.defaultProps = {
    bg: AppColors.WHITE
};

export default SliderGeekify;
