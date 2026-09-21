import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { CreatePost } from '../components/CreatePost';
import { Post } from '../components/Post';
import { 
  MessageSquare, 
  ShieldCheck, 
  UserPlus,
  Search,
  X,
  SlidersHorizontal,
  Filter
} from 'lucide-react';
import styles from './Feed.module.css';

export const Feed: React.FC = () => {
  const { state } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCampus, setSelectedCampus] = useState('all');

  const allPosts = state.posts;

  // Extract unique campus names from posts for quick filtering
  const availableCampuses = useMemo(() => {
    const campusSet = new Set<string>();
    allPosts.forEach((post) => {
      if (post.campus) campusSet.add(post.campus);
    });
    return Array.from(campusSet);
  }, [allPosts]);

  // Non-mutating filter for search term (keyword / author) and optional campus
  const filteredPosts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return allPosts.filter((post) => {
      const matchesSearch =
        !term ||
        post.content.toLowerCase().includes(term) ||
        post.username.toLowerCase().includes(term) ||
        (post.campus && post.campus.toLowerCase().includes(term));

      const matchesCampus =
        selectedCampus === 'all' || post.campus === selectedCampus;

      return matchesSearch && matchesCampus;
    });
  }, [allPosts, searchTerm, selectedCampus]);

  const handleClearSearch = () => {
    setSearchTerm('');
    setSelectedCampus('all');
  };

  return (
    <div className={`${styles.feedContainer} animate-fade-in`} id="academic-feed-view">
      {/* Top Banner / Feed Header */}
      <div className={styles.headerCard}>
        <div>
          <div className="flex items-center gap-2">
            <span className={styles.badge}>
              Student Feed
            </span>
            <span className="text-[11px] font-semibold text-slate-500">
              {allPosts.length} Total {allPosts.length === 1 ? 'Discussion' : 'Discussions'}
            </span>
          </div>
          <h1 className={styles.title}>
            Academic Discussion Forum
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Share coursework questions, coordinate study groups, and connect across Richfield campuses.
          </p>
        </div>
      </div>

      {/* Guest Banner if not registered */}
      {!state.user && (
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-start justify-between gap-4 shadow-xs">
          <div className="text-xs text-amber-900 leading-relaxed">
            <p className="font-bold flex items-center gap-1.5 mb-0.5">
              <ShieldCheck className="w-4 h-4 text-amber-700" />
              Browsing as Guest
            </p>
            You can read all student discussions and like posts. Register your student profile to post your own questions and connect with peers!
          </div>
          <Link
            to="/signup"
            className="shrink-0 text-xs font-bold bg-[#003087] hover:bg-[#002060] text-white px-3.5 py-2 rounded-lg transition-colors inline-flex items-center gap-1.5"
          >
            <UserPlus className="w-3.5 h-3.5" />
            Register
          </Link>
        </div>
      )}

      {/* Create Post Interface */}
      <CreatePost />

      {/* Search & Filter Toolbar */}
      <div
        id="feed-search-filter-toolbar"
        className="bg-white rounded-xl border border-slate-200 p-3.5 sm:p-4 shadow-xs space-y-3"
      >
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          {/* Real-time Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              id="feed-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search discussions by keyword, topic, or author..."
              className="w-full pl-9 pr-8 py-2 bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-xs text-slate-800 rounded-lg border border-slate-200 focus:border-[#003087] focus:ring-1 focus:ring-[#003087] transition-all outline-none"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded cursor-pointer"
                title="Clear search"
                aria-label="Clear search input"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Campus Filter Select (if campuses exist) */}
          {availableCampuses.length > 0 && (
            <div className="flex items-center gap-1.5 shrink-0">
              <Filter className="w-3.5 h-3.5 text-slate-400 hidden sm:inline" />
              <select
                id="feed-campus-filter"
                value={selectedCampus}
                onChange={(e) => setSelectedCampus(e.target.value)}
                className="w-full sm:w-auto text-xs py-2 px-3 bg-slate-50 text-slate-700 rounded-lg border border-slate-200 focus:border-[#003087] focus:ring-1 focus:ring-[#003087] outline-none cursor-pointer"
                aria-label="Filter posts by campus"
              >
                <option value="all">All Campuses</option>
                {availableCampuses.map((campus) => (
                  <option key={campus} value={campus}>
                    {campus}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Results summary & Active filter chip indicator */}
        {(searchTerm || selectedCampus !== 'all') && (
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
            <span className="text-slate-500 font-medium">
              Showing <strong className="text-[#003087]">{filteredPosts.length}</strong> of {allPosts.length} {allPosts.length === 1 ? 'post' : 'posts'}
              {searchTerm && <span> matching &ldquo;{searchTerm}&rdquo;</span>}
              {selectedCampus !== 'all' && <span> at <strong>{selectedCampus}</strong></span>}
            </span>
            <button
              type="button"
              onClick={handleClearSearch}
              className="text-[#003087] hover:text-[#e52427] font-semibold text-xs transition-colors cursor-pointer inline-flex items-center gap-1"
            >
              Reset Filter
            </button>
          </div>
        )}
      </div>

      {/* Feed Stream */}
      <div id="posts-stream" className="space-y-4">
        {filteredPosts.length === 0 ? (
          <div
            id="empty-feed-placeholder"
            className="bg-white rounded-xl border border-slate-200 p-10 text-center space-y-3 shadow-xs"
          >
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
              {searchTerm || selectedCampus !== 'all' ? (
                <SlidersHorizontal className="w-6 h-6 text-slate-400" />
              ) : (
                <MessageSquare className="w-6 h-6 text-slate-400" />
              )}
            </div>
            <h3 className="text-base font-bold text-slate-700">
              {searchTerm || selectedCampus !== 'all'
                ? 'No matching discussions found'
                : 'No discussions yet'}
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {searchTerm || selectedCampus !== 'all'
                ? 'Try adjusting your search query or campus filter to find what you are looking for.'
                : 'Be the first student to start a discussion! Submit a question or insight above.'}
            </p>
            {(searchTerm || selectedCampus !== 'all') && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="mt-2 text-xs font-bold text-white bg-[#003087] hover:bg-[#002060] px-3.5 py-1.5 rounded-lg transition-colors"
              >
                Clear Search & Filters
              </button>
            )}
          </div>
        ) : (
          filteredPosts.map((post) => (
            <Post key={post.id} post={post} />
          ))
        )}
      </div>
    </div>
  );
};
