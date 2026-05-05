import React from 'react';
import { motion } from 'framer-motion';
import data from '../../data/config.json';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function SlideBride({ isActive }) {
  const { wanita } = data.pegantin;
  return (
    <div style={{ width: '100%', height: '100%', background: '#0a0a0a', display: 'flex', flexDirection: 'column' }}>
      {/* Photo — top 58% */}
      <div style={{ flex: '0 0 58%', position: 'relative', overflow: 'hidden' }}>
        <motion.img
          src={wanita.foto}
          alt={wanita.nama}
          initial={{ scale: 1.08, opacity: 0 }}
          animate={isActive ? { scale: 1, opacity: 1 } : { scale: 1.08, opacity: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
        />
        {/* Gradient fade to bottom */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%',
          background: 'linear-gradient(to bottom, transparent, #0a0a0a)',
        }} />
        {/* Label badge */}
        <motion.div
          variants={fadeUp} initial="hidden"
          animate={isActive ? 'visible' : 'hidden'}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{
            position: 'absolute', top: 16, left: 16,
            background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: 999, padding: '4px 14px',
            color: '#E50913', fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase',
          }}
        >
          The Bride
        </motion.div>
      </div>

      {/* Info — bottom 42% */}
      <div style={{ flex: '0 0 42%', padding: '12px 28px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {/* Decorative line */}
        <motion.div
          initial={{ width: 0 }} animate={isActive ? { width: 40 } : { width: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          style={{ height: 2, background: '#E50913', marginBottom: 12 }}
        />

        {/* Name in Cinzel */}
        <motion.h2
          variants={fadeUp} initial="hidden"
          animate={isActive ? 'visible' : 'hidden'}
          transition={{ duration: 0.6, delay: 0.55 }}
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: 'clamp(1.15rem, 4vw, 1.5rem)',
            fontWeight: 700, color: '#fff', marginBottom: 4,
            letterSpacing: '0.02em', lineHeight: 1.3,
          }}
        >
          {wanita.nama}
        </motion.h2>

        {/* Parents */}
        <motion.div
          variants={fadeUp} initial="hidden"
          animate={isActive ? 'visible' : 'hidden'}
          transition={{ duration: 0.6, delay: 0.7 }}
          style={{
            background: 'rgba(255,255,255,0.05)', borderRadius: 12,
            padding: '10px 14px', marginTop: 10,
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8 }}>
            Putri Pertama dari
          </p>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.78rem', lineHeight: 1.7 }}>
            <span style={{ color: 'rgba(255,255,255,0.5)', marginRight: 4 }}>Bapak</span> {wanita.bapak}
          </p>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.78rem', lineHeight: 1.7 }}>
            <span style={{ color: 'rgba(255,255,255,0.5)', marginRight: 4 }}>Ibu</span> {wanita.ibu}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
