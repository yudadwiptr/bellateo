import React from 'react';
import { motion } from 'framer-motion';
import data from '../../data/config.json';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function SlideGroom({ isActive }) {
  const { pria } = data.pegantin;
  return (
    <div style={{ width: '100%', height: '100%', background: '#0a0a0a', display: 'flex', flexDirection: 'column' }}>
      {/* Photo — top 58% */}
      <div style={{ flex: '0 0 58%', position: 'relative', overflow: 'hidden' }}>
        <motion.img
          src={pria.foto}
          alt={pria.nama}
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
        {/* Label top left without pill */}
        <motion.div
          variants={fadeUp} initial="hidden"
          animate={isActive ? 'visible' : 'hidden'}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{
            position: 'absolute', top: 24, left: 24,
            color: 'rgba(255,255,255,0.8)',
            fontFamily: 'sans-serif',
            fontSize: '12px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
          }}
        >
          The Groom
        </motion.div>
      </div>

      {/* Info — bottom 42% */}
      <div style={{ flex: '0 0 42%', padding: '12px 28px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        
        {/* Name in Cinzel, 2 lines */}
        <motion.div
          variants={fadeUp} initial="hidden"
          animate={isActive ? 'visible' : 'hidden'}
          transition={{ duration: 0.6, delay: 0.55 }}
          style={{ marginBottom: 16 }}
        >
          <h2 style={{
            fontFamily: "'Cinzel', serif",
            fontSize: 'clamp(1.5rem, 6vw, 2rem)',
            fontWeight: 700, color: '#fff',
            letterSpacing: '0.02em', lineHeight: 1.3,
          }}>
            {pria.nama.split(',')[0].trim().split(' ').slice(0, -1).join(' ')}<br />
            {pria.nama.split(',')[0].trim().split(' ').slice(-1).join(' ')}{pria.nama.includes(',') ? ',' + pria.nama.split(',').slice(1).join(',') : ''} // {pria.panggilan}
          </h2>
        </motion.div>

        {/* Parents */}
        <motion.div
          variants={fadeUp} initial="hidden"
          animate={isActive ? 'visible' : 'hidden'}
          transition={{ duration: 0.6, delay: 0.7 }}
          style={{
            marginTop: 4,
            borderLeft: '2px solid #E50913',
            paddingLeft: 16,
            display: 'flex', flexDirection: 'column', gap: 6
          }}
        >
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '10px', fontFamily: 'sans-serif', letterSpacing: '1px', textTransform: 'uppercase' }}>
            Putra pertama dari:
          </p>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.8rem', fontFamily: 'sans-serif', lineHeight: 1.6 }}>
            Bapak {pria.bapak} <br />
            &amp; Ibu {pria.ibu}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
