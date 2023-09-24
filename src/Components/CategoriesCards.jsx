import React from 'react';
import image1 from '../Images/image1.avif';

function CategoriesCards() {
  return (
    <div className='group cursor-pointer'>
      <img className='h-[250px] transition-transform transform scale-100 group-hover:scale-105' src={image1} alt="" />
      <p className='font-semibold'>category name</p>
    </div>
  );
}

export default CategoriesCards;
