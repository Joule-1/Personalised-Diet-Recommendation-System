import axios from "axios";

const userPreferencesAPI = axios.create({
    baseURL: "http://localhost:8000/api/v1/userPreferences/",
    withCredentials: true,
});

export { userPreferencesAPI };
