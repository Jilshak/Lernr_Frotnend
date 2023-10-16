import React, { useState, useEffect } from "react";
import leftarrow from '../icons/leftarrow.png'
import rightarrow from '../icons/rightarrow.png'
import image5 from '../Images/carousal/image5.png'
import image7 from '../Images/carousal/image7.png'
import image8 from '../Images/carousal/image8.png'
import image9 from '../Images/carousal/image9.png'
import { Link } from "react-router-dom";

function Carousal() {
  const carousal = [
    {
      url: image5
    },
    {
      url: image7
    },
    {
      url: image8
    },
    {
      url: image9
    }
  ]

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const newIndex = (currentIndex + carousal.length - 1) % carousal.length;
    setCurrentIndex(newIndex);
  }

  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % carousal.length;
    setCurrentIndex(newIndex);
  }

  const changeSlide = () => {
    const newIndex = (currentIndex + 1) % carousal.length;
    setCurrentIndex(newIndex);
  }

  useEffect(() => {
    const interval = setInterval(changeSlide, 10000);
    return () => {
      clearInterval(interval);
    };
  }, [currentIndex]);

  const carouselStyle = {
    backgroundImage: `url(${carousal[currentIndex].url})`,
    width: "100%",
    height: "100%",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transition: 'opacity 1s',
    opacity: 1,
  };

  const gradientOverlay = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '25%',
    background: 'linear-gradient(to bottom, rgba(214, 214, 214, 0) 0%, rgba(214, 214, 214, 1) 100%)',
  };

  useEffect(() => {
    setTimeout(() => {
      carouselStyle.opacity = 1;
    }, 100);
  }, []);

  return (
    <Link to={`/allCourse`}>
      <div className='w-full flex justify-center relative items-center lg:h-[50vh]  '>
        <div style={carouselStyle} className='w-full cursor-pointer h-full group rounded-t-md'>
          <div style={gradientOverlay}></div>
        </div>
      </div>
    </Link>
  )

}

export default Carousal;
