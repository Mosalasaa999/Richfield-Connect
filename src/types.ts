export interface UserProfile {
  fullName: string;
  studentNumber: string;
  campus: string;
  email: string;
  password?: string;
  confirmPassword?: string;
  interests: string[];
  bio: string;
  termsAccepted: boolean;
  registeredAt?: string;
}

export interface Post {
  id: string | number;
  username: string;
  studentNumber?: string;
  campus?: string;
  timestamp: string;
  content: string;
  likes: number;
  liked: boolean;
}

export type ActionType =
  | { type: 'REGISTER_USER'; payload: UserProfile }
  | { type: 'ADD_POST'; payload: Post }
  | { type: 'TOGGLE_LIKE'; payload: string | number }
  | { type: 'DELETE_POST'; payload: string | number }
  | { type: 'HYDRATE_STATE'; payload: { user: UserProfile | null; posts: Post[] | null } }
  | { type: 'LOGOUT_USER' };

export interface AppState {
  user: UserProfile | null;
  posts: Post[];
}
