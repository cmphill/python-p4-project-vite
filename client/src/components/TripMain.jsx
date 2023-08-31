import TripCard from "./TripCard"
import { useLoaderData } from "react-router-dom";

export default function TripMain(){
    const data = useLoaderData();
    
    return (
        <div className="flex justify-center">
            <div className="trip-container relative">
                <div className="col-span-1 trip-cards-container">
                    {data.map( trip => (
                        <TripCard key={trip.id} data={trip} />
                    ))}
                </div>
                <div className="comment-section border-2 border-black">
                    <p>Comments section</p>
                </div>
            </div>
        </div>
    )
}

export const tripLoader = async () => {
    const res = await fetch('/api/trips');
    if (res.ok) {
        return res.json()
    }
}