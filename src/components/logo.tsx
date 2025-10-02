import React from 'react';
import Image from 'next/image';

export function Logo() {
  return (
    <div className="flex items-center justify-center">
      <Image
        src="https://static.wixstatic.com/media/7b20bf_b9afb1293719453b8e27049e8551ac48~mv2.png"
        alt="North Harbour Rugby Logo"
        width={40}
        height={40}
        className="object-contain"
      />
    </div>
  );
}
