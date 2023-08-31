export default function TripCard({data}) {


    return (
        <div className="trip-card border-2">
            <div className="col-span-1">
                <p>trip name</p>
            </div>
            <div className="">
                <p>owner name</p>
            </div>
            <div>
                <p>description</p>
            </div>
            <div>
                <p>location</p>
            </div>
            <div>
                <p>distance</p>
            </div>
            <div>
                <p>time-start</p>
                <p>time-end</p>
            </div>
        </div>
    )
}