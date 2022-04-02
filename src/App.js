import './App.css';
import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useTextStyles} from "./resources/AppTexts";
import clsx from "clsx";
import {Button, Drawer, Icon, List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {LabelsDrawer, LabelsSnackbar} from "./locale/en";
import {AppColors} from "./resources/AppColors";
import {BrowserRouter as Router, Link, Route, Switch, useHistory,} from "react-router-dom";
import MainPage from "./pages/MainPage"
import GamePage from "./pages/GamePage";
import homeIcon from "./img/home_icon.svg"
import searchIcon from "./img/search_icon.svg"
import calendarIcon from "./img/calendar_icon.svg"
import libraryIcon from "./img/library_icon.svg"
import forumsIcon from "./img/forum_icon.svg"
import loginIcon from "./img/login_icon.svg"
import SearchPage from "./pages/SearchPage";
import CollectionsPage from "./pages/CollectionsPage";
import CollectionPage from "./pages/CollectionPage";
import ForumsPage from "./pages/ForumsPage";
import ForumPage from "./pages/ForumPage";
import ProfilePage from "./pages/ProfilePage";
import CalendarPage from "./pages/CalendarPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import {Typography} from "@mui/material";
import {StorageManager} from "./utils";
import {GoogleLogout} from "react-google-login";
import SnackBarGeekify from "./components/SnackbarGeekify/SnackbarGeekify";


const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    content: {
        backgroundColor: AppColors.BACKGROUND,
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginRight: 0,
        flexGrow: 1,
        minHeight: '100vh !important'

    },
    contentShift: {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: drawerWidth,
    },
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: "flex-end",
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: "nowrap",
    },
    drawerPaper: {
        width: drawerWidth,
    },
    iconRoot: {
        textAlign: "center",
    },
    imageIcon: {
        height: "100%",
    },

    hide: {
        display: "none",
    },
    drawerOpen: {
        backgroundColor: AppColors.BACKGROUND_DRAWER,
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },

    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
}));

