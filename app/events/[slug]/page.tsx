import { notFound } from "next/navigation";
import Image from "next/image";

const BASE_URL=process.env.NEXT_PUBLIC_BASE_URL;
const EventsDetailsItems=({icon,alt,label}:{icon:string,alt:string,label:string})=>{
  return(
  <div className="felx-row-gap-2 items-center">
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
const EventsDetailsPage = async({params}:{params:Promise<{slug:string}>}) => {
  const {slug}=await params;
  const request =await fetch(`${BASE_URL}/api/events/${slug}`);
  const {event:{description,title,image,agenda,venue,location,time,audience,organizer,overview,date,mode,tags}}= await request.json();
  if(!description){
    return notFound();
  }
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
              return JSON.parse(agenda[0])
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
              return JSON.parse(tags[0])
            } catch (e) {
              console.error(e);
              return [];
            }
            })()}/>
        </div>

        

        {/* Right side -- booking area */}
          <aside>
            <p className="text-lg font-semibold">Book Events</p>
          </aside>

      </div>
    </section>
  )
}

export default EventsDetailsPage;
