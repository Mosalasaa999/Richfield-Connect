import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { RichfieldLogo } from './RichfieldLogo';
import { 
  MessageSquare, 
  User, 
  Info, 
  UserPlus, 
  Menu, 
  X, 
  LogOut,
  LayoutDashboard
} from 'lucide-react';
import styles from './Navbar.module.css';

export const Navbar: React.FC = () => {
  const { state, logoutUser } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();

  const isUserRegistered = !!state.user;

  // Active Navlink styling using CSS Modules with official Richfield red underline
  const navLinkStyle = ({ isActive }: { isActive: boolean }) =>
    `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`;

  const mobileNavLinkStyle = ({ isActive }: { isActive: boolean }) =>
    `${styles.mobileNavLink} ${isActive ? styles.mobileNavLinkActive : ''}`;

  const handleLogout = () => {
    logoutUser();
    setShowLogoutConfirm(false);
    navigate('/');
  };

  return (
    <header className={styles.header}>
      {/* Top subtle notification bar */}
      <div className={styles.topBar}>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>Richfield Connect • Student Portal</span>
          <span className="hidden sm:inline text-slate-400">|</span>
          <span className="hidden sm:inline text-slate-400">Higher Education & Training Reg: 2000/HE07/008</span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="https://learning.richfield.ac.za"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors text-slate-300 underline"
          >
            Moodle LMS
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Official Brand Logo */}
          <Link
            to="/"
            id="nav-brand-logo"
            className="flex items-center focus:outline-none rounded-lg py-1 pr-2"
          >
            <RichfieldLogo light={true} showTagline={true} />
          </Link>

          {/* Desktop Navigation Links */}
          <nav id="desktop-navigation" className="hidden md:flex items-center h-full gap-1">
            <NavLink to="/" end className={navLinkStyle} id="nav-link-home">
              <LayoutDashboard className="w-4 h-4" />
              Home
            </NavLink>

            <NavLink to="/feed" className={navLinkStyle} id="nav-link-feed">
              <MessageSquare className="w-4 h-4" />
              Feed
            </NavLink>

            <NavLink to="/profile" className={navLinkStyle} id="nav-link-profile">
              <User className="w-4 h-4" />
              Profile
            </NavLink>

            <NavLink to="/about" className={navLinkStyle} id="nav-link-about">
              <Info className="w-4 h-4" />
              About
            </NavLink>

            {/* REQUIREMENT 3: Once signed up, the register tab should be no more! */}
            {!isUserRegistered && (
              <NavLink to="/signup" className={navLinkStyle} id="nav-link-signup">
                <UserPlus className="w-4 h-4" />
                Sign Up
              </NavLink>
            )}
          </nav>

          {/* User Status / Account Action */}
          <div className="hidden md:flex items-center gap-3">
            {isUserRegistered ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/profile"
                  id="user-profile-badge"
                  className={styles.userBadge}
                  title="View your registered profile"
                >
                  <span className="truncate max-w-[130px] font-medium">{state.user?.fullName}</span>
                  <span className={styles.userAvatar}>
                    {state.user?.fullName.charAt(0).toUpperCase()}
                  </span>
                </Link>

                <button
                  type="button"
                  onClick={() => setShowLogoutConfirm(true)}
                  id="nav-logout-btn"
                  className="text-xs text-slate-300 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                  title="Sign out"
                  aria-label="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/signup"
                id="cta-register-navbar"
                className={styles.registerCta}
              >
                <UserPlus className="w-4 h-4" />
                Register Account
              </Link>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-200 hover:text-white hover:bg-white/10 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-menu-panel" className="md:hidden bg-[#081430] px-4 pt-3 pb-5 space-y-1.5 border-t border-white/10">
          <NavLink
            to="/"
            end
            onClick={() => setMobileMenuOpen(false)}
            className={mobileNavLinkStyle}
          >
            <LayoutDashboard className="w-5 h-5" />
            Home
          </NavLink>

          <NavLink
            to="/feed"
            onClick={() => setMobileMenuOpen(false)}
            className={mobileNavLinkStyle}
          >
            <MessageSquare className="w-5 h-5" />
            Feed
          </NavLink>

          <NavLink
            to="/profile"
            onClick={() => setMobileMenuOpen(false)}
            className={mobileNavLinkStyle}
          >
            <User className="w-5 h-5" />
            Profile {isUserRegistered ? `(${state.user?.fullName})` : ''}
          </NavLink>

          <NavLink
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className={mobileNavLinkStyle}
          >
            <Info className="w-5 h-5" />
            About
          </NavLink>

          {/* REQUIREMENT 3: Register tab disappears once signed up */}
          {!isUserRegistered && (
            <NavLink
              to="/signup"
              onClick={() => setMobileMenuOpen(false)}
              className={mobileNavLinkStyle}
            >
              <UserPlus className="w-5 h-5" />
              Sign Up
            </NavLink>
          )}

          {isUserRegistered && (
            <div className="pt-3 border-t border-white/10 mt-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setShowLogoutConfirm(true);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-3 bg-white/10 text-slate-200 hover:text-white rounded-lg font-medium text-sm transition-colors"
              >
                <LogOut className="w-4 h-4 text-red-400" />
                Sign Out ({state.user?.fullName})
              </button>
            </div>
          )}
        </div>
      )}

      {/* In-App Logout Modal Dialog (never window.confirm) */}
      {showLogoutConfirm && (
        <div className={styles.modalOverlay}>
          <div className={`${styles.modalCard} space-y-4 animate-fade-in`}>
            <h3 className="text-base font-bold text-[#0c1e47]">
              Confirm Sign Out
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to sign out? Your profile data is safely stored in your browser's local storage and can be restored.
            </p>
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setShowLogoutConfirm(false)}
                className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="px-4 py-1.5 text-xs font-bold bg-[#e52427] hover:bg-[#c9181b] text-white rounded-lg transition-colors cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
