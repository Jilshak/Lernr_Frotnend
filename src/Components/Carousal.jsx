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
    const interval = setInterval(changeSlide, 5000); // Change slide every 5 seconds (5000 milliseconds)
    return () => {
      clearInterval(interval); // Clear the interval when the component unmounts
    };
  }, [currentIndex]);

  const carouselStyle = {
    backgroundImage: `url(${carousal[currentIndex].url})`,
    width: "100%",
    height: "100%",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transition: 'opacity 1s', // CSS transition for the fading effect
    opacity: 1, // Initially set to 1
  };

  const gradientOverlay = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '25%', // Adjust the height for the fading effect
    background: 'linear-gradient(to bottom, rgba(214, 214, 214, 0) 0%, rgba(214, 214, 214, 1) 100%)',
  };

  useEffect(() => {
    // Set opacity to 1 after the component mounts to trigger the initial fade-in
    setTimeout(() => {
      carouselStyle.opacity = 1;
    }, 100);
  }, []);

  return (
    <Link to={`/allCourse`}>
      <div className='w-full flex justify-center relative items-center h-[50vh] my-1 '>
        <div style={carouselStyle} className='w-full cursor-pointer h-full group rounded-t-md'>
          <div style={gradientOverlay}></div>
          {/* <img onClick={prevSlide} src={leftarrow} className='hidden h-12 group-hover:block relative top-[140px] left-[10px] z-50 cursor-pointer' />
          <img onClick={nextSlide} src={rightarrow} className='hidden h-12 group-hover:block relative top-[100px] left-[-10px] z-50 float-right cursor-pointer' /> */}
        </div>
      </div>
    </Link>
  )

}

export default Carousal;
