import { Event } from "@/database";
import connectDB from "@/lib/mongodb";
import {v2 as cloudinary} from "cloudinary"
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try {
        await connectDB();

        const formData=await req.formData();
        
        let events;
         //Get the images from user  as a file 
        const file =formData.get('image') as File;
        if(!file){
            return NextResponse.json({message:"Image is required"},{status:400});
        }
        
        try {
            events=Object.fromEntries(formData.entries())
        } catch (e) {
            return NextResponse.json({
                message:"Invalid JSON data format"
            },{
                status:400
            })
        }
        // converting it in to binary code and uploading it into cloudinary
        const arrayBuffer=await file.arrayBuffer();
        const buffer=Buffer.from(arrayBuffer);

        const uploadFile=await new Promise((resolve,reject)=>{
            cloudinary.uploader.upload_stream({resource_type:"image", folder:"Dev-Events"},(error,results)=>{
                if(error){
                    reject(error);
                }
                resolve(results)
            }).end(buffer);
        })
        events.image= (uploadFile as {secure_url:string}).secure_url;


    
        const createdEvent=await Event.create(events);
        return NextResponse.json(
            {message:"Event created Successfully",event:createdEvent},
            {status:201}
        )
    } catch (e) {
        return NextResponse.json({
            message:"Event Creation Failed",
            error:e instanceof Error? e.message:"Unknown"
        },{
            status:500
        })
    }
}
export async function GET(){
    try {
        await connectDB();
        const events= await Event.find().sort({createdAt:-1})
        return NextResponse.json({message:"Event fetched successfully",events},{status:200})
    } catch (e) {
        return NextResponse.json({
            message:'Event Fetching Failed',error:e},
            {
                status:500
            })
    }
}