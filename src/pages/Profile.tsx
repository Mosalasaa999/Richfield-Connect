import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  MapPin, 
  Mail, 
  Hash, 
  BookOpen, 
  MessageSquare, 
  LogOut,
  Award,
  AlertTriangle,
  Printer,
  FileCheck,
  X
} from 'lucide-react';
import styles from './Profile.module.css';

// Baseline engagement metrics specified in §5.5 (Student Profile Activity Metrics)
const DEFAULT_CONNECTIONS_COUNT = 48;
const DEFAULT_STUDY_GROUPS_COUNT = 5;

export const Profile: React.FC = () => {
  const { state, logoutUser } = useApp();
  const navigate = useNavigate();
  const [confirmLogout, setConfirmLogout] = useState(false);

  const user = state.user;

  // Graceful empty state when no user data is found
  if (!user) {
    return (
      <div id="no-profile-state" className="max-w-xl mx-auto my-12 bg-white p-8 sm:p-10 rounded-2xl shadow-sm border border-slate-200 text-center space-y-4">
        <div className="w-16 h-16 bg-red-50 text-[#e52427] rounded-full flex items-center justify-center mx-auto border border-red-200">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-[#003087]">
          No Registered Student Found
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
          You are currently browsing as a guest. Please complete the student registration to create your official Richfield academic profile, post in discussions, and export your student credentials.
        </p>
        <div className="pt-2">
          <Link
            to="/signup"
            id="btn-goto-signup"
            className="inline-flex items-center gap-2 bg-[#003087] hover:bg-[#002060] text-white font-bold text-sm px-6 py-3 rounded-lg shadow-sm hover:shadow transition-all border-b-2 border-[#e52427]"
          >
            Register Student Profile
          </Link>
        </div>
      </div>
    );
  }

  // Derive initials
  const initials = user.fullName
    .trim()
    .split(/\s+/)
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  // Count user posts dynamically from state
  const userPostsCount = state.posts.filter(
    (p) => p.username.toLowerCase() === user.fullName.toLowerCase()
  ).length;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={`${styles.profileContainer} animate-fade-in`} id="student-profile-view">
      {/* Top Banner Card */}
      <div className={styles.bannerCard}>
        {/* Official-themed geometric cover banner */}
        <div className={styles.heroPattern}>
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <span className="bg-white/20 backdrop-blur-xs text-white text-xs px-3 py-1 rounded-full border border-white/20 font-semibold flex items-center gap-1.5">
              <FileCheck className="w-3.5 h-3.5 text-emerald-300" />
              Verified Student
            </span>
          </div>
        </div>

        {/* Profile Details Bar */}
        <div className="px-6 sm:px-8 pb-6 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-16 sm:-mt-20 gap-4 mb-6">
            {/* Circular avatar with initials */}
            <div className={styles.avatarWrapper}>
              <div
                id="profile-avatar"
                className={styles.avatarCircle}
              >
                {initials}
              </div>
            </div>

            {/* Action Buttons: Print & Profile Management */}
            <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
              <button
                type="button"
                onClick={handlePrint}
                className={styles.printBtn}
                title="Print student profile"
              >
                <Printer className="w-4 h-4 text-slate-600" />
                <span>Print</span>
              </button>

              {!confirmLogout ? (
                <button
                  type="button"
                  onClick={() => setConfirmLogout(true)}
                  id="btn-logout-profile"
                  className={styles.logoutBtn}
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              ) : (
                <div className="inline-flex items-center gap-1.5 p-1 bg-red-50 border border-red-200 rounded-lg animate-fade-in">
                  <span className="text-xs text-red-700 font-medium px-2">Sign out?</span>
                  <button
                    type="button"
                    onClick={() => {
                      logoutUser();
                      navigate('/');
                    }}
                    className="px-2.5 py-1 text-xs font-bold bg-[#e52427] hover:bg-[#c9181b] text-white rounded transition-colors cursor-pointer"
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmLogout(false)}
                    className="px-2 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-200/60 rounded transition-colors cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* User Name & Metadata */}
          <div className="space-y-4">
            <div>
              <h1 id="profile-full-name" className="text-2xl sm:text-3xl font-black text-[#003087]">
                {user.fullName}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-mono flex items-center gap-1 mt-0.5">
                <Hash className="w-3.5 h-3.5 text-slate-400" />
                Student ID: <span id="profile-student-number" className="font-bold text-slate-800">{user.studentNumber}</span>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-600 pt-1">
              <span id="profile-campus" className="flex items-center gap-1.5 bg-blue-50 text-[#003087] font-bold px-3 py-1 rounded-md border border-blue-100">
                <MapPin className="w-3.5 h-3.5 text-[#e52427]" />
                {user.campus}
              </span>
              <span id="profile-email" className="flex items-center gap-1.5 bg-slate-100 text-slate-700 px-3 py-1 rounded-md border border-slate-200 font-mono">
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                {user.email}
              </span>
              <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                <Award className="w-3.5 h-3.5 text-amber-500" />
                Faculty of Information Technology & Business Science
              </span>
            </div>

            {/* Bio text */}
            <div className="pt-3 border-t border-slate-100">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Student Academic Statement & Bio
              </h3>
              <p id="profile-bio-text" className="text-sm text-slate-800 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
                "{user.bio}"
              </p>
            </div>

            {/* Interests as Styled Tag/Badge Elements */}
            <div className="pt-2">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Enrolled Specialisations & Modules ({user.interests.length})
              </h3>
              <div id="profile-interests-list" className="flex flex-wrap gap-2">
                {user.interests.map((interest) => (
                  <span
                    key={interest}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#e6edfa] text-[#003087] font-bold text-xs rounded-lg border border-[#c3d5f5]"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-[#003087]" />
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Row (§5.5: Posts, Connections, Groups) */}
        <div id="profile-statistics-row" className="bg-slate-50 border-t border-slate-200 px-6 sm:px-8 py-4 grid grid-cols-3 gap-4 text-center">
          <div className="p-2">
            <span className="block text-2xl font-black text-[#003087]" id="stat-posts">
              {userPostsCount}
            </span>
            <span className="text-xs font-semibold text-slate-500">
              Published Posts
            </span>
          </div>
          <div className="p-2 border-x border-slate-200">
            <span className="block text-2xl font-black text-[#003087]" id="stat-connections">
              {DEFAULT_CONNECTIONS_COUNT}
            </span>
            <span className="text-xs font-semibold text-slate-500">
              Campus Peers
            </span>
          </div>
          <div className="p-2">
            <span className="block text-2xl font-black text-[#e52427]" id="stat-groups">
              {DEFAULT_STUDY_GROUPS_COUNT}
            </span>
            <span className="text-xs font-semibold text-slate-500">
              Study Groups
            </span>
          </div>
        </div>
      </div>

      {/* User's Recent Posts section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#003087] flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#e52427]" />
            Your Academic Discussion Activity
          </h2>
          <Link
            to="/feed"
            className="text-xs font-bold text-[#003087] hover:underline"
          >
            Go to Full Feed →
          </Link>
        </div>

        {userPostsCount === 0 ? (
          <div className="bg-white p-6 rounded-xl border border-slate-200 text-center text-xs text-slate-500">
            You haven't posted in the feed yet. Head over to the{' '}
            <Link to="/feed" className="text-[#003087] font-bold underline">
              Discussion Feed
            </Link>{' '}
            to share your first question or coursework note!
          </div>
        ) : (
          <div className="space-y-3">
            {state.posts
              .filter((p) => p.username.toLowerCase() === user.fullName.toLowerCase())
              .map((p) => (
                <div
                  key={p.id}
                  className="bg-white p-4 rounded-xl border border-slate-200 text-sm flex items-start justify-between gap-4"
                >
                  <div>
                    <p className="text-slate-800">{p.content}</p>
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      {p.timestamp} • {p.likes} likes
                    </span>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};
