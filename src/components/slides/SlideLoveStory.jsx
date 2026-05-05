import React from 'react';
import { motion } from 'framer-motion';
import data from '../../data/config.json';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const episodes = data.love_story;

export default function SlideLoveStory({ isActive }) {
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
          style={{ color: '#E50913', fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 6 }}
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

      {/* Horizontal scrolling episode strip */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
        transition={{ duration: 0.7, delay: 0.35 }}
        style={{
          flex: 1,
          overflowX: 'auto',
          overflowY: 'hidden',
          display: 'flex',
          gap: 14,
          padding: '12px 28px 24px',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          alignItems: 'flex-start',
        }}
      >
        {episodes.map((ep, i) => (
          <div
            key={i}
            style={{
              flexShrink: 0,
              width: 220,
              borderRadius: 12,
              overflow: 'hidden',
              background: '#161616',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            {/* Episode thumbnail */}
            <div style={{ position: 'relative', height: 130, overflow: 'hidden' }}>
              <img
                src={ep.image_url}
                alt={ep.title}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              {/* Episode number badge */}
              <div style={{
                position: 'absolute', top: 8, left: 8,
                background: '#E50913', color: '#fff',
                fontSize: '0.6rem', fontWeight: 700,
                padding: '2px 8px', borderRadius: 999, letterSpacing: '0.1em',
              }}>
                EP {i + 1}
              </div>
              {/* Gradient overlay */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%',
                background: 'linear-gradient(to bottom, transparent, #161616)',
              }} />
            </div>

            {/* Episode info */}
            <div style={{ padding: '12px 14px 14px' }}>
              <p style={{
                color: '#fff', fontSize: '0.78rem', fontWeight: 600,
                marginBottom: 6, lineHeight: 1.35,
              }}>
                {ep.title}
              </p>
              <p style={{
                color: 'rgba(255,255,255,0.55)', fontSize: '0.7rem',
                lineHeight: 1.6, textAlign: 'justify',
                display: '-webkit-box', WebkitLineClamp: 4,
                WebkitBoxOrient: 'vertical', overflow: 'hidden',
              }}>
                {ep.description}
              </p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
