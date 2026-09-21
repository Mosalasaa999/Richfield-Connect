import React from 'react';
import { MapPin, Sparkles, BookOpen, Award, ShieldCheck } from 'lucide-react';
import styles from './ProfilePreview.module.css';

interface ProfilePreviewProps {
  fullName: string;
  studentNumber: string;
  campus: string;
  email: string;
  interests: string[];
  bio: string;
}

export const ProfilePreview: React.FC<ProfilePreviewProps> = ({
  fullName,
  studentNumber,
  campus,
  email,
  interests,
  bio,
}) => {
  // Derive initials from full name
  const getInitials = (name: string): string => {
    if (!name.trim()) return 'RC';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const displayName = fullName.trim() || 'Student Full Name';
  const displayStudentNumber = studentNumber.trim() || '2026000';
  const displayCampus = campus || 'Select Campus';
  const displayEmail = email.trim() || 'student@richfield.ac.za';
  const displayBio =
    bio.trim() || 'Your academic biography and study aspirations will be previewed here in real time...';

  return (
    <div
      id="profile-preview-card"
      className={`${styles.previewCard} animate-fade-in`}
    >
      {/* Official Header with Richfield Navy & Red Stripe */}
      <div className={styles.headerBanner}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
              Richfield Student Card
            </span>
          </div>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/20 text-white backdrop-blur-xs">
            <Sparkles className="w-3 h-3 text-amber-300" />
            Live Preview
          </span>
        </div>

        <div className="flex items-center gap-3.5">
          {/* Avatar with Initials */}
          <div className="w-14 h-14 rounded-full bg-white text-[#003087] font-black text-lg flex items-center justify-center shadow-md border-2 border-slate-200 shrink-0">
            {getInitials(fullName)}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-base font-bold text-white truncate" title={displayName}>
              {displayName}
            </h3>
            <p className="text-xs text-slate-300 font-mono flex items-center gap-1 mt-0.5">
              <Award className="w-3 h-3 text-[#e52427]" />
              ID: {displayStudentNumber}
            </p>
            <p className="text-xs text-slate-200 flex items-center gap-1 mt-0.5 truncate">
              <MapPin className="w-3 h-3 text-[#e52427] shrink-0" />
              {displayCampus}
            </p>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 space-y-4">
        {/* Email */}
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
            Institutional Email
          </span>
          <p className="text-xs font-semibold text-slate-700 truncate">{displayEmail}</p>
        </div>

        {/* Short Bio */}
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Academic Biography
          </span>
          <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200 leading-relaxed italic line-clamp-3">
            &ldquo;{displayBio}&rdquo;
          </p>
        </div>

        {/* Selected Interests as Tags */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Selected Specialisations
            </span>
            <span className="text-[10px] text-slate-400 font-medium">
              {interests.length} selected
            </span>
          </div>
          {interests.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {interests.map((interest) => (
                <span
                  key={interest}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#e6edfa] text-[#003087] font-bold text-[11px] rounded-md border border-[#c3d5f5] animate-fade-in"
                >
                  <BookOpen className="w-3 h-3 text-[#003087]" />
                  {interest}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-400 italic">No academic interests selected yet.</p>
          )}
        </div>

        {/* Institutional Accreditation Notice */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#003087]" />
            CHE Accredited
          </span>
          <span className="font-mono text-[10px] text-slate-400">
            Reg: 2000/HE07/008
          </span>
        </div>
      </div>
    </div>
  );
};
