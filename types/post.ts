/* Post Interfaces */
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

export default IPost;
