import { UserProfile } from "./profile";

export interface Comment {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  body: string;
  author: UserProfile;
}
