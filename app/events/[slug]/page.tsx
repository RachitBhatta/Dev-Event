import { Suspense } from "react";
import EventDetails from "@/components/EventDetails";
const EventsDetailsPage = async({params}:{params:Promise<{slug:string}>}) => {
  const slug=params.then((param)=>param.slug);
  return(
    <main>
      <Suspense fallback={<div>...Loading</div>}>
        <EventDetails params={slug}/>
      </Suspense>
    </main>
  )
}


export default EventsDetailsPage;
