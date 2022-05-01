/* eslint-disable no-console */
import React, { useState } from "react";
import { Avatar, Card, CardActions, CardContent, CardHeader, IconButton, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import { AppColors } from "../../resources/AppColors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import axios from "axios";
import { LIKE_PUBLICATION } from "../../resources/ApiUrls";
import { StorageManager } from "../../utils";
import SnackBarGeekify from "../SnackbarGeekify/SnackbarGeekify";
import { LabelsSnackbar } from "../../locale/en";

/**
 * Component to create publications cards.
 *
 * @component
 * 
 * @param {string} props.publicationKey: key of the publication
 * @param {string} props.bg: background color of the card
 * @param {string} props.height: height of the card
 * @param {string} props.width: width of the card
 * @param {string} props.publication: publication of the forum
 * @param {function} props.getPublications: function to get the publication
 * @param {boolean} props.favorited: true if the publication is favorited
 * 
 * @returns {object} JSX
 *
 */
const PublicationCard = props => {
    const { publicationKey, bg, height, width, publication, getPublications, favorited } = props;
    const storageManager = new StorageManager()
    const [openSnackLikeLogin, setOpenSnackLikeLogin] = useState();
    const [openSnackLike, setOpenSnackLike] = useState();
    const [openSnackRemoveLike, setOpenSnackRemoveLike] = useState();
    const [liked, setLiked] = useState(favorited)

    const handleClickLikePublication = async () => {
        if (storageManager.getToken()) {
            try {
                var body = { "email": storageManager.getEmail() }
                const config = { auth: { username: storageManager.getToken() } }
                const response = await axios.post(`${LIKE_PUBLICATION(publicationKey)}`, body, config)
                if ((Object.values(response.data.publications)[0].likes).includes(storageManager.getEmail())) {
                    setOpenSnackLike(true)
                } else {
                    setOpenSnackRemoveLike(true)
                }
                setLiked(!liked)

                getPublications()
            } catch (e) {
                console.log("Error: ", e)
            }
        } else {
            setOpenSnackLikeLogin(true)
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
            data-testid={"publicationCard"}
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
                        <img style={{ width: "40px", height: "40px" }} src={publication.image_user} />

                    </Avatar>
                }

                title={<Typography style={{ fontSize: "20px", color: AppColors.PRIMARY }}>{publication.user}</Typography>}
                subheader={<Typography
                    style={{ fontSize: "16px", color: AppColors.GRAY }}>{publication.date}</Typography>}
            />

            <CardContent>
                <Typography style={{ fontSize: "16px", color: AppColors.WHITE }}>
                    {publication.content}
                </Typography>

            </CardContent>
            <CardActions disableSpacing>

                <IconButton onClick={() => handleClickLikePublication()} aria-label="add to favorites">

                    {liked ? <FavoriteIcon style={{ fill: AppColors.PRIMARY }} /> : <FavoriteBorderIcon style={{ fill: AppColors.PRIMARY }} />}
                    <Typography
                        style={{ fontSize: "20px", color: AppColors.PRIMARY }}>{publication.likes.length}</Typography>
                </IconButton>

            </CardActions>
            <SnackBarGeekify handleClose={handleCloseSnackLikeLogin}
                message={LabelsSnackbar.LIKE_PUBLICATION_LOGIN} severity={"warning"}
                openSnack={openSnackLikeLogin} />
            <SnackBarGeekify handleClose={handleCloseSnackLike}
                message={LabelsSnackbar.LIKE_PUBLICATION}
                openSnack={openSnackLike} />
            <SnackBarGeekify handleClose={handleCloseSnackRemoveLike}
                message={LabelsSnackbar.REMOVE_LIKE_PUBLICATION}
                openSnack={openSnackRemoveLike} />
        </Card>
    )
}

PublicationCard.propTypes = {
    publicationKey: PropTypes.string.isRequired,
    bg: PropTypes.string.isRequired,
    height: PropTypes.string,
    width: PropTypes.string,
    publication: PropTypes.object.isRequired,
    getPublications: PropTypes.func.isRequired,
    favorited: PropTypes.bool.isRequired
}

export default PublicationCard;
