import React from 'react';
import Image from 'next/image';

export function Logo() {
  return (
    <div className="flex items-center justify-center">
      <Image
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfTewbyfEbmypG7vUiIC5tVV9ikh1fRvlIGtMyIKLhLpkkFI4g6HSGP_N9MA7oyBgSM9g&usqp=CAU"
        alt="d3 Logo"
        width={40}
        height={40}
        className="object-contain"
      />
    </div>
  );
}
