import React from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const palette = [
  { name: 'CHAMPAGNE', color: '#F9F7F2' },
  { name: 'CREAM', color: '#EAE4D3' },
  { name: 'SAND', color: '#DED2BB' },
  { name: 'TAN', color: '#D2B495' },
  { name: 'CAMEL', color: '#A78C72' },
  { name: 'MUD', color: '#9E8F82' }
];

export default function SlideDresscode({ isActive }) {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: '#080808',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 32px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Image with Overlay */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: 'url("/images/foto5.webp")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.25,
        filter: 'grayscale(50%)'
      }} />

      {/* Gradient Overlay for extra depth */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        background: 'linear-gradient(to bottom, rgba(8,8,8,0.8) 0%, rgba(8,8,8,0.4) 50%, rgba(8,8,8,0.9) 100%)',
      }} />

      {/* Background Glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '100%', height: '100%',
        background: 'radial-gradient(circle at center, rgba(167,140,114,0.1) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      {/* Header Section */}
      <div style={{ marginBottom: '40px', zIndex: 1 }}>
        <motion.p
          variants={fadeUp} initial="hidden"
          animate={isActive ? 'visible' : 'hidden'}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            color: '#B3B3B3',
            fontSize: '0.65rem',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            fontWeight: 500,
            marginBottom: '12px',
            fontFamily: "'Inter', sans-serif"
          }}
        >
          GUEST ATTIRE
        </motion.p>

        <motion.h2
          variants={fadeUp} initial="hidden"
          animate={isActive ? 'visible' : 'hidden'}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: '2.5rem',
            fontWeight: 700,
            color: '#fff',
            letterSpacing: '0.05em',
            marginBottom: '20px',
            textShadow: '0 4px 12px rgba(0,0,0,0.5)'
          }}
        >
          DRESSCODE
        </motion.h2>

        <motion.div
          variants={fadeUp} initial="hidden"
          animate={isActive ? 'visible' : 'hidden'}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{ maxWidth: '400px', margin: '0 auto' }}
        >
          <p style={{
            color: 'rgba(255,255,255,0.7)',
            fontSize: '0.8rem',
            lineHeight: '1.7',
            letterSpacing: '0.02em',
            fontWeight: 300,
            fontFamily: "'Inter', sans-serif"
          }}>
            A RECOMMENDED COLOR<br></br>PALETTE FOR OUR SPECIAL DAY.
          </p>
        </motion.div>
      </div>

      {/* Palette Grid Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'repeat(2, 1fr)',
        gap: '24px 20px',
        zIndex: 1,
        width: 'auto',
      }}>
        {palette.map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, delay: 0.4 + (i * 0.1) }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <div style={{
              width: '70px',
              height: '70px',
              borderRadius: '12px',
              backgroundColor: item.color,
              boxShadow: '0 8px 20px rgba(0,0,0,0.4), inset 0 0 1px rgba(255,255,255,0.1)',
            }} />
            <span style={{
              color: 'rgba(255,255,255,0.4)',
              fontSize: '0.55rem',
              letterSpacing: '0.2em',
              fontWeight: 600,
              fontFamily: "'Inter', sans-serif"
            }}>
              {item.name}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
