import React, {useEffect, useState} from 'react';
import {
    Avatar,
    Button, Card, CardMedia,
    Divider,
    Grid,
    InputAdornment,
    List,
    ListItem, ListItemAvatar,
    ListItemText,
    TextField,
    Typography
} from "@material-ui/core";
import SearchBar from "../components/SearchBar/SearchBar";
import {makeStyles} from "@material-ui/core/styles";
import {AppColors} from "../resources/AppColors";
import {LabelsForums, LabelsForumsPage, LabelsGamePage} from "../locale/en";
import styled from "@emotion/styled";
import ForumCard from "../components/Cards/ForumCard";
import {forumsMock} from "../mocks/ForumsMock";
import CommentCard from "../components/Cards/CommentCard";
import CardGeekify from "../components/Cards/CardGeekify";
import CardAchievements from "../components/Cards/AchievementsCard";
import accountIcon from "../img/account_icon.svg";

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

const ForumsPage = () => {
    const [forums, setForums] = useState();
    const [loading, setLoading] = useState(false);

    /*  //Function to get all the games
      const getCollections = async () => {
          try {
              var data = []
              const response = await axios.get(`${BASE_PATH}${GAMES}`);
              setCollections(response.data.results)
              setLoading(false)

          } catch (err) {
              console.log(err.message)
          }
      }
  */

    useEffect(() => {
        setForums(forumsMock)
        // getCollections()

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
                            <Button style={{
                                backgroundColor: AppColors.BACKGROUND_DRAWER,
                                borderRadius: 30,
                                border: '2px solid #6563FF',
                                borderColor: AppColors.PRIMARY,
                                height: '3.5em'
                            }}>
                                <Avatar style={{width: '36px', height: '36px', backgroundColor: AppColors.PRIMARY}}>
                                </Avatar>
                                <Typography style={{fontSize: '12px', color: AppColors.WHITE, paddingLeft: '1em'}}>Jordi
                                    Romero</Typography>

                            </Button>
                        </Grid>


                    </Grid>

                </Grid>

                <Grid container
                      direction={"row"} style={{marginTop: '2em', marginBottom: '2em'}}>
                    <Grid item style={{marginLeft: '2em'}}>


                        <Typography
                            style={{
                                fontSize: '40px',
                                color: AppColors.WHITE
                            }}>{LabelsForumsPage.FORUMS}</Typography>

                        {forums &&
                        forums.map(elem => (
                            <Grid item style={{paddingLeft:0, paddingBottom: '2em'}} key={forums.indexOf(elem)}

                            >
                                <ForumCard
                                    bg={AppColors.BACKGROUND_DRAWER}
                                    forumTitle={elem.title}
                                    forumDescription={elem.description}
                                    forumNumUsers={elem.numUsers}
                                    forumImage={elem.image}
                                    forumGenre={elem.genre}

                                />
                                <Divider style={{width: '45em', backgroundColor: AppColors.GRAY}}/>

                            </Grid>

                        ))}

                    </Grid>
                    <Grid item style={{marginLeft: '2em'}}>
                        <Grid item style={{marginBottom: '4em',}}>
                            <CardGeekify bg={AppColors.BACKGROUND_CARD} borderRadius={50} height={'auto'} width={'350px'}>
                                <Grid
                                    container
                                >
                                    <Typography
                                        style={{
                                            fontSize: '20px',
                                            color: AppColors.WHITE,
                                            marginLeft:'3em',
                                            marginTop:'1em'
                                        }}>{LabelsForumsPage.FOLLOWING_GROUPS.toUpperCase()}</Typography>


                                    <List style={{marginLeft: '1em', marginTop: '0.5em'}}>
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar alt="Remy Sharp" src={'https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg'} />
                                            </ListItemAvatar>
                                            <ListItemText style={{color: AppColors.WHITE, marginRight: '5em'}}
                                                          primary={'Elden ring'}
                                            />
                                            <ListItemText style={{color: AppColors.SECONDARY}}
                                                          primary={'18'}
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar alt="Remy Sharp" src={'https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg'} />
                                            </ListItemAvatar>
                                            <ListItemText style={{color: AppColors.WHITE, marginRight: '5em'}}
                                                          primary={'Elden ring'}
                                            />
                                            <ListItemText style={{color: AppColors.SECONDARY}}
                                                          primary={'18'}
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar alt="Remy Sharp" src={'https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg'} />
                                            </ListItemAvatar>
                                            <ListItemText style={{color: AppColors.WHITE, marginRight: '5em'}}
                                                          primary={'Elden ring'}
                                            />
                                            <ListItemText style={{color: AppColors.SECONDARY}}
                                                          primary={'18'}
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar alt="Remy Sharp" src={'https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg'} />
                                            </ListItemAvatar>
                                            <ListItemText style={{color: AppColors.WHITE, marginRight: '5em'}}
                                                          primary={'Elden ring'}
                                            />
                                            <ListItemText style={{color: AppColors.SECONDARY}}
                                                          primary={'18'}
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar alt="Remy Sharp" src={'https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg'} />
                                            </ListItemAvatar>
                                            <ListItemText style={{color: AppColors.WHITE, marginRight: '5em'}}
                                                          primary={'Elden ring'}
                                            />
                                            <ListItemText style={{color: AppColors.SECONDARY}}
                                                          primary={'18'}
                                            />
                                        </ListItem>

                                        <Typography
                                            style={{
                                                fontSize: '20px',
                                                color: AppColors.WHITE,
                                                marginLeft:'3em',
                                                marginTop:'1em'
                                            }}>{LabelsForumsPage.SEE_MORE}</Typography>


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
