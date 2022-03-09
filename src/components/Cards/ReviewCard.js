import React from "react";
import {Avatar, Card, CardContent, CardHeader, Grid, Paper, Typography} from '@material-ui/core';
import PropTypes from 'prop-types';
import {AppColors} from "../../resources/AppColors";
import { styled } from '@mui/material/styles';

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

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
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
                title={<Typography style={{fontSize: '20px', color: AppColors.PRIMARY}}>{game}</Typography>}
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
