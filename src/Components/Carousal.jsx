import React, { useState } from "react";
import leftarrow from '../icons/leftarrow.png'
import rightarrow from '../icons/rightarrow.png'


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
        url: 'https://media.istockphoto.com/id/1420680732/photo/aerial-view-of-giant-wheels-at-indian-fair-ferris-wheel-in-mela-drone-view.webp?b=1&s=170667a&w=0&k=20&c=uV76QqpbJICQ3PVBR5mI4NzCURVi1G3iGXjvzsjGvbk='
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
        //add carousal images
      <div className='w-full flex justify-center items-center h-[40vh] mt-7'>
        <div style={{ backgroundImage: `url(${carousal[currentIndex].url})` }} className='w-full cursor-pointer h-full bg-cover group rounded-md'>
          {/* left arrow */}
          <img onClick={prevSlide} src={leftarrow} className='hidden h-12 group-hover:block relative top-[120px]  left-[10px] cursor-pointer'/>
          {/* right arrow */}
          <img onClick={nextSlide} src={rightarrow} className='hidden h-12 group-hover:block relative top-[60px] left-[-10px] float-right cursor-pointer'/>
        
        </div>
      </div>
    )
  }
  
  export default Carousal