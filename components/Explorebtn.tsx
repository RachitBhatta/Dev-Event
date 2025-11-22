'use client';
import Image from "next/image";
const Explorebtn = () => {
  return (
      <button type="button" id="explore-btn" className="mt-7 mx-auto" onClick={()=>{console.log("Button Clicked")}}>
        <a href="#events">
            Explore Events
            <Image src="/icons/arrow-down.svg" alt="arrow-down" width={24} height={24} />
        </a>
      </button>
  )
}

export default Explorebtn
