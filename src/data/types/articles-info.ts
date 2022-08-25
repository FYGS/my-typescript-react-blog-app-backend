export interface Comment {
  username: string;
  text: string;
}

export interface Info {
  upvotes: number;
  comments: Comment[];
}

export interface ArticlesInfo {
  [name: string]: Info;
}
