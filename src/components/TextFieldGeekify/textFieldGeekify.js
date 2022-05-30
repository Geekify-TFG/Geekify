import React from "react"
import { TextField } from "@material-ui/core"
import PropTypes from "prop-types";
import { AppColors } from "../../resources/AppColors";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    textFieldLabel: {
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: AppColors.PRIMARY,
                opacity: "0.2",
                borderRadius: 10,
            },
        }, "& .MuiInputBase-root": {
            color: AppColors.WHITE,
        }, "& .MuiInputLabel-root": {
            color: AppColors.PRIMARY,
        }, "& .MuiTextField-root": {
            height: "25em",
        },
        color: AppColors.PRIMARY,
        backgroundColor: AppColors.BACKGROUND_DRAWER,
        borderRadius: 10,
    },
}))
/**
 * 
 * @param {string} props.value: value of the text field
 * @param {string} props.label: label of the text field
 * @param {string} props.name: name of the text field 
 * @param {function} props.handleChange: function to handle the change of the text field
 * @param {boolean} props.error: error of the text field
 * @param {function} props.helperText: helper text of the text field
 * @param {array} props.inputProps: input props of the text field
 * @param {boolean} props.isDisabled: is disabled of the text field
 * @param {boolean} props.isNumeric: is numeric of the text field
 * @param {string} props.maxLength: max length of the text field
 * 
 */
const TextFieldGeekify = props => {
    const { value, name, handleChange, label, error = false, helperText, inputProps, isDisabled, maxLength, isNumeric, } = props
    const classes = useStyles();

    return (
        <TextField
            data-testid="textfieldTitle"
            className={classes.textFieldLabel}
            style={{ backgroundColor: AppColors.BACKGROUND_DRAWER }}
            name={name}
            onChange={handleChange}
            type={isNumeric ? "number" : "text"}
            label={label}
            defaultValue={value}
            variant="outlined"
            error={error}
            helperText={helperText}
            InputProps={inputProps}
            disabled={isDisabled}
            inputProps={{ maxLength: maxLength ? maxLength : null, color: AppColors.WHITE }}
        />
    )
}

TextFieldGeekify.propTypes = {
    value: PropTypes.string,
    name: PropTypes.string,
    handleChange: PropTypes.func,
    label: PropTypes.string,
    error: PropTypes.bool,
    helperText: PropTypes.string,
    inputProps: PropTypes.object,
    isDisabled: PropTypes.bool,
    isNumeric: PropTypes.bool,
    maxLength: PropTypes.string,
}

export default TextFieldGeekify;
