/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Container, Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles"
import { useTextStyles } from "../../resources/AppTexts";
import GameCard from "../Cards/GameCard";

/**
 * @component
 * Component to show all the games
 *
 * @param {object} games: JSON with all the data available of the game
 *
 * @example
 * const games = {your JSON games data}
 * <GridGames games={games}/>
 */

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2)
    }
}))

const GridGames = ({ games, mainPage }) => {
    const classes = useStyles();
    const [redirectTo, setRedirectTo] = useState([false, -1]);
    const [game, setGame] = useState(games);

    if (redirectTo[0]) {
        return (
            <Container fluid style={{ margin: 0, maxWidth: "100%" }}>
                <div className={classes.root}>

                    <Grid container item
                        style={{ marginBottom: "24px" }}
                        direction={"row"}
                        alignItems={"flex-end"}
                        justifyContent={"flex-end"}>

                    </Grid>

                    <Grid
                        align="center"
                        container
                        spacing={2}
                        direction="row"
                        alignItems={"center"}
                        justify="flex-start">

                        {
                            game.map(elem => (
                                <Grid item key={game.indexOf(elem)}
                                    xs={12}
                                    sm={12}
                                    md={6}
                                    lg={4}
                                    xl={3}
                                >
                                    <GameCard
                                        //  gameId={elem.id}
                                        gameTitle={elem.name}
                                    />
                                </Grid>
                            ))}

                    </Grid>
                </div>
            </Container>

        )
    }

    return (
        <Container fluid style={{ margin: 0, maxWidth: "100%" }}>
            <div className={classes.root}>

                <Grid
                    align="center"
                    container
                    spacing={2}
                    direction="row"
                    alignItems={"center"}
                    justify="flex-start">

                    {
                        game.map(elem => (
                            <Grid item key={game.indexOf(elem)}
                                xs={12}
                                sm={12}
                                md={6}
                                lg={3}
                                xl={2}
                            >
                                <GameCard
                                    gameId={elem.id}
                                    gameTitle={elem.name}
                                    gameImage={elem.background_image}
                                    gameRating={elem.rating}
                                    mainPage={mainPage}
                                />
                            </Grid>
                        ))}

                </Grid>
            </div>
        </Container>

    )
}

export default GridGames;
