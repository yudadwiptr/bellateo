import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import supabase from '../../lib/supabaseClient';
import badwords from 'indonesian-badwords';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
const colorList = ['#E50913', '#FF9A00', '#00C853', '#2196F3'];

function formatDate(str) {
  if (!str) return '';
  return new Date(str).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }).replace(',', '');
}

const WishItem = forwardRef(({ name, message, created_at }, ref) => (
  <div ref={ref} style={{
    padding: '16px 0',
    display: 'flex', gap: 14, alignItems: 'flex-start',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
  }}>
    {/* Profile Icon */}
    <div style={{
      width: 40, height: 40, borderRadius: 4, flexShrink: 0, overflow: 'hidden',
    }}>
      <img src="images/guest-icon.png" alt="Guest" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>

    <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
      {/* Message */}
      <p style={{ color: '#fff', fontSize: '0.85rem', lineHeight: 1.5, textAlign: 'left' }}>{message}</p>

      {/* Sender and Date */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
        <span style={{ color: '#B3B3B3', fontWeight: 600, fontSize: '0.75rem' }}>{name}</span>
        <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.65rem' }}>• {formatDate(created_at)}</span>
      </div>
    </div>
  </div>
));

export default function SlideWish({ isActive }) {
  const lastRef = useRef(null);
  const [wishes, setWishes] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const [formErrors, setFormErrors] = useState({});
  const [focused, setFocused] = useState(null);

  const fetchWishes = async () => {
    try {
      const { data } = await supabase
        .from(import.meta.env.VITE_APP_TABLE_NAME)
        .select('id, name, message, color, created_at')
        .order('created_at', { ascending: false });
      setWishes(data || []);
    } catch { setWishes([]); }
  };

  useEffect(() => {
    fetchWishes();
    const interval = setInterval(fetchWishes, 12000);
    return () => clearInterval(interval);
  }, []);

  const validate = () => {
    const errs = {};
    if (name.length < 3) errs.name = 'Min. 3 karakter';
    if (message.length < 10) errs.message = 'Min. 10 karakter';
    if (badwords.flag(name)) errs.name = 'Gunakan bahasa yang sopan';
    if (badwords.flag(message)) errs.message = 'Gunakan bahasa yang sopan';
    setFormErrors(errs);
    return !Object.keys(errs).length;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true); setStatus(null);
    const color = colorList[wishes.length % colorList.length];
    try {
      const { error } = await supabase
        .from(import.meta.env.VITE_APP_TABLE_NAME)
        .insert([{ name, message: badwords.censor(message), color }]);
      if (error) throw error;
      await fetchWishes();
      setName(''); setMessage(''); setFormErrors({});
      setStatus('success');
      setTimeout(() => setStatus(null), 3000);
    } catch {
      setStatus('error');
    } finally { setLoading(false); }
  };

  const getInputStyle = (field) => ({
    width: '100%', background: '#333333', color: '#fff',
    border: 'none',
    borderBottom: focused === field ? '2px solid #E50914' : '2px solid transparent',
    borderRadius: '4px 4px 0 0', padding: '12px 14px', fontSize: '0.85rem',
    outline: 'none', boxSizing: 'border-box',
    transition: 'border-bottom 0.2s',
  });

  return (
    <div style={{
      width: '100%', height: '100%', background: '#080808',
      display: 'flex', flexDirection: 'column', overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{ padding: '48px 24px 12px', flexShrink: 0 }}>
        <motion.p
          variants={fadeUp} initial="hidden"
          animate={isActive ? 'visible' : 'hidden'}
          transition={{ duration: 0.4, delay: 0.1 }}
          style={{ color: '#B3B3B3', fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 6 }}
        >
          {wishes.length} Wishes
        </motion.p>
        <motion.h2
          variants={fadeUp} initial="hidden"
          animate={isActive ? 'visible' : 'hidden'}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ fontFamily: "'Cinzel', serif", fontSize: '1.5rem', fontWeight: 700, color: '#fff', letterSpacing: '0.02em' }}
        >
          Wish for the Couple
        </motion.h2>
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '4px 24px 28px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {/* Form */}
        <motion.form
          variants={fadeUp} initial="hidden"
          animate={isActive ? 'visible' : 'hidden'}
          transition={{ duration: 0.5, delay: 0.3 }}
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
        >
          {status === 'success' && (
            <div style={{ background: 'rgba(0,200,83,0.1)', border: '1px solid rgba(0,200,83,0.3)', borderRadius: 8, padding: '8px 12px', color: '#00C853', fontSize: '0.78rem' }}>
              ✓ Ucapan terkirim! Terima kasih 🤍
            </div>
          )}
          {status === 'error' && (
            <div style={{ background: 'rgba(229,9,19,0.1)', border: '1px solid rgba(229,9,19,0.3)', borderRadius: 8, padding: '8px 12px', color: '#E50913', fontSize: '0.78rem' }}>
              Gagal mengirim. Coba lagi.
            </div>
          )}
          <div>
            <label style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.7rem', display: 'block', marginBottom: 6 }}>Nama Lengkap</label>
            <input
              style={getInputStyle('name')}
              value={name} onChange={e => setName(e.target.value)}
              onFocus={() => setFocused('name')} onBlur={() => setFocused(null)}
              placeholder="Nama kamu"
            />
            {formErrors.name && <p style={{ color: '#E50913', fontSize: '0.65rem', marginTop: 3 }}>{formErrors.name}</p>}
          </div>
          <div>
            <label style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.7rem', display: 'block', marginBottom: 6 }}>Ucapan & Doa</label>
            <textarea
              style={{ ...getInputStyle('message'), resize: 'none', minHeight: 80 }}
              value={message} onChange={e => setMessage(e.target.value)}
              onFocus={() => setFocused('message')} onBlur={() => setFocused(null)}
              placeholder="Tuliskan doa & ucapan terbaikmu..."
              rows={3}
            />
            {formErrors.message && <p style={{ color: '#E50913', fontSize: '0.65rem', marginTop: 3 }}>{formErrors.message}</p>}
          </div>
          <button
            type="submit" disabled={loading}
            style={{
              background: loading ? 'rgba(229,9,20,0.5)' : '#E50914',
              color: '#fff', border: 'none', borderRadius: 4,
              padding: '12px', fontSize: '0.85rem', fontWeight: 700, fontFamily: 'sans-serif',
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              marginTop: 4,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
            {loading ? 'Mengirim...' : 'Kirim Ucapan'}
          </button>
        </motion.form>

        {/* Wish list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {wishes.map((w, i) => (
            <WishItem key={w.id || i} name={w.name} message={w.message} color={w.color} created_at={w.created_at}
              ref={i === wishes.length - 1 ? lastRef : null} />
          ))}
          {wishes.length === 0 && (
            <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.8rem', textAlign: 'center', padding: '20px 0' }}>
              Thankyou For The Endless Support & Prayer For Us 🤍
            </p>
          )}
        </div>
      </div>
      
      {/* Footer safe area for navigation */}
      <div style={{ 
        height: 60, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(to top, #080808 80%, transparent)',
      }}>
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: 0.3 }}
        >
          <p style={{ fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff', marginBottom: 4 }}>Next Slide</p>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
          </svg>
        </motion.div>
      </div>
    </div>
  );
}
