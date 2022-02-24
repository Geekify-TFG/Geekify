import React, {useState} from 'react';
import {AppColors} from "../../resources/AppColors";
import {useHistory} from "react-router-dom";
import {AppTextsFontSize, AppTextsFontWeight, textType, useTextStyles} from "../../resources/AppTexts";
import {makeStyles} from "@mui/styles";
import {
    Button,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Fade,
    Grid,
    Link,
    Menu,
    MenuItem
} from '@material-ui/core';
import Card from "../CardGeekify/CardGeekify";
import TextGeekify from "../TextGeekify/TextGeekify";

const useStyles = makeStyles({
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
    }


});

/**
 * @component
 * Component to create the card of the game
 *
 * @param {number} gameId: id of the game
 * @param {string} gameTitle: title of the game
 * @param {string} gameDescription: description of the game

 *
 * @constructor
 * <GameCard gameId={'12'} gameTitle={'TITLE'} gameDescription={'DESCRIPTION'} gameImage={2}/>
 *
 */
const GameCard = ({
                      gameId,
                      gameTitle,
                      gameDescription,
                      gameImage

                  }) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const texts = useTextStyles();
    const history = useHistory()
    const [drawerLink, setDrawerLink] = useState()
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };


    const onClickHandler = () => {
        history.push({
            pathname: `/game/${gameId}`,
            state: {detail: gameId,}
        })


    }


    const handleClose = () => {
        setAnchorEl(null);
    };

    const body = (
            <Grid
                container
                item
                xs
                direction="column"
                justifyContent="space-between"
            >
                <Grid container wrap="nowrap" spacing={2}>
                    <Grid item xs zeroMinWidth>
                        <Link className={classes.link}>
                            <CardHeader
                                classes={{
                                    title: texts.title_bold,
                                    root: classes.cardHeaderRoot,
                                    content: classes.cardHeaderContent
                                }}
                                style={{
                                    height: '64px',
                                    width: '232px',
                                    color: AppColors.PRIMARY,
                                    paddingLeft: "24px",
                                    paddingTop: "24px",
                                    paddingBottom: "8px"
                                }}
                                onClick={onClickHandler}
                                title={
                                    <TextGeekify margin={"0px"} style={"break-word"} type={textType.TITLE_BOLD}
                                          text={gameTitle}/>}
                            />

                        </Link>
                    </Grid>
                </Grid>

                <CardMedia
                    component="img"
                    height="194"
                    image={gameImage}
                    alt="Paella dish"
                />
                <Grid container wrap="nowrap" spacing={2}>
                    <Grid item xs zeroMinWidth>
                        <CardContent style={{
                            height: '110px', width: '280px',
                            paddingTop: '6px', paddingBottom: 0, paddingLeft: '24px',
                        }}>
                            <TextGeekify margin={"0px"} style={"break-word"} type={textType.BODY_CARD}
                                  text={gameDescription}/>

                        </CardContent>
                    </Grid>
                </Grid>
                <CardActions>
                    <Grid
                        item
                        zeroMinWidth
                        xs
                        direction="column"
                        justifyContent="flex-start"
                        alignItems="center">
                        <Grid
                            style={{padding: "10px", paddingTop: 0}}
                            container
                            item
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="center">

                            <Grid
                                item>
                                <Button aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}>

                                </Button>
                                <Menu
                                    style={{
                                        boxShadow: "3px 3px 3px 1px rgba(0,0,0,.16)"
                                    }}
                                    color={AppColors.WHITE}
                                    id="fade-menu"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{vertical: "bottom", horizontal: "right"}}
                                    keepMounted
                                    open={open}
                                    onClose={handleClose}
                                    TransitionComponent={Fade}>
                                    <MenuItem style={{color: AppColors.PRIMARY}}
                                              onClick={() => {
                                                  handleClose()
                                              }}> {"EDIT"} </MenuItem>

                                </Menu>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardActions>
            </Grid>
        )
    ;

    return <Card height={'280px'} width={'320px'}> {body} </Card>


}

GameCard.propTypes = {}

export default GameCard;
