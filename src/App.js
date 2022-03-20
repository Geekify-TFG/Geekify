import './App.css';
import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useTextStyles} from "./resources/AppTexts";
import clsx from "clsx";
import {Drawer, Icon, List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {LabelsDrawer} from "./locale/en";
import {AppColors} from "./resources/AppColors";
import {BrowserRouter as Router, Link, Route, Switch,} from "react-router-dom";
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
import SearchGamePage from "./pages/SearchGamePage";


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
    const texts = useTextStyles();


    const classes = useStyles();
    const [open, setOpen] = useState(true); //false
    const [selected, setSelected] = useState(0);


    const drawerIconsList = [homeIcon, searchIcon, calendarIcon, libraryIcon, forumsIcon, loginIcon, loginIcon];
    const drawerLinkList = ["/", "/search", "/calendar", "/collections", "/forums", "/login", "/signup"];

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
                    {[
                        LabelsDrawer.HOME,
                        LabelsDrawer.SEARCH,
                        LabelsDrawer.CALENDAR,
                        LabelsDrawer.LIBRARY,
                        LabelsDrawer.FORUMS,
                        LabelsDrawer.LOGIN,
                        LabelsDrawer.SIGNUP,
                    ].map((text, index) => (
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
                                    classes={{primary: texts.subtitle_bold}}
                                    primary={<Typography style={{
                                        color: AppColors.WHITE, fontWeight: 'bold'
                                    }}>{text}</Typography>}
                                />
                            </ListItem>
                        </Link>
                    ))}
                </List>
            </Drawer>

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
