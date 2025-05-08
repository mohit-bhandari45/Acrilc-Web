export interface IUser {
    _id?: string;
    username?: string;
    fullName: string;
    profilePicture?: string;
    bio?: string;
    story?: string;
    portfolioURL: string
    totalFollowers?: string[];
    totalFollowing?: string[];
    role?: "user" | "admin";
    preferences?: string[];
    services?: string[];
    posts: number 
}