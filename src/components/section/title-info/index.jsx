import React from 'react';
import data from '../../../data/config.json';

export default function TitleInfo() {
  return (
    <div className="space-y-1">
      <div className="flex gap-2 items-center">
        <img src="/favicon.ico" alt="logo" width={18} height={18} />
        <span className="text-[#A3A1A1] text-xs mt-0.5 tracking-widest">
          DOCUMENTER
        </span>
      </div>
      <h2 className="text-lg leading-5 text-white font-bold">
        {data.pegantin.wanita.panggilan} &amp; {data.pegantin.pria.panggilan}:
        Countdown to Forever
      </h2>
      <div className="flex gap-1 items-center">
        <span className="text-green-500 mr-2">100% match</span>
        <span className="bg-[#4D4D4D] text-white text-xs px-1 py-0 mr-2 rounded-sm">
          18+
        </span>
        <span className="text-white mr-2">
          ⭐⭐⭐⭐⭐
        </span>
        <span>
          <img src="/images/4k-icon.png" width={16} height={16} alt="4k" style={{ filter: 'invert(0)' }} />
        </span>
        <span>
          <img src="/images/hd-icon.png" width={16} height={16} alt="hd" style={{ filter: 'invert(0)' }} />
        </span>
        <span>
          <img src="/images/dolby.png" width={26} height={26} alt="dolby" style={{ filter: 'invert(100)' }} />
        </span>
      </div>
      <div className="bg-[#E50913] py-1 px-2 rounded text-s text-white font-bold w-fit">
        17 MEI 2026
      </div>
      <div className="pt-2">
        <p
          className="text-gray-300 text-sm leading-relaxed mb-2 whitespace-pre-line text-justify"
          style={{ textShadow: '0 2px 8px #000, 0 0px 1px #000' }}
        >
          {data.intro}
        </p>
      </div>
    </div>
  );
}
