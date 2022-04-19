import React, {useEffect, useState} from 'react';
import {
    Avatar,
    ButtonGroup,
    Grid,
    Icon,
    List,
    ListItem,
    ListItemAvatar,
    ListItemIcon,
    ListItemText, ListSubheader
} from "@material-ui/core";
import {Button, Typography} from "@mui/material";
import SearchBar from "../components/SearchBar/SearchBar";
import {AppColors} from "../resources/AppColors";
import {LabelsProfilePage} from "../locale/en";
import {makeStyles} from "@mui/styles";
import {AppTextsFontSize, AppTextsFontWeight} from "../resources/AppTexts";
import {followingUsersMock} from "../mocks/FollowingUsersMock";
import CardGeekify from "../components/Cards/CardGeekify";
import ImagesCard from "../components/Cards/ImagesCard";
import ReviewCard from "../components/Cards/ReviewCard";
import ProfileButton from "../components/ProfileButton/ProfileButton";
import axios from "axios";
import {COMMENTS_OF_GAME, INFO_URL, MY_BASE_PATH} from "../resources/ApiUrls";
import {StorageManager} from "../utils";

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    text: {
        fontSize: AppTextsFontSize.SIZE_BODY,
        fontWeight: AppTextsFontWeight.WEIGHT_LIGHT
    },
    pos: {
        marginBottom: 12,
    },
    link: {
        overflowX: "auto",
        "&:hover": {
            cursor: 'pointer',
            textDecoration: `underline ${AppColors.WHITE}`
        }
    }, cardHeaderRoot: {
        overflow: "hidden"
    },
    cardHeaderContent: {
        overflow: "hidden"
    },
    textFieldLabel: {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: AppColors.PRIMARY,
                opacity: '0.2',
                borderRadius: 10,
            },
        }, '& .MuiInputBase-root': {
            color: AppColors.PRIMARY,
        }, '& .MuiInputLabel-root': {
            color: AppColors.PRIMARY,
        }, '& .MuiTextField-root': {
            height: '25em',
        },
        color: AppColors.PRIMARY,
        backgroundColor: AppColors.BACKGROUND_DRAWER,
        borderRadius: 10,
    },
    select: {
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: AppColors.PRIMARY,
                opacity: "0.2",
                borderRadius: 10,

            },
        },
        "& .MuiInputBase-root": {
            color: AppColors.WHITE,

        },
        "& .MuiInputLabel-root": {
            color: AppColors.WHITE,
            backgroundColor: "transparent"

        },
        "&:before": {
            color: AppColors.WHITE,
        },
        "&:after": {
            borderBottomColor: AppColors.WHITE,
        },
        "& .MuiSvgIcon-root": {
            color: AppColors.PRIMARY,
        },
        color: AppColors.WHITE,
        backgroundColor: AppColors.BACKGROUND_DRAWER,
        borderRadius: 10,
    },
    buttonGroup: {
        display: "flex",
        flexDirection: "row",
        "& > *:not(:last-child)": {
            marginRight: '1em'
        }
    }

}));

