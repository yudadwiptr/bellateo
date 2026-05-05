import React, { useEffect, useRef, useState } from 'react';
import SlideHero from './slides/SlideHero';
import SlideBible from './slides/SlideBible';
import SlideBride from './slides/SlideBride';
import SlideGroom from './slides/SlideGroom';
import SlideLoveStory from './slides/SlideLoveStory';
import SlideCountdown from './slides/SlideCountdown';
import SlideLocations from './slides/SlideLocations';
import SlideGallery from './slides/SlideGallery';
import SlideGift from './slides/SlideGift';
import SlideWish from './slides/SlideWish';
import SlideThankYou from './slides/SlideThankYou';

const SLIDES = [
  { id: 'hero',       label: 'Hero',       Component: SlideHero },
  { id: 'bible',      label: 'Bible',      Component: SlideBible },
  { id: 'bride',      label: 'Bride',      Component: SlideBride },
  { id: 'groom',      label: 'Groom',      Component: SlideGroom },
  { id: 'lovestory',  label: 'Love Story', Component: SlideLoveStory },
  { id: 'countdown',  label: 'Countdown',  Component: SlideCountdown },
  { id: 'locations',  label: 'Locations',  Component: SlideLocations },
  { id: 'gallery',    label: 'Gallery',    Component: SlideGallery },
  { id: 'gift',       label: 'Gift',       Component: SlideGift },
  { id: 'wish',       label: 'Wish',       Component: SlideWish },
  { id: 'thankyou',   label: 'Thank You',  Component: SlideThankYou },
];

export default function SlideShow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef(null);
  const slideRefs = useRef([]);

  // Lock body scroll — SlideShow is the scroll container
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Track active slide via IntersectionObserver
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observers = slideRefs.current.map((ref, i) => {
      if (!ref) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setCurrentSlide(i); },
        { threshold: 0.5, root: container }
      );
      obs.observe(ref);
      return obs;
    });
    return () => observers.forEach(obs => obs && obs.disconnect());
  }, []);

  const progress = ((currentSlide + 1) / SLIDES.length) * 100;

  return (
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden', background: '#000' }}>
      {/* ── Netflix-style progress bar ── */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        height: '3px', zIndex: 9999, background: 'rgba(255,255,255,0.12)'
      }}>
        <div style={{
          height: '100%',
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #E50913, #ff4d4d)',
          transition: 'width 0.5s cubic-bezier(0.4,0,0.2,1)',
          boxShadow: '0 0 8px #E50913',
        }} />
      </div>

      {/* ── Dot navigator ── */}
      <div style={{
        position: 'fixed', right: 14, top: '50%', transform: 'translateY(-50%)',
        zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 7,
      }}>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => {
              slideRefs.current[i]?.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{
              width: i === currentSlide ? 8 : 5,
              height: i === currentSlide ? 8 : 5,
              borderRadius: '50%',
              border: 'none',
              cursor: 'pointer',
              background: i === currentSlide ? '#E50913' : 'rgba(255,255,255,0.25)',
              transition: 'all 0.3s ease',
              padding: 0,
              boxShadow: i === currentSlide ? '0 0 6px #E50913' : 'none',
            }}
          />
        ))}
      </div>

      {/* ── Scroll snap container ── */}
      <div
        ref={containerRef}
        style={{
          height: '100vh',
          overflowY: 'scroll',
          scrollSnapType: 'y mandatory',
          scrollBehavior: 'smooth',
        }}
      >
        {SLIDES.map(({ id, Component }, i) => (
          <div
            key={id}
            ref={el => slideRefs.current[i] = el}
            style={{
              height: '100vh',
              scrollSnapAlign: 'start',
              scrollSnapStop: 'always',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Component isActive={currentSlide === i} slideIndex={i} />
          </div>
        ))}
      </div>
    </div>
  );
}
