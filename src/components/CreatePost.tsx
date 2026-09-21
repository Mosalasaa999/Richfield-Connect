import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Send, AlertCircle, Sparkles, UserCheck, ShieldAlert } from 'lucide-react';
import styles from './CreatePost.module.css';

export const CreatePost: React.FC = () => {
  const { state, addPost } = useApp();
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      setError('Post content cannot be empty. Please enter your academic question or thought.');
      return;
    }

    const success = addPost(content);
    if (success) {
      setContent('');
      setError(null);
    }
  };

  const isRegistered = !!state.user;
  const authorName = state.user?.fullName || 'Richfield Student';
  const authorInitials = isRegistered
    ? authorName
        .split(/\s+/)
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'RS';

  return (
    <div id="create-post-container" className={styles.container}>
      <div className="flex items-center gap-3 mb-3">
        <div className={styles.avatar}>
          {authorInitials}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="text-sm font-bold text-[#003087] truncate">
              {authorName}
            </p>
            {isRegistered ? (
              <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                <UserCheck className="w-3 h-3" />
                Verified Student
              </span>
            ) : (
              <span className="text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 flex items-center gap-1">
                <ShieldAlert className="w-3 h-3" />
                Guest Author
              </span>
            )}
            {state.user?.campus && (
              <span className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200 truncate max-w-[180px] hidden sm:inline">
                {state.user.campus}
              </span>
            )}
          </div>
          <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
            <Sparkles className="w-3 h-3 text-[#e52427]" />
            Post questions, study group notes, or module insights
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="relative">
          <textarea
            id="post-content-textarea"
            rows={3}
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              if (error && e.target.value.trim()) {
                setError(null);
              }
            }}
            placeholder="Share an academic inquiry, study query, or module insight..."
            className={`${styles.textarea} ${
              error ? styles.textareaError : ''
            }`}
          />
        </div>

        {error && (
          <p className="text-xs text-[#e52427] mt-1.5 flex items-center gap-1 animate-fade-in" id="create-post-error">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            {error}
          </p>
        )}

        <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100">
          <span className="text-xs text-slate-400">
            {content.length > 0 ? `${content.length} characters` : 'Adhere to Richfield Academic Integrity'}
          </span>
          <button
            type="submit"
            id="btn-submit-post"
            className={styles.publishBtn}
          >
            <Send className="w-3.5 h-3.5" />
            Publish Post
          </button>
        </div>
      </form>
    </div>
  );
};
