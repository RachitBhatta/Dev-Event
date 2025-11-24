'use server';
import connectDB from "../mongodb";
import { Booking } from "@/database";
export const createBooking=async({eventId,slug,email}:{eventId:string;slug:string;email:string;})=>{
    try {
        await connectDB();
        await Booking.create({eventId,slug,email});
        return {success:true}
    } catch (error) {
        console.error(error);
        return {success:false }
    }
}
export const getBookingCount=async(eventId:string):Promise<number>=>{
    try {
        await connectDB();
        const count=await Booking.countDocuments({eventId});
        return count;
    } catch (error) {
        console.error("Error fetching booking count",error)
        return 0;
    }
}