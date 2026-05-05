import React from 'react';
import data from '../../../data/config.json';

const LocationCard = ({ title, date, time, place, address, mapsUrl, index }) => {
  const handleClick = () => {
    window.open(mapsUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="relative overflow-hidden rounded-xl mb-5"
      style={{
        background: 'linear-gradient(135deg, #1a1a1a 0%, #111 100%)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      {/* Red accent bar on left */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl"
        style={{ background: 'linear-gradient(to bottom, #E50913, #8B1A2B)' }}
      />

      {/* Episode-style number */}
      <div className="pl-5 pr-4 pt-4 pb-4">
        {/* Header row: episode number + title */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <span
              className="text-xs font-semibold tracking-widest uppercase mb-1 block"
              style={{ color: '#E50913' }}
            >
              Event {index + 1}
            </span>
            <h3 className="text-white text-lg font-bold leading-tight">{title}</h3>
          </div>
          {/* Calendar icon */}
          <div
            className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(229,9,19,0.12)' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#E50913]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px mb-3" style={{ background: 'rgba(255,255,255,0.06)' }} />

        {/* Date + Time row */}
        <div className="flex flex-wrap gap-3 mb-3">
          <div className="flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-gray-300 text-xs">{date}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-gray-300 text-xs">{time}</span>
          </div>
        </div>

        {/* Venue name */}
        <p className="text-white text-sm font-medium mb-1">{place}</p>

        {/* Address */}
        <p className="text-gray-400 text-xs leading-relaxed mb-4">{address}</p>

        {/* CTA Button */}
        <button
          onClick={handleClick}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-semibold tracking-wide transition-all duration-300 hover:scale-105 active:scale-95"
          style={{
            background: 'linear-gradient(135deg, #E50913 0%, #8B1A2B 100%)',
            color: '#fff',
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          View Location
        </button>
      </div>
    </div>
  );
};

export default function WeddingLocations() {
  const locations = Object.values(data.locations);

  return (
    <div className="mb-12">
      {/* Section header — Netflix style */}
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-lg font-bold text-white tracking-wide">Wedding Locations</h2>
        <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
      </div>

      {locations.map((loc, i) => (
        <LocationCard
          key={i}
          index={i}
          title={loc.title}
          date={loc.date}
          time={loc.time}
          place={loc.place}
          address={loc.address}
          mapsUrl={loc.mapsUrl}
        />
      ))}
    </div>
  );
}