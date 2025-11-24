'use client';
import { createBooking } from "@/lib/actions/booking.action";
import posthog from "posthog-js";
import { useState } from "react";
const BookEvent = ({eventId,slug}:{eventId:string,slug:string}) => {
    const [email,setEmail]=useState('');
    const [isSubmitted,setisSubmitted]=useState(false);
    const handleSubmit=async(e:React.FormEvent)=>{
        e.preventDefault();

        const {success}= await createBooking({eventId,slug,email});
        if(success){
          setisSubmitted(true);
          posthog.capture('event booked',{eventId,slug,email});
        }else{
          console.error("Booking Submission Failed");
          posthog.captureException('booking creation failed');
        }

    }
    return (
    <div className="book-event">
      {isSubmitted?(
        <p className="text-sm">Thank you for signing up!</p>
      ):(
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">Email Address</label>
                <input 
                    type="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    id="email"
                    placeholder="Enter your email address"
                />
            </div>
            <button type="submit" className="button-submit">Submit</button>
        </form>
      )}
    </div>
  )
}

export default BookEvent
