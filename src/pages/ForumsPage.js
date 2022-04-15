import React, {useEffect, useState} from 'react';
import {
    Avatar,
    Button,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography
} from "@material-ui/core";
import SearchBar from "../components/SearchBar/SearchBar";
import {makeStyles} from "@material-ui/core/styles";
import {AppColors} from "../resources/AppColors";
import {LabelsForumsPage} from "../locale/en";
import ForumCard from "../components/Cards/ForumCard";
import CardGeekify from "../components/Cards/CardGeekify";
import {followingGroupMock} from "../mocks/FollowingGroupMock";
import Icons from "../resources/Icons";
import IconProvider from "../components/IconProvider/IconProvider";
import ProfileButton from "../components/ProfileButton/ProfileButton";
import axios from "axios";
import {ALL_FORUMS} from "../resources/ApiUrls";
import {useHistory} from "react-router-dom";
import {StorageManager} from "../utils";


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

const ForumsPage = () => {
    const [forums, setForums] = useState();
    const [forums2, setForums2] = useState();
    const [followingGroups, setFollowingGroups] = useState();
    const [loading, setLoading] = useState(false);
    const history = useHistory()
    const storageManager = new StorageManager()

    //Function to get all the games
    const getForums = async () => {
        try {
            var data = []
            const response = await axios.get(`${ALL_FORUMS}`);
            setForums(response.data.forums)
            setLoading(false)

        } catch (err) {
            console.log(err.message)
        }
    }

    const handleCreateForum = async () => {
        history.push({
            pathname: `/forum`,
        })
    }

    useEffect(() => {
        setFollowingGroups(followingGroupMock)
        getForums()
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
                      direction={"row"} style={{marginTop: '2em', marginBottom: '2em'}}>
                    <Grid item style={{marginLeft: '2em'}}>
                        <Grid container direction={"row"} justifyContent={"space-between"}>
                            <Typography
                                style={{
                                    fontSize: '40px',
                                    color: AppColors.WHITE,
                                    fontWeight: 'bold'
                                }}>{LabelsForumsPage.FORUMS}</Typography>
                            {storageManager.getToken() && <Button
                                data-testid={"BtnCreateForum"}
                                style={{
                                    backgroundColor: AppColors.PRIMARY,
                                    borderRadius: 20,
                                    maxWidth: '10em'
                                }}
                                onClick={handleCreateForum}
                            >
                                <Typography style={{color: AppColors.WHITE, marginBottom: 0, fontSize: '14px'}}
                                            gutterBottom
                                >
                                    {LabelsForumsPage.CREATE_FORUM}
                                </Typography>
                            </Button>}
                        </Grid>
                        {forums &&
                        Object.entries(forums)
                            .map(([key, value]) =>
                                <>
                                    <ForumCard
                                        bg={AppColors.BACKGROUND_DRAWER}
                                        forumId={key}
                                        forumTitle={value.title}
                                        forumDescription={value.description}
                                        forumNumUsers={value.num_users}
                                        forumImage={value.image}
                                        forumGenre={value.tag}
                                        forumGame={value.game}

                                    />
                                    <Divider style={{width: '45em', backgroundColor: AppColors.GRAY}}/>
                                </>
                            )
                        }


                    </Grid>
                    <Grid item style={{marginLeft: '2em'}}>
                        <Grid item style={{marginBottom: '4em',}}>
                            <CardGeekify bg={AppColors.BACKGROUND_DRAWER} borderRadius={50} height={'auto'}
                                         width={'350px'}>
                                <Grid
                                    container
                                >
                                    <Typography
                                        style={{
                                            fontSize: '20px',
                                            color: AppColors.WHITE,
                                            marginLeft: '3em',
                                            marginTop: '1em'
                                        }}>{LabelsForumsPage.FOLLOWING_GROUPS.toUpperCase()}</Typography>


                                    <List style={{marginLeft: '1em', marginTop: '0.5em'}}>
                                        {followingGroups &&
                                        followingGroups.map(elem => (
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar alt="Remy Sharp" src={elem.image}/>
                                                </ListItemAvatar>
                                                <ListItemText style={{color: AppColors.WHITE, marginRight: '5em'}}
                                                              primary={elem.groupName}
                                                />
                                                <ListItemText style={{color: AppColors.GRAY}}
                                                              primary={elem.numParticipants}
                                                />
                                            </ListItem>

                                        ))}
                                        <Grid container direction={"row"}>
                                            <Grid item>
                                                <Typography
                                                    style={{
                                                        fontSize: '20px',
                                                        color: AppColors.PRIMARY,
                                                        marginLeft: '3em',
                                                        marginTop: '1em'
                                                    }}>{LabelsForumsPage.SEE_MORE}</Typography>
                                            </Grid>
                                            <Grid item style={{paddingLeft: '2em', paddingTop: '1em'}}>
                                                <IconProvider icon={<Icons.ARROW_RIGHT style={{
                                                    verticalAlign: "middle",
                                                    display: "inline-flex",
                                                    color: AppColors.PRIMARY,
                                                    fontSize: '1.5em'
                                                }} size="100px"/>}/>
                                            </Grid>
                                        </Grid>
                                    </List>
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
