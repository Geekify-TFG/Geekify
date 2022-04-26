import * as React from 'react';
import {useEffect, useState} from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {Button, ButtonGroup, CircularProgress, Grid} from "@material-ui/core";
import SearchBar from "../components/SearchBar/SearchBar";
import ProfileButton from "../components/ProfileButton/ProfileButton";
import {AppColors} from "../resources/AppColors";
import {LabelsCalendarPage, LabelsMain} from "../locale/en";
import {followingGroupMock} from "../mocks/FollowingGroupMock";


import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"; // needed
import bootstrapPlugin from '@fullcalendar/bootstrap';


import styled from "@emotion/styled"
import axios from "axios";
import {CALENDAR, MY_CALENDAR} from "../resources/ApiUrls";
import CalendarCard from "../components/Cards/CalendarCard";
import * as PropTypes from "prop-types";
import {StorageManager} from "../utils";

// add styles as css
export const StyleWrapper = styled.div`
  .fc-button.fc-prev-button, .fc-button.fc-next-button, .fc-button.fc-button-primary {
    background: #6563FF;
  }

  .fc-col-header-cell {
    background: #6563FF;
  }

  .fc-col-header-cell-cushion {
    color: #FFFFFF;
  }

  .fc-toolbar-title {
    color: #FFFFFF;
  }

  .fc-daygrid-day-number {
    color: #6563FF;
  }

  .fc-scrollgrid, .fc-scrollgrid-liquid {
    color: #FFFFFF;
  }

  .fc td {
    background: #1D1D1D;
  }

  .fc-media-screen {
    background: #1D1D1D;
  }

  .fc-popover-header {
    background: #6563FF;
    color: #FFFFFF
  }

  .fc-popover-body {
    background: #37393B;
  }

  .fc .fc-more-popover .fc-popover-body {
    padding: 0;
    min-width: 0;
  }

`

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

ButtonToggle.propTypes = {
    onClick: PropTypes.func,
    active: PropTypes.bool,
    children: PropTypes.node
};
const CalendarPage = () => {
    const [followingGroups, setFollowingGroups] = useState();
    let today = new Date().toISOString().split('T')[0]
    var todayOneMonth = new Date()
    todayOneMonth.setMonth(todayOneMonth.getMonth() + 1)
    todayOneMonth = todayOneMonth.toISOString().split('T')[0]
    const [startMonth, setStartMonth] = useState(today)
    const [endMonth, setEndMonth] = useState(todayOneMonth)
    const [gamesMonth, setGamesMonth] = useState()
    const [loading, setLoading] = useState(true)
    const sort_text = {calendar: LabelsCalendarPage.CALENDAR, myCalendar: LabelsCalendarPage.MY_CALENDAR};
    const [sortActive, setSortActive] = useState("calendar");
    const storageManager = new StorageManager()
    console.log(sortActive)
    useEffect(() => {
        setFollowingGroups(followingGroupMock)
        getGamesMonth()

    }, [startMonth]);


    const getGamesMonth = async () => {
        try {
            var body = {'startMonth': startMonth, 'endMonth': endMonth}
            const response = await axios.post(`${CALENDAR}`, body);
            //console.log(response.data.games)
            setGamesMonth(response.data.games)
            setLoading(false)
        } catch (err) {
            console.log(err.message)
        }
    }

    const getCalendarReleases = async () => {
        try {
            const response = await axios.get(`${MY_CALENDAR(storageManager.getEmail())}`)
            //console.log((response.data.calendar_releases))
            setGamesMonth(response.data.calendar_releases)
            setLoading(false)
        } catch (err) {
            console.log(err.message)
        }
    }


    function renderEventContent(eventInfo) {
        return (
            <CalendarCard
                gameId={eventInfo.event.id}
                gameTitle={eventInfo.event.title}
                gameImage={eventInfo.event.url}
                gameDate={eventInfo.event.startStr}
                getCalendarReleases={getCalendarReleases}
            />

        )
    }

    useEffect(() => {
        switch (sortActive) {
            case "calendar":
                getGamesMonth()
                break
            case "myCalendar":
                getCalendarReleases()
                break
        }
    }, [sortActive]);


    return (
        <>
            {loading ? (
                <div style={{display: "flex", justifyContent: "center"}}>
                    <CircularProgress/>
                </div>) :<Grid container alignItems={"center"}>
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
                      direction={"row"} style={{margin: '2em'}}>
                    <Typography
                        style={{
                            fontSize: '40px',
                            color: AppColors.WHITE
                        }}>{LabelsCalendarPage.CALENDAR}</Typography>

                    {storageManager.getToken() && <Grid container>
                        <Grid item>
                            <ButtonGroup style={{width: '500px'}} color="primary"
                                         aria-label="outlined primary button group">
                                {Object.entries(sort_text).map(([key, value]) => (
                                    <ButtonToggle active={sortActive === key}
                                                  onClick={() => (setSortActive(key))}>
                                        {value}
                                    </ButtonToggle>
                                ))}
                            </ButtonGroup>
                        </Grid>
                    </Grid>}
                    <Paper style={{
                        width: '100%',
                        height: 'auto',
                        padding: '0.5em',
                        backgroundColor: AppColors.BACKGROUND
                    }}>
                       {/* {loading ? (
                            <div style={{display: "flex", justifyContent: "center"}}>
                                <CircularProgress/>
                            </div>) :*/}
                            <StyleWrapper>

                            {gamesMonth  && <FullCalendar
                                eventColor={AppColors.BACKGROUND}
                                themeSystem={'bootstrap5'}
                                firstDay={1}
                                height={'auto'}
                                plugins={[dayGridPlugin, interactionPlugin, bootstrapPlugin]}
                                initialView="dayGridMonth"
                                eventContent={renderEventContent}
                                dayMaxEvents={1}
                                moreLinkContent={(args) => {
                                    return <Typography
                                        style={{
                                            fontSize: '16px',
                                            color: AppColors.PRIMARY
                                        }}>{'+' + args.num + ' More games'}</Typography>
                                }}
                                eventClick={(info) => {
                                    info.jsEvent.preventDefault()
                                }}
                                datesSet={(arg) => {
                                    setStartMonth(arg.startStr) //starting visible date
                                    setEndMonth(arg.endStr) //ending visible date
                                }}
                                events={gamesMonth}
                            />}
                        </StyleWrapper>}

                    </Paper>

                    {/*<Grid item style={{marginLeft: '2em'}}>
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


                    </Grid>*/}
                </Grid>


            </Grid>}
        </>


    );
}

export default CalendarPage;
