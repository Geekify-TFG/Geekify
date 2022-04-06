import React, {useState} from 'react';
import {Grid, Link, TextField, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {AppColors} from "../resources/AppColors";
import {LabelsLoginPage, LabelsSnackbar} from "../locale/en";
import {AppTextsFontSize, AppTextsFontWeight} from "../resources/AppTexts";
import tlouImage from "../img/tlou_background.jpeg";
import ButtonFilled from "../components/ButtonFilled/ButtonFilled";
import axios from "axios";
import {LOGIN_URL} from "../resources/ApiUrls";
import {useHistory} from "react-router-dom";
import {StorageManager} from "../utils";
import SnackBarGeekify from "../components/SnackbarGeekify/SnackbarGeekify";
import GoogleLogin from "react-google-login";


const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
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
            cursor: 'pointer',
            textDecoration: `underline ${AppColors.WHITE}`
        }
    }, cardHeaderRoot: {
        overflow: "hidden"
    },
    cardHeaderContent: {
        overflow: "hidden"
    },
    textFieldLabel: {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: AppColors.PRIMARY,
                opacity: '0.2',
                borderRadius: 10,
            },
        }, '& .MuiInputBase-root': {
            color: AppColors.GRAY,
        }, '& .MuiInputLabel-root': {
            color: AppColors.PRIMARY,
        }, '& .MuiTextField-root': {
            height: '25em',
        },
        '& .MuiInput-underline:before': {
            borderBottomColor: AppColors.GRAY, // Solid underline on hover
        },
        '& .MuiInput-underline:hover:before': {
            borderBottomColor: AppColors.PRIMARY, // Solid underline on hover
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: AppColors.PRIMARY, // Solid underline on hover
        },
        color: AppColors.PRIMARY,
        backgroundColor: AppColors.BACKGROUND,
        borderRadius: 10,
    },
    content: {
        minHeight: '100vh !important',
        backgroundRepeat: "no-repeat",
        backgroundPosition: '50%'

    },


}));

const LoginPage = () => {
    const clientId = "324894202380-fe0leg07j8uv629iul8e98qm06quualo.apps.googleusercontent.com"
    const classes = useStyles();
    const storageManager = new StorageManager();

    const [openSnackEmptyFields, setOpenSnackEmptyFields] = React.useState(false);
    const [openSnackLoginError, setOpenSnackLoginError] = React.useState(false);
    const [openSnackLoginSuccessfully, setOpenSnackLoginSuccessfully] = React.useState(false);

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const history = useHistory();

    const handleCloseEmptyFields = () => {
        setOpenSnackEmptyFields(false);
    };

    const handleCloseLoginError = () => {
        setOpenSnackLoginError(false);
    };

    const handleCloseLoginSuccess = () => {
        setOpenSnackLoginSuccessfully(false);
    };


    const handleClickLogin = async () => {
        if (email === "" || password === "") setOpenSnackEmptyFields(true);
        else {
            console.log(email, password)
            const params = {
                email,
                password,
            };
            await axios.post(LOGIN_URL, params)
                .then(res => {
                    if (res.status === 200) {
                        storageManager.storeEmail(params.email)
                        storageManager.storeToken(res.data.token)
                        setOpenSnackLoginSuccessfully(true)
                        setTimeout(() => {
                            history.push({
                                pathname: '/',
                                state: {logged: true, token: res.data.token}
                            })
                        }, 1000)

                    } else {
                        alert('Couldn\'t sign in this user! sorry!');
                        console.log('Couldn\'t sign in this user! sorry!');
                    }
                }).catch((error) => {
                    setOpenSnackLoginError(true)
                });
        }
    };

    const onLoginSuccess = async (res) => {
        console.log(res)
        storageManager.storeGoogle(true)
        storageManager.storeToken(res.tokenObj.id_token)
        storageManager.storeEmail(res.Ju.zv)
        setOpenSnackLoginSuccessfully(true)
        setTimeout(() => {
            history.push({
                pathname: '/',
                state: {logged: true, token: res.tokenObj.id_token}
            })
        }, 2000)
    }


    const onLoginFailure = async () => {
        setOpenSnackLoginError(true)
    }
    const onLogoutSucces = async () => {
        alert("logout")
    }

    return (
        <>
            <Grid container direction={"row"}>
                <Grid container xs={6} style={{backgroundColor: AppColors.BACKGROUND}}
                      direction={"column"}>
                    <Grid item style={{margin: '4em'}}>
                        <Typography
                            style={{
                                fontSize: '100px',
                                color: AppColors.WHITE,
                                fontWeight: 'bold'
                            }}>{LabelsLoginPage.LOGIN}</Typography>
                    </Grid>

                    <Grid item style={{marginLeft: '4em'}}>
                        <TextField
                            id={"email"}
                            style={{width: '400px'}}
                            onChange={(e) => setEmail(e.target.value)}
                            type="text"
                            label={LabelsLoginPage.EMAIL}
                            margin="normal"
                            variant="standard"
                            className={classes.textFieldLabel}
                            InputLabelProps={{shrink: true}}
                        />
                    </Grid>
                    <Grid item style={{marginLeft: '4em'}}>
                        <TextField
                            id={"password"}
                            style={{width: '400px'}}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            label={LabelsLoginPage.PASSWORD}
                            margin="normal"
                            variant="standard"
                            className={classes.textFieldLabel}
                            InputLabelProps={{shrink: true}}
                        />
                    </Grid>
                    <Grid item style={{marginLeft: '5.5em', marginTop: '3em'}}>
                        <ButtonFilled onClick={handleClickLogin} text={LabelsLoginPage.LOGIN} width={'350px'}/>

                    </Grid>
                    <Grid item style={{marginLeft: '9.5em', marginTop: '1em'}}>
                        <Link>
                            <Typography
                                style={{
                                    fontSize: '16px',
                                    color: AppColors.WHITE
                                }}>{LabelsLoginPage.REMEMBER}</Typography>
                        </Link>
                    </Grid>
                    <Grid item style={{marginLeft: '13.5em', marginTop: '1em'}}>
                        <GoogleLogin
                            clientId={clientId}
                            buttonText="Sign In"
                            onSuccess={onLoginSuccess}
                            onFailure={onLoginFailure}
                            cookiePolicy={'single_host_origin'}
                            isSignedIn={true}
                        />
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
            <SnackBarGeekify handleClose={handleCloseEmptyFields} severity={'error'}
                             message={LabelsSnackbar.EMPTY_FIELDS}
                             openSnack={openSnackEmptyFields}/>

            <SnackBarGeekify handleClose={handleCloseLoginError} severity={'error'}
                             message={LabelsSnackbar.LOGIN_ERROR}
                             openSnack={openSnackLoginError}/>
            <SnackBarGeekify handleClose={handleCloseLoginSuccess} severity={'success'}
                             message={LabelsSnackbar.LOGIN_SUCCESS}
                             openSnack={openSnackLoginSuccessfully}/>
        </>
    )
}

export default LoginPage;
