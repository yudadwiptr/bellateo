import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import data from '../../data/config.json';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

export default function SlideGallery({ isActive }) {
  const [selected, setSelected] = useState(null);

  return (
    <div style={{
      width: '100%', height: '100%', background: '#080808',
      display: 'flex', flexDirection: 'column', overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{ padding: '48px 28px 16px', flexShrink: 0 }}>
        <motion.p
          variants={fadeUp} initial="hidden"
          animate={isActive ? 'visible' : 'hidden'}
          transition={{ duration: 0.4, delay: 0.1 }}
          style={{ color: '#B3B3B3', fontSize: '0.65rem', letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: 6 }}
        >
          {data.gallery.length} Photos
        </motion.p>
        <motion.h2
          variants={fadeUp} initial="hidden"
          animate={isActive ? 'visible' : 'hidden'}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ fontFamily: "'Cinzel', serif", fontSize: '1.5rem', fontWeight: 700, color: '#fff', letterSpacing: '0.02em' }}
        >
          Our Gallery
        </motion.h2>
      </div>

      {/* Horizontal scroll strip */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
        transition={{ duration: 0.7, delay: 0.35 }}
        style={{
          flex: 1,
          overflowX: 'auto',
          overflowY: 'hidden',
          display: 'flex',
          gap: 10,
          padding: '12px 28px 28px',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          alignItems: 'center',
        }}
      >
        {data.gallery.map((src, i) => (
          <div
            key={i}
            onClick={() => setSelected(src)}
            style={{
              flexShrink: 0,
              height: '85%', // Take up most of the vertical space
              aspectRatio: '2/3', // Movie poster ratio
              borderRadius: 8,
              overflow: 'hidden',
              cursor: 'pointer',
              position: 'relative',
              background: '#111',
              transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.03)';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.8), 0 0 0 1px rgba(229,9,19,0.5)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <img
              src={src}
              alt={`Gallery ${i + 1}`}
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            {/* Subtle gradient overlay for depth */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0) 60%, rgba(0,0,0,0.4) 100%)',
            }} />
          </div>
        ))}
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelected(null)}
            style={{
              position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)',
              zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(8px)',
            }}
          >
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, type: 'spring', bounce: 0.2 }}
              src={selected} 
              alt="Full Preview" 
              style={{ maxWidth: '95vw', maxHeight: '90vh', borderRadius: 8, objectFit: 'contain', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }} 
              onClick={(e) => e.stopPropagation()}
            />
            
            <button onClick={() => setSelected(null)} style={{
              position: 'absolute', top: 24, right: 24, background: 'rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50%', width: 40, height: 40,
              color: '#fff', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(4px)', transition: 'background 0.2s'
            }}>✕</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
