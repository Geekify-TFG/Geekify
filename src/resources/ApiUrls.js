// Base
const _DOMAIN = "https://api.rawg.io/api"; // Domain of the server

const _API_KEY = "?key=40f3cb2ff2c94a5889d3d6c865415ec5\n"; // Path to the API
export const BASE_PATH = `${_DOMAIN}`; // Base URL of the backend

// Paths auths
const _LOGIN_PATH = "/auth/login";
const _RESET_STEP1 = "/auth/reset-step1";
const _RESET_STEP2 = "/auth/reset-step2";

// Path games
const _GAMES_PATH = "/games";
// Endpoints
export const GAMES = `${_GAMES_PATH}${_API_KEY}`