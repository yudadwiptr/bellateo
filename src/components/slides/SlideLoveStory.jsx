import React, { useState } from 'react';
import { motion } from 'framer-motion';
import data from '../../data/config.json';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const episodes = data.love_story;

export default function SlideLoveStory({ isActive }) {
  const [selectedEpisode, setSelectedEpisode] = useState(null);

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
          style={{ color: '#B3B3B3', fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 6 }}
        >
          Season 1 · {episodes.length} Episodes
        </motion.p>
        <motion.h2
          variants={fadeUp} initial="hidden"
          animate={isActive ? 'visible' : 'hidden'}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            fontFamily: "'Cinzel', serif", fontSize: '1.5rem',
            fontWeight: 700, color: '#fff', letterSpacing: '0.02em',
          }}
        >
          Our Love Story
        </motion.h2>
      </div>

      {/* Vertical scrolling episode list */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.7, delay: 0.35 }}
        style={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          padding: '12px 28px 32px',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {episodes.map((ep, i) => (
          <div
            key={i}
            onClick={() => setSelectedEpisode(ep)}
            style={{
              display: 'flex',
              gap: 16,
              alignItems: 'flex-start',
              paddingBottom: i === episodes.length - 1 ? 0 : 20,
              borderBottom: i === episodes.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.1)',
              cursor: 'pointer',
            }}
          >
            {/* Episode thumbnail */}
            <div style={{ position: 'relative', width: 140, height: 85, flexShrink: 0, borderRadius: 6, overflow: 'hidden' }}>
              <img
                src={ep.image_url}
                alt={ep.title}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              {/* Episode number badge */}
              <div style={{
                position: 'absolute', top: 4, left: 4,
                background: '#E50913', color: '#fff',
                fontSize: '0.55rem', fontWeight: 700,
                padding: '2px 6px', borderRadius: 4,
              }}>
                {i + 1}
              </div>
            </div>

            {/* Episode info */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <p style={{
                color: '#fff', fontSize: '0.85rem', fontWeight: 700,
                lineHeight: 1.3,
              }}>
                {ep.title}
              </p>
              <p style={{
                color: '#B3B3B3', fontSize: '0.7rem',
                lineHeight: 1.5, textAlign: 'left',
                display: '-webkit-box', WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical', overflow: 'hidden',
              }}>
                {ep.description}
              </p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Modal / Pop-up */}
      {selectedEpisode && (
        <div 
          onClick={() => setSelectedEpisode(null)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 9999,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 24, backdropFilter: 'blur(4px)',
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()} // Prevent click from closing when clicking inside
            style={{
              background: '#141414', borderRadius: 12, overflow: 'hidden',
              width: '100%', maxWidth: 400, maxHeight: '85vh', border: '1px solid rgba(255,255,255,0.1)',
              display: 'flex', flexDirection: 'column',
              position: 'relative'
            }}
          >
            {/* Close Button */}
            <button 
              onClick={() => setSelectedEpisode(null)}
              style={{
                position: 'absolute', top: 12, right: 12,
                background: 'rgba(0,0,0,0.6)', border: 'none', borderRadius: '50%',
                width: 32, height: 32, color: '#fff', fontSize: 16,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', zIndex: 10
              }}
            >
              ✕
            </button>
            
            {/* Modal Image */}
            <div style={{ width: '100%', height: 220, flexShrink: 0 }}>
              <img 
                src={selectedEpisode.image_url} 
                alt={selectedEpisode.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>

            {/* Modal Content */}
            <div style={{ padding: '20px', overflowY: 'auto', maxHeight: '60vh', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <h3 style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 700, marginBottom: 16, lineHeight: 1.4, letterSpacing: '0.01em' }}>
                {selectedEpisode.title}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {selectedEpisode.description.split('\n').map((para, idx) => (
                  para.trim() && (
                    <p key={idx} style={{ color: '#B3B3B3', fontSize: '0.9rem', lineHeight: 1.7, textAlign: 'left', fontWeight: 300 }}>
                      {para}
                    </p>
                  )
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
