import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { RichfieldLogo } from '../components/RichfieldLogo';
import { 
  Users, 
  BookOpen, 
  UserCheck, 
  ArrowRight, 
  ShieldCheck, 
  MessageSquare,
  CheckCircle2,
  ExternalLink,
  UserPlus
} from 'lucide-react';
import styles from './Home.module.css';

const TECH_PARTNERS = [
  'IBM',
  'AWS Academy',
  'Cisco',
  'Oracle',
  'Salesforce',
  'CIMA & Microsoft'
];

export const Home: React.FC = () => {
  const { state } = useApp();

  return (
    <div className={`${styles.homeContainer} animate-fade-in`}>
      {/* Official Moodle-Themed Hero Banner */}
      <section
        id="hero-section"
        className={styles.heroCard}
      >
        <div className={styles.heroContent}>
          <div className={styles.pillBadge}>
            <span className="w-2 h-2 rounded-full bg-[#e52427]"></span>
            <span>Richfield Connect • Council on Higher Education (CHE) Accredited</span>
          </div>

          <div className="mb-4">
            <RichfieldLogo light={true} showTagline={true} className="h-12 mb-3" />
          </div>

          <h1 className={styles.heroHeading}>
            Connecting Academic Minds, Building Futures
          </h1>

          <p className="text-base sm:text-lg text-slate-200 font-medium mt-3 leading-relaxed">
            The official academic portal and student collaboration hub for Richfield students across our 8 national campuses and digital online learning platform.
          </p>

          <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed max-w-2xl">
            Operating for over 35 years in Information Technology and Business Science qualifications. Connect with fellow students, discuss module coursework, form study groups, and access embedded industry certifications.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {state.user ? (
              <Link
                to="/feed"
                id="hero-feed-btn"
                className={styles.primaryCta}
              >
                <MessageSquare className="w-4 h-4" />
                Go to Discussion Feed
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <Link
                to="/signup"
                id="hero-register-btn"
                className={styles.primaryCta}
              >
                <UserPlus className="w-4 h-4" />
                Register Now
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}

            <Link
              to="/about"
              id="hero-campuses-btn"
              className={styles.secondaryCta}
            >
              8 Campus Network & Guidelines
            </Link>
          </div>
        </div>

        {/* Bottom Red & White Accent Line */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#e52427] via-white/50 to-[#e52427]"></div>
      </section>

      {/* Tech Partnerships & Accreditations */}
      <section className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="shrink-0">
            <span className="text-[10px] font-bold text-[#e52427] uppercase tracking-wider block">
              The Richfield Advantage
            </span>
            <h3 className="text-sm font-bold text-[#003087]">
              Official Industry Technology Partnerships:
            </h3>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {TECH_PARTNERS.map((partner) => (
              <span
                key={partner}
                className="px-3 py-1.5 bg-slate-50 text-[#003087] border border-slate-200 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-2xs"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#e52427]" />
                {partner}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Highlights Section */}
      <section id="features-section" className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold text-[#003087] uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Student Community Framework
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#003087] mt-2">
            Why Use Richfield Connect?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Empowering students across Information Technology and Business Science with a distraction-free academic workspace.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {/* Feature 1: Connect with Peers */}
          <div className={styles.featureCard}>
            <div className={styles.featureAccent}></div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#003087] flex items-center justify-center mb-4 border border-blue-100">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#003087] mb-2">
              Connect with Peers
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Connect with fellow students across Bryanston, Newtown Junction, Pretoria, Centurion, Umhlanga, Musgrave, Cape Town CBD, and Polokwane campuses.
            </p>
          </div>

          {/* Feature 2: Share Academic Ideas */}
          <div className={styles.featureCard}>
            <div className={styles.featureAccent}></div>
            <div className="w-12 h-12 rounded-xl bg-red-50 text-[#e52427] flex items-center justify-center mb-4 border border-red-100">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#003087] mb-2">
              Share Academic Ideas
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Engage in technical discussions, troubleshoot programming coursework, coordinate study groups, and review curriculum modules without non-academic distractions.
            </p>
          </div>

          {/* Feature 3: Build Your Profile */}
          <div className={styles.featureCard}>
            <div className={styles.featureAccent}></div>
            <div className="w-12 h-12 rounded-xl bg-slate-100 text-[#003087] flex items-center justify-center mb-4 border border-slate-200">
              <UserCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#003087] mb-2">
              Build Your Profile
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Build your verified academic card with your student number, campus, specialisations, and bio. Track your coursework discussions and peer connections in real time.
            </p>
          </div>
        </div>
      </section>

      {/* Official Accreditation Footer Callout */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#003087] text-white flex items-center justify-center shrink-0 border-b-2 border-[#e52427]">
            <ShieldCheck className="w-6 h-6 text-[#e52427]" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#003087]">
              Council on Higher Education (CHE) & DHET Registered
            </h4>
            <p className="text-xs text-slate-600 mt-0.5">
              Registration Certificate No. 2000/HE07/008. Operating for over 35 years in South African higher education.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <Link
            to="/feed"
            className="w-full sm:w-auto text-center px-4 py-2.5 bg-[#003087] hover:bg-[#002060] text-white rounded-lg text-xs font-bold transition-colors border-b-2 border-[#e52427]"
          >
            Open Feed
          </Link>
          <a
            href="https://learning.richfield.ac.za"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto text-center px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 border border-slate-300"
          >
            <span>Moodle Portal</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>
    </div>
  );
};
