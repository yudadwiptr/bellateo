import React from 'react';

export default function Bible() {
  return (
    <div className="mb-8">
      <h2 className="font-bold mb-4">Bible Verse</h2>
      <div className="text-gray-300 text-sm leading-relaxed italic text-justify">
        <div className="space-y-5">
          <div>
            <p className="text-white font-semibold mb-1">Matius 19:6</p>
            <p>"Demikianlah mereka bukan lagi dua, melainkan satu. Karena itu, apa yang telah dipersatukan Allah, tidak boleh diceraikan manusia."</p>
          </div>
          <div>
            <p className="text-white font-semibold mb-1">Filipi 1:3-4</p>
            <p>"Aku mengucap syukur kepada Allahku setiap kali aku mengingat kamu. Dan setiap kali aku berdoa untuk kamu semua, aku selalu berdoa dengan sukacita."</p>
          </div>
        </div>
      </div>
    </div>
  );
}