/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useState } from "react";
import { Avatar, Card, CardActions, CardContent, CardHeader, IconButton, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import { AppColors } from "../../resources/AppColors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useHistory } from "react-router-dom";
import { StorageManager } from "../../utils";
import axios from "axios";
import { LIKE_COMMENT } from "../../resources/ApiUrls";
import SnackBarGeekify from "../SnackbarGeekify/SnackbarGeekify";
import { LabelsSnackbar } from "../../locale/en";

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
    const { bg, height, width, comment, commentKey, getComments, like } = props;
    const [liked, setLiked] = useState(like)
    const history = useHistory()
    const storageManager = new StorageManager()
    const [openSnackLikeLogin, setOpenSnackLikeLogin] = useState();
    const [openSnackLike, setOpenSnackLike] = useState();
    const [openSnackRemoveLike, setOpenSnackRemoveLike] = useState();
    const handleClickLikeComment = async () => {
        if (storageManager.getToken()) {
            try {
                var body = { "email": storageManager.getEmail() }
                const config = { auth: { username: storageManager.getToken() } }
                const response = await axios.post(`${LIKE_COMMENT(commentKey)}`, body, config)
                if ((Object.values(response.data.comment)[0].likes).includes(storageManager.getEmail())) {
                    setOpenSnackLike(true)
                } else {
                    setOpenSnackRemoveLike(true)
                }
                setLiked(!liked)
                getComments()
            } catch (e) {
                console.log("Error: ", e)
            }
        } else {
            setOpenSnackLikeLogin(true)
        }
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

    const handleCloseSnackLike = async () => {
        setOpenSnackLike(false)
    }

    const handleCloseSnackLikeLogin = async () => {
        setOpenSnackLikeLogin(false)
    }

    const handleCloseSnackRemoveLike = async () => {
        setOpenSnackRemoveLike(false)
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
                        style={{ fontSize: "20px", color: AppColors.PRIMARY }}>{comment.likes.length}</Typography>
                </IconButton>

            </CardActions>
            <SnackBarGeekify handleClose={handleCloseSnackLikeLogin}
                message={LabelsSnackbar.LIKE_COMMENT_LOGIN} severity={"warning"}
                openSnack={openSnackLikeLogin} />
            <SnackBarGeekify handleClose={handleCloseSnackLike}
                message={LabelsSnackbar.LIKE_COMMENT}
                openSnack={openSnackLike} />
            <SnackBarGeekify handleClose={handleCloseSnackRemoveLike}
                message={LabelsSnackbar.REMOVE_LIKE_COMMENT}
                openSnack={openSnackRemoveLike} />
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
