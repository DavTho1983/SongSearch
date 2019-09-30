import axios from "axios";

const iTunesInstance = axios.create({ baseURL: "https://itunes.apple.com" });

export default iTunesInstance;
