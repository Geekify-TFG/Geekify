import React from "react";
import { IconContext } from "react-icons";
import PropTypes from "prop-types";

/**
 * @component
 * Component that allows displaying a icon from "react-icons"
 *
 *
 * @param icon: component to display
 * @param values: custom attributes for the icon
 *
 */
const IconProvider = ({ icon, values = {} }) => {
    return (
        <IconContext.Provider value={values}>
            {icon}
        </IconContext.Provider>
    )
}

IconProvider.propTypes = {
    icon: PropTypes.object.isRequired,
    values: PropTypes.object
}

export default IconProvider