const RouteMain = ({component: Component, select}) => {
    //const authContext = useContext(AuthContext);
    // const {authenticated, checkAuth} = authContext;
    const clientId = "324894202380-fe0leg07j8uv629iul8e98qm06quualo.apps.googleusercontent.com"

    const texts = useTextStyles();
    const storageManager = new StorageManager();
    const history = useHistory()


    const classes = useStyles();
    const [open, setOpen] = useState(true); //false
    const [selected, setSelected] = useState(0);
    const [openSnackLogoutSuccess, setOpenSnackLogoutSuccess] = React.useState(false);


    const logout = () => {
        storageManager.removeToken()
        setOpenSnackLogoutSuccess(true)
        setSelected(0)
        setTimeout(() => {
            window.location.reload();
        }, 2000)
    }

    const onLogoutSucces = async () => {
        storageManager.removeToken()
        storageManager.removeGoogle()
        setOpenSnackLogoutSuccess(true)
        setSelected(0)
        setTimeout(() => {
            window.location.reload();
        }, 2000)
    }

    const handleCloseLogoutSucces = () => {
        setOpenSnackLogoutSuccess(false);
    };

    const drawerIconsList = [homeIcon, searchIcon, calendarIcon, libraryIcon, forumsIcon, loginIcon, loginIcon];
    let drawerLinkList = [];
    let drawerLabelsList = [];
    if (storageManager.getToken()) {
        drawerLabelsList = [
            LabelsDrawer.HOME,
            LabelsDrawer.SEARCH,
            LabelsDrawer.CALENDAR,
            LabelsDrawer.COLLECTIONS,
            LabelsDrawer.FORUMS,
            LabelsDrawer.SIGN_OUT,
        ];
        drawerLinkList = ["/", "/search", "/calendar", "/collections", "/forums", "/"]

    } else {
        drawerLabelsList = [
            LabelsDrawer.HOME,
            LabelsDrawer.SEARCH,
            LabelsDrawer.CALENDAR,
            LabelsDrawer.COLLECTIONS,
            LabelsDrawer.FORUMS,
            LabelsDrawer.LOGIN,
            LabelsDrawer.SIGNUP,
        ];
        drawerLinkList = ["/", "/search", "/calendar", "/collections", "/forums", "/login", "/signup"]
    }
    return (
        <>

            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                {/*<div className={classes.drawerHeader}/>*/}
                <Route
                    render={(props) =>
                        <Component {...props} />
                    }
                />

            </main>
            <Drawer
                anchor="left"
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                    }),
                }}
            >
                <div className={classes.drawerHeader}>

                </div>

                <List>
                    {drawerLabelsList.map((text, index) => (
                        <Link
                            to={drawerLinkList[index]}
                            onClick={() => {
                                setSelected(index);
                            }}
                            style={{color: AppColors.WHITE, textDecoration: "none"}}
                        >
                            <ListItem
                                button
                                key={text}
                                selected={selected === index}
                                style={{
                                    //marginTop: index === drawerLabelsList.length-1 ? `${(window.innerHeight-400)}px`:  0,
                                    marginTop: storageManager.getToken() ? (index === drawerLabelsList.length - 1 ? `${(window.innerHeight - 400)}px` : 0) : (index === drawerLabelsList.length - 2 ? `${(window.innerHeight - 440)}px` : 0),
                                    backgroundColor:
                                        selected === index && AppColors.PRIMARY,
                                    borderLeft:
                                        selected === index && "5px solid " + AppColors.PRIMARY,
                                    paddingLeft: selected === index && "22px" || selected !== index && "27px",
                                }}
                            >
                                <ListItemIcon>
                                    <Icon classes={classes.iconRoot}>
                                        <img
                                            alt="icon"
                                            className={classes.imageIcon}
                                            src={drawerIconsList[index]}
                                        />
                                    </Icon>
                                </ListItemIcon>
                                <ListItemText
                                    id={`${text}`}
                                    classes={{primary: texts.subtitle_bold}}
                                    primary={
                                        <>
                                            {(storageManager.getToken() && index === drawerLabelsList.length - 1) ?
                                                <>
                                                    {(storageManager.getToken() && storageManager.getGoogle() && index === drawerLabelsList.length - 1) ?
                                                        <GoogleLogout
                                                            clientId={clientId}
                                                            buttonText="Sign Out"
                                                            onLogoutSuccess={onLogoutSucces}
                                                        >
                                                        </GoogleLogout>

                                                        :
                                                        <Button onClick={() => {
                                                            logout()
                                                        }} style={{
                                                            color: AppColors.WHITE, fontWeight: 'bold'
                                                        }}>{text}</Button>
                                                    }

                                                </> :
                                                <Typography style={{
                                                    color: AppColors.WHITE, fontWeight: 'bold'
                                                }}>{text}</Typography>
                                            }
                                        </>
                                    }
                                />

                            </ListItem>
                        </Link>
                    ))}

                </List>
            </Drawer>
            <SnackBarGeekify handleClose={handleCloseLogoutSucces} severity={'success'}
                             message={LabelsSnackbar.LOGOUT_SUCCESS}
                             openSnack={openSnackLogoutSuccess}/>
        </>
    );
};

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/login" component={LoginPage}/>
                <Route exact path="/signup" component={SignUpPage}/>
                <RouteMain exact path="/" component={MainPage}/>
                <RouteMain path={"/game/:id"} component={() => <GamePage/>}/>
                <RouteMain path={"/profile"} component={() => <ProfilePage/>}/>
                <RouteMain path={"/calendar"} component={() => <CalendarPage/>}/>
                <RouteMain path={"/search/:string"} component={() => <SearchPage/>}/>

                <RouteMain path={"/search"} component={() => <SearchPage/>}/>
                <RouteMain path={"/collections"} component={() => <CollectionsPage/>}/>
                <RouteMain path={"/collection/:id"} component={() => <CollectionPage/>}/>
                <RouteMain path={"/forums"} component={() => <ForumsPage/>}/>
                <RouteMain path={"/forum/:id"} component={() => <ForumPage/>}/>
            </Switch>
        </Router>

    );
}

export default App;
