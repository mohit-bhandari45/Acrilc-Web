import axios from "axios";

// const BASE_URL: string = "https://joyous-reeta-mohit123-198cb6c8.koyeb.app"
// const BASE_URL: string = "https://acrilc-backend-production.up.railway.app"
// const BASE_URL: string = "http://localhost:8000"
const BASE_URL: string = "https://13.202.135.126:8000"

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
const ADD_USERNAME_URL: string = `${BASE_URL}/api/user/username`;
const FORTE_URL: string = `${BASE_URL}/api/user/preferences`;
const ADD_PROFILE_PIC_URL: string = `${BASE_URL}/api/user/profile-pic`;
export { SIGNUP_URL, LOGIN_URL, ADD_USERNAME_URL, FORTE_URL, ADD_PROFILE_PIC_URL };

// api apis
const GET_OWN_PROFILE = `${BASE_URL}/api/user/me`
const GET_USER_PROFILE = `${BASE_URL}/public`
const UPDATE_PROFILE_PIC = `${BASE_URL}/api/user/profile-pic`
export { GET_OWN_PROFILE, GET_USER_PROFILE, UPDATE_PROFILE_PIC };

/* Data(Posts, Storyboard, etc) */
const GET_POSTS = `${BASE_URL}/api/posts/user`;
const GET_POST = `${BASE_URL}/api/posts`;
const CREATE_POST = `${BASE_URL}/api/posts`;
const UPDATE_POST = `${BASE_URL}/api/posts`;
const DELETE_POST = `${BASE_URL}/api/posts`;

const CREATE_STORYBOARD = `${BASE_URL}/api/story`;
const GET_STORYBOARD = `${BASE_URL}/api/story/user`;

/* Portfolio */
const ADD_PORTFOLIO = `${BASE_URL}/api/portfolio/add`;
const CHECK_PORTFOLIO = `${BASE_URL}/api/portfolio/check`;
const DELETE_PORTFOLIO = `${BASE_URL}/api/portfolio/delete`;
const GET_PORTFOLIO = `${BASE_URL}/public/portfolio`;
export { ADD_PORTFOLIO, GET_PORTFOLIO, CHECK_PORTFOLIO,DELETE_PORTFOLIO };


export { GET_POSTS, CREATE_POST, CREATE_STORYBOARD, GET_STORYBOARD, GET_POST, UPDATE_POST, DELETE_POST };
export default api;
