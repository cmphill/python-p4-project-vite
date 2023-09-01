import TripCard from "./TripCard"
import { useLoaderData } from "react-router-dom";
import TripInfo from "./TripInfo";
import { useState } from "react";

export default function TripMain(){
    const data = useLoaderData();

    const [cData, setCData] = useState(null);
    function handleClick(d){
        setCData(d);
    }
    
    return (
        <div className="flex justify-center">
            <div className="trip-container relative">
                <div className="col-span-1 trip-cards-container">
                    {data.map( trip => (
                        <TripCard handleClick={handleClick} key={trip.id} data={trip} />
                    ))}
                </div>
                <div className="comment-section border-4 border-gray-200 rounded">
                    <TripInfo data={cData}/>
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