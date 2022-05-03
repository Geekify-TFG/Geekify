import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Typography } from "@material-ui/core";
import { textType, useTextStyles } from "../../resources/AppTexts";

/**
 * @component
 * Component to create text on the page
 *
 * @param {string} style: overflow or not
 * @param {string} type: textType of the text that is checked in another class
 * @param {string} text: text of the component
 * @param {string} color: color of the text
 * @param {number} marginLeft: margin left
 * @param {number} margin: margin
 *
 */
const TextGeekify = ({ style, type, text, color, marginLeft, margin }) => {
    const [styles, setStyles] = useState()
    const texts = useTextStyles()

    useEffect(() => {
        switch (type) {
            case textType.NUMBER:
                setStyles(texts.number)
                break
            case textType.TITLE_MAIN:
                setStyles(texts.title_main)
                break
            case textType.TITLE:
                setStyles(texts.title)
                break
            case textType.TITLE_MEDIUM:
                setStyles(texts.title_medium)
                break
            case textType.TITLE_BOLD:
                setStyles(texts.title_bold)
                break
            case textType.SUBTITLE:
                setStyles(texts.subtitle)
                break
            case textType.SUBTITLE_MEDIUM:
                setStyles(texts.subtitle_medium)
                break
            case textType.SUBTITLE_BOLD:
                setStyles(texts.subtitle_bold)
                break
            case textType.BODY:
                setStyles(texts.body)
                break
            case textType.BODY_MEDIUM:
                setStyles(texts.body_medium)
                break
            case textType.BODY_BOLD:
                setStyles(texts.body_bold)
                break
            case textType.BODY_CARD:
                setStyles(texts.body_card)
                break
            case textType.BODY_DRAWER:
                setStyles(texts.body_drawer)
                break
            case textType.BODY_BREADCRUMBS:
                setStyles(texts.body_breadcrumbs)
                break
            case textType.BODY_SUBTEXT:
                setStyles(texts.body_subtext)
                break
            default:
                break
        }
    }, [])
    return (
        <Typography style={{ overflowWrap: style }} className={styles}><p
            style={{ color: color, marginTop: margin, marginBottom: margin, marginLeft: marginLeft }}> {text}</p>
        </Typography>
    )

}

TextGeekify.propTypes = {
    type: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    color: PropTypes.string
}

export default TextGeekify;
