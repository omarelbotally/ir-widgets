import axios from "axios";

const api_user = "SAVOLA-GROUP"; //Argaam API User
const api_password = "B88S21-US8A71C4CF74223C857BE8F-A0009F-1D"; // Argaam API Password
const baseUrl = "https://data.argaam.com";

var App = {
  accessTokenExpireIn: new Date(2020),
  getAccessToken: async function () {
    var app = this;
    if (this.accessTokenExpireIn < new Date()) {
      var authUrl = baseUrl + "/authenticate";
      var data = { username: api_user, password: api_password };
      try {
        const response = await axios.post(authUrl, data);
        var data_1 = response.data;
        app._token = data_1.jwtToken;
        app.accessTokenExpireIn = data_1.expires;
        localStorage.setItem("token", response.data.jwtToken);
      } catch (exception) {
        console.log("Error:" + exception);
        throw exception;
      }
    } else {
      return Promise.resolve(this._token);
    }
  },
};

export default App;
