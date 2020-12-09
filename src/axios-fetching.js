import axios from "axios";

const instance = axios.create({
	baseURL: "https://amazing-store-dcf57-default-rtdb.firebaseio.com/",
});

export default instance;
