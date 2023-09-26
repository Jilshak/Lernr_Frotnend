import React from 'react';
import image1 from '../Images/image1.avif';
import { Link } from 'react-router-dom';

function CategoriesCards(props) {
  const { item } = props
  return (
    <Link to={`category/${item.id}`}>
      <div className='group cursor-pointer'>
        <img className='h-[250px] transition-transform transform scale-100 group-hover:scale-105' src={item.image ? item.image : image1} alt="" />
        <p className='font-semibold mt-3'>{item.title}</p>
      </div>
    </Link>
  );
}

export default CategoriesCards;
