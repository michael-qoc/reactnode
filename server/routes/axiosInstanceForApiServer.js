const axios = require("axios");
const axiosInstanceForApiServer = axios.create({
  baseURL: "https://www.superapp.ca/",
  headers: {
    "My-Custom-Headers": "customApiHeaders"
  }
});

module.exports = axiosInstanceForApiServer;
