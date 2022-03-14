import * as React from 'react';
import {useEffect, useState} from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {Avatar, Grid, List, ListItem, ListItemAvatar, ListItemText} from "@material-ui/core";
import SearchBar from "../components/SearchBar/SearchBar";
import ProfileButton from "../components/ProfileButton/ProfileButton";
import {AppColors} from "../resources/AppColors";
import {LabelsForumsPage} from "../locale/en";
import CardGeekify from "../components/Cards/CardGeekify";
import IconProvider from "../components/IconProvider/IconProvider";
import Icons from "../resources/Icons";
import {followingGroupMock} from "../mocks/FollowingGroupMock";


import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"; // needed
import bootstrapPlugin from '@fullcalendar/bootstrap';


import styled from "@emotion/styled"

// add styles as css
export const StyleWrapper = styled.div`
  .fc-button.fc-prev-button, .fc-button.fc-next-button, .fc-button.fc-button-primary {
    background: #6563FF;
  }
  .fc-col-header-cell-cushion  {
    color: #FFFFFF;
  }
  .fc-toolbar-title{
    color: #FFFFFF;
  }
  
  .fc-daygrid-day-number{
    color: #6563FF;
  }

  .fc-scrollgrid,  .fc-scrollgrid-liquid{
    color: #FFFFFF;
  }

  .fc td {
    background: #37393B;
  }


  .fc-media-screen {
    background: #37393B;
  }
`

const CalendarPage = () => {
    const [followingGroups, setFollowingGroups] = useState();

    // #FOLD_BLOCK

    useEffect(() => {
        setFollowingGroups(followingGroupMock)
        // getCollections()

    }, []);


    function renderEventContent(eventInfo) {
        return (
            <div>
                <p>{eventInfo.event.title}</p>
                <img style={{height: '100px', width: '100px'}} className="eventimage" src={eventInfo.event.url}/>
            </div>
        )
    }

    let today = new Date().toISOString().split('T')[0]
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
                        <Typography
                            style={{
                                fontSize: '40px',
                                color: AppColors.WHITE
                            }}>{LabelsForumsPage.FORUMS}</Typography>

                        <Paper style={{
                            width: '750px',
                            height: 'auto',
                            padding: '0.5em',
                            backgroundColor: AppColors.BACKGROUND_DRAWER
                        }}>
                            <StyleWrapper>

                                <FullCalendar
                                    firstDay={1}
                                    height={'750px'}
                                    plugins={[dayGridPlugin, interactionPlugin, bootstrapPlugin]}
                                    initialView="dayGridMonth"
                                    eventContent={renderEventContent}
                                    events={[
                                        {
                                            title: 'Elden ring ',
                                            date: '2022-03-10',
                                            url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/2011_Range_Rover_--_12-31-2010.jpg/1200px-2011_Range_Rover_--_12-31-2010.jpg"
                                        },
                                        {
                                            title: 'Destiny2',
                                            date: '2022-03-15',
                                            url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/2011_Range_Rover_--_12-31-2010.jpg/1200px-2011_Range_Rover_--_12-31-2010.jpg"
                                        },
                                        {
                                            title: 'event 3',
                                            date: '2022-04-15',
                                            url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/2011_Range_Rover_--_12-31-2010.jpg/1200px-2011_Range_Rover_--_12-31-2010.jpg"
                                        }
                                    ]}
                                />
                            </StyleWrapper>

                        </Paper>

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


    );
}

export default CalendarPage;
