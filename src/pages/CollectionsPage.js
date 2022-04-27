/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import { CircularProgress, Grid, Typography } from "@material-ui/core";
import SearchBar from "../components/SearchBar/SearchBar";
import { AppColors } from "../resources/AppColors";
import { LabelsCollection } from "../locale/en";
import GridCollections from "../components/GridCollections/GridCollections";
import ProfileButton from "../components/ProfileButton/ProfileButton";
import axios from "axios";
import { MY_BASE_PATH, MY_COLLECTIONS } from "../resources/ApiUrls";
import { StorageManager } from "../utils";

const CollectionsPage = () => {
    const [collections, setCollections] = useState();
    const [loading, setLoading] = useState(false);
    const storageManager = new StorageManager()

    const getCollections = async () => {
        try {
            const config = { auth: { username: storageManager.getToken() } }

            const response = await axios.get(`${MY_BASE_PATH}${MY_COLLECTIONS(storageManager.getEmail())}`, config);
            setCollections(response.data.collections)
            setLoading(false)
        } catch (err) {
            console.log(err.message)
        }
    }
    useEffect(() => {
        //setCollections(collectionsMock)
        if (storageManager.getToken())
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
                        <Grid item style={{ margin: "2em" }}>
                            <SearchBar />
                        </Grid>

                        <Grid item style={{ margin: "2em" }}>
                            <ProfileButton />
                        </Grid>

                    </Grid>

                </Grid>
                <Grid container
                    direction={"column"}>
                    <Grid item style={{ marginLeft: "4em" }}>
                        <Typography
                            style={{
                                fontSize: "40px",
                                color: AppColors.WHITE
                            }}>{LabelsCollection.MY_COLLECTIONS}</Typography>
                    </Grid>

                    {
                        loading ?
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <CircularProgress />
                            </div>
                            :
                            <Grid item>
                                {collections && <GridCollections loading={loading} setLoading={setLoading}
                                    getCollections={getCollections}
                                    collections={collections} />}
                            </Grid>}

                </Grid>
            </Grid>
        </>
    )
}

export default CollectionsPage;
