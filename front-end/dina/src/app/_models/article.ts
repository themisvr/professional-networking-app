import { CommentModel } from "./comment";

export class ArticleModel {
    postId: number;
    userId: number;
    creator: string;
    created: Date;
    likeCount: number;
    content: string;
    comments: CommentModel[];
};