/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import * as React from "react";
import { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Button, ButtonGroup, CircularProgress, Grid } from "@material-ui/core";
import SearchBar from "../components/SearchBar/SearchBar";
import ProfileButton from "../components/ProfileButton/ProfileButton";
import { AppColors } from "../resources/AppColors";
import { LabelsCalendarPage } from "../locale/en";
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"; // needed
import bootstrapPlugin from "@fullcalendar/bootstrap";
import styled from "@emotion/styled"
import axios from "axios";
import { CALENDAR, MY_CALENDAR } from "../resources/ApiUrls";
import CalendarCard from "../components/Cards/CalendarCard";
import * as PropTypes from "prop-types";
import { StorageManager } from "../utils";

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
  color: #6563FF ${({ active }) =>
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

/**
 * Calendar Page
 * It shows the calendar for the user
 * 
 */
const CalendarPage = () => {
    const today = new Date().toISOString().split("T")[0]
    var todayOneMonth = new Date()
    todayOneMonth.setMonth(todayOneMonth.getMonth() + 1)
    todayOneMonth = todayOneMonth.toISOString().split("T")[0]
    const [startMonth, setStartMonth] = useState(today)
    const [endMonth, setEndMonth] = useState(todayOneMonth)
    const [gamesMonth, setGamesMonth] = useState()
    const [gamesUserMonth, setGamesUserMonth] = useState([])
    const [loading, setLoading] = useState(true)
    const sort_text = { calendar: LabelsCalendarPage.CALENDAR, myCalendar: LabelsCalendarPage.MY_CALENDAR };
    const [sortActive, setSortActive] = useState("calendar");
    const storageManager = new StorageManager()
    const [devicesSize, setDevicesSize] = useState("20em")
    const [cardWidth, setCardWidth] = useState("10em")
    /**
    * Get the games for the month
    */
    const getGamesMonth = async () => {
        try {
            var body = { "startMonth": startMonth, "endMonth": endMonth }
            const response = await axios.post(`${CALENDAR}`, body);
            setGamesMonth(response.data.games)
            setLoading(false)
        } catch (err) {
            console.log(err.message)
        }
    }
    /**
     * Get the games for the month of the user have saved
     */
    const getCalendarReleases = async () => {
        try {
            const response = await axios.get(`${MY_CALENDAR(storageManager.getEmail())}`)
            console.log(response.data.calendar_releases)
            setGamesMonth(response.data.calendar_releases)
            setLoading(false)
        } catch (err) {
            console.log(err.message)
        }
    }

    /**
     * Get the games for the month of the user have saved
     */
    const getCalendarUserReleases = async () => {
        try {
            const response = await axios.get(`${MY_CALENDAR(storageManager.getEmail())}`)
            setGamesUserMonth(response.data.calendar_releases)
        } catch (err) {
            console.log(err.message)
        }
    }

    function renderEventContent(eventInfo) {
        return (
            <CalendarCard
                width={cardWidth}
                gameId={eventInfo.event.id}
                gameTitle={eventInfo.event.title}
                gameImage={eventInfo.event.url}
                gameDate={eventInfo.event.startStr}
                getCalendarReleases={getCalendarReleases}
                getGamesMonth={getGamesMonth}
                gamesUserMonth={gamesUserMonth}
                getCalendarUserReleases={getCalendarUserReleases}
                sortActive={sortActive}
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

    useEffect(() => {
        getGamesMonth()
        if (storageManager.getEmail())
            getCalendarUserReleases()
    }, [startMonth]);

    function debounce(fn, ms) {
        //This will run the code on every 1 second
        let timer
        return _ => {
            clearTimeout(timer)
            timer = setTimeout(_ => {
                timer = null
                fn.apply(this, arguments)
            }, ms)
        };
    }
    useEffect(() => {
        const debouncedHandleResize = debounce(function handleResize() {
            //give the paddingLeft size base on drawer open or closed and window size
            if (window.innerWidth >= 2560) {
                setDevicesSize("15%")
                setCardWidth("200px")
            } else if (window.innerWidth >= 1450) {
                setDevicesSize("10%")
                setCardWidth("175px")
            } else if (window.innerWidth >= 1400) {
                setDevicesSize("2%")
                setCardWidth("150px")
            } else if (window.innerWidth >= 1280) {
                setDevicesSize("1em")
                setCardWidth("9em")
            }
        }, 300)

        // Add event listener to listen for window sizes 
        window.addEventListener("resize", debouncedHandleResize);
        // Call handler right away so state gets updated with initial window size

        debouncedHandleResize()
        return _ => {
            window.removeEventListener("resize", debouncedHandleResize)

        }

    }, [])
    return (
        <>
            {loading ? (
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <CircularProgress />
                </div>) : <Grid container alignItems={"center"}>
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
                    direction={"row"} style={{ margin: "2em" }}>
                    <Typography
                        style={{
                            fontSize: "40px",
                            color: AppColors.WHITE
                        }}>{LabelsCalendarPage.CALENDAR}</Typography>

                    {storageManager.getToken() && <Grid container>
                        <Grid item>
                            <ButtonGroup style={{ width: "500px" }} color="primary"
                                aria-label="outlined primary button group">
                                {Object.entries(sort_text).map(([key, value]) => (
                                    <ButtonToggle data-testid={"ButtonKey"} key={key} active={sortActive === key}
                                        onClick={() => (setSortActive(key))}>
                                        {value}
                                    </ButtonToggle>
                                ))}
                            </ButtonGroup>
                        </Grid>
                    </Grid>}
                    <Paper style={{
                        width: "100%",
                        height: "auto",
                        padding: "0.5em",
                        backgroundColor: AppColors.BACKGROUND
                    }}>
                        {/* {loading ? (
                            <div style={{display: "flex", justifyContent: "center"}}>
                                <CircularProgress/>
                            </div>) :*/}
                        <StyleWrapper>

                            {gamesMonth && <FullCalendar
                                eventColor={AppColors.BACKGROUND}
                                themeSystem={"bootstrap5"}
                                firstDay={1}
                                height={"auto"}
                                plugins={[dayGridPlugin, interactionPlugin, bootstrapPlugin]}
                                initialView="dayGridMonth"
                                eventContent={renderEventContent}
                                dayMaxEvents={1}
                                moreLinkContent={(args) => {
                                    return <Typography
                                        style={{
                                            fontSize: "16px",
                                            color: AppColors.PRIMARY
                                        }}>{"+" + args.num + " More games"}</Typography>
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
                        </StyleWrapper>

                    </Paper >

                </Grid >

            </Grid >}
        </>

    );
}

export default CalendarPage;
