// Base
const _DOMAIN = "https://api.rawg.io/api"; // Domain of the server
const _MY_DOMAIN = "http://127.0.0.1:5000"; // Domain of the server
//const _MY_DOMAIN = "https://geekify-be.herokuapp.com"; // Domain of the server

export const MY_BASE_PATH = `${_MY_DOMAIN}`; // Base URL of the backend

// Paths auths

//Login/Register paths
const _LOGIN_PATH = "/login";
const _REGISTER_PATH = "/account/user";
const _USER_PATH = "/account/email";
const _ACCOUNT_FORUM_PATH = "/account/forums";

export const LOGIN_URL = `${MY_BASE_PATH}${_LOGIN_PATH}`
export const REGISTER_URL = `${MY_BASE_PATH}${_REGISTER_PATH}`
export const USER_URL = (email) => `${_USER_PATH}/${email}`

//Games paths
const _MY_GAMES_PATH = "/games";
const _MY_GAME_PATH = "/games/";
const _MY_TITLE_PATH = "/title";
const _FILTER_PATH = "/filter";
export const MY_GAMES = `${_MY_GAMES_PATH}`
export const MY_GAME = (id) => `${_MY_GAME_PATH}${id}`
export const MY_GAME_SEARCH = (title) => `${_MY_GAMES_PATH}${_MY_TITLE_PATH}/${title}`
export const MY_GAMES_FILTER = (filter) => `${_MY_GAMES_PATH}${_FILTER_PATH}/${filter}`

//Game paths
const _GAME_PATH = "/game";
const _RATE_PATH = "/account/like";
const _LIST_PATH = "/listGames";

export const GAME = (id) => `${_GAME_PATH}/${id}`
export const RATE_GAME = (id) => `${_RATE_PATH}/${id}`
export const LIST_GAMES = `${MY_BASE_PATH}${_LIST_PATH}`

//Comments paths
const _GAME_COMMENT_PATH = "/gameComments";
const _COMMENT_PATH = "/comment";

export const COMMENTS_OF_GAME = (id) => `${_GAME_COMMENT_PATH}/${id}`
export const COMMENT_GAME = (id) => `${_COMMENT_PATH}/${id}`


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
export const DELETE_FORUM = (id) => `${MY_BASE_PATH}${_FORUM_PATH}/${id}`
export const INFO_FORUM = (id) => `${MY_BASE_PATH}${_FORUM_PATH}/${id}`
export const JOIN_FORUM =(email)=> `${MY_BASE_PATH}${_ACCOUNT_FORUM_PATH}/${email}`


//News
const _NEWS_PATH = "/news";
export const NEWS = `${_NEWS_PATH}`
