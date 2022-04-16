import React, {useEffect, useState} from 'react';
import {Avatar, Button, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography} from "@material-ui/core";
import SearchBar from "../components/SearchBar/SearchBar";
import {makeStyles} from "@material-ui/core/styles";
import {AppColors} from "../resources/AppColors";
import {DialogTexts, LabelsForumsPage, LabelsSnackbar} from "../locale/en";
import CardGeekify from "../components/Cards/CardGeekify";
import IconProvider from "../components/IconProvider/IconProvider";
import Icons from "../resources/Icons";
import {forumPostsMock} from "../mocks/ForumPostsMock";
import CommentCard from "../components/Cards/CommentCard";
import {followingGroupMock} from "../mocks/FollowingGroupMock";
import {useHistory, useLocation} from "react-router-dom";
import ProfileButton from "../components/ProfileButton/ProfileButton";
import {StorageManager} from "../utils";
import axios from "axios";
import {DELETE_FORUM, INFO_FORUM} from "../resources/ApiUrls";
import DialogGeekify from "../components/DialogGeekify";
import SnackBarGeekify from "../components/SnackbarGeekify/SnackbarGeekify";


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


function DeleteForumModal({
                              showDeleteForumModal,
                              setShowDeleteForumModal,
                              loading,
                              setLoading,
                              forumId,
                              setOpenSnackDeleteForum,
                              openSnackDeleteForum,
                          }) {
    const history = useHistory()

    const handleClickSubmit = async () => {
        try {
            const response = await axios.delete(`${DELETE_FORUM(forumId)}`)

            setShowDeleteForumModal(false)
            setLoading(true)
            setOpenSnackDeleteForum(true)
            setTimeout(() => {
                history.push({
                    pathname: '/forums',
                })
            }, 1000)
        } catch (e) {
            console.log('Error: ', e)
        }
    }


    return (
        <DialogGeekify
            textCancelButton={DialogTexts.CANCEL}
            textConfirmButton={DialogTexts.DELETE}
            handleShow={setShowDeleteForumModal}
            handleConfirm={handleClickSubmit}
            title={DialogTexts.DELETE_COLLECTION}
            buttonColor={AppColors.RED}
            body={
                <>
                    <Typography variant="subtitle1" style={{color: AppColors.WHITE}} gutterBottom>
                        {"Are you sure you want to delete this forum?"}
                    </Typography>
                </>
            }
            show={showDeleteForumModal}

        />
    )
}


const ForumPage = () => {
    const [forumPosts, setForumPosts] = useState();
    const [forum, setForum] = useState();
    const [loading, setLoading] = useState(false);
    const [followingGroups, setFollowingGroups] = useState();
    const [showDeleteForumModal, setShowDeleteForumModal] = useState();
    const [openSnackDeleteForum, setOpenSnackDeleteForum] = useState();
    const location = useLocation();
    const forumTitle = location.state.title
    const forumId = location.state.detail

    const storageManager = new StorageManager()

    //Function to get all the games
    const getForum = async () => {
        try {
            const response = await axios.get(`${INFO_FORUM(forumId)}`);
            console.log(Object.values(response.data.forum.value.posts))
            console.log((response.data.forum.value.posts))
            setForumPosts(Object.values(response.data.forum.value.posts))
            setForum(response.data.forum.value)
            setLoading(false)

        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        //setForumPosts(forumPostsMock)
        setFollowingGroups(followingGroupMock)
        getForum()
    }, []);

    const handleDeleteForum = () => {
        setShowDeleteForumModal(true)
    }

    const handleCloseSnackDeleteForum = async () => {
        setOpenSnackDeleteForum(false)
    }


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
                      direction={"row"} style={{marginTop: '2em', marginLeft: '2em', marginBottom: '2em'}}>
                    <Grid item style={{marginLeft: '2em'}}>
                        <Grid container direction={"row"} justifyContent={"space-between"}>

                            <Typography
                                style={{
                                    fontSize: '40px',
                                    color: AppColors.WHITE
                                }}>{(`${forumTitle} Forum`).toUpperCase()}</Typography>
                            {forum  && storageManager.getEmail() === forum.admin  && <Button //TODO Cambiar a quien tenga permisos del foro
                                data-testid={"btnDeleteForum"}
                                style={{
                                    backgroundColor: AppColors.PRIMARY,
                                    borderRadius: 20,
                                    maxWidth: '10em'
                                }}
                                onClick={handleDeleteForum}
                            >
                                <Typography style={{color: AppColors.WHITE, marginBottom: 0, fontSize: '14px'}}
                                            gutterBottom
                                >
                                    {LabelsForumsPage.DELETE_FORUM}
                                </Typography>
                            </Button>}
                        </Grid>

                        {forumPosts &&
                        forumPosts.map(elem => (
                            <Grid item style={{paddingLeft: 0, paddingBottom: '2em'}} key={forumPosts.indexOf(elem)}

                            >
                                {console.log(Object.values(elem)[0].date)}
                                <CommentCard width={'40em'}
                                             bg={AppColors.BACKGROUND_DRAWER}
                                             title={Object.values(elem)[0].user}
                                             time={Object.values(elem)[0].date}
                                             comment={Object.values(elem)[0]}
                                />

                            </Grid>

                        ))}

                    </Grid>
                    <Grid item style={{marginLeft: '5em'}}>
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
            <SnackBarGeekify handleClose={handleCloseSnackDeleteForum}
                             message={LabelsSnackbar.FORUM_DELETED}
                             openSnack={openSnackDeleteForum}/>
            {showDeleteForumModal && (
                <DeleteForumModal
                    showDeleteForumModal={showDeleteForumModal}
                    setShowDeleteForumModal={setShowDeleteForumModal}
                    loading={loading}
                    setLoading={setLoading}
                    forumId={forumId}
                    setOpenSnackDeleteForum={setOpenSnackDeleteForum}
                    openSnackDeleteForum={openSnackDeleteForum}
                />
            )}
        </>
    )
}

export default ForumPage;
