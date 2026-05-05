import React, { useState } from 'react';
import { motion } from 'framer-motion';
import data from '../../data/config.json';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const GiftCard = ({ bankName, accountNumber, accountHolder, delay, isActive }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <motion.div
      variants={fadeUp} initial="hidden"
      animate={isActive ? 'visible' : 'hidden'}
      transition={{ duration: 0.5, delay }}
      style={{
        background: '#1F1F1F', borderRadius: 12,
        border: '1px solid rgba(255,255,255,0.05)',
        padding: '20px',
        display: 'flex', flexDirection: 'column', gap: 12,
        position: 'relative'
      }}
    >
      {/* Bank Logo / Name */}
      <div style={{ color: '#fff', fontWeight: 800, fontSize: '0.9rem', fontStyle: 'italic', letterSpacing: '0.05em' }}>
        {bankName}
      </div>

      {/* Account Info */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <p style={{ color: '#fff', fontSize: '1.25rem', fontWeight: 700, letterSpacing: '0.05em' }}>
              {accountNumber}
            </p>
            {/* Copy Icon Button */}
            <button
              onClick={handleCopy}
              style={{
                background: 'transparent', border: 'none', color: '#B3B3B3', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 4
              }}
              title="Copy to clipboard"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            </button>
          </div>
          {/* Red Accent Line */}
          <div style={{ width: 24, height: 2, background: '#E50913', marginTop: 4, marginBottom: 8 }} />
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem', fontWeight: 500 }}>a.n. {accountHolder}</p>
        </div>
      </div>

      {/* Toast Feedback */}
      {copied && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            position: 'absolute', bottom: 20, right: 20,
            color: '#E50913', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.05em'
          }}
        >
          Number Copied!
        </motion.div>
      )}
    </motion.div>
  );
};

export default function SlideGift({ isActive }) {
  const gift = data.gift;
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
          style={{ color: '#E5E5E5', fontSize: '0.6rem', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: 8 }}
        >
          Optional
        </motion.p>
        <motion.h2
          variants={fadeUp} initial="hidden"
          animate={isActive ? 'visible' : 'hidden'}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ fontFamily: "'Cinzel', serif", fontSize: '1.5rem', fontWeight: 700, color: '#fff', letterSpacing: '0.02em' }}
        >
          {gift.title}
        </motion.h2>
      </div>

      {/* Description */}
      <motion.p
        variants={fadeUp} initial="hidden"
        animate={isActive ? 'visible' : 'hidden'}
        transition={{ duration: 0.5, delay: 0.3 }}
        style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', lineHeight: 1.65, textAlign: 'left' }}
      >
        {gift.description}
      </motion.p>

      {/* Bank accounts */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {gift.bank_accounts.map((acc, i) => (
          <GiftCard
            key={i}
            bankName={acc.bank_name}
            accountNumber={acc.account_number}
            accountHolder={acc.account_holder}
            delay={0.4 + i * 0.12}
            isActive={isActive}
          />
        ))}
      </div>

      {/* Wishlist button */}
      {gift.wishlist && (
        <motion.a
          variants={fadeUp} initial="hidden"
          animate={isActive ? 'visible' : 'hidden'}
          transition={{ duration: 0.5, delay: 0.65 }}
          href={gift.wishlist.url}
          target="_blank" rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            background: 'linear-gradient(135deg, #E50913, #8B1A2B)',
            color: '#fff', borderRadius: 12,
            padding: '13px 0', fontSize: '0.8rem', fontWeight: 600,
            textDecoration: 'none', letterSpacing: '0.06em',
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z" clipRule="evenodd" />
            <path d="M9 11H3v5a2 2 0 002 2h4v-7zm2 7h4a2 2 0 002-2v-5h-6v7z" />
          </svg>
          View Wishlist
        </motion.a>
      )}
    </div>
  );
}
