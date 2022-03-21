import {LOGIN_URL} from "../resources/ApiUrls";
import axios from "axios";

const login = body => axios.post(LOGIN_URL, body);

export default {
    login
};
