// Base
const _DOMAIN = "https://api.rawg.io/api"; // Domain of the server

const _API_KEY = "key=40f3cb2ff2c94a5889d3d6c865415ec5\n"; // Path to the API
export const BASE_PATH = `${_DOMAIN}`; // Base URL of the backend

// Paths auths
const _LOGIN_PATH = "/auth/login";
const _RESET_STEP1 = "/auth/reset-step1";
const _RESET_STEP2 = "/auth/reset-step2";

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
export const GAMES_RELEASED= `${_GAMES_PATH}${_ORDERING_PATH}${_RELEASE_PATH}${_API_KEY}`

// Endpoints game
export const GAME = (id) => `${_GAME_PATH}${id}?${_API_KEY}`
export const GAME_ACHIEVEMENTS = (id) => `${_GAME_PATH}${id}${_ACHIEVEMENTS_PATH}?${_API_KEY}`
export const GAME_IMAGES= (id) => `${_GAME_PATH}${id}${_SCREENSHOTS_PATH}?${_API_KEY}`
