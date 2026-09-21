import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { RichfieldLogo } from './RichfieldLogo';
import { MapPin, Mail, Phone, ExternalLink, ShieldCheck } from 'lucide-react';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  const { state } = useApp();
  const isRegistered = !!state.user;

  return (
    <footer id="main-footer" className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Institution Info */}
          <div className="md:col-span-1">
            <div className="mb-3">
              <RichfieldLogo light={true} showTagline={true} />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Richfield Graduate Institute of Technology (Pty) Ltd. Council on Higher Education (CHE) accredited private higher education institution in South Africa. Operating for over 35 years.
            </p>
            <p className={styles.accreditationBadge}>
              <ShieldCheck className="w-3.5 h-3.5 text-[#e52427]" />
              DHET Reg: 2000/HE07/008
            </p>
          </div>

          {/* Academic Portal Links */}
          <div>
            <h4 className={styles.sectionTitle}>
              Platform Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className={styles.linkItem}>
                  Home Portal
                </Link>
              </li>
              <li>
                <Link to="/feed" className={styles.linkItem}>
                  Academic Discussion Feed
                </Link>
              </li>
              <li>
                <Link to="/profile" className={styles.linkItem}>
                  Student Academic Profile
                </Link>
              </li>
              <li>
                <Link to="/about" className={styles.linkItem}>
                  8 Campuses & Guidelines
                </Link>
              </li>
              {!isRegistered && (
                <li>
                  <Link to="/signup" className="text-[#e52427] hover:text-red-400 font-bold transition-colors">
                    Student Registration
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* 8 Official Campuses Nationwide (Image 1) */}
          <div>
            <h4 className={styles.sectionTitle}>
              8 Premium Campuses
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-[#e52427] shrink-0" />
                <span>Bryanston (Sandton), Gauteng</span>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-[#e52427] shrink-0" />
                <span>Newtown Junction, Gauteng</span>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-[#e52427] shrink-0" />
                <span>Centurion & Pretoria, Gauteng</span>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-[#e52427] shrink-0" />
                <span>Umhlanga & Musgrave, KZN</span>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-[#e52427] shrink-0" />
                <span>Cape Town, Western Cape</span>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-[#e52427] shrink-0" />
                <span>Polokwane, Limpopo</span>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
                <span>Distance / Online Learning</span>
              </li>
            </ul>
          </div>

          {/* Contact & LMS */}
          <div>
            <h4 className={styles.sectionTitle}>
              Student Inquiries
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <p className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#e52427]" />
                Toll-free: 0861 321 321
              </p>
              <a 
                href="mailto:info@richfield.ac.za" 
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#e52427]" />
                info@richfield.ac.za
              </a>
              <a
                href="https://learning.richfield.ac.za"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-slate-300 hover:text-white mt-1 underline"
              >
                Moodle Platform: learning.richfield.ac.za <ExternalLink className="w-3 h-3" />
              </a>
              <p className="text-[11px] text-slate-500 pt-2">
                Tech Partnerships: IBM, AWS Academy, Cisco, Oracle, Salesforce, CIMA & Microsoft.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <p>© {new Date().getFullYear()} Richfield Graduate Institute of Technology (Pty) Ltd. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Richfield Connect Academic Network</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
