import Explorebtn from '@/components/Explorebtn'
import EventCard from '@/components/EventCard'
import events from '@/lib/constants'
const page = () => {
  return (
    <section>
      
      <h1 className='text-center '>
          The Hub for every Dev.<br />Event You Can't Miss
      </h1>
      <Explorebtn/>

      <div className='mt-20 space-y-7'>
        <h3>Featured Events</h3>
        <ul className='events'>
          {events.map((event)=>(
            <li key={event.title}>
              <EventCard {...event}/>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default page
