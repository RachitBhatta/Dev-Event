'use server';
import { Document } from "mongoose";
import connectDB from "../mongodb";
import Event, { IEvent } from "@/database/event.model";

// Type for lean event documents (plain objects without Mongoose methods)
type LeanEvent = Omit<IEvent, keyof Document>;

export const getSimilarEventsBySlug = async (slug: string): Promise<LeanEvent[]> => {
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