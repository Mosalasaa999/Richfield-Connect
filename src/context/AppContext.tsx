import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import { UserProfile, Post, AppState, ActionType } from '../types';

// Sample initial post for first-time visitors
const INITIAL_POSTS: Post[] = [
  {
    id: 1711012300001,
    username: 'Thabo Mokoena',
    studentNumber: '2023411',
    campus: 'Bryanston (Sandton) Campus',
    timestamp: '21 Sep 2026, 09:30 AM',
    content: 'Welcome to the second semester at Richfield! Has anyone started preparing for the Web Technology 512 React architecture assignment? Let us form a study group in the Bryanston library or online via Teams.',
    likes: 7,
    liked: false,
  }
];

const initialState: AppState = {
  user: null,
  posts: INITIAL_POSTS,
};

function appReducer(state: AppState, action: ActionType): AppState {
  switch (action.type) {
    case 'REGISTER_USER': {
      const newUser = action.payload;
      return {
        ...state,
        user: newUser,
      };
    }
    case 'ADD_POST': {
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    }
    case 'TOGGLE_LIKE': {
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post.id === action.payload) {
            const currentlyLiked = post.liked;
            return {
              ...post,
              liked: !currentlyLiked,
              likes: currentlyLiked ? Math.max(0, post.likes - 1) : post.likes + 1,
            };
          }
          return post;
        }),
      };
    }
    case 'DELETE_POST': {
      return {
        ...state,
        posts: state.posts.filter(post => String(post.id) !== String(action.payload)),
      };
    }
    case 'HYDRATE_STATE': {
      return {
        ...state,
        user: action.payload.user,
        // null = never saved, keep seeds. [] = user cleared the feed, honour it.
        posts: action.payload.posts === null ? state.posts : action.payload.posts,
      };
    }
    case 'LOGOUT_USER': {
      return {
        ...state,
        user: null,
      };
    }
    default:
      return state;
  }
}

interface AppContextValue {
  state: AppState;
  registerUser: (user: UserProfile) => void;
  addPost: (content: string) => boolean;
  toggleLike: (id: string | number) => void;
  deletePost: (id: string | number) => void;
  logoutUser: () => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

const USER_STORAGE_KEY = 'richfield_user';
const POSTS_STORAGE_KEY = 'richfield_posts';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [hydrated, setHydrated] = useState(false);

  // 1. Hydrate state from localStorage on first mount
  useEffect(() => {
    try {
      const savedUserStr = localStorage.getItem(USER_STORAGE_KEY) || localStorage.getItem('richfield_connect_user_v2');
      const savedPostsStr = localStorage.getItem(POSTS_STORAGE_KEY) || localStorage.getItem('richfield_connect_posts_v2');

      const parsedUser = savedUserStr ? JSON.parse(savedUserStr) : null;
      const parsedPosts = savedPostsStr ? JSON.parse(savedPostsStr) : null;

      dispatch({
        type: 'HYDRATE_STATE',
        payload: {
          user: parsedUser,
          posts: parsedPosts,
        },
      });
    } catch (err) {
      console.error('Error loading data from localStorage', err);
    } finally {
      setHydrated(true); // reads are finished; writes may now proceed
    }
  }, []);

  // 2. Synchronize user changes to localStorage (gated behind hydration)
  useEffect(() => {
    if (!hydrated) return;
    try {
      if (state.user) {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(state.user));
      } else {
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    } catch (err) {
      console.error('Error saving user to localStorage', err);
    }
  }, [state.user, hydrated]);

  // 3. Synchronize posts changes to localStorage (gated behind hydration)
  useEffect(() => {
    if (!hydrated) return;
    try {
      if (state.posts !== undefined) {
        localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(state.posts));
      }
    } catch (err) {
      console.error('Error saving posts to localStorage', err);
    }
  }, [state.posts, hydrated]);

  // Dispatches
  const registerUser = (user: UserProfile) => {
    dispatch({ type: 'REGISTER_USER', payload: user });
  };

  const addPost = (content: string): boolean => {
    const trimmed = content.trim();
    if (!trimmed) return false;

    // Pull author from profile or fallback to Richfield Student
    const username = state.user?.fullName || 'Richfield Student';
    const studentNumber = state.user?.studentNumber;
    const campus = state.user?.campus;

    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
    const formattedTime = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    const timestamp = `${formattedDate}, ${formattedTime}`;

    const newPost: Post = {
      id: Date.now(),
      username,
      studentNumber,
      campus,
      timestamp,
      content: trimmed,
      likes: 0,
      liked: false,
    };

    dispatch({ type: 'ADD_POST', payload: newPost });
    return true;
  };

  const toggleLike = (id: string | number) => {
    dispatch({ type: 'TOGGLE_LIKE', payload: id });
  };

  const deletePost = (id: string | number) => {
    dispatch({ type: 'DELETE_POST', payload: id });
  };

  const logoutUser = () => {
    dispatch({ type: 'LOGOUT_USER' });
  };

  return (
    <AppContext.Provider
      value={{
        state,
        registerUser,
        addPost,
        toggleLike,
        deletePost,
        logoutUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextValue => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
