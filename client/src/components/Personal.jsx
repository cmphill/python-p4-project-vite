import { NavLink } from "react-router-dom"
import TripCard from "./TripCard";

function Personal({user}) {

    // console.log(user);
    if (!(user)) {
        return (
            <div className="flex mt-10 flex-col items-center justify-center">
                <h1 className="text-lg font-bold">Please login to view personal page</h1>
                <div className="btn mt-4 bg-red-400 text-black">
                    <NavLink to={"../login"} >Log In</NavLink>
                </div>
            </div>
        )
    }
    // console.log(user.signups[0].trips);

    return (
        <div className="flex mt-2 flex-col items-center">
            <div className="grid-container">
                <div className="image-center-container rounded-full relative bg-gray-400 col-span-2 row-span-3">
                    <img className="image-center " src={user.image_url} alt="test"/>
                </div>
                <div className="flex items-center justify-center border-2 rounded col-span-3">
                    <p className="">{user.username}</p>
                </div>
                <div className="flex items-center justify-center border-2 rounded col-span-3">
                    <p className="">{user.location}</p>
                </div>
                <div className="flex items-center justify-center border-2 rounded col-span-3">
                    <p className="">{user.distance_traveled} miles traveled</p>
                </div>
                <div className="border-2 col-span-5 auto-rows-min rounded">
                    <h1 className="font-bold mx-6 my-3">Bio</h1>
                    <p className="text-justify mx-6 mb-3 ">{user.personal_bio}</p>

                </div>
                <div className="col-span-5 auto-rows-min flex flex-col gap-3">
                    <h1 className="font-bold mx-6 my-3 border-b-2 border-red-500">Trips </h1>
                    {user.signups ? user.signups.map( signup => {
                        return <TripCard key={user.username + signup.name} owner={user.username} data={signup.trips}/>
                    }) : 
                    <p className="text-center font-bold"> This User Has No Trips </p>}

                </div>
            </div>
        </div>
    )
}

export default Personal