import React, { useEffect, useState } from 'react';

export default function UserWatch({ onClick }) {
  const [guests, setGuests] = useState(['Guest']);

  useEffect(() => {
    if (window) {
      const url = new URL(window.location.href);
      const toParam = url.searchParams.get('to');
      if (toParam) {
        // Split by common delimiters like "&", "dan", "and"
        let names = toParam.split(/\s+&\s+|\s+dan\s+|\s+and\s+/i).map(n => n.trim()).filter(Boolean);
        if (names.length === 0) names = [toParam];

        // Show up to 2 profiles
        setGuests(names.slice(0, 2));
      } else {
        setGuests(['Guest']);
      }
    }
  }, []);

  const handleClick = (e) => {
    // Play Netflix sound on guest button click (all devices)
    let netflixAudio = document.getElementById('netflix-audio');
    if (!netflixAudio) {
      netflixAudio = document.createElement('audio');
      netflixAudio.id = 'netflix-audio';
      netflixAudio.src = '/audio/netflix.mp3';
      netflixAudio.preload = 'auto';
      document.body.appendChild(netflixAudio);
    }
    netflixAudio.currentTime = 0;
    netflixAudio.play().catch(() => { });

    // Dispatch a global event so the top-level SongButton can start the main song
    try {
      window.dispatchEvent(new Event('guest-click'));
    } catch (err) { }

    if (typeof onClick === 'function') onClick(e);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center pb-20 text-center">
      <img
        className="mb-12 scale-110"
        src="images/NIKAHFIX.webp"
        width={'125px'}
        height={'48px'}
        alt="nikahfix"
      />
      <div>
        <p className="mb-8 text-xl font-normal text-white tracking-wide">Who's Watching?</p>

        {/* Profile list */}
        <div className="flex justify-center gap-8 sm:gap-12">
          {guests.map((guestName, index) => (
            <div key={index} onClick={handleClick} className="group cursor-pointer w-24 flex flex-col items-center">
              <div className="w-24 h-24 rounded-md overflow-hidden relative border-2 border-transparent group-hover:border-white transition-colors duration-200">
                <img
                  className="w-full h-full object-cover"
                  src={index === 0 ? "images/guest-icon.png" : "images/guest-icon2.jpg"}
                  alt={`guest ${index + 1}`}
                />
              </div>
              <p className="text-gray-400 text-sm mt-4 group-hover:text-white transition-colors duration-200 w-full truncate">
                {guestName}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
