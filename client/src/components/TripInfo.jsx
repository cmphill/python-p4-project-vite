import { useState, useEffect } from "react";
import TripCommentCard from "./TripCommentCard.jsx";

export default function TripInfo({data}) {
    // console.log(data.signups);
    // console.log(data);
    
    const [exist, setExist] = useState(false);
    const [sBool, setSBool] = useState(false);
    const [cBool, setCBool] = useState(false);
    
    useEffect( () => {
        if (data) {
            setExist(true);
            if (data.signups.length !== 0) {
                setSBool(true);
            }
            else {
                setSBool(false);
            }
            if (data.trip_comments.length !== 0) {
                setCBool(true);
            }
            else {
                setCBool(false);
            }
        }
    }, [data])

    if (!exist) {
        return  (
            <div className="flex justify-center items-center mt-32 flex-col gap-10">
                <h1 className="text-xl font-bold text-gray-200"> No Card Selected! </h1>
                <p className="text-lg font-bold text-gray-200"> Please Click On a Trip Card</p>
            </div>
        )
    }

    return (
        <div className="p-4 grid grid-rows-2">
            <div className="text-lg text-gray-200 ">
                <p className="font-bold">Participants:</p>
                {sBool ? 
                <p className="text-gray-200">{data.signups.map( signup => (<span>  | {signup.users.username}  </span>))}</p> :
                <p>No Participants</p>}
            </div>
            <br />
            <div >
                <h1 className="text-gray-200 text-xl font-bold mb-2 border-b-2">Comments:</h1>
                <div className="overflow-y-auto flex flex-col gap-3">
                    {cBool ? data.trip_comments.map(tc => <TripCommentCard data={tc}/>) : <p className="text-lg text-gray-200 ">No Comments</p>}
                </div>
            </div>
          
        </div>
    )
}