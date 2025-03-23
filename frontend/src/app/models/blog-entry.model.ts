import { BlogUser } from "./blog-user.model";


export interface BlogEntry {
    _id?: string;
    title: string;
    author: BlogUser[];
    description: string;
    content_text: string;
    creationDate: Date;
    editDates: Date[];
    impressionCount: number;
    commentsAllowed: boolean;
    content_images?: string[];
    category_id: string;
}
