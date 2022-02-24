import { makeStyles } from "@material-ui/core/styles";

export const textType = {
    NUMBER: 'NUMBER',
    TITLE: 'TITLE',
    TITLE_MEDIUM: 'TITLE_MEDIUM',
    TITLE_BOLD: 'TITLE_BOLD',
    SUBTITLE: 'SUBTITLE',
    SUBTITLE_MEDIUM: 'SUBTITLE_MEDIUM',
    SUBTITLE_BOLD: 'SUBTITLE_BOLD',
    BODY: 'BODY',
    BODY_MEDIUM: 'BODY_MEDIUM',
    BODY_BOLD: 'BODY_BOLD',
    BODY_CARD: 'BODY_CARD',
    BODY_DRAWER: 'BODY_DRAWER',
    BODY_BREADCRUMBS: 'BODY_BREADCRUMBS',
    BODY_SUBTEXT: 'BODY_SUBTEXT'
}
export const AppTextsFontSize = {
    SIZE_NUMBER: '28px',
    SIZE_TITLE: '18px',
    SIZE_SUBTITLE: '16px',
    SIZE_BODY: '14px',
    SIZE_SUBTEXT: '12px',
}
export const AppTextsFontWeight = {
    WEIGHT_BOLD: 'bold',
    WEIGHT_MEDIUM: 'w400',
    WEIGHT_LIGHT: 'w100',
}
export const AppTextsFontFamily = {
    TITLE: "Helvetica, 'Open Sans', Arial, sans-serif",
}


export const useTextStyles = makeStyles(() => ({
    number: {
        fontSize: AppTextsFontSize.SIZE_NUMBER,
        fontWeight: AppTextsFontWeight.WEIGHT_BOLD,
    },
    title: {
        fontSize: AppTextsFontSize.SIZE_TITLE,
        fontWeight: AppTextsFontWeight.WEIGHT_LIGHT,
        fontFamily: "Comfortaa"
    },
    title_medium: {
        fontSize: AppTextsFontSize.SIZE_TITLE,
        fontWeight: AppTextsFontWeight.WEIGHT_MEDIUM,
        fontFamily: "Comfortaa"

    },
    title_bold: {
        fontSize: AppTextsFontSize.SIZE_TITLE,
        fontWeight: AppTextsFontWeight.WEIGHT_BOLD,
        fontFamily: "Comfortaa"
    },
    subtitle: {
        fontSize: AppTextsFontSize.SIZE_SUBTITLE,
        fontWeight: AppTextsFontWeight.WEIGHT_LIGHT,
        fontFamily: "Comfortaa"
    },
    subtitle_medium: {
        fontSize: AppTextsFontSize.SIZE_SUBTITLE,
        fontWeight: AppTextsFontWeight.WEIGHT_MEDIUM,
        fontFamily: "Comfortaa"
    },
    subtitle_bold: {
        fontSize: AppTextsFontSize.SIZE_SUBTITLE,
        fontWeight: AppTextsFontWeight.WEIGHT_BOLD,
        fontFamily: "Comfortaa"
    },
    body: {
        fontSize: AppTextsFontSize.SIZE_BODY,
        fontWeight: AppTextsFontWeight.WEIGHT_LIGHT,
        fontFamily: "Comfortaa"
    },
    body_card: {
        fontSize: AppTextsFontSize.SIZE_BODY,
        fontWeight: AppTextsFontWeight.WEIGHT_LIGHT,
    },
    body_drawer: {
        fontSize: AppTextsFontSize.SIZE_SUBTITLE,
        fontWeight: AppTextsFontWeight.WEIGHT_BOLD,
        fontFamily: "Comfortaa"
    },
    body_breadcrumbs: {
        fontSize: AppTextsFontSize.SIZE_SUBTITLE,
        fontWeight: AppTextsFontWeight.WEIGHT_LIGHT,
        fontFamily: "Comfortaa"
    },
    body_medium: {
        fontSize: AppTextsFontSize.SIZE_BODY,
        fontWeight: AppTextsFontWeight.WEIGHT_MEDIUM,
        fontFamily: "Comfortaa"

    },
    body_bold: {
        fontSize: AppTextsFontSize.SIZE_BODY,
        fontWeight: AppTextsFontWeight.WEIGHT_BOLD,
        fontFamily: "Comfortaa"
    }, body_subtext: {
        fontSize: AppTextsFontSize.SIZE_SUBTEXT,
    },
}));

