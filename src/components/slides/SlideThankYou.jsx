import React from 'react';
import { motion } from 'framer-motion';
import data from '../../data/config.json';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

export default function SlideThankYou({ isActive }) {
  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative', overflow: 'hidden',
      backgroundImage: 'url(/images/foto_1.jpg)',
      backgroundSize: 'cover', backgroundPosition: 'center 20%',
    }}>
      {/* Heavy dark overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.85) 85%, #000 100%)',
      }} />

      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '0 28px', textAlign: 'center', gap: 20,
      }}>
        {/* Heart */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isActive ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.1 }}
          style={{ fontSize: '2.5rem', lineHeight: 1 }}
        >
          🤍
        </motion.div>

        {/* Thank You */}
        <motion.h2
          variants={fadeUp} initial="hidden"
          animate={isActive ? 'visible' : 'hidden'}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: 'clamp(2rem, 8vw, 2.8rem)',
            fontWeight: 700, color: '#fff',
            letterSpacing: '0.06em',
            textShadow: '0 4px 20px rgba(0,0,0,0.8)',
          }}
        >
          Thank You
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp} initial="hidden"
          animate={isActive ? 'visible' : 'hidden'}
          transition={{ duration: 0.6, delay: 0.45 }}
          style={{
            color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem',
            lineHeight: 1.7, maxWidth: 280,
            textAlign: 'center',
          }}
        >
          For your prayers, blessings, and presence in our special day. Your love means the world to us.
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ width: 0 }} animate={isActive ? { width: 60 } : { width: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{ height: 1, background: 'rgba(229,9,19,0.6)' }}
        />

        {/* Names */}
        <motion.p
          variants={fadeUp} initial="hidden"
          animate={isActive ? 'visible' : 'hidden'}
          transition={{ duration: 0.6, delay: 0.7 }}
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: '1.2rem', fontWeight: 700,
            color: '#fff', letterSpacing: '0.05em',
          }}
        >
          {data.pegantin.wanita.panggilan} &amp; {data.pegantin.pria.panggilan}
        </motion.p>

        {/* Date */}
        <motion.p
          variants={fadeUp} initial="hidden"
          animate={isActive ? 'visible' : 'hidden'}
          transition={{ duration: 0.5, delay: 0.8 }}
          style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.72rem', letterSpacing: '0.18em' }}
        >
          17 · 05 · 2026
        </motion.p>
      </div>

      {/* NIKAHFIX watermark at bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isActive ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        style={{
          position: 'absolute', bottom: 24, left: 0, right: 0,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
        }}
      >
        <img src="/images/NIKAHFIX.webp" alt="NIKAHFIX" width={60} height={16}
          style={{ filter: 'brightness(0.6)', opacity: 0.6 }} />
        <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.6rem', letterSpacing: '0.15em' }}>
          © 2026 · Made with ♥ by Yuma Studio
        </p>
      </motion.div>
    </div>
  );
}
