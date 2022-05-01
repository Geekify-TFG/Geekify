/* eslint-disable camelcase */
import React from "react"
import PropTypes from "prop-types";
import {
    Box,
    Checkbox,
    Chip,
    FormControl,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select
} from "@material-ui/core";
import Icons from "../../resources/Icons";
import { AppColors } from "../../resources/AppColors";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    select: {
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: AppColors.PRIMARY,
                opacity: "0.2",
                borderRadius: 10,

            },
        },
        "& .MuiInputBase-root": {
            color: AppColors.WHITE,

        },
        "& .MuiInputLabel-root": {
            color: AppColors.WHITE,
            backgroundColor: "transparent"

        },
        "&:before": {
            color: AppColors.WHITE,
        },
        "&:after": {
            borderBottomColor: AppColors.WHITE,
        },
        "& .MuiSvgIcon-root": {
            color: AppColors.PRIMARY,
        },
        color: AppColors.WHITE,
        backgroundColor: AppColors.BACKGROUND_DRAWER,
        borderRadius: 10,
    },
}));

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: 48 * 4.5 + 8,
            width: 250,
        },
    },
};

/**
 * @component
 * Component to create a multiple select field.
 *
 *
 * @param {object} props.value: value of the select
 * @param {array} props.options: options of the select
 * @param {string} props.label: label of the select
 * @param {function} props.handleChange: function to handle the change of the select
 * @param {array} props.options: options of the select
 * @param {string} props.width: width of the select
 * @param {string} props.fav_categories: favorite categories of the select
 * 
 */
const MultipleSelectGeekify = props => {
    const { value, handleChange, options, label, width, fav_categories } = props;
    const classes = useStyles();
    return (
        <FormControl className={classes.select} variant="outlined" margin="normal"
            style={{ width: `${width}` }}>
            <InputLabel className={classes.select}
                id="demo-simple-select-label">{label}</InputLabel>
            <Select className={classes.select} IconComponent={Icons.ARROW_DOWN}
                multiple
                value={value}
                onChange={handleChange}
                input={<OutlinedInput label="Tag" />}
                defaultValue={fav_categories}
                /*renderValue={(selected) => selected.map((x) => x.label).join(", ")}*/
                renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((x) => (
                            <Chip style={{ margin: "2px", backgroundColor: AppColors.PRIMARY }} key={x.label}
                                label={x.label} />
                        ))}
                    </Box>
                )}
                MenuProps={MenuProps}
            >
                {options && options.map((item) => (
                    <MenuItem key={item.value} value={item}>
                        <Checkbox style={{ color: AppColors.PRIMARY }} checked={value.indexOf(item) > -1} />
                        <ListItemText primary={item.label} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

MultipleSelectGeekify.propTypes = {
    value: PropTypes.array,
    handleChange: PropTypes.func,
    options: PropTypes.array,
    label: PropTypes.string,
    width: PropTypes.string,
    fav_categories: PropTypes.array,
}

export default MultipleSelectGeekify
