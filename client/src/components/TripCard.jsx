export default function TripCard({owner, data}) {

    // console.log(data);
    // console.log(owner);

    const inputDate = new Date('2023-07-18 13:06:17');
    const options = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    month: 'long',
    day: 'numeric',
    year: 'numeric'
    };

    const formatter = new Intl.DateTimeFormat('en-US', options);
    const formatted_time_start = formatter.format(new Date (data.time_start));
    const formatted_time_end = formatter.format(new Date (data.time_end));
    
    return (
        <div className="trip-card bg-red-200 border-2 rounded">
            <div className="col-span-1 row-span-2 rounded ">
                <img className="p-1" src={data.image_url} />
            </div>
            <div className="col-span-1 flex items-center justify-center">
                <p>{data.name}</p>
            </div>
            <div className="col-span-1 flex items-center justify-center">
                <p>{owner}</p>
            </div>
            <div className="col-span-1 flex items-center justify-center">
                <p>{data.location}</p>
            </div>
            <div className="col-span-1 flex items-center justify-center">
                <p>{data.distance} miles</p>
            </div>
            <div className="col-span-3 m-2">
                <p>{data.description}</p>
            </div>
            <div className="col-span-1 flex items-end justify-start">
                <p className="text-xs">{formatted_time_start}</p>
            </div>
            <div className="col-span-1 flex items-end justify-center">
                <p className="text-xs">{" ----->"} </p>
            </div>
            <div className="col-span-1 flex items-end justify-start">
                <p className="text-xs">{formatted_time_end}</p>
            </div>
        </div>
    )
}