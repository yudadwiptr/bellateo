import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const WEDDING_DATE = new Date('2026-05-17T10:00:00+07:00');

function useCountdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const calc = () => {
      const diff = WEDDING_DATE - new Date();
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    };
    calc();
    const t = setInterval(calc, 1000);
    return () => clearInterval(t);
  }, []);
  return timeLeft;
}

const TimeBox = ({ value, label, delay, isActive }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
    transition={{ duration: 0.5, delay }}
    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}
  >
    <div style={{
      background: '#1F1F1F',
      borderRadius: 8, width: 72, height: 72,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '2.2rem', fontWeight: 700, color: '#fff',
      fontFamily: "'Inter', 'Helvetica', sans-serif",
      fontVariantNumeric: 'tabular-nums',
      boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
    }}>
      {String(value).padStart(2, '0')}
    </div>
    <span style={{
      color: '#B3B3B3', fontSize: '0.65rem',
      letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600
    }}>
      {label}
    </span>
  </motion.div>
);

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

export default function SlideCountdown({ isActive }) {
  const { days, hours, minutes, seconds } = useCountdown();

  return (
    <div style={{
      width: '100%', height: '100%', background: '#050505',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '0 28px', textAlign: 'center', gap: 32,
    }}>
      {/* Red glow circle behind */}
      <div style={{
        position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)',
        width: 300, height: 300, borderRadius: '50%',
        background: 'radial-gradient(ellipse at center, rgba(229,9,19,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Label */}
      <motion.p
        variants={fadeUp} initial="hidden"
        animate={isActive ? 'visible' : 'hidden'}
        transition={{ duration: 0.4, delay: 0.1 }}
        style={{ color: '#B3B3B3', fontSize: '0.6rem', letterSpacing: '0.4em', textTransform: 'uppercase' }}
      >
        Save The Date
      </motion.p>

      {/* Title */}
      <motion.h2
        variants={fadeUp} initial="hidden"
        animate={isActive ? 'visible' : 'hidden'}
        transition={{ duration: 0.55, delay: 0.2 }}
        style={{
          fontFamily: "'Cinzel', serif", fontSize: 'clamp(1rem, 4.5vw, 1.4rem)',
          fontWeight: 700, color: '#fff', letterSpacing: '0.04em', lineHeight: 1.5,
          textShadow: '0 2px 10px rgba(0,0,0,0.5)',
          maxWidth: 300,
        }}
      >
        Almost Time For Our Celebration
      </motion.h2>

      {/* Countdown boxes */}
      <div style={{ display: 'flex', gap: 14, justifyContent: 'center' }}>
        <TimeBox value={days}    label="Days"    delay={0.3} isActive={isActive} />
        <TimeBox value={hours}   label="Hours"   delay={0.4} isActive={isActive} />
        <TimeBox value={minutes} label="Mins"    delay={0.5} isActive={isActive} />
        <TimeBox value={seconds} label="Secs"    delay={0.6} isActive={isActive} />
      </div>

      {/* Date */}
      <motion.p
        variants={fadeUp} initial="hidden"
        animate={isActive ? 'visible' : 'hidden'}
        transition={{ duration: 0.5, delay: 0.75 }}
        style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', letterSpacing: '0.12em' }}
      >
        Sunday · 17 May 2026 · 10.00 WIB
      </motion.p>

      {/* Add to Calendar */}
      <motion.button
        variants={fadeUp} initial="hidden"
        animate={isActive ? 'visible' : 'hidden'}
        transition={{ duration: 0.5, delay: 0.85 }}
        onClick={() => {
          const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('Wedding of Bella & Teo')}&dates=20260517T030000Z/20260517T070000Z`;
          window.open(url, '_blank');
        }}
        style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          background: 'transparent', border: '1px solid rgba(255,255,255,0.4)',
          borderRadius: 4, padding: '10px 24px',
          color: '#fff', fontSize: '0.8rem', letterSpacing: '0.05em',
          fontWeight: 600, fontFamily: "'Inter', 'Helvetica', sans-serif",
          cursor: 'pointer',
        }}
        whileHover={{ background: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.8)' }}
        whileTap={{ scale: 0.98 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" />
        </svg>
        Add to Calendar
      </motion.button>
    </div>
  );
}
