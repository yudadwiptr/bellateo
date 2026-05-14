import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import supabase from '../../lib/supabaseClient';


const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
const colorList = ['#E50913', '#FF9A00', '#00C853', '#2196F3'];

function formatDate(str) {
  if (!str) return '';
  return new Date(str).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }).replace(',', '');
}

const getAvatarColor = (char) => {
  const charCode = char.charCodeAt(0);
  const colors = [
    'from-pink-400 to-rose-600',
    'from-violet-400 to-purple-600',
    'from-sky-400 to-blue-600',
    'from-emerald-400 to-teal-600',
    'from-amber-400 to-orange-600',
    'from-red-400 to-red-700',
  ];
  return colors[charCode % colors.length];
};

const WishItem = forwardRef(({ name, message, created_at }, ref) => {
  const initial = name ? name.charAt(0).toUpperCase() : '?';
  const avatarGradient = getAvatarColor(initial);

  return (
    <div ref={ref} className="snap-start flex-shrink-0 w-[280px] p-4 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 flex flex-col gap-3 shadow-xl">
      <div className="flex items-center gap-2">
        {/* Avatar with Gradient */}
        <div className={`w-12 h-12 rounded-full shadow-lg flex items-center justify-center bg-gradient-to-br ${avatarGradient} transform transition-transform hover:rotate-12 flex-shrink-0`}>
          <span className="text-white font-extrabold text-xl tracking-tight">
            {initial}
          </span>
        </div>

        <div className="min-w-0">
          <h4 className="text-white font-semibold text-sm truncate">{name}</h4>
          <p className="text-white/40 text-[10px]">{formatDate(created_at)}</p>
        </div>
      </div>

      <p className="text-white/80 text-sm leading-relaxed line-clamp-4 italic">
        "{message}"
      </p>
    </div>
  );
});

export default function SlideWish({ isActive }) {
  const [wishes, setWishes] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const [formErrors, setFormErrors] = useState({});
  const [focused, setFocused] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const cardWidth = 280 + 12; // card width + gap
      const index = Math.round(scrollLeft / cardWidth);
      setActiveIndex(index);
    }
  };

  const fetchWishes = async () => {
    try {
      const { data } = await supabase
        .from(import.meta.env.VITE_APP_TABLE_NAME)
        .select('id, name, message, created_at')
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
    if (!name.trim()) errs.name = 'Nama harus diisi';
    if (!message.trim()) errs.message = 'Ucapan harus diisi';
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
        .insert([{ name, message }]);
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
      position: 'relative'
    }}>
      {/* Background Image with Overlay */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: 'url("/images/foto_4.webp")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.3,
        filter: 'grayscale(30%) brightness(0.6)'
      }} />

      {/* Gradient Overlay for extra depth */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        background: 'linear-gradient(to bottom, rgba(8,8,8,0.85) 0%, rgba(8,8,8,0.5) 50%, rgba(8,8,8,0.95) 100%)',
      }} />

      {/* Header */}
      <div style={{ padding: '48px 24px 12px', flexShrink: 0, position: 'relative', zIndex: 1 }}>
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
      <div style={{ flex: 1, overflowY: 'auto', padding: '4px 24px 28px', display: 'flex', flexDirection: 'column', gap: 14, position: 'relative', zIndex: 1 }}>
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
              padding: '8px 16px', fontSize: '0.75rem', fontWeight: 700, fontFamily: 'sans-serif',
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              marginTop: 4, alignSelf: 'center', minWidth: 140
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
            {loading ? 'Mengirim...' : 'Kirim Ucapan'}
          </button>
        </motion.form>

        {/* Wish list - Horizontal Grid Scroll */}
        <div style={{ position: 'relative', marginTop: 10 }}>
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="grid grid-rows-2 grid-flow-col gap-3 pb-6 snap-x snap-mandatory no-scrollbar overflow-x-auto"
            style={{
              scrollbarWidth: 'none', msOverflowStyle: 'none',
              paddingLeft: 2, paddingRight: 20,
              maxHeight: '500px' // Ensure there's a height for the 2 rows
            }}
          >
            {wishes.map((w, i) => (
              <WishItem key={w.id || i} name={w.name} message={w.message} created_at={w.created_at} />
            ))}
            {wishes.length === 0 && (
              <div className="row-span-2 w-full text-center py-12 px-4 backdrop-blur-sm bg-white/5 rounded-2xl border border-white/5">
                <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.8rem' }}>
                  Thankyou For The Endless Support & Prayer For Us 🤍
                </p>
              </div>
            )}
          </div>

          {/* Pagination dots indicator */}
          {wishes.length > 2 && (
            <div className="flex justify-center gap-1.5 mt-2">
              {Array.from({ length: Math.ceil(wishes.length / 2) }).map((_, i) => (
                <div key={i} className={`h-1 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-4 bg-red-600' : 'w-1 bg-white/20'}`} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
