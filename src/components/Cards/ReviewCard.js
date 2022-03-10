import React from "react";
import {Avatar, Card, CardContent, CardHeader, Grid, Paper, Typography} from '@material-ui/core';
import PropTypes from 'prop-types';
import {AppColors} from "../../resources/AppColors";
import IconProvider from "../IconProvider/IconProvider";
import Icons from "../../resources/Icons";

/**
 * Component to create comment cards.
 *
 * @component
 *
 * @param {object} props.children: content of the card
 * @param {string} props.bg: color of the card
 * @param {object} props.style: style of the card
 *
 * @example
 * const children = <CardGeekify.Body> ... </CardGeekify.Body>;
 * const bg = 'light';
 * const style = {height: '18rem', width: '18rem'};
 *
 * <CommentCard bg={bg} style={style}> {children} </CardGeekify>
 */

const ReviewCard = props => {
    const {children, bg, height, width, game, review, avatar, comment} = props;
    return (
        <Card
            className="w-100 mb-3"
            style={{
                boxShadow: "3px 3px 3px 1px rgba(0,0,0,.16)",
                borderRadius: 10,
                height: `${height}`,
                width: `${width}`,
                backgroundColor: bg,
                color: AppColors.PRIMARY
            }
            }>
            <CardHeader
                title={
                    <Paper
                        style={{width: '8em', borderRadius: 20, backgroundColor: AppColors.PRIMARY}}>
                        <Typography
                            style={{marginLeft: '1em', marginRight: '1em', fontSize: '20px', color: AppColors.WHITE}}>
                            {game}
                        </Typography>
                    </Paper>}
            />

            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={2}>
                        <Avatar sx={{bgcolor: AppColors.RED}} aria-label="recipe">
                        </Avatar>
                    </Grid>
                    <Grid item xs={10}>
                        <Typography style={{fontSize: '16px', color: AppColors.WHITE}}>{comment}</Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={2}>

                    </Grid>
                    <Grid item xs={10}>
                        <Paper style={{
                            backgroundColor: AppColors.BACKGROUND,
                            borderRadius: 20,
                            width: '5em',
                            height: '2.5em'
                        }}
                        >
                            <Grid container style={{paddingLeft: '0.5em', paddingTop: '0.15em'}}>
                                <IconProvider icon={<Icons.STAR style={{
                                    paddingTop: '0.15em',
                                    verticalAlign: "middle",
                                    display: "inline-flex",
                                    paddingRight: '4px',
                                    color: AppColors.PRIMARY,
                                }} size="100px"/>}/>
                                <Typography style={{color: AppColors.WHITE, marginBottom: 0}} gutterBottom
                                            variant="h5"
                                            component="h2">
                                    {4.9}
                                </Typography>
                            </Grid>
                        </Paper> </Grid>
                </Grid>
            </CardContent>

        </Card>
    )
}

ReviewCard.propTypes = {
    children: PropTypes.array.isRequired,
    bg: PropTypes.string,
    height: PropTypes.string,
    width: PropTypes.string,
    title: PropTypes.string,
    time: PropTypes.string,
    comment: PropTypes.string,
}

ReviewCard.defaultProps = {
    bg: AppColors.WHITE
};

export default ReviewCard;
