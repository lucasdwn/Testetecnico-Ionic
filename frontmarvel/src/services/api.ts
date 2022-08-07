import axios from "axios";

const api = axios.create({
    baseURL: "https://localhost:7017/api/"
});

export default api;