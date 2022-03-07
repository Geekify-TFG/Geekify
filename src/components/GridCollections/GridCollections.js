import React, {useState} from 'react';
import {Container, Grid} from '@material-ui/core';
import {useHistory} from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles'
import {useTextStyles} from "../../resources/AppTexts";
import CollectionCard from "../Cards/CollectionCard";

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

const GridCollections = ({collections}) => {
    const history = useHistory()
    const texts = useTextStyles();
    const classes = useStyles();
    const [redirectTo, setRedirectTo] = useState([false, -1]);


    const [collection, setCollection] = useState(collections);

    return (
        <Container fluid style={{margin: 0, maxWidth: '100%'}}>
            <div className={classes.root}>

                <Grid
                    align="center"
                    container
                    spacing={2}
                    direction="row"
                    alignItems={"center"}
                    justify="flex-start">

                    {
                        collection.map((elem, index) => (
                            <Grid item key={collection.indexOf(elem)}
                                  xs={12}
                                  sm={12}
                                  md={6}
                                  lg={6}
                                  xl={3}
                            >
                                {(index % 2 === 0) ?
                                    <CollectionCard paddingLeft={'34em'} width={'550px'} collectionId={elem.id}
                                                    collectionTitle={elem.title}
                                                    collectionNumGames={elem.numGames} collectionImage={elem.image}/>
                                    : <CollectionCard paddingLeft={'23em'} width={'400px'} collectionId={elem.id}
                                                      collectionTitle={elem.title}
                                                      collectionNumGames={elem.numGames} collectionImage={elem.image}/>

                                }
                                />
                            </Grid>
                        ))}


                </Grid>
            </div>
        </Container>

    )
}

export default GridCollections;
