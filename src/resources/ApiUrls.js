// Base
//const _MY_DOMAIN = "http://127.0.0.1:5000"; // Domain of the server
const _MY_DOMAIN = "https://geekify-be.herokuapp.com"; // Domain of the server

export const MY_BASE_PATH = `${_MY_DOMAIN}`; // Base URL of the backend

// Paths auths

//Login/Register paths
const _LOGIN_PATH = "/login";
const _REGISTER_PATH = "/account/user";
const _USER_PATH = "/account/email";
const _INFO_PATH = "/account/info";
const _ACCOUNT_FORUM_PATH = "/account/forums";
const _ACCOUNT_FOLLOW_USER_PATH = "/account/followUser";

export const LOGIN_URL = `${MY_BASE_PATH}${_LOGIN_PATH}`
export const REGISTER_URL = `${MY_BASE_PATH}${_REGISTER_PATH}`
export const CHANGE_PWD_URL = (email) => `${MY_BASE_PATH}${_USER_PATH}/${email}`
export const USER_URL = (email) => `${_USER_PATH}/${email}`
export const INFO_URL = (email) => `${MY_BASE_PATH}${_INFO_PATH}/${email}`
export const FOLLOW_USER_URL = (email) => `${MY_BASE_PATH}${_ACCOUNT_FOLLOW_USER_PATH}/${email}`
//Games paths
const _MY_GAMES_PATH = "/games";
const _MY_GAME_PATH = "/games/";
const _MY_TITLE_PATH = "/title";
const _FILTER_PATH = "/filter";
const _FAV_CATEGORIES_PATH = "/gamesFavCategories";
export const MY_GAMES = `${_MY_GAMES_PATH}`
export const MY_GAME = (id) => `${_MY_GAME_PATH}${id}`
export const MY_GAME_SEARCH = (title) => `${_MY_GAMES_PATH}${_MY_TITLE_PATH}/${title}`
export const MY_GAMES_FILTER = (filter) => `${_MY_GAMES_PATH}${_FILTER_PATH}/${filter}`
export const MY_GAMES_CATEGORIES = (email) => `${_FAV_CATEGORIES_PATH}/${email}`

//Game paths
const _GAME_PATH = "/game";
const _RATE_PATH = "/account/like";
const _STATE_PATH = "/account/state";
const _LIST_PATH = "/listGames";

export const GAME = (id) => `${_GAME_PATH}/${id}`
export const RATE_GAME = (id) => `${_RATE_PATH}/${id}`
export const STATE_GAME = (id) => `${_STATE_PATH}/${id}`
export const LIST_GAMES = `${MY_BASE_PATH}${_LIST_PATH}`

//Comments paths
const _GAME_COMMENT_PATH = "/gameComments";
const _COMMENT_PATH = "/comment";
const _COMMENT_LIKE_PATH = "/commentLike"

export const COMMENTS_OF_GAME = (id) => `${_GAME_COMMENT_PATH}/${id}`
export const COMMENT_GAME = (id) => `${_COMMENT_PATH}/${id}`
export const LIKE_COMMENT = (id) => `${MY_BASE_PATH}${_COMMENT_LIKE_PATH}/${id}`

//Collections paths
const _COLLECTIONS_PATH = "/collections";
const _USEREMAIL_PATH = "/user_email";
const _COLLECTION_PATH = "/collection";
const _COLLECTION_GAME_PATH = "/collectionGame";
export const MY_COLLECTIONS = (useremail) => `${_COLLECTIONS_PATH}${_USEREMAIL_PATH}/${useremail}`
export const CREATE_COLLECTION = `${_COLLECTION_PATH}`
export const COLLECTION_GAME = (id) => `${_COLLECTION_GAME_PATH}/${id}`
export const MY_COLLECTION = (id) => `${_COLLECTION_PATH}/${id}`

//Forums paths
const _FORUMS_PATH = "/forums"
const _FORUM_PATH = "/forum"
export const ALL_FORUMS = `${MY_BASE_PATH}${_FORUMS_PATH}`
export const CREATE_FORUM = `${MY_BASE_PATH}${_FORUM_PATH}`
export const EDIT_FORUM = (id) => `${MY_BASE_PATH}${_FORUM_PATH}/${id}`
export const DELETE_FORUM = (id) => `${MY_BASE_PATH}${_FORUM_PATH}/${id}`
export const INFO_FORUM = (id) => `${MY_BASE_PATH}${_FORUM_PATH}/${id}`
export const JOIN_FORUM = (email) => `${MY_BASE_PATH}${_ACCOUNT_FORUM_PATH}/${email}`

//Publications paths
const _PUBLICATION_PATH = "/publication"
const _PUBLICATIONS_PATH = "/publications"
const _PUBLICATION_LIKE_PATH = "/publicationLike"
export const POST_PUBLICATION = (id) => `${MY_BASE_PATH}${_FORUM_PATH}/${id}${_PUBLICATION_PATH}`
export const GET_PUBLICATIONS = (id) => `${MY_BASE_PATH}${_FORUM_PATH}/${id}${_PUBLICATIONS_PATH}`
export const LIKE_PUBLICATION = (id) => `${MY_BASE_PATH}${_PUBLICATION_LIKE_PATH}/${id}`

//News
const _NEWS_PATH = "/news";
export const NEWS = `${_NEWS_PATH}`

//Calendar
const _CALENDAR_PATH = "/calendar";
const _ACCOUNT_CALENDAR_PATH = "/account/calendar";
export const CALENDAR = `${MY_BASE_PATH}${_CALENDAR_PATH}`
export const MY_CALENDAR = (email) => `${MY_BASE_PATH}${_ACCOUNT_CALENDAR_PATH}/${email}`