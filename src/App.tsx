import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { SignUp } from './pages/SignUp';
import { Profile } from './pages/Profile';
import { Feed } from './pages/Feed';
import styles from './App.module.css';

export default function App() {
  return (
    <AppProvider>
      <div className={`min-h-screen flex flex-col antialiased selection:bg-[#0c1e47] selection:text-white ${styles.appContainer}`}>
        {/* Persistent Navigation Bar across all views with official Richfield branding */}
        <Navbar />

        {/* Main Routed Page Content */}
        <main className={`flex-1 w-full pt-6 sm:pt-8 ${styles.mainContent}`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/feed" element={<Feed />} />
            {/* Catch-all route gracefully returning to Home */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        {/* Persistent Institutional Footer across all views */}
        <Footer />
      </div>
    </AppProvider>
  );
}
