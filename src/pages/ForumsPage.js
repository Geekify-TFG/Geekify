/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

import React, { useEffect, useState } from "react";
import {
    Avatar,
    Button,
    CircularProgress,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography
} from "@material-ui/core";
import SearchBar from "../components/SearchBar/SearchBar";
import { makeStyles } from "@material-ui/core/styles";
import { AppColors } from "../resources/AppColors";
import { LabelsForumsPage } from "../locale/en";
import ForumCard from "../components/Cards/ForumCard";
import CardGeekify from "../components/Cards/CardGeekify";
import { followingGroupMock } from "../mocks/FollowingGroupMock";
import ProfileButton from "../components/ProfileButton/ProfileButton";
import axios from "axios";
import { ALL_FORUMS, JOIN_FORUM } from "../resources/ApiUrls";
import { useHistory } from "react-router-dom";
import { StorageManager } from "../utils";

/**
 * Forums page to show all forums of the page
 */
const ForumsPage = () => {
    const [forums, setForums] = useState();
    const [followingGroups, setFollowingGroups] = useState();
    const [followingForums, setFollowingForums] = useState();
    const [loading, setLoading] = useState(false);
    const history = useHistory()
    const storageManager = new StorageManager()
    const [devicesSize, setDevicesSize] = useState("20em")

    /**
    * Function to get all forums of the page
    */
    const getForums = async () => {
        try {
            const response = await axios.get(`${ALL_FORUMS}`);
            setForums(response.data.forums)
            setLoading(false)

        } catch (err) {
            console.log(err.message)
        }
    }

    /**
    * Function to get all the forums followed by the user
    */
    const getForumsFollowed = async () => {
        try {
            const config = { auth: { username: storageManager.getToken() } }
            const response = await axios.get(`${JOIN_FORUM(storageManager.getEmail())}`, config)
            setFollowingForums(response.data.forums_followed)
        } catch (e) {
            console.log("Error: ", e)
        }
    }

    /**
    * Function to redirect to create a forum
    */
    const handleCreateForum = async () => {
        history.push({
            pathname: "/forum",
        })
    }

    useEffect(() => {
        setLoading(true)
        setFollowingGroups(followingGroupMock)
        getForums()
        if (storageManager.getToken())
            getForumsFollowed()

    }, []);

    function debounce(fn, ms) {
        //This will run the code on every 1 second
        let timer
        return _ => {
            clearTimeout(timer)
            timer = setTimeout(_ => {
                timer = null
                fn.apply(this, arguments)
            }, ms)
        };
    }
    useEffect(() => {
        const debouncedHandleResize = debounce(function handleResize() {
            //give the paddingLeft size base on drawer open or closed and window size
            if (window.innerWidth >= 1500) {
                setDevicesSize("15%")
            } else {
                setDevicesSize("0em")
            }

        }, 300)

        // Add event listener to listen for window sizes 
        window.addEventListener("resize", debouncedHandleResize);
        // Call handler right away so state gets updated with initial window size

        debouncedHandleResize()
        return _ => {
            window.removeEventListener("resize", debouncedHandleResize)

        }

    }, [])

    return (
        <>
            <Grid container alignItems={"center"}>
                <Grid container alignItems="flex-start"
                    direction={"column"} style={{
                        backgroundSize: "cover",

                    }}>
                    <Grid container direction={"row"} justifyContent={"space-between"} spacing={20}>
                        <Grid item style={{ margin: "2em" }}>
                            <SearchBar />
                        </Grid>

                        <Grid item style={{ margin: "2em" }}>
                            <ProfileButton />

                        </Grid>

                    </Grid>

                </Grid>

                <Grid container
                    direction={"row"} style={{ marginLeft: devicesSize, marginTop: "2em", marginBottom: "2em" }}>
                    <Grid item style={{ marginLeft: "2em" }}>
                        <Grid container direction={"row"} justifyContent={"space-between"}>
                            <Typography
                                style={{
                                    fontSize: "40px",
                                    color: AppColors.WHITE,
                                    fontWeight: "bold"
                                }}>{LabelsForumsPage.FORUMS}</Typography>
                            {storageManager.getToken() && <Button
                                data-testid={"BtnCreateForum"}
                                style={{
                                    backgroundColor: AppColors.PRIMARY,
                                    borderRadius: 20,
                                    maxWidth: "10em"
                                }}
                                onClick={handleCreateForum}
                            >
                                <Typography style={{ color: AppColors.WHITE, marginBottom: 0, fontSize: "14px" }}
                                    gutterBottom
                                >
                                    {LabelsForumsPage.CREATE_FORUM}
                                </Typography>
                            </Button>}
                        </Grid>
                        {loading ?
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <CircularProgress />
                            </div>
                            : <Grid item>
                                {forums &&
                                    Object.entries(forums)
                                        .map(([key, value]) =>
                                            <>
                                                <ForumCard
                                                    bg={AppColors.BACKGROUND_DRAWER}
                                                    forumId={key}
                                                    forumTitle={value.title}
                                                    forumDescription={value.description}
                                                    forumNumUsers={value.users.length}
                                                    forumImage={value.image}
                                                    forumGenre={value.tag}
                                                    forumGame={value.game}
                                                    followingForums={followingForums ? (!!followingForums.find(element => element.id === key)) : null}
                                                    getForumsFollowed={getForumsFollowed}

                                                />
                                                <Divider style={{ width: "45em", backgroundColor: AppColors.GRAY }} />
                                            </>
                                        )
                                }
                            </Grid>}
                    </Grid>
                    <Grid item style={{ marginLeft: "2em" }}>
                        <Grid item style={{ marginBottom: "4em", }}>
                            <CardGeekify bg={AppColors.BACKGROUND_DRAWER} borderRadius={50} height={"auto"}
                                width={"350px"}>
                                <Grid
                                    container
                                >
                                    <Grid item
                                        style={{ backgroundColor: AppColors.PRIMARY, width: "350px", height: "60px" }}>

                                        <Typography
                                            style={{
                                                fontSize: "20px",
                                                color: AppColors.WHITE,
                                                marginLeft: "3em",
                                                marginTop: "1em"
                                            }}>{LabelsForumsPage.FOLLOWING_GROUPS.toUpperCase()}</Typography>
                                    </Grid>

                                    {followingForums ? <List style={{ marginLeft: "1em", marginTop: "0.5em" }}>
                                        {followingForums &&
                                            followingForums.map(elem => (
                                                <ListItem key={elem.value} >
                                                    <ListItemAvatar>
                                                        <Avatar alt="Remy Sharp" src={elem.value.image} />
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        style={{ color: AppColors.WHITE, marginRight: "5em" }}
                                                        primary={elem.value.title}
                                                    />
                                                    <ListItemText style={{ color: AppColors.GRAY }}
                                                        primary={elem.value.game}
                                                    />
                                                </ListItem>

                                            ))}

                                    </List> :
                                        <Typography
                                            style={{
                                                fontSize: "30px",
                                                color: AppColors.PRIMARY,
                                                marginLeft: "1.5em",
                                                marginTop: "1em"
                                            }}>{LabelsForumsPage.FOLLOWING_GROUPS_NOT_LOGGED}</Typography>
                                    }
                                </Grid>

                            </CardGeekify>
                        </Grid>

                    </Grid>

                </Grid>

            </Grid>
        </>
    )
}

export default ForumsPage;