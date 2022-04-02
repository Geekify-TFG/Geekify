import React, {useEffect, useState} from 'react';
import {Button, CircularProgress, Grid, Typography} from "@material-ui/core";
import SearchBar from "../components/SearchBar/SearchBar";
import {makeStyles} from "@material-ui/core/styles";
import {AppColors} from "../resources/AppColors";
import {LabelsCollection} from "../locale/en";
import styled from "@emotion/styled";
import GridCollections from "../components/GridCollections/GridCollections";
import {collectionsMock} from "../mocks/CollectionsMock";
import ProfileButton from "../components/ProfileButton/ProfileButton";
import axios from "axios";
import {BASE_PATH, MY_BASE_PATH, MY_COLLECTIONS} from "../resources/ApiUrls";

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

const CollectionsPage = () => {
    const [collections, setCollections] = useState();
    const [loading, setLoading] = useState(false);

    const getCollections = async () => {
        try {
            var data = []
            const response = await axios.get(`${MY_BASE_PATH}${MY_COLLECTIONS}`);
            setCollections(response.data.collections)
            //setLoading(false)

        } catch (err) {
            console.log(err.message)
        }
    }



    useEffect(() => {
        //setCollections(collectionsMock)
        getCollections()

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
                <Grid container
                      direction={"column"}>
                    <Grid item style={{marginLeft: '4em'}}>
                        <Typography
                            style={{
                                fontSize: '40px',
                                color: AppColors.WHITE
                            }}>{LabelsCollection.MY_COLLECTIONS}</Typography>
                    </Grid>

                    {
                        loading ?
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                <CircularProgress/>
                            </div>
                            :
                            <Grid item>
                                {collections && <GridCollections collections={collections}/>}
                            </Grid>}
                </Grid>
            </Grid>
        </>
    )
}

export default CollectionsPage;
