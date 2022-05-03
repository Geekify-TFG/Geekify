import React from "react";
import { Card } from "@material-ui/core";
import PropTypes from "prop-types";
import { AppColors } from "../../resources/AppColors";

/**
 * Component to create custom cards.
 *
 * @component
 *
 * @param {object} props.children: content of the card
 * @param {string} props.bg: color of the card
 * @param {object} props.height: height of the card
 * @param {object} props.width: width of the card
 * @param {object} props.borderRadius: border of the card
 *
 **/
const CardGeekify = props => {
    const { children, bg, height, width, borderRadius } = props;

    return (
        <Card
            className="w-100 mb-3"
            style={{
                boxShadow: "3px 3px 3px 1px rgba(0,0,0,.16)",
                borderRadius: borderRadius,
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
    bg: PropTypes.string,
    height: PropTypes.string,
    width: PropTypes.string,
    borderRadius: PropTypes.string,
}

export default CardGeekify;
