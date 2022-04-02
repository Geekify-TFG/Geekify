// Base
const _DOMAIN = "https://api.rawg.io/api"; // Domain of the server
const _MY_DOMAIN = "http://127.0.0.1:5000"; // Domain of the server
//const _MY_DOMAIN = "https://geekify-be.herokuapp.com/"; // Domain of the server

const _API_KEY = "key=40f3cb2ff2c94a5889d3d6c865415ec5\n"; // Path to the API
export const BASE_PATH = `${_DOMAIN}`; // Base URL of the backend
export const MY_BASE_PATH = `${_MY_DOMAIN}`; // Base URL of the backend

// Paths auths

// Path games
const _GAMES_PATH = "/games?";
const _GAME_PATH = "/games/";
const _ORDERING_PATH = "ordering=";
const _RATING_PATH = "-rating&";
const _RELEASE_PATH = "-released&";
const _ACHIEVEMENTS_PATH = "/achievements";
const _SCREENSHOTS_PATH = "/screenshots";
// Endpoints games
export const GAMES = `${_GAMES_PATH}${_API_KEY}`
export const GAMES_RATING = `${_GAMES_PATH}${_ORDERING_PATH}${_RATING_PATH}${_API_KEY}`
export const GAMES_RELEASED = `${_GAMES_PATH}${_ORDERING_PATH}${_RELEASE_PATH}${_API_KEY}`

// Endpoints game
export const GAME = (id) => `${_GAME_PATH}${id}?${_API_KEY}`
export const GAME_ACHIEVEMENTS = (id) => `${_GAME_PATH}${id}${_ACHIEVEMENTS_PATH}?${_API_KEY}`
export const GAME_IMAGES = (id) => `${_GAME_PATH}${id}${_SCREENSHOTS_PATH}?${_API_KEY}`



//Login/Register paths
const _LOGIN_PATH = "/login";
const _REGISTER_PATH = "/account/user";

export const LOGIN_URL = `${MY_BASE_PATH}${_LOGIN_PATH}`
export const REGISTER_URL = `${MY_BASE_PATH}${_REGISTER_PATH}`

//Games paths


const _MY_GAMES_PATH = "/games";
const _MY_GAME_PATH = "/game";
const _MY_TITLE_PATH = "/title";
const _FILTER_PATH = "/filter";
export const MY_GAMES = `${_MY_GAMES_PATH}`
export const MY_GAME = (id) => `${_MY_GAME_PATH}${id}`
export const MY_GAME_SEARCH = (title) => `${_MY_GAMES_PATH}${_MY_TITLE_PATH}/${title}`
export const MY_GAMES_FILTER = (filter) => `${_MY_GAMES_PATH}${_FILTER_PATH}/${filter}`


//Collections paths
const _COLLECTIONS_PATH = "/collections";
const _COLLECTION_PATH = "/collection";
const _COLLECTION_GAME_PATH = "/collectionGame";
export const MY_COLLECTIONS= `${_COLLECTIONS_PATH}`
export const CREATE_COLLECTION= `${_COLLECTION_PATH}`
export const COLLECTION_GAME= (id) =>`${_COLLECTION_GAME_PATH}/${id}`
export const MY_COLLECTION = (id) => `${_COLLECTION_PATH}/${id}`
