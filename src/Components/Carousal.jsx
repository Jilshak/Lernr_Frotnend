import React, { useState } from "react";



function Carousal() {

    const carousal = [
      {
        url: 'https://media.istockphoto.com/id/534577083/photo/family-on-carousel-in-amusement-park.webp?b=1&s=612x612&w=0&k=20&c=wILwuWcPpPFIvoKboRYTP-u8wYZ8T7a5-MIqLHEu08A='
      },
      {
        url:'https://media.istockphoto.com/id/485036970/photo/cute-kids-having-fun-riding-on-a-colorful-carnival-carousel.webp?b=1&s=170667a&w=0&k=20&c=UhPLkbtaCw43dypZJsdbb0Akpd-BxCGHJ_1GJ_GUU40='
      },
      {
        url: 'https://media.istockphoto.com/id/534577083/photo/family-on-carousel-in-amusement-park.webp?b=1&s=612x612&w=0&k=20&c=wILwuWcPpPFIvoKboRYTP-u8wYZ8T7a5-MIqLHEu08A='
      },
      {
        url: 'https://media.istockphoto.com/id/534577083/photo/family-on-carousel-in-amusement-park.webp?b=1&s=612x612&w=0&k=20&c=wILwuWcPpPFIvoKboRYTP-u8wYZ8T7a5-MIqLHEu08A='
      }
    ]
  
    const [currentIndex, setCurrentIndex] = useState(3);
  
    const prevSlide = () => {
      const isFirstSlide = currentIndex === 0;
      const newIndex = isFirstSlide ? carousal.length - 1 : currentIndex - 1;
      setCurrentIndex(newIndex);
    }
  
    const nextSlide = () => {
      const isLastSlide = currentIndex == carousal.length - 1;
      const newIndex = isLastSlide ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
    }
  
    return (
      <div className='w-full flex justify-center items-center h-[40vh]'>
        <div style={{ backgroundImage: `url(${carousal[currentIndex].url})` }} className='w-11/12 cursor-pointer h-[30vh] bg-cover group rounded-md'>
          {/* left arrow */}
          <button onClick={prevSlide} className='hidden group-hover:block relative top-[95px]  left-[-30px] cursor-pointer'>left</button>
          {/* right arrow */}
          <button onClick={nextSlide} className='hidden group-hover:block relative top-[40px] h-auto left-[30px] float-right cursor-pointer'>right</button>
  
        </div>
      </div>
    )
  }
  
  export default Carousal