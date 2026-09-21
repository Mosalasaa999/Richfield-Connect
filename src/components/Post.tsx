import React, { useState } from 'react';
import { Post as PostType } from '../types';
import { useApp } from '../context/AppContext';
import { Heart, Trash2, Clock, MapPin, AlertCircle, X, Check } from 'lucide-react';
import styles from './Post.module.css';

interface PostProps {
  post: PostType;
}

export const Post: React.FC<PostProps> = ({ post }) => {
  const { toggleLike, deletePost, state } = useApp();
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const handleLike = () => {
    toggleLike(post.id);
  };

  const handleConfirmDelete = () => {
    deletePost(post.id);
  };

  const getInitials = (name: string): string => {
    if (!name.trim()) return 'RS';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const isCurrentUserAuthor =
    state.user && state.user.fullName.toLowerCase() === post.username.toLowerCase();

  return (
    <article
      id={`post-${post.id}`}
      className={styles.postCard}
    >
      {/* Top subtle highlight line */}
      <div className={styles.topAccent}></div>

      {/* Post Author Header */}
      <div className="flex items-start justify-between gap-3 mb-3 pt-1">
        <div className="flex items-center gap-3">
          <div className={styles.avatar}>
            {getInitials(post.username)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-[#003087] leading-tight">
                {post.username}
              </h4>
              {isCurrentUserAuthor && (
                <span className="text-[10px] font-semibold bg-[#e6edfa] text-[#003087] px-2 py-0.5 rounded-full border border-blue-200">
                  You
                </span>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2 mt-0.5 text-[11px] text-slate-500">
              <span className="flex items-center gap-1 font-mono">
                <Clock className="w-3 h-3 text-slate-400" />
                {post.timestamp}
              </span>
              {post.campus && (
                <>
                  <span className="text-slate-300">•</span>
                  <span className="flex items-center gap-1 text-slate-600 truncate max-w-[200px]">
                    <MapPin className="w-3 h-3 text-[#e52427]" />
                    {post.campus}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Delete Trigger Button */}
        <button
          type="button"
          onClick={() => setShowConfirmDelete(!showConfirmDelete)}
          id={`btn-delete-post-${post.id}`}
          className={`${styles.deleteBtn} ${showConfirmDelete ? 'text-red-600 bg-red-50' : ''}`}
          title="Delete this post"
          aria-label="Delete post"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Inline Delete Confirmation Banner */}
      {showConfirmDelete && (
        <div
          id={`delete-confirm-banner-${post.id}`}
          className="bg-red-50 border border-red-200 rounded-lg p-3 mb-3 flex items-center justify-between gap-2 animate-fade-in"
        >
          <div className="flex items-center gap-2 text-xs font-semibold text-red-900">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>Delete this post permanently?</span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => setShowConfirmDelete(false)}
              className="px-2.5 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded transition-colors inline-flex items-center gap-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirmDelete}
              id={`btn-confirm-delete-${post.id}`}
              className="px-3 py-1 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded transition-colors inline-flex items-center gap-1 cursor-pointer shadow-2xs"
            >
              <Check className="w-3.5 h-3.5" />
              Yes, Delete
            </button>
          </div>
        </div>
      )}

      {/* Post Text Body */}
      <p className="text-sm text-slate-800 leading-relaxed whitespace-pre-line mb-4 font-normal">
        {post.content}
      </p>

      {/* Post Actions Footer */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        {/* Like Button with Counter & Active Styling */}
        <button
          type="button"
          onClick={handleLike}
          id={`btn-like-post-${post.id}`}
          className={`${styles.likeBtn} ${
            post.liked ? `${styles.likeBtnActive} animate-pulse-like` : ''
          }`}
          aria-pressed={post.liked}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              post.liked ? 'fill-[#e52427] text-[#e52427]' : 'text-slate-400'
            }`}
          />
          <span className="font-bold">{post.likes}</span>
          <span className="hidden sm:inline font-normal">
            {post.likes === 1 ? 'Like' : 'Likes'}
          </span>
        </button>

        <span className="text-[11px] text-slate-400 italic font-medium">
          Richfield Student Community
        </span>
      </div>
    </article>
  );
};
