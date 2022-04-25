import React, {useEffect, useState} from 'react';
import {
    Avatar,
    ButtonGroup,
    CircularProgress,
    FormControl,
    Grid,
    InputLabel,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    MenuItem,
    Select,
    TextField
} from "@material-ui/core";
import {Button, Typography} from "@mui/material";
import SearchBar from "../components/SearchBar/SearchBar";
import {AppColors} from "../resources/AppColors";
import {DialogTexts, LabelsProfilePage} from "../locale/en";
import {makeStyles} from "@mui/styles";
import {AppTextsFontSize, AppTextsFontWeight} from "../resources/AppTexts";
import {followingUsersMock} from "../mocks/FollowingUsersMock";
import CardGeekify from "../components/Cards/CardGeekify";
import ImagesCard from "../components/Cards/ImagesCard";
import ReviewCard from "../components/Cards/ReviewCard";
import ProfileButton from "../components/ProfileButton/ProfileButton";
import axios from "axios";
import {INFO_URL, LIST_GAMES} from "../resources/ApiUrls";
import {StorageManager} from "../utils";
import ButtonFilled from "../components/ButtonFilled/ButtonFilled";
import DialogGeekify from "../components/DialogGeekify";
import Icons from "../resources/Icons";

import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import MultipleSelectGeekify from "../components/MultipleSelectGeekify/MultipleSelectGeekify";
import {genresMock} from "../mocks/SearchMocks";
import AutocompleteMultipleGeekify from "../components/AutocompleteGeekify/AutocompleteMultipleGeekify";

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
        backgroundColor: AppColors.BACKGROUND,
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


