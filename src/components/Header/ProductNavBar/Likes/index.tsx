import React from 'react';
import Image from 'next/image';
import Favourites from '@/../public/icons/Favourites.svg';

function Likes() {
  return (
    <div>
      <Image src={Favourites} alt="likes icon" width={22} height={22} />
    </div>
  );
}

export default Likes;
