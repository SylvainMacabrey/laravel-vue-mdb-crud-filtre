import axios from "axios";
import store from "../store";
import useAPI from "../store";

const axiosClient = axios.create({
    baseURL: 'http://127.0.0.1:8000/api'
})

axiosClient.interceptors.request.use(config => {
    console.log("axios token ", localStorage.getItem("token"));
    config.headers.Authorization = `Bearer ${ localStorage.getItem("token") }`;
    config.headers.Accept = "application/json";
    config.headers["Content-Type"] = "application/json";
    return config;
})

export default axiosClient;
