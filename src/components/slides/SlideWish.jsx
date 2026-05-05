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

const WishItem = forwardRef(({ name, message, color, created_at }, ref) => (
  <div ref={ref} style={{
    background: '#1a1a1a', borderRadius: 10,
    border: '1px solid rgba(255,255,255,0.06)',
    padding: '12px 14px',
  }}>
    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
      <div style={{
        width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
        background: color, display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontWeight: 700, fontSize: '0.9rem', color: '#fff',
      }}>
        {name.charAt(0).toUpperCase()}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', marginBottom: 4 }}>
          <span style={{ color: '#fff', fontWeight: 600, fontSize: '0.82rem' }}>{name}</span>
          <span style={{ color: '#E50913', fontSize: '0.6rem', background: 'rgba(229,9,19,0.1)', padding: '1px 7px', borderRadius: 999 }}>Guest</span>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.78rem', lineHeight: 1.55 }}>{message}</p>
        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.65rem', marginTop: 4 }}>{formatDate(created_at)}</p>
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

  const inputStyle = {
    width: '100%', background: '#222', color: '#fff',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 8, padding: '9px 12px', fontSize: '0.8rem',
    outline: 'none', boxSizing: 'border-box',
  };

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
          style={{ color: '#E50913', fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 6 }}
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
          style={{ background: '#141414', borderRadius: 12, padding: '14px', display: 'flex', flexDirection: 'column', gap: 10, border: '1px solid rgba(255,255,255,0.07)' }}
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
            <label style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.7rem', display: 'block', marginBottom: 5 }}>Nama</label>
            <input style={inputStyle} value={name} onChange={e => setName(e.target.value)} placeholder="Nama kamu" />
            {formErrors.name && <p style={{ color: '#E50913', fontSize: '0.65rem', marginTop: 3 }}>{formErrors.name}</p>}
          </div>
          <div>
            <label style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.7rem', display: 'block', marginBottom: 5 }}>Ucapan & Doa</label>
            <textarea
              style={{ ...inputStyle, resize: 'none', minHeight: 72 }}
              value={message} onChange={e => setMessage(e.target.value)}
              placeholder="Tuliskan doa & ucapan terbaikmu..."
              rows={3}
            />
            {formErrors.message && <p style={{ color: '#E50913', fontSize: '0.65rem', marginTop: 3 }}>{formErrors.message}</p>}
          </div>
          <button
            type="submit" disabled={loading}
            style={{
              background: loading ? 'rgba(229,9,19,0.5)' : '#E50913',
              color: '#fff', border: 'none', borderRadius: 8,
              padding: '10px', fontSize: '0.8rem', fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            }}
          >
            {loading ? 'Mengirim...' : 'Kirim Ucapan 🤍'}
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
              Jadilah yang pertama memberikan ucapan 🤍
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
