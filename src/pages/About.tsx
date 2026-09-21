import React from 'react';
import { OFFICIAL_CAMPUSES } from '../constants/campuses';
import { 
  ShieldAlert, 
  CheckCircle, 
  Mail, 
  MapPin, 
  Phone, 
  GraduationCap, 
  Building,
  Award,
  ExternalLink
} from 'lucide-react';
import styles from './About.module.css';

export const About: React.FC = () => {
  return (
    <div className={`${styles.aboutContainer} animate-fade-in`}>
      {/* Title & Header */}
      <div className={styles.headerSection}>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-white bg-[#003087] px-2.5 py-0.5 rounded uppercase tracking-wider">
            Institutional Profile
          </span>
          <span className="text-[11px] font-bold text-[#e52427] bg-red-50 border border-red-200 px-2.5 py-0.5 rounded uppercase tracking-wider">
            DHET Reg: 2000/HE07/008
          </span>
        </div>
        <h1 className={styles.pageTitle}>
          About Richfield Connect
        </h1>
        <p className="text-sm text-slate-600 mt-1 leading-relaxed">
          The verified academic collaboration network for Richfield Graduate Institute of Technology (Pty) Ltd. Operating for over 35 years in South Africa.
        </p>
      </div>

      {/* Official Institutional Overview */}
      <section id="statement-of-purpose" className={styles.sectionCard}>
        <div className="flex items-center gap-3 text-[#003087]">
          <GraduationCap className="w-6 h-6 text-[#e52427]" />
          <h2 className="text-xl font-bold text-[#003087]">
            Institutional Accreditation & Statement of Purpose
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          Richfield is a registered, <strong>Council on Higher Education (CHE)</strong> accredited private higher education institution in South Africa. Operating for over 35 years, Richfield specializes in <strong>Information Technology (IT)</strong> and <strong>Business Commerce</strong> qualifications, offering both on-campus learning and comprehensive distance/online learning portfolios.
        </p>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          Richfield Connect functions as the student engagement social layer, giving learners across all 8 national campuses a unified, distraction-free environment to collaborate, solve coding problems, exchange study notes, and build verified academic profiles.
        </p>
      </section>

      {/* 8 Official Campuses Nationwide */}
      <section id="official-campuses-network" className={styles.sectionCard}>
        <div className="flex items-center gap-3">
          <Building className="w-6 h-6 text-[#003087]" />
          <div>
            <h2 className="text-xl font-bold text-[#003087]">
              Campus Network & Online Learning (8 Premium Campuses)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Richfield features 8 premium campuses nationwide alongside a highly developed digital learning framework:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
          {OFFICIAL_CAMPUSES.map((campus) => (
            <div
              key={campus.id}
              className={styles.campusItem}
            >
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-xs font-bold text-[#003087]">{campus.name}</h4>
                <span className="text-[10px] font-semibold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                  {campus.province}
                </span>
              </div>
              <p className="text-[11px] text-slate-600 flex items-start gap-1.5 mt-1">
                <MapPin className="w-3.5 h-3.5 text-[#e52427] shrink-0 mt-0.5" />
                <span>{campus.address}</span>
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Academic Programmes & Tech Partnerships */}
      <section className={styles.sectionCard}>
        <div className="flex items-center gap-3 text-[#003087]">
          <Award className="w-6 h-6 text-[#e52427]" />
          <h2 className="text-xl font-bold text-[#003087]">
            Academic Programmes & Global Tech Partnerships
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
            <h4 className="text-xs font-bold text-[#003087] uppercase tracking-wider">
              Undergraduate Degrees
            </h4>
            <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
              <li>BSc in Information Technology</li>
              <li>Bachelor of Commerce (BCom)</li>
              <li>BCom AGA (Accounting General)</li>
              <li>Bachelor of Public Management</li>
            </ul>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
            <h4 className="text-xs font-bold text-[#003087] uppercase tracking-wider">
              Postgraduate Qualifications
            </h4>
            <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
              <li>BSc IT (Honours)</li>
              <li>100% Online MBA</li>
            </ul>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
            <h4 className="text-xs font-bold text-[#003087] uppercase tracking-wider">
              Diplomas & Certificates
            </h4>
            <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
              <li>Diploma in IT (Web Tech 512)</li>
              <li>Higher Certificates & Bridging</li>
            </ul>
          </div>
        </div>

        {/* Global Tech Certifications */}
        <div className="p-4 bg-blue-50/50 rounded-lg border border-blue-100">
          <h4 className="text-xs font-bold text-[#003087] mb-1">
            Embedded Industry Certifications & Badges:
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed mb-2">
            Richfield integrates Work-Integrated Learning (WIL) and partnerships with global tech leaders. While earning their qualification, students graduate with embedded industry badges from:
          </p>
          <div className="flex flex-wrap gap-2">
            {['IBM', 'AWS Academy', 'Cisco', 'Oracle', 'Salesforce', 'CIMA & Microsoft'].map((partner) => (
              <span key={partner} className="px-2.5 py-1 bg-white text-[#003087] border border-blue-200 rounded text-xs font-bold shadow-2xs">
                {partner}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Community Guidelines (Min 5 required as a list) */}
      <section id="community-guidelines" className={styles.sectionCard}>
        <div className="flex items-center gap-3 text-[#003087]">
          <ShieldAlert className="w-6 h-6 text-[#e52427]" />
          <h2 className="text-xl font-bold text-[#003087]">
            Community Guidelines & Academic Code of Conduct
          </h2>
        </div>
        <p className="text-xs text-slate-500">
          All registered students must strictly adhere to the following standards to ensure an authentic learning environment:
        </p>

        <ul className="space-y-3 list-none">
          <li className={styles.guidelineCard}>
            <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
            <div className="text-xs text-slate-700 leading-relaxed">
              <strong className="text-slate-900 block mb-0.5">1. Academic Integrity & Originality:</strong>
              Students must not post plagiarized assignment solutions or ask peers to complete assessments on their behalf. Discussion should focus on understanding core theoretical principles and debugging concepts.
            </div>
          </li>

          <li className={styles.guidelineCard}>
            <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
            <div className="text-xs text-slate-700 leading-relaxed">
              <strong className="text-slate-900 block mb-0.5">2. Respectful & Professional Communication:</strong>
              All contributions, questions, and replies must maintain a courteous, professional tone. Defamatory, abusive, discriminatory, or harassing language will result in immediate profile deactivation.
            </div>
          </li>

          <li className={styles.guidelineCard}>
            <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
            <div className="text-xs text-slate-700 leading-relaxed">
              <strong className="text-slate-900 block mb-0.5">3. Constructive Collaboration:</strong>
              Critiques of code or academic perspectives should be constructive and evidence-based. Share learning resources, official documentation links, and textbook references to assist peers.
            </div>
          </li>

          <li className={styles.guidelineCard}>
            <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
            <div className="text-xs text-slate-700 leading-relaxed">
              <strong className="text-slate-900 block mb-0.5">4. Privacy & Confidentiality Protection:</strong>
              Never publish sensitive private credentials, including test passwords, personal national identification numbers, or student banking details in discussion feeds or bios.
            </div>
          </li>

          <li className={styles.guidelineCard}>
            <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
            <div className="text-xs text-slate-700 leading-relaxed">
              <strong className="text-slate-900 block mb-0.5">5. Respect for Intellectual Property:</strong>
              Acknowledge authors when quoting research or third-party code libraries. Do not distribute copyrighted textbook scans or restricted institutional assessment papers without authorization.
            </div>
          </li>
        </ul>
      </section>

      {/* Official Contacts */}
      <section id="contact-information" className={styles.sectionCard}>
        <div className="flex items-center gap-3 text-[#003087]">
          <Mail className="w-6 h-6 text-[#e52427]" />
          <h2 className="text-xl font-bold text-[#003087]">
            Institutional Contact & Admissions Information
          </h2>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          For technical portal inquiries or enrollment details with Richfield:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-lg bg-blue-50/60 border border-blue-100 space-y-2">
            <h3 className="text-xs font-bold text-[#003087] uppercase tracking-wider">
              Richfield Head Office & Student Support
            </h3>
            <p className="text-xs text-slate-700 flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#003087]" />
              info@richfield.ac.za
            </p>
            <p className="text-xs text-slate-700 flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#003087]" />
              Toll-Free: 0861 321 321
            </p>
            <p className="text-xs text-slate-700 flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-[#003087]" />
              Website: www.richfield.ac.za
            </p>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Digital Learning Portal (Moodle)
            </h3>
            <p className="text-xs text-slate-700">
              Access coursework, virtual lectures, tutorial tracking, and digital badges at:
            </p>
            <a
              href="https://learning.richfield.ac.za"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#003087] hover:text-[#e52427] underline"
            >
              learning.richfield.ac.za
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
