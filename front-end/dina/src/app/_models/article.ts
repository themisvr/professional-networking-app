import { CommentModel } from "./comment";
import { MultimediaModel } from "./multimedia";

export class ArticleModel {
    postId: number;
    userId: number;
    creator: string;
    created: Date;
    likeCount: number;
    content: string;
    comments: CommentModel[];
    multimedia: MultimediaModel[];
};