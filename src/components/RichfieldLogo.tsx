import React from 'react';
import styles from './RichfieldLogo.module.css';

interface RichfieldLogoProps {
  className?: string;
  showTagline?: boolean;
  light?: boolean;
}

export const RichfieldLogo: React.FC<RichfieldLogoProps> = ({
  className = 'h-10',
  showTagline = true,
  light = true,
}) => {
  return (
    <div className={`${styles.logoContainer} ${className}`}>
      {/* Official-style Shield Emblem with Red Flame/Torch */}
      <div className={styles.emblemWrapper}>
        <svg
          viewBox="0 0 40 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Outer Shield Outline */}
          <path
            d="M20 2L37 8V24C37 35.5 29.5 43.5 20 46C10.5 43.5 3 35.5 3 24V8L20 2Z"
            fill="#0c1e47"
            stroke="#ffffff"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Inner Red Torch / Shield Accent */}
          <path
            d="M20 8L33 13V24C33 33 27 39.5 20 42C13 39.5 7 33 7 24V13L20 8Z"
            fill="#162f6b"
          />
          {/* Richfield Red Flame / Torch Emblem */}
          <path
            d="M20 12C20 12 24.5 16 24.5 20C24.5 22.5 22.5 24.5 20 24.5C17.5 24.5 15.5 22.5 15.5 20C15.5 16 20 12 20 12Z"
            fill="#e52427"
          />
          {/* Torch Base / Academic Pillars */}
          <path
            d="M17 25H23V34L20 36L17 34V25Z"
            fill="#ffffff"
          />
          <line x1="15" y1="36" x2="25" y2="36" stroke="#ffffff" strokeWidth="1.5" />
          <line x1="16" y1="38" x2="24" y2="38" stroke="#ffffff" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Typography */}
      <div className={styles.textGroup}>
        <span
          className={`${styles.brandName} ${
            light ? styles.brandNameLight : styles.brandNameDark
          }`}
        >
          RICHFIELD
        </span>
        {showTagline && (
          <span
            className={`${styles.tagline} ${
              light ? styles.taglineLight : styles.taglineDark
            }`}
          >
            A learning experience of a lifetime
          </span>
        )}
      </div>
    </div>
  );
};
