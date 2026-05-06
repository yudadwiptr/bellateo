import React from 'react';
import { motion } from 'framer-motion';
import data from '../../data/config.json';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

export default function SlideThankYou({ isActive }) {
  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative', overflow: 'hidden',
      backgroundImage: 'url(/images/header.jpg)',
      backgroundSize: 'cover', backgroundPosition: 'center 20%',
    }}>
      {/* Heavy dark overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.75) 50%, rgba(0,0,0,0.9) 85%, #000 100%)',
      }} />

      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '0 28px 10vh', textAlign: 'center', gap: 20,
      }}>
        {/* Thank You */}
        <motion.h2
          variants={fadeUp} initial="hidden"
          animate={isActive ? 'visible' : 'hidden'}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: 'clamp(1.1rem, 5vw, 1.5rem)',
            fontWeight: 700, color: '#fff',
            letterSpacing: '0.1em',
            textShadow: '0 4px 20px rgba(0,0,0,0.8)',
            textTransform: 'uppercase',
            textAlign: 'center',
            lineHeight: 1.4
          }}
        >
          MAULIATE GODANG • TERIMAKASIH • THANKYOU
        </motion.h2>

        {/* Subtitle */}
        <motion.div
          variants={fadeUp} initial="hidden"
          animate={isActive ? 'visible' : 'hidden'}
          transition={{ duration: 0.6, delay: 0.45 }}
          style={{
            color: 'rgba(255,255,255,0.95)', fontSize: '0.8rem',
            lineHeight: 1.7, maxWidth: 330,
            textAlign: 'center', fontWeight: 400,
            display: 'flex', flexDirection: 'column', gap: 12,
            textShadow: '0 2px 10px rgba(0,0,0,0.5)'
          }}
        >
          <p style={{ fontStyle: 'italic' }}>
            “To our family and friends, Thankyou for being a part of our Wedding Day. Words can not express the joy that we feel having you all here today. Your presence meant The World to us to have you there to witness our love and commitment to each other. We are so grateful for your love and support as we begin this new chapter together. May The Lord bless you and your family deeply and shower you with all His blessing.”
          </p>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ width: 0 }} animate={isActive ? { width: 60 } : { width: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{ height: 1, background: 'rgba(229,9,19,0.6)' }}
        />

        {/* Names */}
        <motion.div
          variants={fadeUp} initial="hidden"
          animate={isActive ? 'visible' : 'hidden'}
          transition={{ duration: 0.6, delay: 0.7 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}
        >
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', fontStyle: 'italic' }}>With Love,</p>
          <p style={{
            fontFamily: "'Cinzel', serif",
            fontSize: '1.2rem', fontWeight: 700,
            color: '#fff', letterSpacing: '0.05em',
          }}>
            {data.pegantin.wanita.panggilan} and {data.pegantin.pria.panggilan}
          </p>
        </motion.div>

        {/* Date */}
        <motion.p
          variants={fadeUp} initial="hidden"
          animate={isActive ? 'visible' : 'hidden'}
          transition={{ duration: 0.5, delay: 0.8 }}
          style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.72rem', letterSpacing: '0.18em' }}
        >
          17 · 05 · 2026
        </motion.p>
      </div>

      {/* NIKAHFIX watermark at bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isActive ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        style={{
          position: 'absolute', bottom: 24, left: 0, right: 0,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
        }}
      >
        <img src="/images/NIKAHFIX.webp" alt="NIKAHFIX" width={60} height={16}
          style={{ filter: 'brightness(0.6)', opacity: 0.6 }} />
        <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.6rem', letterSpacing: '0.15em' }}>
          © 2026 · Made by Yuma Studio
        </p>
      </motion.div>
    </div>
  );
}
