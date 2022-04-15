import React, {useEffect, useState} from 'react';
import {
    Card,
    CardContent,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@material-ui/core";
import SearchBar from "../components/SearchBar/SearchBar";
import {makeStyles} from "@material-ui/core/styles";
import {AppColors} from "../resources/AppColors";
import {LabelsCreateForumPage, LabelsForumsPage, LabelsGamePage, LabelsSnackbar} from "../locale/en";
import {useHistory} from "react-router-dom";
import ProfileButton from "../components/ProfileButton/ProfileButton";
import ButtonFilled from "../components/ButtonFilled/ButtonFilled";
import {textType} from "../resources/AppTexts";
import Icons from "../resources/Icons";
import axios from "axios";
import {CREATE_FORUM, LIST_GAMES} from "../resources/ApiUrls";
import AutocompleteGeekify from "../components/AutocompleteGeekify/AutocompleteGeekify";
import {StorageManager} from "../utils";
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


}))

const NewForumPage = () => {
    const classes = useStyles();
    const [listGames, setListGames] = useState()
    const [title, setTitle] = useState(null)
    const [description, setDescription] = useState(null)
    const [image, setImage] = useState(null)
    const [tag, setTag] = useState(null)
    const [game, setGame] = useState(null)
    const storageManager = new StorageManager()
    const [openSnackCreateForum, setOpenSnackCreateForum] = useState(false);
    const history = useHistory()

    useEffect(() => {
        // getCollections()
        getListGames()

    }, []);

    const getListGames = async () => {
        try {
            const response = await axios.get(`${LIST_GAMES}`);
            setListGames(response.data.games)
        } catch (err) {
            console.log(err.message)
        }

    }

    const handleClickCreateForum = async () => {
        try {
            const body = {
                title: title,
                image: image === undefined ? null : image,
                description: description,
                tag: tag,
                game: game,
                admin: storageManager.getEmail(),
            };
            const config = {auth: {username: storageManager.getToken()}}
            const response = await axios.post(`${CREATE_FORUM}`, body, config);
            setOpenSnackCreateForum(true)
            setTimeout(() => {
                history.push({
                    pathname: '/forums',
                })
            }, 1000)
        } catch (err) {
            console.log(err.message)
        }
    }

    const handleChangeTag = (event) => {
        setTag(event.target.value);
    };

    const handleCloseSnackCreateForum = async () => {
        setOpenSnackCreateForum(false)
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

                        <Typography
                            style={{
                                fontSize: '40px',
                                color: AppColors.WHITE
                            }}>{LabelsForumsPage.CREATE_OWN_FORUM}</Typography>
                        <Card
                            className="w-100 mb-3"
                            style={{
                                boxShadow: "3px 3px 3px 1px rgba(0,0,0,.16)",
                                borderRadius: 10,
                                height: "auto",
                                width: 'auto',
                                backgroundColor: AppColors.BACKGROUND_DRAWER,
                                color: AppColors.PRIMARY
                            }
                            }>


                            <CardContent>
                                <Grid container xs={6}
                                      direction={"column"}>
                                    <Grid item>
                                        <FormControl variant="outlined" margin='normal'
                                                     style={{width: '30em'}}
                                        >
                                            <TextField
                                                required
                                                id={"title"}
                                                style={{width: '30em'}}
                                                onChange={(e) => setTitle(e.target.value)}
                                                type="text"
                                                label={LabelsCreateForumPage.TITLE}
                                                margin="normal"
                                                variant="standard"
                                                className={classes.textFieldLabel}
                                                InputLabelProps={{shrink: true}}

                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item>
                                        <FormControl variant="outlined" margin='normal'
                                                     style={{width: '30em'}}
                                        >
                                            <TextField
                                                required
                                                id={"description"}
                                                style={{width: '30em'}}
                                                onChange={(e) => setDescription(e.target.value)}
                                                type="text"
                                                label={LabelsCreateForumPage.DESCRIPTION}
                                                margin="normal"
                                                variant="standard"
                                                className={classes.textFieldLabel}
                                                InputLabelProps={{shrink: true}}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item>
                                        <FormControl variant="outlined" margin='normal'
                                                     style={{width: '30em'}}
                                        >
                                            <TextField
                                                id={"image"}
                                                style={{width: '30em'}}
                                                onChange={(e) => setImage(e.target.value)}
                                                type="text"
                                                label={LabelsCreateForumPage.IMAGE}
                                                margin="normal"
                                                variant="standard"
                                                className={classes.textFieldLabel}
                                                InputLabelProps={{shrink: true}}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item>
                                        <FormControl className={classes.select} variant="outlined" margin='normal'
                                                     style={{width: '30em'}}
                                        >
                                            <InputLabel required
                                                        className={classes.select}
                                                        id="demo-simple-select-label"/>
                                            <Select data-testid={"selectTag"} className={classes.select}
                                                    IconComponent={Icons.ARROW_DOWN}
                                                    value={tag}
                                                    displayEmpty
                                                    onChange={handleChangeTag}
                                                    label="Tag"
                                                    style={{width: 280}}
                                            >

                                                <MenuItem data-testid={"menuItemRate4"}
                                                          style={{color: AppColors.PRIMARY}}
                                                          value={'Gaming'}>{LabelsCreateForumPage.GAMING}</MenuItem>
                                                <MenuItem data-testid={"menuItemRate3"}
                                                          style={{color: AppColors.PRIMARY}}
                                                          value={'Discussion'}>{LabelsCreateForumPage.DISCUSSION}</MenuItem>
                                                <MenuItem style={{color: AppColors.PRIMARY}}
                                                          value={2}>{LabelsGamePage.FINE}</MenuItem>
                                                <MenuItem style={{color: AppColors.PRIMARY}}
                                                          value={1}>{LabelsGamePage.MEH}</MenuItem>
                                                <MenuItem style={{color: AppColors.PRIMARY}}
                                                          value={0}>{LabelsGamePage.NOT_RECOMMENDED}</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item>
                                        <FormControl className={classes.select} variant="outlined" margin='normal'
                                                     style={{width: '30em'}}
                                        >
                                            <AutocompleteGeekify game={game} setGame={setGame} list={listGames}/>
                                        </FormControl>
                                    </Grid>
                                    <Grid item style={{marginTop: '3em'}}>
                                        <ButtonFilled isDisabled={!title || !description || !tag || !game}
                                                      onClick={handleClickCreateForum} type={textType.TITLE_MAIN}
                                                      text={LabelsCreateForumPage.CREATE_FORUM} width={'350px'}/>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <SnackBarGeekify handleClose={handleCloseSnackCreateForum}
                                 message={LabelsSnackbar.FORUM_CREATED_SUCCESSFULLY}
                                 openSnack={openSnackCreateForum}/>
            </Grid>
        </>
    )
}

export default NewForumPage;
