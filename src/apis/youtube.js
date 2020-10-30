import axios from "axios";
const KEY = "AIzaSyBA_tnYk-WI2oqJjCXtG0-slpQ-OJJjN5g";

export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    part: "snippet",
    maxResults: 20,
    key: KEY,
    type: "video",
  },
});
