interface IMedia{
    type: string
    url: string;
}

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