const ProfilePage = () => {
    const storageManager = new StorageManager();
    const email = storageManager.getEmail()
    const classes = useStyles();
    const [infoUser,setInfoUser] = useState()
    const [followingUsers, setFollowingUsers] = useState();

    const getInfouser = async () => {
        try {
            const response = await axios.get(`${INFO_URL(email)}`);
            console.log(response.data.account.value)
            setInfoUser(response.data.account.value)
        } catch (err) {
            console.log(err.message)
        }
    }


    useEffect(() => {
        setFollowingUsers(followingUsersMock)
        getInfouser()
    }, []);


    return (
        <>
            {infoUser &&<Grid container justifyContent={"space-between"} alignItems={"center"}>
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
                <Grid container alignItems="flex-start"
                      direction={"column"} style={{
                    width: '50em',
                    backgroundColor: AppColors.BACKGROUND,

                }}>

                    <Grid item style={{marginLeft: '2em'}}>
                        <Grid container alignItems={"center"} spacing={8}
                        >
                            <Grid item>
                                <Avatar style={{width: '150px', height: '150px', backgroundColor: AppColors.PRIMARY}}
                                        src={infoUser.photo}/>
                            </Grid>
                            <Grid item>
                                <Typography
                                    style={{
                                        fontSize: '40px',
                                        color: AppColors.WHITE
                                    }}>{infoUser.name}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container
                          direction={"row"} style={{marginTop: '2em', marginBottom: '2em'}}>
                        <Grid item style={{marginLeft: '2em'}}>
                            <CardGeekify bg={AppColors.BACKGROUND_DRAWER} borderRadius={20} height={'auto'}
                                         width={'20em'}>
                                <Grid
                                    container
                                >
                                    {infoUser && <List style={{marginLeft: '1em', marginTop: '0.5em'}}>
                                        <ListItem>
                                            <ListItemText style={{color: AppColors.WHITE, marginRight: '5em'}}
                                                          primary={LabelsProfilePage.GENDER}
                                            />
                                            <ListItemText style={{color: AppColors.PRIMARY}}
                                                          primary={infoUser.gender}
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText style={{color: AppColors.WHITE, marginRight: '5em'}}
                                                          primary={LabelsProfilePage.BIRTHDAY}
                                            />
                                            <ListItemText style={{color: AppColors.PRIMARY}}
                                                          primary={infoUser.birthday}
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText style={{color: AppColors.WHITE, marginRight: '5em'}}
                                                          primary={LabelsProfilePage.LOCATION}
                                            />
                                            <ListItemText style={{color: AppColors.PRIMARY}}
                                                          primary={infoUser.location}
                                            />
                                        </ListItem>
                                        <List style={{paddingLeft: 0}} subheader={<li/>}>
                                            <li>
                                                <ul style={{paddingLeft: '15px'}}>
                                                    <ListItemText style={{color: AppColors.WHITE, marginRight: '5em'}}
                                                                  primary={LabelsProfilePage.FAV_CATEGORIES}
                                                    />
                                                    <ButtonGroup className={classes.buttonGroup} color="primary"
                                                                 aria-label="outlined primary button group">
                                                        {infoUser.fav_categories.map(elem => (

                                                            <Button style={{
                                                                backgroundColor: AppColors.PRIMARY,
                                                                borderRadius: 20,
                                                            }}
                                                                    disabled={true}>
                                                                <Typography
                                                                    style={{color: AppColors.WHITE, marginBottom: 0}}
                                                                    gutterBottom

                                                                >
                                                                    {elem}
                                                                </Typography>
                                                            </Button>
                                                        ))}
                                                    </ButtonGroup>
                                                </ul>
                                            </li>
                                        </List>
                                        <List style={{paddingLeft: 0}} subheader={<li/>}>
                                            <li>
                                                <ul style={{paddingLeft: '15px'}}>
                                                    <ListItemText style={{color: AppColors.WHITE, marginRight: '5em'}}
                                                                  primary={LabelsProfilePage.FAV_CATEGORIES}
                                                    />
                                                    <ButtonGroup className={classes.buttonGroup} color="primary"
                                                                 aria-label="outlined primary button group">
                                                        {infoUser.all_games.map(elem => (
                                                            <ImagesCard width={'75px'} height={'75px'}
                                                                        images={elem.background_image}/>
                                                        ))}
                                                    </ButtonGroup>
                                                </ul>
                                            </li>
                                        </List>

                                    </List>}
                                </Grid>

                            </CardGeekify>
                        </Grid>
                        <Grid item container
                              direction={"row"} spacing={2} style={{marginBottom: '2em', width: 0}}>
                            <Grid item xs style={{marginLeft: '2em'}}>
                                <ImagesCard width={'450px'} height={'228px'}
                                            images={'https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg'}/>
                            </Grid>
                            <Grid item style={{marginLeft: '2em'}}>
                                {infoUser &&
                                <ReviewCard width={'450px'} height={'228px'}
                                            game={Object.values(infoUser.comment)[0].game_comment['name']}
                                            comment={Object.values(infoUser.comment)[0].content} avatar={infoUser.photo}
                                            bg={AppColors.BACKGROUND_DRAWER}/>}
                            </Grid>

                        </Grid>

                    </Grid>

                </Grid>
                <Grid item style={{marginRight: '2em'}}>
                    <Grid item style={{marginBottom: '4em',}}>
                        <CardGeekify bg={AppColors.BACKGROUND_DRAWER} borderRadius={50} height={'auto'}
                                     width={'292px'}>
                            <Grid
                                container
                            >
                                <Grid item style={{backgroundColor: AppColors.PRIMARY, width: '292px', height: '60px'}}>
                                    <Typography
                                        style={{
                                            fontSize: '20px',
                                            color: AppColors.WHITE,
                                            marginLeft: '4em',
                                            marginTop: '1em'
                                        }}>{LabelsProfilePage.FOLLOWING.toUpperCase()}</Typography>
                                </Grid>

                                <List style={{marginLeft: '1em', marginTop: '0.5em'}}>
                                    {followingUsers &&
                                    followingUsers.map(elem => (
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar alt="Remy Sharp" src={elem.avatar}/>
                                            </ListItemAvatar>
                                            <ListItemText style={{color: AppColors.WHITE}}
                                                          classes={{secondary: AppColors.WHITE}}
                                                          primary={<Typography style={{
                                                              fontSize: '18px',
                                                              color: AppColors.WHITE
                                                          }}>{elem.username}</Typography>}
                                                          secondary={<Typography style={{
                                                              fontSize: '14px',
                                                              color: AppColors.GRAY
                                                          }}>{elem.gamesCommon}</Typography>}
                                            />
                                        </ListItem>

                                    ))}

                                </List>
                            </Grid>

                        </CardGeekify>
                    </Grid>
                </Grid>
            </Grid>}
        </>
    )
}

export default ProfilePage;
