import React from 'react';
import { SignUpForm } from '../components/SignUpForm';
import styles from './SignUp.module.css';

export const SignUp: React.FC = () => {
  return (
    <div className={styles.signUpContainer}>
      <div className={styles.innerWrap}>
        <SignUpForm />
      </div>
    </div>
  );
};
