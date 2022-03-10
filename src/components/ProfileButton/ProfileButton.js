import React, {useState} from 'react';
import {Avatar} from '@material-ui/core'

import {makeStyles} from '@material-ui/core/styles'
import {AppColors} from "../../resources/AppColors"
import {useHistory} from 'react-router-dom'
import PropTypes from 'prop-types';
import {Button, Typography} from "@mui/material";


const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    title: {
        flexGrow: 1,
        textAlign: 'center'
    },
    imageIcon: {
        height: '100%',
    },
    icon: {
        height: '60px',
    },
    iconRoot: {
        textAlign: 'center'
    },
}));

/**
 * @component
 * Component to create the superior navbar
 * @param {boolean} open : value to know when the navbar is open
 * @param {boolean} setOpen: value to open or close the navbar
 * @param {function} setSelected: function to know which value of the drawer is selected
 * @param {boolean} logged: value to know if the user is logged or not
 *
 * @constructor
 * <Navbar open={false} setOpen={false} setSelected={null} logged={false}/>
 */
const ProfileButton = () => {
    //const authContext = useContext(AuthContext)
    //const {logout,signOut} = authContext;
    const classes = useStyles();
    const history = useHistory()
    const [alertOpen, setAlertOpen] = React.useState(false);
    const [showExitModal, setShowExitModal] = useState(false);


    const handleClickOpen = () => {
        setShowExitModal(true);
    };

    const handleOnConfirmExit = () => {
        // TODO: Duplicate form
        sessionStorage.removeItem('user')
        // logout()
        setShowExitModal(!showExitModal)
    }


    return (
        <>
            <Button onClick={() => history.push('/profile')} style={{
                backgroundColor: AppColors.BACKGROUND_DRAWER,
                borderRadius: 30,
                border: '2px solid #6563FF',
                borderColor: AppColors.PRIMARY,
                height: '3.5em'

            }}>
                <Avatar style={{width: '36px', height: '36px', backgroundColor: AppColors.PRIMARY}}>
                </Avatar>
                <Typography style={{fontSize: '12px', color: AppColors.WHITE, paddingLeft: '1em'}}>Jordi
                    Romero</Typography>

            </Button></>
    )
}

ProfileButton.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.bool,
    setSelected: PropTypes.func.isRequired
}

export default ProfileButton;
