export interface BlogEntry {
    _id?: string;
    title: string;
    author_ids: any[];
    description: string;
    //creationDate: Date,
    //editDates: Date[],
    //impressionCount: number,
    content_text: string;
    content_images?: string[];
    commentsAllowed?: boolean;
}
