/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Avatar, Card, CardActions, CardContent, CardHeader, IconButton, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import { AppColors } from "../../resources/AppColors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useHistory } from "react-router-dom";
import { StorageManager } from "../../utils";

/**
 * Component to create comment cards.
 *
 * @component
 *
 * @param {object} props.children: content of the card
 * @param {string} props.bg: color of the card
 * @param {object} props.style: style of the card
 * @param {object} props.comment: comment of the card
 * 
 * @returns {object} JSX
 */
const CommentCard = props => {
    const { bg, height, width, comment } = props;
    const [liked, setLiked] = useState(false)
    const history = useHistory()
    const storageManager = new StorageManager()
    const handleClickLikeComment = async () => {

    }

    const onClickHandler = () => {
        //localStorage.setItem("userRoute")
        const newObj = { "detail": comment.user }
        localStorage.setItem("userDetails", JSON.stringify(newObj));
        if (storageManager.getEmail() === comment.user) {
            history.push("/profile")
        } else {
            history.push({
                pathname: `/user/${comment.user.split("@")[0]}`,
                state: { detail: comment.user }
            })
        }
    }

    return (
        <Card
            data-testid={"commentCard"}
            className="w-100 mb-3"
            style={{
                boxShadow: "3px 3px 3px 1px rgba(0,0,0,.16)",
                borderRadius: 10,
                height: height,
                width: width,
                backgroundColor: bg,
                color: AppColors.PRIMARY
            }
            }>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: AppColors.RED }} aria-label="recipe">
                        <img style={{ width: "40px", height: "40px" }} src={comment.image_user} />

                    </Avatar>
                }

                title={<Typography style={{ cursor: "pointer", fontSize: "20px", color: AppColors.PRIMARY }} onClick={() => onClickHandler()}>{comment.user.split("@")[0]}</Typography>}
                subheader={<Typography style={{ fontSize: "16px", color: AppColors.GRAY }}>{comment.date}</Typography>}
            />

            <CardContent>
                <Typography style={{ fontSize: "16px", color: AppColors.WHITE }}>
                    {comment.content}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>

                <IconButton onClick={() => handleClickLikeComment()} aria-label="add to favorites">

                    {liked ? <FavoriteIcon style={{ fill: AppColors.PRIMARY }} /> : <FavoriteBorderIcon style={{ fill: AppColors.PRIMARY }} />}
                    <Typography
                        style={{ fontSize: "20px", color: AppColors.PRIMARY }}>{0}</Typography>
                </IconButton>

            </CardActions>
        </Card>
    )
}

CommentCard.propTypes = {
    children: PropTypes.array.isRequired,
    bg: PropTypes.string,
    height: PropTypes.string,
    width: PropTypes.string,
    comment: PropTypes.array.isRequired,
}

CommentCard.defaultProps = {
    bg: AppColors.WHITE
};

export default CommentCard;
