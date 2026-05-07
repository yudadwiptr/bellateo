import React from 'react';
import { motion } from 'framer-motion';
import data from '../../data/config.json';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function SlideHero({ isActive }) {
  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative', overflow: 'hidden',
      backgroundImage: `url(${data.thumbnail_image_url})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center 20%',
    }}>
      {/* Cinematic dark overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.7) 70%, #000 100%)',
      }} />

      {/* Content */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '0 24px', textAlign: 'center',
      }}>
        {/* NIKAHFIX logo */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isActive ? 'visible' : 'hidden'}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <img src="/images/NIKAHFIX.webp" alt="NIKAHFIX" width={80} height={22}
            style={{ filter: 'brightness(1.6) contrast(1.1)', marginBottom: 24 }} />
        </motion.div>

        {/* Decorative line */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isActive ? 'visible' : 'hidden'}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ width: 60, height: 1, background: 'rgba(255,255,255,0.4)', marginBottom: 20 }}
        />

        {/* Names */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate={isActive ? 'visible' : 'hidden'}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{
            fontFamily: "'Cinzel', serif",
            fontWeight: 700,
            fontSize: 'clamp(2rem, 8vw, 3rem)',
            letterSpacing: '0.04em',
            color: '#fff',
            marginBottom: 8,
            textShadow: '0 4px 20px rgba(0,0,0,0.8)',
          }}
        >
          {data.pegantin.wanita.panggilan} &amp; {data.pegantin.pria.panggilan}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={isActive ? 'visible' : 'hidden'}
          transition={{ duration: 0.6, delay: 0.45 }}
          style={{
            color: 'rgba(255,255,255,0.75)',
            fontSize: '0.8rem',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            marginBottom: 28,
          }}
        >
          Countdown to Forever
        </motion.p>

        {/* Date badge */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isActive ? 'visible' : 'hidden'}
          transition={{ duration: 0.6, delay: 0.55 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            background: 'rgba(229,9,19,0.15)',
            border: '1px solid rgba(229,9,19,0.5)',
            borderRadius: 999, padding: '6px 18px',
            color: '#fff', fontSize: '0.75rem', letterSpacing: '0.12em',
          }}
        >
          <span style={{ color: '#E50913', fontSize: 8 }}>●</span>
          Sunday · 17 May<span style={{ fontSize: '0.65em', verticalAlign: 'super', marginLeft: '1px' }}>th</span> 2026
          <span style={{ color: '#E50913', fontSize: 8 }}>●</span>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isActive ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        style={{
          position: 'absolute', bottom: 28, left: 0, right: 0,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
        }}
      >
        <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          Scroll to explore
        </span>
        <motion.div animate={{ y: [0, 7, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}
