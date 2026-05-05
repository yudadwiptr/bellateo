import React from 'react';
import { motion } from 'framer-motion';
import data from '../../data/config.json';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const locations = Object.values(data.locations);

const LocationCard = ({ loc, delay, isActive }) => (
  <motion.div
    variants={fadeUp} initial="hidden"
    animate={isActive ? 'visible' : 'hidden'}
    transition={{ duration: 0.55, delay }}
    style={{
      background: '#141414',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: 14, overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
      position: 'relative',
    }}
  >
    {/* Left red accent */}
    <div style={{
      position: 'absolute', left: 0, top: 0, bottom: 0, width: 3,
      background: 'linear-gradient(to bottom, #E50913, #8B1A2B)',
      borderRadius: '3px 0 0 3px',
    }} />

    <div style={{ padding: '14px 14px 14px 18px' }}>
      {/* Title row */}
      <p style={{ color: '#E50913', fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 4 }}>
        {loc.date}
      </p>
      <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem', marginBottom: 6, lineHeight: 1.3 }}>
        {loc.title}
      </h3>

      {/* Time */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
        </svg>
        <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.75rem' }}>{loc.time}</span>
      </div>

      {/* Venue */}
      <p style={{ color: '#fff', fontSize: '0.8rem', fontWeight: 600, marginBottom: 3 }}>{loc.place}</p>
      <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.68rem', lineHeight: 1.5, marginBottom: 12 }}>{loc.address}</p>

      {/* Button */}
      <button
        onClick={() => window.open(loc.mapsUrl, '_blank', 'noopener')}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          background: 'linear-gradient(135deg, #E50913, #8B1A2B)',
          color: '#fff', border: 'none', borderRadius: 8,
          padding: '8px 0', fontSize: '0.75rem', fontWeight: 600,
          cursor: 'pointer', letterSpacing: '0.06em',
        }}
      >
        <svg width="13" height="13" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
        Open in Google Maps
      </button>
    </div>
  </motion.div>
);

export default function SlideLocations({ isActive }) {
  return (
    <div style={{
      width: '100%', height: '100%', background: '#080808',
      display: 'flex', flexDirection: 'column',
      padding: '48px 24px 32px', gap: 20, overflowY: 'auto',
    }}>
      {/* Header */}
      <div style={{ flexShrink: 0 }}>
        <motion.p
          variants={fadeUp} initial="hidden"
          animate={isActive ? 'visible' : 'hidden'}
          transition={{ duration: 0.4, delay: 0.1 }}
          style={{ color: '#E50913', fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 6 }}
        >
          You Are Invited
        </motion.p>
        <motion.h2
          variants={fadeUp} initial="hidden"
          animate={isActive ? 'visible' : 'hidden'}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ fontFamily: "'Cinzel', serif", fontSize: '1.5rem', fontWeight: 700, color: '#fff', letterSpacing: '0.02em' }}
        >
          Wedding Locations
        </motion.h2>
      </div>

      {/* Location cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}>
        {locations.map((loc, i) => (
          <LocationCard key={i} loc={loc} delay={0.3 + i * 0.15} isActive={isActive} />
        ))}
      </div>
    </div>
  );
}
