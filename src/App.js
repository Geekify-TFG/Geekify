import logo from './logo.svg';
import './App.css';
import {Button, Container, Paper, Typography} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useTextStyles} from "./resources/AppTexts";
import clsx from "clsx";
import Navbar from "./components/Navbar/Navbar";
import {Divider, Drawer, Icon, IconButton, List,ListItem ,ListItemIcon, ListItemText} from "@material-ui/core";
import {LabelsDrawer} from "./locale/en";
import {AppColors} from "./resources/AppColors";
import MenuIcon from "@material-ui/icons/Menu";
import {
    BrowserRouter as Router,
    Link,
    Redirect,
    Route,
    Routes,
    Switch,
} from "react-router-dom";
import MainPage from "./pages/MainPage"
import GamePage from "./pages/GamePage";

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
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: "hidden",
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing(9) + 1,
        },
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
}));

const RouteMain = ({component: Component, select, drawer, ...rest}) => {
    if (drawer == null) drawer = true;
    //const authContext = useContext(AuthContext);
   // const {authenticated, checkAuth} = authContext;
    const texts = useTextStyles();
    const storageManager = new StorageManager();


    const classes = useStyles();
    const [open, setOpen] = useState(); //false
    const [selected, setSelected] = useState(null);

    const handleDrawerOpen = () => {
        setOpen(true);
        window.abierto = true;
    };

    const handleDrawerClose = () => {
        setOpen(false);
        window.abierto = false;
    };

    useEffect(() => {
        setOpen(drawer);
    }, [drawer]);


    const drawerIconsList = [];
    const drawerLinkList = ["/", ];

    return (
        <>
            <Navbar
                open={open}
                setOpen={setOpen}
                setSelected={setSelected}
                logged={true}
            />
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader}/>

            </main>
            <Drawer
                anchor="left"
                open={drawer}
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                {open && (
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={handleDrawerClose}>
                            {<MenuIcon style={{color: AppColors.PRIMARY}}/>}
                        </IconButton>
                    </div>
                )}

                {open === false && (
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={handleDrawerOpen}>
                            {<MenuIcon style={{color: AppColors.PRIMARY}}/>}
                        </IconButton>
                    </div>
                )}
                <Divider/>
                <List>
                    {[
                        LabelsDrawer.A,
                        LabelsDrawer.B,
                    ].map((text, index) => (
                        <Link
                            to={drawerLinkList[index]}
                            onClick={() => {
                                setSelected(index);
                                window.abierto = false;
                            }}
                            style={{color: AppColors.WHITE, textDecoration: "none"}}
                        >
                            <ListItem
                                button
                                key={text}
                                selected={selected === index}
                                style={{
                                    backgroundColor:
                                        selected === index && AppColors.PIRMARY_WITH_OPACITY,
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
                                    primary={text}
                                    style={{color: AppColors.PRIMARY}}
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
                <Route  path="/" component={MainPage}/>
            </Switch>
        </Router>

    );
}

export default App;
