import axios from "axios";

const BASE_URL: string = "https://joyous-reeta-mohit123-198cb6c8.koyeb.app"

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

/* Data(Posts, Storyboard, etc) */
const GET_POSTS = `${BASE_URL}/api/posts/user`;
const GET_POST = `${BASE_URL}/api/posts`;
const CREATE_POST = `${BASE_URL}/api/posts`;
const CREATE_STORYBOARD = `${BASE_URL}/api/story`;
const GET_STORYBOARD = `${BASE_URL}/api/story/user`;

export { SIGNUP_URL, LOGIN_URL, GET_OWN_PROFILE, UPDATE_PROFILE_PIC, GET_POSTS, CREATE_POST, CREATE_STORYBOARD, GET_STORYBOARD, GET_POST };
export default api;