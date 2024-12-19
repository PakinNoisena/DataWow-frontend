import { CommentManagement } from "./comment";

export class PostManagement {
  id!: string;
  title!: string;
  description!: string;
  createdAt!: Date;
  owner!: {
    username: string;
  };
  community!: {
    id: string;
    name: string;
  };
  comments: CommentManagement[] = [];
}
