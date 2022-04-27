/* eslint-disable no-param-reassign */
import React from "react";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core"
import { AppColors } from "../../resources/AppColors";
import { textType } from "../../resources/AppTexts";
import TextGeekify from "../TextGeekify/TextGeekify";
import IconProvider from "../IconProvider/IconProvider";

/**
 * @component
 * Component to create buttons filled with text or icons
 *
 * @param backGroundColor: background color of the button
 * @param width: width of the button
 * @param color: color of the text of the button
 * @param size: size of the button
 * @param onClick: function to use when click
 * @param isDisabled: boolean to dissable the button
 * @param text: text of the button
 * @param textAlign: alignment of the text in the button
 * @param icon: icon if the button not have text
 * @param marginLeft: marginLeft of the text with the icon or button left margin
 * @param margin: margin of all the text with the button
 * @param type: textType of the text
 * @returns {JSX.Element}
 *
 * @example
 * <ButtonFilled marginLeft={"0.2em"} onClick={handleChangeArchived} color={AppColors.WHITE} backGroundColor={AppColors.RED}
 icon={<IconProviderUhdaicon={<Icons.ARCHIVE size={"1.5em"} style={{ color: AppColors.WHITE }} />} />} text={LabelsForm.ARCHIVE}/>
 */

const ButtonFilled = ({
    backGroundColor,
    width,
    color,
    size,
    onClick,
    isDisabled,
    text,
    textAlign,
    icon,
    marginLeft,
    margin,
    type,
    variant,
    border
}) => {
    if (isDisabled == null) isDisabled = false
    if (backGroundColor == null) backGroundColor = AppColors.PRIMARY
    if (color == null) color = AppColors.WHITE
    if (textAlign == null) textAlign = "center"
    if (type == null) type = textType.BODY_BOLD
    if (variant == null) variant = "contained"

    return (
        <Button
            data-testid={"buttonFilled"}
            variant={variant}
            size={size}
            style={{
                boxShadow: "3px 3px 3px 1px rgba(0,0,0,.16)",
                border: border,
                width: width,
                paddingTop: 0,
                paddingBottom: 0,
                backgroundColor: isDisabled ? "#7B7983" : backGroundColor
            }}
            disabled={isDisabled}
            onClick={onClick}>
            {icon && (
                <IconProvider icon={icon}
                    values={{ color: AppColors.WHITE }} />
            )}
            {text && (
                <TextGeekify margin={margin} marginLeft={marginLeft} type={type} text={text} color={color} />
            )}
        </Button>
    )
}

ButtonFilled.propTypes = {
    text: PropTypes.string,
    size: PropTypes.string,
    onClick: PropTypes.func,
    isDisabled: PropTypes.bool,
    textAlign: PropTypes.string,
    href: PropTypes.string,
    icon: PropTypes.any
}

export default ButtonFilled
