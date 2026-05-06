import React from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const verses = [
  {
    ref: 'Matius 19 : 6',
    text: '"Demikianlah mereka bukan lagi dua, melainkan satu. Karena itu, apa yang telah dipersatukan Allah, tidak boleh diceraikan manusia."',
  },
  {
    ref: 'Filipi 1 : 3-4',
    text: '"Aku mengucap syukur kepada Allahku setiap kali aku mengingat kamu. Dan setiap kali aku berdoa untuk kamu semua, aku selalu berdoa dengan sukacita."',
  },
];

export default function SlideBible({ isActive }) {
  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative', overflow: 'hidden',
      backgroundImage: 'url(/images/gl12.jpg)',
      backgroundSize: 'cover', backgroundPosition: 'center',
    }}>
      {/* Dark overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.92) 100%)',
      }} />

      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '0 28px', textAlign: 'center', gap: 32,
      }}>
        {/* Section label */}
        <motion.div
          variants={fadeUp} initial="hidden"
          animate={isActive ? 'visible' : 'hidden'}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            color: '#fff',
            background: '#E50913',
            padding: '6px 14px',
            borderRadius: '99px',
            fontSize: '0.65rem',
            fontWeight: 700,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            boxShadow: '0 4px 12px rgba(229,9,19,0.3)'
          }}
        >
          Bible Verse
        </motion.div>

        {/* Decorative quote mark */}
        <motion.div
          variants={fadeUp} initial="hidden"
          animate={isActive ? 'visible' : 'hidden'}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            fontFamily: 'Georgia, serif', fontSize: '5rem', lineHeight: 0.6,
            color: 'rgba(229,9,19,0.4)', userSelect: 'none', marginBottom: -10,
          }}
        >
          "
        </motion.div>

        {/* Verses */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {verses.map((v, i) => (
            <motion.div
              key={i}
              variants={fadeUp} initial="hidden"
              animate={isActive ? 'visible' : 'hidden'}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.2 }}
            >
              <p style={{
                fontFamily: 'sans-serif',
                color: '#fff',
                fontWeight: 800,
                fontSize: '0.9rem',
                letterSpacing: '0.15em',
                marginBottom: 10,
                textTransform: 'uppercase'
              }}>
                {v.ref}
              </p>
              <p style={{
                color: 'rgba(255,255,255,0.9)',
                fontSize: '0.9rem',
                fontWeight: 300,
                fontStyle: 'italic',
                lineHeight: 1.9,
                textAlign: 'justify',
              }}>
                {v.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Thin horizontal divider */}
        <motion.div
          variants={fadeUp} initial="hidden"
          animate={isActive ? 'visible' : 'hidden'}
          transition={{ duration: 0.5, delay: 0.8 }}
          style={{ width: 50, height: 1, background: 'rgba(229,9,19,0.5)' }}
        />
      </div>
    </div>
  );
}
