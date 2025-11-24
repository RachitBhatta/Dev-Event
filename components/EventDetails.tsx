import { notFound } from "next/navigation";
import Image from "next/image";
import BookEvent from "@/components/BookEvent";
import { IEvent } from "@/database";
import { getSimilarEventsBySlug } from "@/lib/actions/event.action";
import EventCard from "@/components/EventCard";
import { cacheLife } from "next/cache";
import { getBookingCount } from "@/lib/actions/booking.action";
const BASE_URL=process.env.NEXT_PUBLIC_BASE_URL;
const EventsDetailsItems=({icon,alt,label}:{icon:string,alt:string,label:string})=>{
  return(
  <div className="flex-row-gap-2 items-center">
    <Image src={icon} alt={alt} width={17} height={17} />
    <p>{label}</p>
  </div>
  )
};
const EventAgenda=({agendaItems}:{agendaItems:string[]})=>{
    return(
      <div className="agenda">
        <h2>Agenda</h2>
        <ul>
          {agendaItems.map((item)=>(
            <li key={item}>{item}</li>
          ))}</ul>
      </div>
    )  
    
}
const EventTags=({tags}:{tags:string[]})=>{
  return(
    <div className="flex flex-wrap gap-1.5 flex-row">
      {tags.map((tag)=>(
        <div className="pill" key={tag}>{tag}</div>
      ))}
    </div>
  )
}
const EventDetails = async({params}:{params:Promise<string>}) => {
    'use cache';
    cacheLife("hours");
  const slug=await params;
  if (!BASE_URL) {
    return notFound();
  }
  
  let event;
  try {
    const request = await fetch(`${BASE_URL}/api/events/${slug}`, {
      cache: 'no-store'
    });
  
    if (!request.ok) {
      return notFound();
    }
    
    const response = await request.json();
    event = response.data || response.event;
    
    if (!event || !event.description) {
      return notFound();
    }
  } catch (error) {
    console.error('Error fetching event:', error);
      return notFound();
  }
  const { description, title, image, agenda, venue, location, time, audience, organizer, overview, date, mode, tags } = event;
  const bookings=await getBookingCount(event._id);
  const similarEvents= await getSimilarEventsBySlug(slug);

  
  return (
    <section id='event'>
      <div className='header'>
        <h1>Event Description</h1>
        <p className="mt-2">{description}</p>
      </div>
      <div className="details">
        {/* Left side -- content area*/}
        <div className="content">
          <Image src={image} alt="Events Bannner" width={800} height={800} className='banner' />

          <section className="mt-4 flex-col-gap-2">
              <h2>Overview</h2>
              <p>{overview}</p>
          </section>
          <section className="flex-col-gap-2 mt-4">
            <h2>Events Details</h2>

            <EventsDetailsItems icon="/icons/calendar.svg" alt="Date" label={date}/>
            <EventsDetailsItems icon="/icons/clock.svg" alt="Time" label={time}/>
            <EventsDetailsItems icon="/icons/pin.svg" alt="Location" label={location}/>
            <EventsDetailsItems icon="/icons/mode.svg" alt="mode" label={mode}/>
            <EventsDetailsItems icon="/icons/audience.svg" alt="Audience" label={audience}/>
          </section>
          <EventAgenda  agendaItems={(()=>{
            try {
              return (agenda)
            } catch (error) {
              console.error(error);
              return [];
            }
          })()}/>
          <section className="flex-col-gap-2">
            <h2>About the Organizer</h2>
            <p>{organizer}</p>
          </section>
          <EventTags tags={(()=>{
            try {
              return (tags)
            } catch (e) {
              console.error(e);
              return [];
            }
            })()}/>
        </div>

        

        {/* Right side -- booking area */}
          <aside>
            <div className="signup-card">
                <h2>Book Your spot</h2>
                {bookings>0?(
                  <p className="text-sm">
                    Join {bookings} have already booked their spot
                  </p>
                ):(
                  <p className="text-sm">Be the first to book your spot</p>
                )}
                <BookEvent eventId={event._id} slug={slug}/>
            </div>
          </aside>

      </div>
    {similarEvents.length > 0 && (
        <div className="flex w-full flex-col gap-4 pt-20">
            <h2>Similar Events</h2>
            <div className="events">
                {similarEvents.map((similarEvent)=>(
                        <EventCard key={similarEvent.title} {...similarEvent}/>
                ))}
            </div>
        </div>
    )}    </section>
)}


export default EventDetails;
