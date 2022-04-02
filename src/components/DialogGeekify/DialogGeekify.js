import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';

import PropTypes from 'prop-types';
import {AppColors} from "../../resources/AppColors"

const DialogGeekify = props => {
    const {
        handleShow,
        handleConfirm,
        handleDelete,
        handleConfirmAndContinue,
        handleModalClose,
        handleCloseButton,
        closeButton,
        cancelButton,
        deleteButton,
        onEscape
    } = props
    const handleOnClose = () => {
        if (handleModalClose != null) {
            handleModalClose()
        } else {
            handleShow(-999);
        }
    }
    const handleOnCloseButton = () => {
        if (handleCloseButton != null) {
            handleCloseButton()
        } else {
            handleShow(-999);
        }
    }
    const handleModalConfirmAndContinue = () => {
        handleConfirmAndContinue()
    }
    const spacing = deleteButton ? "space-between" : "flex-end";


    return (
        <Dialog
            style={{borderRadius: 10, boxShadow: "3px 3px 3px 1px rgba(0,0,0,.16)"}}
            maxWidth={props.size === true ? 'md' : 'sm'}
            disableEscapeKeyDown
            disableBackdropClick
            fullWidth={true}
            open={props.show >= 0}
            onClose={handleOnClose}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
        >
            <DialogTitle style={{color: AppColors.PRIMARY}} id="scroll-dialog-title">
                {props.title}
                {closeButton && <IconButton
                    aria-label="close"
                    onClick={handleOnCloseButton}
                    style={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: AppColors.SUBTEXT
                    }}
                >
                    <CloseIcon/>
                </IconButton>}
            </DialogTitle>

            <DialogContent dividers={true}>
                {props.body}
            </DialogContent>

            <DialogActions>
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="flex-end"
                >
                    <Grid
                        container
                        direction="row"
                        justifyContent={spacing}
                        alignItems="center"
                    >
                        {deleteButton &&
                        <Button onClick={handleDelete} style={{backgroundColor: AppColors.RED, minWidth: '8em'}}
                                color="primary" variant="contained">
                            {props.textDeleteButton}
                        </Button>}
                        {!cancelButton && <Button onClick={handleOnClose} style={{minWidth: '8em', marginRight: '1em'}}
                                                  variant="outlined">
                            {props.textCancelButton}
                        </Button>}
                        <Button onClick={handleConfirm} style={{backgroundColor: props.buttonColor, minWidth: '8em'}}
                                color="primary" variant="contained">
                            {props.textConfirmButton}
                        </Button>
                    </Grid>
                    {
                        props.textConfirmAndContinue &&
                        <Button onClick={handleModalConfirmAndContinue}
                                style={{backgroundColor: AppColors.PRIMARY, minWidth: '17em', marginTop: '1em'}}
                                color="primary" variant="contained">
                            {props.textConfirmAndContinue}
                        </Button>
                    }
                </Grid>
            </DialogActions>

        </Dialog>
    )
}

DialogGeekify.defaultProps = {
    show: -999,
    size: false,
    backdrop: 'static'
};
DialogGeekify.propTypes = {
    handleShow: PropTypes.func.isRequired,
    handleConfirm: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.object.isRequired,
    buttonColor: PropTypes.string,
    textCancelButton: PropTypes.string.isRequired,
    textConfirmButton: PropTypes.string.isRequired,
    show: PropTypes.number,
    size: PropTypes.bool,
    backdrop: PropTypes.string,
    handleModalClose: PropTypes.func,
}

export default DialogGeekify;
