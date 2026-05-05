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
      background: 'linear-gradient(135deg, #1a0000, #2a0000)',
      border: '1px solid rgba(229,9,19,0.35)',
      borderRadius: 12, width: 72, height: 72,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '2rem', fontWeight: 800, color: '#fff',
      fontVariantNumeric: 'tabular-nums',
      boxShadow: '0 0 20px rgba(229,9,19,0.15), inset 0 1px 0 rgba(255,255,255,0.08)',
    }}>
      {String(value).padStart(2, '0')}
    </div>
    <span style={{
      color: 'rgba(255,255,255,0.4)', fontSize: '0.6rem',
      letterSpacing: '0.2em', textTransform: 'uppercase',
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
        style={{ color: '#E50913', fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase' }}
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
          fontWeight: 700, color: '#fff', letterSpacing: '0.04em', lineHeight: 1.4,
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
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: 999, padding: '9px 22px',
          color: '#fff', fontSize: '0.75rem', letterSpacing: '0.1em',
          cursor: 'pointer',
        }}
        whileHover={{ background: 'rgba(255,255,255,0.13)' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        Add to Calendar
      </motion.button>
    </div>
  );
}
