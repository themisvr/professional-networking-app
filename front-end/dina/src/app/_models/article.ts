import { CommentModel } from "./comment";

export class ArticleModel {
    postId: number;
    creator: string;
    created: Date;
    likes: number;
    content: string;
    comments: CommentModel[];
};