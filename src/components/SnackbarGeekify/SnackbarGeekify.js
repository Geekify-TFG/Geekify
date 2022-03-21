import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import PropTypes from "prop-types";

import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const SnackBarGeekify = ({message, openSnack, handleClose, severity}) => {
    if (severity == null) severity = "success"

    return (
        <div>
            <Snackbar style={{paddingTop: '2em'}} anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }} open={openSnack} autoHideDuration={5000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    )
}

SnackBarGeekify.propTypes = {
    severity: PropTypes.string,
    openSnack: PropTypes.bool.isRequired,
    message: PropTypes.string,
    handleClose: PropTypes.func,
}

export default SnackBarGeekify;
