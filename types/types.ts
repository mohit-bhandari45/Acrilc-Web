/* Auth Types */
const signupLabels: string[] = [
    "Name", "Email", "Password"
]

const loginLabels: string[] = [
    "Email", "Password"
]

interface ISignupDetails {
    name: string;
    email: string;
    password: string;
}

interface ILoginDetails {
    name: string;
    email: string;
    password: string;
}

export { signupLabels, loginLabels };
export type { ISignupDetails, ILoginDetails };


/* Post Types */
type MediaType = "image" | "video" | "audio" | "gif";

interface IMedia {
    url: string;
    type: MediaType;
}

interface IReply {
    _id?: string;
    user: string;
    text: string;
    applauds?: string[];
    createdAt?: Date;
    updatedAt?: Date;
}

interface IComment {
    _id: string;
    user: string;
    text: string;
    applauds?: string[];
    replies?: IReply[];

    createdAt?: Date;
    updatedAt?: Date;
}

interface IPost {
    _id: string
    author: string;
    title: string;
    subtitle: string;
    size: string;
    story: string;
    links: string[];
    hashTags: string[];
    mentions: string[];
    thumbnail?: string;
    media: IMedia[];
    forte: string;
    applauds: string[];
    comments: IComment[];
    location: Location;
    score: number;
    createdAt: Date;
    updatedAt: Date;
}

export type { IPost };


/* Storyboard types */
interface IStoryBoard {
    _id: string;
    author: string;
    title: string,
    media: IMedia[]
    description: string;
    createdAt: Date;
    updatedAt: Date;
}

export type { IStoryBoard };


/* User */
export interface IUser {
    _id?: string;
    username?: string;
    fullName: string;
    profilePicture?: string;
    bio?: string;
    email?: string;
    location?: string;
    story?: string;
    portfolioURL: string
    totalFollowers?: string[];
    totalFollowing?: string[];
    role?: "user" | "admin";
    preferences?: string[];
    services?: string[];
    posts: number
    socialLinks: Map<string, string>;
}