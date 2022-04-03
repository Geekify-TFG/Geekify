import React from 'react'
import {TextField} from '@material-ui/core'
import PropTypes from "prop-types";
import {AppColors} from "../../resources/AppColors";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    textFieldLabel: {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: AppColors.PRIMARY,
                opacity: '0.2',
                borderRadius: 10,
            },
        }, '& .MuiInputBase-root': {
            color: AppColors.PRIMARY,
        }, '& .MuiInputLabel-root': {
            color: AppColors.PRIMARY,
        }, '& .MuiTextField-root': {
            height: '25em',
        },
        color: AppColors.PRIMARY,
        backgroundColor: AppColors.BACKGROUND_DRAWER,
        borderRadius: 10,
    },
}))

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
    const classes = useStyles();

    return (
        <TextField
            className={classes.textFieldLabel}
            style={{backgroundColor:AppColors.BACKGROUND_DRAWER}}
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
            inputProps={{maxLength: maxLength ? maxLength : null,color:AppColors.WHITE}}
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
