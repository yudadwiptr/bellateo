import React from 'react';
import { motion } from 'framer-motion';
import data from '../../data/config.json';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const locations = Object.values(data.locations);

const LocationCard = ({ loc, delay, isActive, isLast }) => (
  <motion.div
    variants={fadeUp} initial="hidden"
    animate={isActive ? 'visible' : 'hidden'}
    transition={{ duration: 0.55, delay }}
    style={{
      padding: '16px',
      display: 'flex', flexDirection: 'column', gap: 12,
      borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.08)',
    }}
  >
    {/* Compact Thumbnail */}
    <div style={{ width: '100%', height: 110, borderRadius: 8, overflow: 'hidden', background: '#222' }}>
      <img src={loc.image_url || "/images/foto_2.jpg"} alt="Venue" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>

    {/* Info Layout */}
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {/* Date Title */}
      <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem', letterSpacing: '0.01em' }}>
        {loc.date}
      </h3>
      
      {/* Events */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 2 }}>
        {loc.events?.map((ev, i) => (
          <div key={i} style={{ borderLeft: '2px solid #E50913', paddingLeft: 10 }}>
            <h4 style={{ color: '#fff', fontWeight: 600, fontSize: '0.8rem' }}>{ev.title}</h4>
            <p style={{ color: '#B3B3B3', fontSize: '0.7rem', fontWeight: 500, marginTop: 2 }}>{ev.time}</p>
          </div>
        ))}
      </div>

      {/* Venue & Address */}
      <div>
        <p style={{ color: '#B3B3B3', fontSize: '0.7rem', fontWeight: 600, marginBottom: 1 }}>{loc.place}</p>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.65rem', lineHeight: 1.4 }}>
          {loc.address}
        </p>
      </div>
    </div>

    {/* Button */}
    <button
      onClick={() => window.open(loc.mapsUrl, '_blank', 'noopener')}
      style={{
        width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        background: '#E50913',
        color: '#fff', border: 'none', borderRadius: 4,
        padding: '7px 0', fontSize: '0.75rem', fontWeight: 600,
        cursor: 'pointer', letterSpacing: '0.03em',
      }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
      Directions
    </button>
  </motion.div>
);

export default function SlideLocations({ isActive }) {
  return (
    <div style={{
      width: '100%', height: '100%', background: '#080808',
      display: 'flex', flexDirection: 'column',
      padding: '32px 20px 24px', gap: 12, overflowY: 'auto',
    }}>
      {/* Header */}
      <div style={{ flexShrink: 0, marginBottom: 4 }}>
        <motion.h2
          variants={fadeUp} initial="hidden"
          animate={isActive ? 'visible' : 'hidden'}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ fontFamily: "'Cinzel', serif", fontSize: '1.4rem', fontWeight: 700, color: '#fff', letterSpacing: '0.02em' }}
        >
          Wedding Locations
        </motion.h2>
      </div>

      {/* Location List Container */}
      <div style={{ 
        display: 'flex', flexDirection: 'column', 
        background: '#181818', borderRadius: 8,
      }}>
        {locations.map((loc, i) => (
          <LocationCard 
            key={i} 
            loc={loc} 
            delay={0.3 + i * 0.15} 
            isActive={isActive} 
            isLast={i === locations.length - 1} 
          />
        ))}
      </div>
    </div>
  );
}
