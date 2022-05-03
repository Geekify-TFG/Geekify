export default class MyStorageManager {
    _EMAIL = "email";
    _USER = "user";
    _PWD = "pwd";
    _TOKEN = "token";
    _LOGGED = "logged";
    _IMAGE = "image"
    _GOOGLE = "google";
    _EXPIRATION_DATE = "token-expiration";
    _localStorage = window.localStorage;

    // Get and store the username
    getEmail = () => this._localStorage.getItem(this._EMAIL,) || "";
    storeEmail = email => this._localStorage.setItem(this._EMAIL, email);

    // Get and store the username
    getUser = () => this._localStorage.getItem(this._USER,) || "";
    storeUser = user => this._localStorage.setItem(this._USER, user);

    // Get and store the username
    getImage = () => this._localStorage.getItem(this._IMAGE,) || "";
    storeImage = image => this._localStorage.setItem(this._IMAGE, image);

    // Get and store the password
    getPwd = () => this._localStorage.getItem(this._PWD) || "";
    storePwd = pwd => this._localStorage.setItem(this._PWD, pwd);

    // Get and store the token
    getToken = () => this._localStorage.getItem(this._TOKEN) || "";
    storeToken = token => this._localStorage.setItem(this._TOKEN, token);
    removeToken = () => this._localStorage.removeItem(this._TOKEN)

    // Get and store the token
    getGoogle = () => this._localStorage.getItem(this._GOOGLE) || "";
    storeGoogle = google => this._localStorage.setItem(this._GOOGLE, google);
    removeGoogle = () => this._localStorage.removeItem(this._GOOGLE)

    // Get and store the token
    getLogged = () => this._localStorage.getItem(this._LOGGED) || "";
    storeLogged = logged => this._localStorage.setItem(this._LOGGED, logged);
    removeLogged = () => this._localStorage.removeItem(this._LOGGED)

    // Get and store the expiration date of the token
    getExpirationDate = () => this._localStorage.getItem(this._EXPIRATION_DATE) || "";
    storeExpirationDate = date => this._localStorage.setItem(this._EXPIRATION_DATE, date);

    // Store both the username and the password
    storeCredentials = (username, pwd) => {
        this.storeEmail(username);
        this.storePwd(pwd);
    }

    // Store the username, the password and the token
    storeCredentialsWithToken = (username, pwd, token) => {
        this.storeEmail(username);
        this.storePwd(pwd);
        this.storeToken(token)
    }

    // Store both the token and its expiration date
    storeTokenWithExpirationDate = (token, date) => {
        this.storeToken(token);
        this.storeExpirationDate(date);
    }

    // Clear local storage
    clear = () => this._localStorage.clear();

    // Clear local storage except the username and the password
    clearExceptCredentials = () => {
        this._localStorage.removeItem(this._TOKEN);
        this._localStorage.removeItem(this._EXPIRATION_DATE);
    }
}