function EditProfile({
                         infoUser,
                         showEditProfileModal,
                         setShowEditProfileModal,
                         openSnackEditProfile, setOpenSnackEditProfile
                     }) {
    const classes = useStyles();
    const [photo, setPhoto] = useState()
    const [name, setName] = useState()
    const [gender, setGender] = useState()
    const [birthday, setBirthday] = useState()
    const [location, setLocation] = useState()
    const [favCategories, setFavCategories] = useState([])
    const [favGames, setFavGames] = useState([])
    const [game, setGame] = useState([])
    const [listGames, setListGames] = useState()
    const storageManager = new StorageManager()

    const getListGames = async () => {
        try {
            const response = await axios.get(`${LIST_GAMES}`);
            setListGames(response.data.games)
        } catch (err) {
            console.log(err.message)
        }
    }
    const handleClickSubmit = async () => {
        let fav_categories = favCategories.map(a => a.value);
        let top_games = favGames.map(a => a.id);

        try {
            var body = {
                'name': name ? name : infoUser.name,
                'photo': photo ? photo : infoUser.photo,
                'gender': gender ? gender : infoUser.gender,
                'birthday': birthday ? birthday : infoUser.birthday,
                'location': location ? location : infoUser.location,
                'fav_categories': fav_categories ? fav_categories :infoUser.fav_categories,
                'top_games': top_games ? top_games : infoUser.top_games
            }
            console.log(body)
            const config = {auth: {username: storageManager.getToken()}}
            const response = await axios.put(`${INFO_URL(storageManager.getEmail())}`, body, config)
            setShowEditProfileModal(false)
            console.log(response)
        } catch (e) {
            console.log('Error: ', e)
        }
    }

    const handleChangeGender = (event) => {
        setGender(event.target.value);
    };

    const handleChangeFavCategories = (event) => {
        setFavCategories(event.target.value);
    };
    const handleChangeGame = (event, value) => {
        setFavGames(value)
    };
    useEffect(() => {
        getListGames()
    }, [])

    return (
        <DialogGeekify
            textCancelButton={DialogTexts.CANCEL}
            textConfirmButton={DialogTexts.SAVE}
            handleShow={setShowEditProfileModal}
            handleConfirm={handleClickSubmit}
            title={DialogTexts.EDIT_PROFILE}
            buttonColor={AppColors.PRIMARY}
            body={

                <Grid container xs={6}
                      direction={"column"}>
                    <Avatar style={{width: '100px', height: '100px', backgroundColor: AppColors.PRIMARY}}
                            src={infoUser.photo}/>

                    <FormControl variant="outlined" margin='normal'
                                 style={{width: '30em'}}
                    >
                        <TextField
                            data-testid={"nameUser"}
                            required
                            id={"title"}
                            style={{width: '30em'}}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            label={LabelsProfilePage.NAME}
                            margin="normal"
                            variant="standard"
                            defaultValue={infoUser ? infoUser.name: undefined}
                            className={classes.textFieldLabel}
                            InputLabelProps={{shrink: true}}

                        />
                    </FormControl>
                    <FormControl data-testid={"selectTag"} className={classes.select}
                                 variant="outlined" margin='normal' style={{width: '20em'}}
                    >
                        <InputLabel style={{width: '20em'}}
                                    className={classes.select}
                                    id="demo-simple-select-label">{LabelsProfilePage.GENDER}</InputLabel>
                        <Select className={classes.select}
                                IconComponent={Icons.ARROW_DOWN}
                                defaultValue={infoUser ? infoUser.gender: undefined}
                                displayEmpty
                                onChange={handleChangeGender}
                                label={LabelsProfilePage.GENDER}

                        >
                            <MenuItem data-testid={"menuItemMale"}
                                      style={{color: AppColors.PRIMARY}}
                                      value={'Male'}>{LabelsProfilePage.MALE}</MenuItem>
                            <MenuItem data-testid={"menuItemFemale"}
                                      style={{color: AppColors.PRIMARY}}
                                      value={'Female'}>{LabelsProfilePage.FEMALE}</MenuItem>
                            <MenuItem style={{color: AppColors.PRIMARY}}
                                      value={'Other'}>{LabelsProfilePage.OTHER}</MenuItem>

                        </Select>
                    </FormControl>
                    <FormControl className={classes.select} margin='normal' style={{width: '170px'}}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                inputFormat="dd/MM/yyyy"
                                label="Birthday"
                                value={birthday}
                                defaultValue={infoUser ? infoUser.birthday: undefined}
                                onChange={(newValue) => {
                                    setBirthday(newValue.toLocaleDateString("en-US"));
                                    //setValues({...values, ['birthdate']: newValue.toLocaleDateString("en-US")})

                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </FormControl>

                    <FormControl variant="outlined" margin='normal'
                                 style={{width: '30em'}}
                    >
                        <TextField
                            id={"image"}
                            style={{width: '30em'}}
                            onChange={(e) => setLocation(e.target.value)}
                            type="text"
                            label={LabelsProfilePage.LOCATION}
                            margin="normal"
                            variant="standard"
                            defaultValue={infoUser.location}
                            className={classes.textFieldLabel}
                            InputLabelProps={{shrink: true}}
                        />
                    </FormControl>
                    <MultipleSelectGeekify value={ favCategories} handleChange={handleChangeFavCategories}
                                           options={genresMock} width={'20em'}
                                           label={LabelsProfilePage.FAV_CATEGORIES} />

                    <FormControl data-testid={"formControlGame"} className={classes.select}
                                 variant="outlined" margin='normal'
                                 style={{width: '20em'}}
                    >
                        <AutocompleteMultipleGeekify game={game} handleChange={handleChangeGame}
                                                     setGame={setGame} list={listGames}/>
                    </FormControl>

                </Grid>
            }
            show={showEditProfileModal}

        />
    )
}


const ProfilePage = () => {
    const storageManager = new StorageManager();
    const email = storageManager.getEmail()
    const classes = useStyles();
    const [infoUser, setInfoUser] = useState()
    const [followingUsers, setFollowingUsers] = useState();
    const [showEditProfileModal, setShowEditProfileModal] = useState(-999)
    const [openSnackEditProfile, setOpenSnackEditProfile] = useState(-999)
    const [loading, setLoading] = useState(true)

    const getInfouser = async () => {
        try {
            const response = await axios.get(`${INFO_URL(email)}`);
            console.log(response.data.account.value)
            setInfoUser(response.data.account.value)
            setLoading(false)
        } catch (err) {
            console.log(err.message)
        }
    }


    useEffect(() => {
        setFollowingUsers(followingUsersMock)
        getInfouser()
    }, []);

    const handleClickEdit = () => {
        setShowEditProfileModal(true)
    }
    return (
        <>
            {loading ? (
                <div style={{display: "flex", justifyContent: "center"}}>
                    <CircularProgress/>
                </div>) : <Grid container justifyContent={"space-between"} alignItems={"center"}>
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
                            {infoUser.photo && <Grid item xs={4}>
                                <Avatar style={{width: '150px', height: '150px', backgroundColor: AppColors.PRIMARY}}
                                        src={infoUser.photo}/>
                            </Grid>}
                            {infoUser.name && <Grid item xs={6}>
                                <Typography
                                    style={{
                                        fontSize: '40px',
                                        color: AppColors.WHITE
                                    }}>{infoUser.name}</Typography>
                            </Grid>}

                            <Grid item xs={2}>
                                <ButtonFilled onClick={handleClickEdit} text={LabelsProfilePage.EDIT_PROFILE}
                                />

                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container
                          direction={"row"} style={{marginTop: '2em', marginBottom: '2em'}}>
                        <Grid item style={{marginLeft: '2em'}}>
                            <CardGeekify bg={AppColors.BACKGROUND_DRAWER} borderRadius={20} height={'auto'}
                                         width={'20em'}>
                                {infoUser.gender != null ? <Grid
                                        container
                                    >
                                        <List style={{marginLeft: '1em', marginTop: '0.5em'}}>
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
                                                                      primary={LabelsProfilePage.TOP_GAMES}
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

                                        </List>
                                    </Grid> :
                                    <Grid>
                                        <Typography
                                            style={{
                                                fontSize: '40px',
                                                color: AppColors.WHITE
                                            }}>{"You dont have profile info yet.\nEdit your profile" }</Typography>
                                    </Grid>}

                            </CardGeekify>
                        </Grid>
                        <Grid item container
                              direction={"row"} spacing={2} style={{marginBottom: '2em', width: 0}}>
                            <Grid item xs style={{marginLeft: '2em'}}>
                                <ImagesCard width={'450px'} height={'228px'}
                                            images={'https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg'}/>
                            </Grid>
                            <Grid item style={{marginLeft: '2em'}}>
                                {infoUser.comment != null &&
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
            {showEditProfileModal >= 0 && (
                <EditProfile
                    showEditProfileModal={showEditProfileModal}
                    setShowEditProfileModal={setShowEditProfileModal}
                    infoUser={infoUser}
                    setOpenSnackEditProfile={setOpenSnackEditProfile}
                    openSnackEditProfile={openSnackEditProfile}
                />
            )}
        </>
    )
}

export default ProfilePage;
