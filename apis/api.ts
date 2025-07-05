import axios from "axios";

// const BASE_URL: string = "http://localhost:8000";
export const BASE_URL: string = "https://api.acrilc.com";

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

// public apis
const GET_FEATURED_ARTISTS = `${BASE_URL}/public/artists/featured`;
const GET_FEATURED_ARTWORKS = `${BASE_URL}/public/arts/featured`;
const GET_FEATURED_MARKETS = `${BASE_URL}/public/featured/markets`;
// const GET_FEATURED_ARTWORKS = `${BASE_URL}/public/featured/arts`;
export { GET_FEATURED_ARTISTS, GET_FEATURED_ARTWORKS, GET_FEATURED_MARKETS };

// auth apis
const SIGNUP_URL: string = `${BASE_URL}/auth/signup`;
const LOGIN_URL: string = `${BASE_URL}/auth/login`;
const FORGET_PASSWORD_URL = `${BASE_URL}/api/user/change-password`
const ADD_USERNAME_URL: string = `${BASE_URL}/api/user/username`;
const FORTE_URL: string = `${BASE_URL}/api/user/preferences`;
const ADD_PROFILE_PIC_URL: string = `${BASE_URL}/api/user/profile-pic`;
const VERIFY_EMAIL: string = `${BASE_URL}/auth/verify-email`;
export { SIGNUP_URL, LOGIN_URL, FORGET_PASSWORD_URL, ADD_USERNAME_URL, FORTE_URL, ADD_PROFILE_PIC_URL, VERIFY_EMAIL };

// api apis
const GET_OWN_PROFILE = `${BASE_URL}/api/user/me`;
const UPDATE_PROFILE = `${BASE_URL}/api/user`;
const GET_USER_PROFILE = `${BASE_URL}/api/user`;
const ADD_PROFILE_PIC = `${BASE_URL}/api/user/profile-pic`
const ADD_Banner_PIC = `${BASE_URL}/api/user/banner-pic`
export { GET_OWN_PROFILE, UPDATE_PROFILE, GET_USER_PROFILE, ADD_PROFILE_PIC, ADD_Banner_PIC };

/* Data(Posts, Storyboard, etc) */
const GET_POSTS = `${BASE_URL}/api/posts/user`;
const GET_POST = `${BASE_URL}/api/posts`;
const CREATE_POST = `${BASE_URL}/api/posts`;
const UPDATE_POST = `${BASE_URL}/api/posts`;
const DELETE_POST = `${BASE_URL}/api/posts`;
const GET_FEATURED_POSTS = `${BASE_URL}/public/user`;
export { GET_POSTS, CREATE_POST, CREATE_STORYBOARD, GET_STORYBOARD, GET_POST, UPDATE_POST, DELETE_POST, GET_FEATURED_POSTS };

const CREATE_STORYBOARD = `${BASE_URL}/api/story`;
const GET_STORYBOARD = `${BASE_URL}/api/story/user`;

/* Portfolio */
const ADD_PORTFOLIO = `${BASE_URL}/api/portfolio/add`;
const CHECK_PORTFOLIO = `${BASE_URL}/api/portfolio/check`;
const DELETE_PORTFOLIO = `${BASE_URL}/api/portfolio/delete`;
const GET_PORTFOLIO = `${BASE_URL}/public/portfolio`;
export { ADD_PORTFOLIO, GET_PORTFOLIO, CHECK_PORTFOLIO, DELETE_PORTFOLIO };

/* MarketPlace */
const MARKETBASE = `${BASE_URL}/api/projects`
const ADD_TO_MARKET = `${MARKETBASE}/create`;
const GET_SINGLE_Market_PROJECT = `${MARKETBASE}/project`;
const GET_ALL_API_Market_PROJECT = `${MARKETBASE}`;
const GET_ALL_Market_PROJECT = `${BASE_URL}/public/user`;
export { ADD_TO_MARKET, GET_SINGLE_Market_PROJECT, GET_ALL_API_Market_PROJECT, GET_ALL_Market_PROJECT };

/* Social Interaction Routes */
const SOCIALBASE = `${BASE_URL}/api/socials`
const LIKE_POST = `${SOCIALBASE}/post`;
export { LIKE_POST };

/* Utils Apis */
const GET_KEYWORDS_API = `${BASE_URL}/api/utils/get-keywords`;
export { GET_KEYWORDS_API };

/* settings */
const SETTING_BASE_URL = `${BASE_URL}/api/user`;
const ADD_PASSWORD = `${SETTING_BASE_URL}/set-password`;
const UPDATE_EMAIL = `${SETTING_BASE_URL}/change-email`;
const UPDATE_PASSWORD = `${SETTING_BASE_URL}/change-password`;
export { ADD_PASSWORD, UPDATE_EMAIL, UPDATE_PASSWORD };

export default api;
