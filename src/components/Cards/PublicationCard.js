import React, {useState} from "react";
import {Avatar, Card, CardActions, CardContent, CardHeader, IconButton, Typography} from '@material-ui/core';
import PropTypes from 'prop-types';
import {AppColors} from "../../resources/AppColors";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import axios from "axios";
import {LIKE_PUBLICATION} from "../../resources/ApiUrls";
import {StorageManager} from "../../utils";
import SnackBarGeekify from "../SnackbarGeekify/SnackbarGeekify";
import {LabelsSnackbar} from "../../locale/en";

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
const PublicationCard = props => {
    const {publicationKey, bg, height, width, title, time, publication, getPublications, favorited} = props;
    const storageManager = new StorageManager()
    const [openSnackLikeLogin, setOpenSnackLikeLogin] = useState();
    const [openSnackLike, setOpenSnackLike] = useState();
    const [openSnackRemoveLike, setOpenSnackRemoveLike] = useState();
    const [liked, setLiked] = useState(favorited)

    const handleClickLikePublication = async () => {
        if (storageManager.getToken()) {
            try {
                var body = {'email': storageManager.getEmail()}
                const config = {auth: {username: storageManager.getToken()}}
                const response = await axios.post(`${LIKE_PUBLICATION(publicationKey)}`, body, config)
                if ((Object.values(response.data.publications)[0].likes).includes(storageManager.getEmail())) {
                    setOpenSnackLike(true)
                } else {
                    setOpenSnackRemoveLike(true)
                }
                setLiked(!liked)

                getPublications()
            } catch (e) {
                console.log('Error: ', e)
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
                    <Avatar sx={{bgcolor: AppColors.RED}} aria-label="recipe">
                        <img style={{width: '40px', height: '40px'}} src={publication.image_user}/>

                    </Avatar>
                }

                title={<Typography style={{fontSize: '20px', color: AppColors.PRIMARY}}>{publication.user}</Typography>}
                subheader={<Typography
                    style={{fontSize: '16px', color: AppColors.GRAY}}>{publication.date}</Typography>}
            />

            <CardContent>
                <Typography style={{fontSize: '16px', color: AppColors.WHITE}}>
                    {publication.content}
                </Typography>

            </CardContent>
            <CardActions disableSpacing>

                <IconButton onClick={() => handleClickLikePublication()} aria-label="add to favorites">

                    {liked ? <FavoriteIcon style={{fill: AppColors.PRIMARY}}/> : <FavoriteBorderIcon style={{fill: AppColors.PRIMARY}}/>}
                    <Typography
                        style={{fontSize: '20px', color: AppColors.PRIMARY}}>{publication.likes.length}</Typography>
                </IconButton>

            </CardActions>
            <SnackBarGeekify handleClose={handleCloseSnackLikeLogin}
                             message={LabelsSnackbar.LIKE_PUBLICATION_LOGIN} severity={'warning'}
                             openSnack={openSnackLikeLogin}/>
            <SnackBarGeekify handleClose={handleCloseSnackLike}
                             message={LabelsSnackbar.LIKE_PUBLICATION}
                             openSnack={openSnackLike}/>
            <SnackBarGeekify handleClose={handleCloseSnackRemoveLike}
                             message={LabelsSnackbar.REMOVE_LIKE_PUBLICATION}
                             openSnack={openSnackRemoveLike}/>
        </Card>
    )
}

PublicationCard.propTypes = {
    children: PropTypes.array.isRequired,
    bg: PropTypes.string,
    height: PropTypes.string,
    width: PropTypes.string,
    title: PropTypes.string,
    time: PropTypes.string,
    comment: PropTypes.string,
}

PublicationCard.defaultProps = {
    bg: AppColors.WHITE
};

export default PublicationCard;
