import React, {useEffect, useState} from 'react';
import {Button, Divider, Grid, Typography} from "@material-ui/core";
import SearchBar from "../components/SearchBar/SearchBar";
import {makeStyles} from "@material-ui/core/styles";
import {AppColors} from "../resources/AppColors";
import {LabelsNewsPage} from "../locale/en";
import styled from "@emotion/styled";
import {forumsMock} from "../mocks/ForumsMock";
import ProfileButton from "../components/ProfileButton/ProfileButton";
import axios from "axios";
import {MY_BASE_PATH, NEWS} from "../resources/ApiUrls";
import NewsCard from "../components/Cards/NewsCard";

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

    singleBlogBg: {
        content: '',
        position: "relative",
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)',
        opacity: ".5",
    }, imageIcon: {
        height: '100%'
    }, avatar: {
        border: '1px solid #C6D2E3',
        "&.MuiAvatar-img": {
            width: '20px',
            height: '20px',

        }

    }, root: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        "& > *:not(:last-child)": {
            marginRight: theme.spacing(2)
        }
    }


}))

const NewsPage = () => {
    const [news, setNews] = useState();
    const [mock, setMock] = useState();
    const [loading, setLoading] = useState(false);

    //Function to get all the games
    const getNews = async () => {
        try {
            var data = []
            const response = await axios.get(`${MY_BASE_PATH}${NEWS}`);
            console.log(response.data.news)
            setNews(response.data.news.articles.slice(0, 5))
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
                        <Grid item style={{margin: '2em'}}>
                            <SearchBar/>
                        </Grid>

                        <Grid item style={{margin: '2em'}}>
                            <ProfileButton/>

                        </Grid>


                    </Grid>

                </Grid>

                <Grid container justifyContent={'center'}
                      direction={"row"} style={{marginTop: '2em', marginBottom: '2em'}}>
                    <Grid item style={{marginLeft: '2em'}}>


                        <Typography
                            style={{
                                fontSize: '40px',
                                color: AppColors.WHITE,
                                fontWeight: 'bold'
                            }}>{LabelsNewsPage.NEWS}</Typography>

                        {news &&
                        news.map(article => (
                            <Grid item style={{paddingLeft: 0, paddingBottom: '2em'}} key={news.indexOf(article)}
                            >
                                <NewsCard
                                    article={article}
                                />
                                <Divider style={{width: '45em', backgroundColor: AppColors.GRAY}}/>

                            </Grid>

                        ))}

                    </Grid>


                </Grid>


            </Grid>
        </>
    )
}

export default NewsPage;
