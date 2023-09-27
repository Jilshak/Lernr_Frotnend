import React, { useState } from "react";
import leftarrow from '../icons/leftarrow.png'
import rightarrow from '../icons/rightarrow.png'
import image1 from '../Images/carousal/image1.jpg'
import image2 from '../Images/carousal/image2.jpg'

function Carousal() {
  const carousal = [
    {
      url: image1
    },
    {
      url: image2
    },
    {
      url: image1
    },
    {
      url: image2
    }
  ]

  const [currentIndex, setCurrentIndex] = useState(3);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? carousal.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  }

  const nextSlide = () => {
    const isLastSlide = currentIndex === carousal.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }

  const carouselStyle = {
    backgroundImage: `url(${carousal[currentIndex].url})`,
    backgroundSize: 'cover', // This will make the image cover the entire container
    backgroundPosition: 'center', // Center the image within the container
  };

  return (
    <div className='w-full flex justify-center items-center h-[50vh] mt-7'>
      <div style={carouselStyle} className='w-full cursor-pointer h-full group rounded-md'>
        <img onClick={prevSlide} src={leftarrow} className='hidden h-12 group-hover:block relative top-[140px]  left-[10px] cursor-pointer' />
        <img onClick={nextSlide} src={rightarrow} className='hidden h-12 group-hover:block relative top-[100px] left-[-10px] float-right cursor-pointer' />
      </div>
    </div>
  )
}

export default Carousal
