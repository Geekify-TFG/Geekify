import React from 'react'
import {TextField} from '@material-ui/core'
import PropTypes from "prop-types";
const TextFieldGeekify = ({
                           value,
                           name,
                           handleChange,
                           label,
                           error = false,
                           helperText,
                           inputProps,
                           isDisabled,
                           maxLength,
                           isNumeric
                       }) => {
    return (
        <TextField
            name={name}
            onChange={handleChange}
            type={isNumeric ? 'number' : 'text'}
            label={label}
            defaultValue={value}
            variant='outlined'
            error={error}
            helperText={helperText}
            InputProps={inputProps}
            disabled={isDisabled}
            inputProps={{maxLength: maxLength ? maxLength : null}}
        />
    )
}

TextFieldGeekify.propTypes = {
    value: PropTypes.object,
    name: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    label: PropTypes.string,
    isDisabled: PropTypes.bool,
    maxLength: PropTypes.number,
    isNumeric: PropTypes.bool
}

export default TextFieldGeekify;
