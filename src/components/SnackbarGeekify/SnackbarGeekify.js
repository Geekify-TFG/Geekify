import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import PropTypes from "prop-types";

import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
/**
 * 
 * @param {string} props.message: message to be displayed
 * @param {string} props.severity: severity of the message
 * @param {function} props.openSnack: open the snackbar
 * @param {function} props.handleClose: close the snackbar 
 */
const SnackBarGeekify = props => {
    const { message, openSnack, handleClose, severity } = props;
    // if (severity == null) severity = "success"

    return (
        <div>
            <Snackbar id={"alert"} style={{ paddingTop: "2em" }} anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }} open={openSnack} autoHideDuration={5000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    )
}

SnackBarGeekify.propTypes = {
    message: PropTypes.string,
    openSnack: PropTypes.bool,
    handleClose: PropTypes.func,
    severity: PropTypes.string,
}

export default SnackBarGeekify;
