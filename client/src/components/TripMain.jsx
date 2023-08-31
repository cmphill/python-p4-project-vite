import TripCard from "./TripCard"
import { useLoaderData } from "react-router-dom";

export default function TripMain(){
    const data = useLoaderData();
    
    return (
        <div>
            {data.map( trip => (
                <TripCard key={trip.id} data={trip} />
            ))}
        </div>
    )
}

export const tripLoader = async () => {
    const res = await fetch('/api/trips');
    if (res.ok) {
        return res.json()
    }
}