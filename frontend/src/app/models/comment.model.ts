export interface Comment {
    _id: string;
    blog_entry_id: string;
    user_id: { _id: string, username: string } | string; 
    content_text: string;
    created_at?: string;
  }
  