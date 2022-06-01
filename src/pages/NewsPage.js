/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import { Button, Divider, Grid, Typography } from "@material-ui/core";
import SearchBar from "../components/SearchBar/SearchBar";
import { makeStyles } from "@material-ui/core/styles";
import { AppColors } from "../resources/AppColors";
import { LabelsNewsPage } from "../locale/en";
import styled from "@emotion/styled";
import { forumsMock } from "../mocks/ForumsMock";
import ProfileButton from "../components/ProfileButton/ProfileButton";
import axios from "axios";
import { MY_BASE_PATH, NEWS } from "../resources/ApiUrls";
import NewsCard from "../components/Cards/NewsCard";
import BigNewCard from "../components/Cards/BigNewCard";
const useStyles = makeStyles((theme) => ({

    singleBlogBg: {
        content: "",
        position: "relative",
        left: 0,
        right: 0,
        bottom: 0,
        background: "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)",
        opacity: ".5",
    }, imageIcon: {
        height: "100%"
    }, avatar: {
        border: "1px solid #C6D2E3",
        "&.MuiAvatar-img": {
            width: "20px",
            height: "20px",

        }

    }, root: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        "& > *:not(:last-child)": {
            marginRight: theme.spacing(2)
        }
    }, root1: {
        position: "relative"
    },
    font: {
        position: "absolute",
        top: "50%",
        width: "100%",
        textAlign: "center",
        color: AppColors.WHITE,
        backgroundColor: "none",
        fontFamily: "Comic Sans MS"
    },
    root2: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary
    },
    first: {
        padding: theme.spacing(1),
        textAlign: "center",
        color: theme.palette.text.secondary,
        height: 300
    },
    parentPaper: {
        padding: theme.spacing(2),
        margin: "auto",
        maxWidth: 1600
    },
    standalone: {
        padding: theme.spacing(1),
        textAlign: "center",
        color: theme.palette.text.secondary,
        height: 150
    }

}))

const NewsPage = () => {
    const [news, setNews] = useState();
    const [mock, setMock] = useState();
    const [loading, setLoading] = useState(false);
    const classes = useStyles();

    //Function to get all the games
    const getNews = async () => {
        try {
            const response = await axios.get(`${MY_BASE_PATH}${NEWS}`);
            setNews(response.data.news.articles)
            setLoading(false)

        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        setMock(forumsMock)
        getNews()
    }, []);

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

                {news && <Grid container justifyContent={"center"}
                    direction={"row"} style={{ marginTop: "2em" }}>
                    <Grid item style={{ marginLeft: "4%" }} xs={12} container>
                        <Grid item xs={6}>
                            <BigNewCard height={"40em"} width={"35em"} top={"70%"} fontSize={"30px"}
                                subFontSize={"20px"}
                                article={news[0]}
                            />
                        </Grid>
                        <Grid item xs={6} >
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs={12}>
                                    <BigNewCard height={"13em"} width={"30em"} top={"40%"} fontSize={"20px"}
                                        subFontSize={"15px"}
                                        article={news[1]}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <BigNewCard height={"13em"} width={"30em"} fontSize={"20px"} subFontSize={"15px"}
                                        article={news[2]} top={"40%"}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <BigNewCard height={"13em"} width={"30em"} fontSize={"20px"} subFontSize={"15px"}
                                        article={news[3]} top={"40%"}
                                    />
                                </Grid>

                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>}

                <Grid container justifyContent={"center"}
                    direction={"row"} style={{ marginBottom: "2em" }}>
                    <Grid item style={{ marginLeft: "2em" }}>

                        <Typography
                            style={{
                                fontSize: "40px",
                                color: AppColors.WHITE,
                                fontWeight: "bold"
                            }}>{LabelsNewsPage.NEWS}</Typography>

                        {news &&
                            news.slice(4, 10).map(article => (
                                <Grid item style={{ paddingLeft: 0, paddingBottom: "2em" }} key={news.indexOf(article)}
                                >
                                    <NewsCard
                                        article={article}
                                    />

                                </Grid>

                            ))}
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default NewsPage;
