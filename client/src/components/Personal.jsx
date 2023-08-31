import { NavLink } from "react-router-dom"
import TripCard from "./TripCard";

function Personal({user}) {

    console.log(user);
    if (!(user)) {
        return (
            <>
            <h1>Please login to view peresonal page</h1>
            <NavLink to={"../login"} >Log In</NavLink>
            </>
        )
    }

    return (
        <div className="flex mt-2 flex-col items-center">
            <div className="grid-container">
                <div className="rounded-full relative bg-gray-400 col-span-2 row-span-3">
                    <img className="image-center " src="http://placehold.it" alt="test"/>
                </div>
                <div className="flex items-center justify-center border-2 col-span-3">
                    <p className="">{user.username}</p>
                </div>
                <div className="flex items-center justify-center border-2 col-span-3">
                    <p className="">{user.location}</p>
                </div>
                <div className="flex items-center justify-center border-2 col-span-3">
                    <p className="">{user.distance_traveled} miles traveled</p>
                </div>
                <div className="border-2 col-span-5 auto-rows-min">
                    <h1 className="font-bold mx-6 my-3">Bio</h1>
                    {/* <p className="text-justify mx-6 mb-3">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est repudiandae amet suscipit mollitia. Officia quidem quaerat nesciunt earum officiis magni impedit corporis voluptas dicta harum dolorem voluptate dolore fugiat doloremque vero, at perferendis reprehenderit voluptatem quae? Omnis nemo unde magnam!</p> */}
                    <p className="text-justify mx-6 mb-3">{user.personal_bio}</p>

                </div>
                <div className="col-span-5 auto-rows-min">
                    <h1 className="font-bold mx-6 my-3">Trips </h1>
                    <TripCard />
                    {/* <TripCard />
                    <TripCard />
                    <TripCard />
                    <TripCard /> */}
                </div>
            </div>
        </div>
    )
}

export default Personal