export default function TripCard({owner = null, data, handleClick=null}) {

    // console.log(data);
    owner ? owner : owner = data.owner_name

    const inputDate = new Date('2023-07-18 13:06:17');
    const options = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    month: 'long',
    day: 'numeric',
    year: 'numeric'
    };

    if (handleClick === null) { 
        handleClick = function (d){
            return
        }
    }


    const formatter = new Intl.DateTimeFormat('en-US', options);
    const formatted_time_start = formatter.format(new Date (data.time_start));
    const formatted_time_end = formatter.format(new Date (data.time_end));
    
    return (
        <div onClick={() => handleClick(data)}className="trip-card mb-3  bg-red-400 border-2 border-gray-600 text-gray-800 rounded">
            <div className="col-span-1 row-span-2 rounded ">
                <img className="p-1" src={data.image_url} />
            </div>
            <div className="col-span-1 flex items-center justify-center ">
                <p className="border-gray-600 border-b-2">{data.name}</p>
            </div>
            <div className="col-span-1 flex items-center justify-center ">
                <p className="border-gray-600 border-b-2">{owner}</p>
            </div>
            <div className="col-span-1 flex items-center justify-center ">
                <p className="border-gray-600 border-b-2">{data.location}</p>
            </div>
            <div className="col-span-1 flex items-center justify-center ">
                <p className="border-gray-600 border-b-2">{data.distance} miles</p>
            </div>
            <div className="col-span-3 m-2 border-gray-600 border-b-2">
                <p>{data.description}</p>
            </div>
            <div className="col-span-1 flex items-end justify-start">
                <p className="text-xs">{formatted_time_start}</p>
            </div>
            <div className="col-span-1 flex items-end justify-center">
                <p className="text-xs">{"----->"} </p>
            </div>
            <div className="col-span-1 flex items-end justify-start">
                <p className="text-xs">{formatted_time_end}</p>
            </div>
        </div>
    )
}