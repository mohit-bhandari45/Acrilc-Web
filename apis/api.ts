import axios from "axios";

// const BASE_URL: string = "https://joyous-reeta-mohit123-198cb6c8.koyeb.app"
const BASE_URL: string = "http://localhost:8000";

const api = axios.create({
    baseURL: BASE_URL,
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

// auth apis
const SIGNUP_URL: string = `${BASE_URL}/auth/signup`;
const LOGIN_URL: string = `${BASE_URL}/auth/login`;

// api apis
const GET_OWN_PROFILE = `${BASE_URL}/api/user/me`
const UPDATE_PROFILE_PIC = `${BASE_URL}/api/user/profile-pic`

export { SIGNUP_URL, LOGIN_URL, GET_OWN_PROFILE, UPDATE_PROFILE_PIC };
export default api;