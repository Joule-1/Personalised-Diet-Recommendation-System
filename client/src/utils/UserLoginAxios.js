import axios from "axios";

const userLoginAPI = axios.create({
    baseURL: "http://localhost:8000/api/v1/user/",
    withCredentials: true,
});

export { userLoginAPI };
