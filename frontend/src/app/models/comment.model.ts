export interface Comment {
    _id?: string;
    blog_entry_id: string;
    user_id: string;
    content_text: string;
    created_at: Date;
} 