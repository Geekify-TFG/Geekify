/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import { Avatar, Fade, Menu, MenuItem } from "@material-ui/core"

import { makeStyles } from "@material-ui/core/styles"
import { AppColors } from "../../resources/AppColors"
import { useHistory } from "react-router-dom"
import PropTypes from "prop-types";
import { Button, Typography } from "@mui/material";
import { StorageManager } from "../../utils";
import { LabelsSnackbar, profileOptions } from "../../locale/en";
import { INFO_URL } from "../../resources/ApiUrls";
import axios from "axios";
import SnackBarGeekify from "../SnackbarGeekify/SnackbarGeekify";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    appBar: {
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: "none",
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: "flex-end",
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    title: {
        flexGrow: 1,
        textAlign: "center"
    },
    imageIcon: {
        height: "100%",
    },
    icon: {
        height: "60px",
    },
    iconRoot: {
        textAlign: "center"
    },
    menuPaper: {
        backgroundColor: AppColors.WHITE
    }
}));

/**
 * @component
 * Component for the profile button in the navbar
 * 
 */
const ProfileButton = () => {
    const storageManager = new StorageManager();

    const classes = useStyles();
    const history = useHistory()
    const [logged, setLogged] = useState(false)
    const [openSnackLogoutSuccess, setOpenSnackLogoutSuccess] = React.useState(false);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const getInfouser = async () => {
        try {
            const response = await axios.get(`${INFO_URL(storageManager.getEmail())}`);
            storageManager.storeImage(response.data.account.value.photo)
        } catch (err) {
            console.log(err.message)
        }
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const toProfile = () => {

        history.push({
            pathname: "/profile",
        })
    }
    const logout = () => {
        storageManager.clear()
        setAnchorEl(false)
        setLogged(false)
        // window.location.reload();
        setOpenSnackLogoutSuccess(true)
        setTimeout(() => {

            history.push({
                pathname: "/",
            })
        }, 2000);
    }

    const handleCloseLogoutSucces = () => {
        setOpenSnackLogoutSuccess(false);
    };

    useEffect(() => {
        if (storageManager.getToken() !== "") {
            setLogged(true)
            getInfouser()
        }

    }, [logged]);

    return (
        <>
            {logged && <Button id="myProfile" onClick={handleClick} style={{
                backgroundColor: AppColors.BACKGROUND_DRAWER,
                borderRadius: 30,
                border: "2px solid #6563FF",
                borderColor: AppColors.PRIMARY,
                height: "3.5em"

            }}>
                <Avatar style={{ width: "36px", height: "36px", backgroundColor: AppColors.PRIMARY }}
                    src={storageManager.getImage()}>
                </Avatar>
                <Typography style={{
                    fontSize: "12px",
                    color: AppColors.WHITE,
                    paddingLeft: "1em"
                }}>{storageManager.getEmail().split("@")[0]}</Typography>

            </Button>}
            <Menu
                classes={{ paper: classes.menuPaper }}
                id="fade-menu"
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                keepMounted
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}>
                <MenuItem data-testid="MyProfileButton" style={{ color: AppColors.PRIMARY }}
                    onClick={() => {
                        toProfile()

                    }}> {profileOptions.PROFILE} </MenuItem>

                <MenuItem style={{ color: AppColors.PRIMARY }}
                    onClick={() => {
                        logout()
                    }}> {profileOptions.CLOSE_SESSION} </MenuItem>

            </Menu>
            <SnackBarGeekify handleClose={handleCloseLogoutSucces} severity={"success"}
                message={LabelsSnackbar.LOGOUT_SUCCESS}
                openSnack={openSnackLogoutSuccess} />
        </>
    )
}

ProfileButton.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.bool,
    setSelected: PropTypes.func.isRequired
}

export default ProfileButton;
