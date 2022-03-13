import React, {useState} from 'react';
import {Button, Grid, Link, TextField, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {AppColors} from "../resources/AppColors";
import styled from "@emotion/styled";
import {LabelsLoginPage} from "../locale/en";
import {AppTextsFontSize, AppTextsFontWeight} from "../resources/AppTexts";
import tlouImage from "../img/tlou_background.jpeg";
import ButtonFilled from "../components/ButtonFilled/ButtonFilled";

const ButtonToggle = styled(Button)`
  opacity: 1;
  background-color: #1D1D1D;
  color: #6563FF ${({active}) =>
          active &&
          `opacity: 1;
        background-color: ${AppColors.PRIMARY};
        color: white;
        &:hover {
            color: white;
            background-color: #6563FF;
          }
        `};

`;


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
            color: AppColors.PRIMARY,
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
    const classes = useStyles();

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    return (
        <>
            <Grid container direction={"row"}>
                <Grid container xs={6} style={{backgroundColor: AppColors.BACKGROUND}}
                      direction={"column"}>
                    <Grid item style={{margin: '4em'}}>
                        <Typography
                            style={{fontSize: '100px', color: AppColors.WHITE}}>{LabelsLoginPage.LOGIN}</Typography>
                    </Grid>

                    <Grid item style={{marginLeft: '4em'}}>
                        <TextField
                            style={{width: '400px'}}
                            onChange={(e) => setEmail(e.target.value)}
                            type="text"
                            label={LabelsLoginPage.EMAIL}
                            margin="normal"
                            variant="standard"
                            className={classes.textFieldLabel}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid item style={{marginLeft: '4em'}}>
                        <TextField
                            style={{width: '400px'}}
                            onChange={(e) => setPassword(e.target.value)}
                            type="text"
                            label={LabelsLoginPage.PASSWORD}
                            margin="normal"
                            variant="standard"
                            className={classes.textFieldLabel}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid item style={{marginLeft: '5.5em', marginTop: '3em'}}>
                        <ButtonFilled text={LabelsLoginPage.LOGIN} width={'350px'}/>

                    </Grid>
                    <Grid item style={{marginLeft: '9.5em',marginTop:'1em'}}>
                        <Link>
                        <Typography
                            style={{fontSize: '16px', color: AppColors.WHITE}}>{LabelsLoginPage.REMEMBER}</Typography>
                        </Link>
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


        </>
    )
}

export default LoginPage;
