import axios from "axios";

const firebaseInstance = axios.create({ baseURL: "https://playlists-b74ca.firebaseio.com/" });

export default firebaseInstance