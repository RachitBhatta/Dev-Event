'use server';
import connectDB from "../mongodb";
import Event from "@/database/event.model"
export const getSimilarEventsBySlug=async(slug:string)=>{
    try {
        await connectDB();
        const event =await Event.findOne({slug});
        if(!event){
            return [];
        }
        if(!event.tags || !Array.isArray(event.tags) || event.tags.length === 0){
        return [];
    }
        return await Event.find({
            _id:{$ne: event._id},
            tags:{$in: event.tags}}).lean();
    } catch (error) {
        console.error(error);
        return [];
    }
}