import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ProfilePreview } from './ProfilePreview';
import { OFFICIAL_CAMPUSES } from '../constants/campuses';
import { 
  CheckCircle2, 
  AlertCircle, 
  Lock, 
  Mail, 
  User, 
  Hash, 
  Building, 
  FileEdit,
  ArrowRight
} from 'lucide-react';
import styles from './SignUpForm.module.css';

const INTEREST_OPTIONS = [
  'Programming',
  'UI/UX Design',
  'Data Science',
  'Networking',
  'Cybersecurity',
];

interface FormErrors {
  fullName?: string;
  studentNumber?: string;
  campus?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  interests?: string;
  bio?: string;
  termsAccepted?: string;
}

export const SignUpForm: React.FC = () => {
  const navigate = useNavigate();
  const { state, registerUser } = useApp();
  const redirectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (redirectTimerRef.current) {
        clearTimeout(redirectTimerRef.current);
      }
    };
  }, []);

  // Controlled form state: campus and interests start empty so validations are testable
  const [formData, setFormData] = useState({
    fullName: state.user?.fullName || '',
    studentNumber: state.user?.studentNumber || '',
    campus: state.user?.campus || '',
    email: state.user?.email || '',
    password: '',
    confirmPassword: '',
    interests: state.user?.interests || [],
    bio: state.user?.bio || '',
    termsAccepted: state.user ? true : false,
  });

  // Inline errors state
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Field-level validator
  const validateField = (name: string, value: any, currentFormData = formData): string | undefined => {
    switch (name) {
      case 'fullName':
        if (!String(value).trim()) return 'Full Name is required.';
        if (String(value).trim().length < 3) return 'Full Name must be at least 3 characters.';
        return undefined;

      case 'studentNumber': {
        const strVal = String(value).trim();
        if (!strVal) return 'Student Number is required.';
        if (!/^\d+$/.test(strVal)) return 'Student Number must contain numeric digits only.';
        if (strVal.length < 6) return 'Student Number must be at least 6 digits long.';
        return undefined;
      }

      case 'campus':
        if (!value) return 'Please select an accredited Richfield campus.';
        return undefined;

      case 'email': {
        const emailVal = String(value).trim();
        if (!emailVal) return 'Institutional email is required.';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailVal)) {
          return 'Please provide a valid email address (e.g. name@student.richfield.ac.za).';
        }
        return undefined;
      }

      case 'password':
        if (!value) return 'Password is required.';
        if (String(value).length < 8) return 'Password must be at least 8 characters in length.';
        return undefined;

      case 'confirmPassword':
        if (!value) return 'Please confirm your password.';
        if (value !== currentFormData.password) return 'Passwords do not match.';
        return undefined;

      case 'interests':
        if (!Array.isArray(value) || value.length === 0) {
          return 'Please select at least one academic interest.';
        }
        return undefined;

      case 'bio':
        if (!String(value).trim()) return 'Academic biography is required.';
        if (String(value).trim().length < 20) {
          return `Bio must be at least 20 characters (currently ${String(value).trim().length}/20).`;
        }
        return undefined;

      case 'termsAccepted':
        if (!value) return 'You must accept the Richfield academic integrity terms and conditions.';
        return undefined;

      default:
        return undefined;
    }
  };

  // Shared onChange handler for text/select/textarea
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    let nextValue: any = value;

    if (type === 'checkbox') {
      nextValue = (e.target as HTMLInputElement).checked;
    }

    const updatedFormData = {
      ...formData,
      [name]: nextValue,
    };
    setFormData(updatedFormData);

    // Auto-clear or update error if already touched
    if (touched[name]) {
      const errorMsg = validateField(name, nextValue, updatedFormData);
      setErrors((prev) => ({
        ...prev,
        [name]: errorMsg,
      }));
    }
  };

  // Checkbox group handler for interests
  const handleInterestToggle = (interest: string) => {
    const currentInterests = formData.interests;
    let nextInterests: string[];

    if (currentInterests.includes(interest)) {
      nextInterests = currentInterests.filter((item) => item !== interest);
    } else {
      nextInterests = [...currentInterests, interest];
    }

    const updated = { ...formData, interests: nextInterests };
    setFormData(updated);

    if (touched.interests) {
      const err = validateField('interests', nextInterests, updated);
      setErrors((prev) => ({ ...prev, interests: err }));
    }
  };

  // Blur handler for real-time validation
  const handleBlur = (fieldName: string) => {
    setTouched((prev) => ({ ...prev, [fieldName]: true }));
    const errorMsg = validateField(
      fieldName,
      formData[fieldName as keyof typeof formData],
      formData
    );
    setErrors((prev) => ({
      ...prev,
      [fieldName]: errorMsg,
    }));
  };

  // Full validation on submission
  const validateAll = (): boolean => {
    const newErrors: FormErrors = {};
    const fields = [
      'fullName',
      'studentNumber',
      'campus',
      'email',
      'password',
      'confirmPassword',
      'interests',
      'bio',
      'termsAccepted',
    ];

    let hasErrors = false;
    fields.forEach((field) => {
      const err = validateField(
        field,
        formData[field as keyof typeof formData],
        formData
      );
      if (err) {
        newErrors[field as keyof FormErrors] = err;
        hasErrors = true;
      }
    });

    setErrors(newErrors);
    const allTouched: Record<string, boolean> = {};
    fields.forEach((f) => (allTouched[f] = true));
    setTouched(allTouched);

    return !hasErrors;
  };

  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Intercept browser reload

    if (!validateAll()) {
      return;
    }

    // Deliberately omit password and confirmPassword: raw passwords must never be stored in client state or localStorage (§5.4)
    const profileToSave = {
      fullName: formData.fullName.trim(),
      studentNumber: formData.studentNumber.trim(),
      campus: formData.campus,
      email: formData.email.trim(),
      interests: formData.interests,
      bio: formData.bio.trim(),
      termsAccepted: formData.termsAccepted,
      registeredAt: new Date().toISOString(),
    };

    registerUser(profileToSave);
    setSubmitSuccess(true);

    redirectTimerRef.current = setTimeout(() => {
      navigate('/profile');
    }, 600);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Registration Form Column */}
      <div className={`lg:col-span-7 ${styles.formCard}`}>
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <span className={styles.portalBadge}>
              Richfield Portal
            </span>
            <span className={styles.verifiedBadge}>
              Verified Admission
            </span>
          </div>
          <h2 className={styles.formTitle}>
            Student Account Registration
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            Create your academic profile to connect with peers, access module discussions, and collaborate across Richfield's 8 national campuses and online learning platform.
          </p>
        </div>

        {submitSuccess && (
          <div className="mb-6 p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-3 animate-fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <p className="font-bold text-sm">Registration Complete!</p>
              <p className="text-xs text-emerald-700">Redirecting directly to your active student profile...</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-4" id="student-registration-form">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Full Name <span className="text-[#e52427]">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleInputChange}
                onBlur={() => handleBlur('fullName')}
                placeholder="e.g. Ayanda Courtney Mabale"
                className={`w-full pl-9 pr-3 py-2 text-sm bg-slate-50 rounded-lg border richfield-input-focus ${
                  errors.fullName ? 'border-red-400 bg-red-50/30' : 'border-slate-300'
                }`}
              />
            </div>
            {errors.fullName && (
              <p className="text-xs text-[#e52427] mt-1 flex items-center gap-1 animate-fade-in" id="error-fullName">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                {errors.fullName}
              </p>
            )}
          </div>

          {/* Student Number & Official Campus Dropdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Student Number */}
            <div>
              <label htmlFor="studentNumber" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Student Number <span className="text-[#e52427]">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Hash className="w-4 h-4" />
                </div>
                <input
                  id="studentNumber"
                  name="studentNumber"
                  type="text"
                  value={formData.studentNumber}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur('studentNumber')}
                  placeholder="e.g. 2026119"
                  maxLength={10}
                  className={`w-full pl-9 pr-3 py-2 text-sm bg-slate-50 rounded-lg border richfield-input-focus ${
                    errors.studentNumber ? 'border-red-400 bg-red-50/30' : 'border-slate-300'
                  }`}
                />
              </div>
              {errors.studentNumber && (
                <p className="text-xs text-[#e52427] mt-1 flex items-center gap-1 animate-fade-in" id="error-studentNumber">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {errors.studentNumber}
                </p>
              )}
            </div>

            {/* Official Campus Selection */}
            <div>
              <label htmlFor="campus" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Official Campus <span className="text-[#e52427]">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Building className="w-4 h-4" />
                </div>
                <select
                  id="campus"
                  name="campus"
                  value={formData.campus}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur('campus')}
                  className={`w-full pl-9 pr-3 py-2 text-sm bg-slate-50 rounded-lg border richfield-input-focus ${
                    errors.campus ? 'border-red-400 bg-red-50/30' : 'border-slate-300'
                  }`}
                >
                  <option value="">Select your campus</option>
                  {OFFICIAL_CAMPUSES.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name} ({c.province})
                    </option>
                  ))}
                </select>
              </div>
              {errors.campus && (
                <p className="text-xs text-[#e52427] mt-1 flex items-center gap-1 animate-fade-in" id="error-campus">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {errors.campus}
                </p>
              )}
            </div>
          </div>

          {/* Email Address */}
          <div>
            <label htmlFor="email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Email Address <span className="text-[#e52427]">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                onBlur={() => handleBlur('email')}
                placeholder="student@richfield.ac.za"
                className={`w-full pl-9 pr-3 py-2 text-sm bg-slate-50 rounded-lg border richfield-input-focus ${
                  errors.email ? 'border-red-400 bg-red-50/30' : 'border-slate-300'
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-[#e52427] mt-1 flex items-center gap-1 animate-fade-in" id="error-email">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                {errors.email}
              </p>
            )}
          </div>

          {/* Passwords in 2 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="password" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Password <span className="text-[#e52427]">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur('password')}
                  placeholder="Min 8 characters"
                  className={`w-full pl-9 pr-3 py-2 text-sm bg-slate-50 rounded-lg border richfield-input-focus ${
                    errors.password ? 'border-red-400 bg-red-50/30' : 'border-slate-300'
                  }`}
                />
              </div>
              {errors.password && (
                <p className="text-xs text-[#e52427] mt-1 flex items-center gap-1 animate-fade-in" id="error-password">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {errors.password}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Confirm Password <span className="text-[#e52427]">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur('confirmPassword')}
                  placeholder="Re-enter password"
                  className={`w-full pl-9 pr-3 py-2 text-sm bg-slate-50 rounded-lg border richfield-input-focus ${
                    errors.confirmPassword ? 'border-red-400 bg-red-50/30' : 'border-slate-300'
                  }`}
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-xs text-[#e52427] mt-1 flex items-center gap-1 animate-fade-in" id="error-confirmPassword">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          {/* Academic Interests (Min 5 checkbox options) */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Academic Interests / Modules <span className="text-[#e52427]">* (Select at least one)</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-3 bg-slate-50 rounded-lg border border-slate-200">
              {INTEREST_OPTIONS.map((interest) => {
                const checked = formData.interests.includes(interest);
                return (
                  <label
                    key={interest}
                    className={`flex items-center gap-2.5 p-2 rounded cursor-pointer transition-colors text-xs ${
                      checked
                        ? 'bg-blue-50 text-[#003087] font-bold border border-blue-200'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => handleInterestToggle(interest)}
                      className="rounded text-[#003087] focus:ring-[#003087] w-4 h-4"
                    />
                    <span>{interest}</span>
                  </label>
                );
              })}
            </div>
            {errors.interests && (
              <p className="text-xs text-[#e52427] mt-1 flex items-center gap-1 animate-fade-in" id="error-interests">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                {errors.interests}
              </p>
            )}
          </div>

          {/* Short Bio (textarea, min 20 chars) */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="bio" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Academic Biography <span className="text-[#e52427]">* (Min 20 characters)</span>
              </label>
              <span className={`text-[11px] font-mono ${
                formData.bio.trim().length >= 20 ? 'text-emerald-600 font-bold' : 'text-slate-400'
              }`}>
                {formData.bio.trim().length}/20 chars
              </span>
            </div>
            <textarea
              id="bio"
              name="bio"
              rows={3}
              value={formData.bio}
              onChange={handleInputChange}
              onBlur={() => handleBlur('bio')}
              placeholder="Describe your programme (e.g. BSc in IT), module focus, and academic interests..."
              className={`w-full p-3 text-sm bg-slate-50 rounded-lg border richfield-input-focus ${
                errors.bio ? 'border-red-400 bg-red-50/30' : 'border-slate-300'
              }`}
            />
            {errors.bio && (
              <p className="text-xs text-[#e52427] mt-1 flex items-center gap-1 animate-fade-in" id="error-bio">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                {errors.bio}
              </p>
            )}
          </div>

          {/* Terms & Conditions */}
          <div className="pt-1">
            <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-700 leading-relaxed">
              <input
                id="termsAccepted"
                name="termsAccepted"
                type="checkbox"
                checked={formData.termsAccepted}
                onChange={handleInputChange}
                onBlur={() => handleBlur('termsAccepted')}
                className="mt-0.5 rounded text-[#003087] focus:ring-[#003087] w-4 h-4"
              />
              <span>
                I agree to the <strong>Richfield Graduate Institute Code of Academic Conduct & Online Ethics</strong>. I verify that all registration credentials are authentic.
              </span>
            </label>
            {errors.termsAccepted && (
              <p className="text-xs text-[#e52427] mt-1 flex items-center gap-1 animate-fade-in" id="error-termsAccepted">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                {errors.termsAccepted}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              id="btn-register-submit"
              className={`w-full sm:w-auto shadow-sm hover:shadow transition-all smooth-interactive ${styles.submitButton}`}
            >
              Submit Registration
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>

      {/* Live Profile Preview Column */}
      <div className="lg:col-span-5">
        <div className="mb-2">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <FileEdit className="w-4 h-4 text-[#003087]" />
            Real-Time Student Card Preview
          </h3>
          <p className="text-[11px] text-slate-500">
            Updated live via React props as you type.
          </p>
        </div>

        <ProfilePreview
          fullName={formData.fullName}
          studentNumber={formData.studentNumber}
          campus={formData.campus}
          email={formData.email}
          interests={formData.interests}
          bio={formData.bio}
        />
      </div>
    </div>
  );
};
