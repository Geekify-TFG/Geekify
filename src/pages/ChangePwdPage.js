/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Grid, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { AppColors } from "../resources/AppColors";
import { ChangePasswordPage, LabelsChangePwdPage, LabelsSnackbar } from "../locale/en";
import { AppTextsFontSize, AppTextsFontWeight } from "../resources/AppTexts";
import tlouImage from "../img/tlou_background.jpeg";
import ButtonFilled from "../components/ButtonFilled/ButtonFilled";
import axios from "axios";
import { CHANGE_PWD_URL, LOGIN_URL, REGISTER_URL } from "../resources/ApiUrls";
import { useHistory } from "react-router-dom";
import { StorageManager } from "../utils";
import SnackBarGeekify from "../components/SnackbarGeekify/SnackbarGeekify";

const useStyles = makeStyles(() => ({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)",
    },
    text: {
        fontSize: AppTextsFontSize.SIZE_BODY,
        fontWeight: AppTextsFontWeight.WEIGHT_LIGHT
    },
    pos: {
        marginBottom: 12,
    },
    link: {
        overflowX: "auto",
        "&:hover": {
            cursor: "pointer",
            textDecoration: `underline ${AppColors.WHITE}`
        }
    }, cardHeaderRoot: {
        overflow: "hidden"
    },
    cardHeaderContent: {
        overflow: "hidden"
    },
    textFieldLabel: {
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: AppColors.PRIMARY,
                opacity: "0.2",
                borderRadius: 10,
            },
        }, "& .MuiInputBase-root": {
            color: AppColors.GRAY,
        }, "& .MuiInputLabel-root": {
            color: AppColors.PRIMARY,
        }, "& .MuiTextField-root": {
            height: "25em",
        },
        "& .MuiInput-underline:before": {
            borderBottomColor: AppColors.GRAY, // Solid underline on hover
        },
        "& .MuiInput-underline:hover:before": {
            borderBottomColor: AppColors.PRIMARY, // Solid underline on hover
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: AppColors.PRIMARY, // Solid underline on hover
        },
        color: AppColors.PRIMARY,
        backgroundColor: AppColors.BACKGROUND,
        borderRadius: 10,
    },
    content: {
        minHeight: "100vh !important",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "50%"

    },

}));

const ChangePwdPage = () => {
    const classes = useStyles();
    const storageManager = new StorageManager();
    const oldStoragePassword = storageManager.getPwd();
    const [openSnackEmptyFields, setOpenSnackEmptyFields] = React.useState(false);
    const [openSnackOldPassword, setOpenSnackOldPassword] = React.useState(false);
    const [openSnackMatchPassword, setOpenSnackMatchPassword] = React.useState(false);

    const [openSnackLoginError, setOpenSnackLoginError] = React.useState(false);
    const [openSnackChangeSuccessfully, setOpenSnackChangeSuccessfully] = React.useState(false);

    const [email, setEmail] = useState("")
    const [oldPassword, setOldPassword] = useState()
    const [newPassword, setNewPassword] = useState()
    const [repeatPassword, setRepeatPassword] = useState()
    const history = useHistory();

    const handleCloseEmptyFields = () => {
        setOpenSnackEmptyFields(false);
    };

    const handleCloseLoginError = () => {
        setOpenSnackLoginError(false);
    };

    const handleCloseChangeSuccess = () => {
        setOpenSnackChangeSuccessfully(false);
    };

    const handleClickLogin = async () => {
        console.log(oldStoragePassword, oldPassword, newPassword, repeatPassword)
        if (oldPassword != undefined || newPassword != undefined || repeatPassword != undefined) {
            setOpenSnackEmptyFields(false);
            if (oldPassword == oldStoragePassword) {
                setOpenSnackOldPassword(false)
                if (newPassword == repeatPassword) {
                    try {
                        var accountBody = { "password": newPassword }
                        await axios.put(`${CHANGE_PWD_URL(storageManager.getEmail())}`, accountBody).then(res => {
                            storageManager.storePwd(newPassword);
                            console.log("A")
                            setOpenSnackChangeSuccessfully(true);
                            setTimeout(() => {
                                history.push({
                                    pathname: "/",
                                    state: { logged: true, token: res.data["account"].token }
                                })
                            }, 750)
                        })
                    } catch (error) {
                        console.log(error)
                    }
                } else {
                    setOpenSnackMatchPassword(true);
                }
            } else {
                setOpenSnackOldPassword(true)
            }
        } else {
            setOpenSnackEmptyFields(true);
        }
    };

    return (
        <>
            <Grid container direction={"row"}>
                <Grid container xs={6} style={{ backgroundColor: AppColors.BACKGROUND }}
                    direction={"column"}>
                    <Grid item style={{ margin: "4em" }}>
                        <Typography
                            style={{
                                fontSize: "50px",
                                color: AppColors.WHITE,
                                fontWeight: "bold"
                            }}>{ChangePasswordPage.CHANGE_PWD}</Typography>
                    </Grid>

                    <Grid item style={{ marginLeft: "4em" }}>
                        <TextField
                            id={"email"}
                            style={{ width: "400px" }}
                            onChange={(e) => setOldPassword(e.target.value)}
                            type="password"
                            label={ChangePasswordPage.OLD_PASSWORD}
                            margin="normal"
                            variant="standard"
                            className={classes.textFieldLabel}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid item style={{ marginLeft: "4em" }}>
                        <TextField
                            id={"password"}
                            style={{ width: "400px" }}
                            onChange={(e) => setNewPassword(e.target.value)}
                            type="password"
                            label={ChangePasswordPage.NEW_PASSWORD}
                            margin="normal"
                            variant="standard"
                            className={classes.textFieldLabel}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>

                    <Grid item style={{ marginLeft: "4em" }}>
                        <TextField
                            id={"password"}
                            style={{ width: "400px" }}
                            onChange={(e) => setRepeatPassword(e.target.value)}
                            type="password"
                            label={ChangePasswordPage.REPEAT_NEW_PASSWORD}
                            margin="normal"
                            variant="standard"
                            className={classes.textFieldLabel}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid item style={{ marginLeft: "5.5em", marginTop: "3em" }}>
                        <ButtonFilled onClick={handleClickLogin} text={ChangePasswordPage.CHANGE_PWD} width={"350px"} />

                    </Grid>

                </Grid>
                <Grid item xs={6} alignItems="flex-start"
                    className={classes.content}
                    direction={"row"} style={{
                        backgroundImage: `linear-gradient(to left, rgba(255,255,255,0), rgba(29,29,29,1)),url(${tlouImage})`,
                        backgroundSize: "cover",

                    }}>
                </Grid>

            </Grid>
            <SnackBarGeekify handleClose={handleCloseEmptyFields} severity={"error"}
                message={LabelsSnackbar.EMPTY_FIELDS}
                openSnack={openSnackEmptyFields} />
            <SnackBarGeekify handleClose={handleCloseEmptyFields} severity={"error"}
                message={LabelsChangePwdPage.OLD_PASSWORD_ERROR}
                openSnack={openSnackOldPassword} />
            <SnackBarGeekify handleClose={handleCloseEmptyFields} severity={"error"}
                message={LabelsChangePwdPage.NEW_PASSWORD_MATCH_ERROR}
                openSnack={openSnackMatchPassword} />
            <SnackBarGeekify handleClose={handleCloseChangeSuccess} severity={"success"}
                message={LabelsChangePwdPage.CHANGE_PWD_SUCCESSFULLY}
                openSnack={openSnackChangeSuccessfully} />
        </>
    )
}

export default ChangePwdPage;
