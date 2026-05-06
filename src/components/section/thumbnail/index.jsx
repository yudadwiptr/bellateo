import React from 'react';
import DetailInfo from '../detail-info';
import data from '../../../data/config.json';

const TagItem = ({ title }) => {
  return (
    <li
      className="text-xs text-gray-300 tracking-wider"
      style={{ textShadow: '0 1px 4px rgba(0,0,0,0.9)' }}
    >
      {title}
    </li>
  );
};

export default function Thumbnail() {
  const [isOpenDetail, setIsOpenDetail] = React.useState(false);

  const suaravideoRef = React.useRef(null);
  const handleSeeDetail = () => {
    setIsOpenDetail(true);
    setTimeout(() => {
      const weddingsong = document.getElementById('weddingsong-audio');
      if (weddingsong && weddingsong.paused) {
        weddingsong.play().catch(() => { });
      }
    }, 2500);
  };

  if (isOpenDetail) {
    return <DetailInfo suaravideoRef={suaravideoRef} />;
  }

  return (
    <>
      <style>{`
        @keyframes softBounce {
          0%, 100% { transform: translateY(0); opacity: 0.55; }
          50% { transform: translateY(7px); opacity: 1; }
        }
      `}</style>
      <div
        style={{
          backgroundImage: `url(${data.thumbnail_image_url})`,
          backgroundPosition: 'center 20%'
        }}
        className="min-h-screen bg-cover bg-no-repeat flex flex-col justify-end mb-10 relative"
      >

        {/* Softer gradient overlay — starts fading later so costume detail stays visible */}
        <div
          style={{
            background:
              'linear-gradient(to bottom, transparent 0%, transparent 20%, rgba(0,0,0,0.6) 50%, #000 75%, #000 100%)',
          }}
          className="pb-10 pt-2"
        >
          {/* Text block */}
          <div className="px-8 mb-8 space-y-3">

            {/* NIKAHFIX logo */}
            <div className="mb-1">
              <img
                src="/images/NIKAHFIX.webp"
                alt="NIKAHFIX"
                width={76}
                height={20}
                style={{ filter: 'brightness(1.6) contrast(1.15) drop-shadow(0 2px 8px rgba(0,0,0,0.8))' }}
              />
            </div>

            {/* Names */}
            <div>
              <h1 className="leading-snug">
                <span
                  className="text-4xl block"
                  style={{
                    fontFamily: "'Cinzel', serif",
                    fontWeight: 700,
                    letterSpacing: '0.03em',
                    textShadow: '0 2px 14px rgba(0,0,0,0.75)',
                  }}
                >
                  {data.pegantin.wanita.panggilan} &amp; {data.pegantin.pria.panggilan}
                </span>
                <span
                  className="text-base font-normal text-white tracking-widest uppercase"
                  style={{ letterSpacing: '0.18em' }}
                >
                  Countdown to Forever
                </span>
              </h1>
            </div>

            {/* Coming Soon + Date */}
            <div className="flex gap-3 items-center">
              <div
                className="flex flex-col justify-center items-center text-white rounded px-2 py-1 font-semibold tracking-wide shadow-lg"
                style={{ background: 'linear-gradient(135deg, #E50914 100%, #A0522D 0%)' }}
              >
                <span className="text-[10px] uppercase leading-tight">Coming</span>
                <span className="text-[10px] uppercase leading-tight">Soon</span>
              </div>
              <p className="text-sm text-white/90 tracking-wide leading-snug">
                <span className="font-medium text-white block drop-shadow-md">Saturday & Sunday</span>
                <span className="drop-shadow-md">16 - 17 May 2026</span>
              </p>
            </div>

            {/* Hashtags */}
            <ul className="flex gap-2 text-gray items-center flex-wrap">
              <TagItem title="#ThEOnlyoneforBELLA" />
              <TagItem title="#FromStrangertoForever" />
              <TagItem title="#EternalLove" />
              <TagItem title="#OnlyByHisGrace" />
            </ul>
          </div>

          {/* SEE THE DETAIL button */}
          <div className="w-full text-center">
            <button
              onClick={handleSeeDetail}
              className="uppercase w-full font-normal transition-all duration-300 hover:scale-105 relative group"
              style={{
                fontSize: '1.1rem',
                letterSpacing: '0.16em',
              }}
            >
              <span className="relative z-10 tracking-tighter">See The Detail</span>
              <div className="absolute inset-0 bg-white/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-lg"></div>
            </button>

            {/* Soft bounce arrow */}
            <div style={{ animation: 'softBounce 2.2s ease-in-out infinite' }}>
              <svg
                className="w-5 h-5 mx-auto mt-1 mb-2 text-white/70"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </div>

          {/* suaravideoRef is only used in DetailInfo */}
        </div>
      </div>
    </>
  );
}
