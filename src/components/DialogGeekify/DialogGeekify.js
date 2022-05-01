import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton } from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close";

import PropTypes from "prop-types";
import { AppColors } from "../../resources/AppColors"

/**
 * Component to create the dialogs
 *
 * @component
 *
 * @param {function} props.handleShow: function to show the dialog
 * @param {function} props.handleConfirm: function to confirm the dialog 
 * @param {function} props.handleDelete: function to delete the dialog
 * @param {function} props.handleModalClose: function to close the dialog
 * @param {function} props.handleCloseButton: function to close the dialog
 * @param {boolean} props.closeButton: boolean to show the close button
 * @param {boolean} props.cancelButton: boolean to show the cancel button
 * @param {boolean} props.deleteButton: boolean to show the delete button
 * 
 * 
 * @returns {object} JSX
 *
 */
const DialogGeekify = props => {
    const {
        handleShow,
        handleConfirm,
        handleDelete,
        handleModalClose,
        handleCloseButton,
        closeButton,
        cancelButton,
        deleteButton,
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

    const spacing = deleteButton ? "space-between" : "flex-end";

    return (
        <Dialog
            style={{ borderRadius: 10, boxShadow: "3px 3px 3px 1px rgba(0,0,0,.16)" }}
            maxWidth={props.size === true ? "md" : "sm"}
            disableEscapeKeyDown
            disableBackdropClick
            fullWidth={true}
            open={props.show >= 0}
            onClose={handleOnClose}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            PaperProps={{
                style: {
                    backgroundColor: AppColors.BACKGROUND,
                    boxShadow: "none",
                },
            }}
        >
            <DialogTitle style={{ color: AppColors.WHITE }} id="scroll-dialog-title">
                {props.title}
                {closeButton && <IconButton
                    aria-label="close"
                    onClick={handleOnCloseButton}
                    style={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: AppColors.SUBTEXT
                    }}
                >
                    <CloseIcon />
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
                            <Button onClick={handleDelete} style={{ backgroundColor: AppColors.RED, minWidth: "8em" }}
                                color="primary" variant="contained">
                                {props.textDeleteButton}
                            </Button>}
                        {!cancelButton && <Button onClick={handleOnClose} style={{
                            backgroundColor: AppColors.WHITE,
                            minWidth: "8em",
                            marginRight: "1em"
                        }}
                            variant="outlined">
                            {props.textCancelButton}
                        </Button>}
                        <Button data-testid={"confirmButton"} onClick={handleConfirm}
                            style={{ backgroundColor: props.buttonColor, minWidth: "8em" }}
                            color="primary" variant="contained">
                            {props.textConfirmButton}
                        </Button>
                    </Grid>

                </Grid>
            </DialogActions>

        </Dialog>
    )
}

DialogGeekify.propTypes = {
    handleShow: PropTypes.func.isRequired,
    handleConfirm: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleModalClose: PropTypes.func,
    handleCloseButton: PropTypes.func,
    closeButton: PropTypes.bool,
    cancelButton: PropTypes.bool,
    deleteButton: PropTypes.bool,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    textConfirmButton: PropTypes.string.isRequired,
    textCancelButton: PropTypes.string.isRequired,
    textDeleteButton: PropTypes.string.isRequired,
    buttonColor: PropTypes.string.isRequired,
    size: PropTypes.bool,
}

export default DialogGeekify;
