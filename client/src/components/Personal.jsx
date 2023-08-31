import { NavLink } from "react-router-dom"

function Personal({user}) {

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
            <div className="grid grid-cols-5 grid-flow-row gap-4">
                <div className="w-24 rounded-full relative bg-gray-400 col-span-2 row-span-3">
                    <img className="image-center" src="http://placehold.it" alt="test"/>
                </div>
                <div className="col-span-3 px-16">
                    <p className="bg-gray-400">Name</p>
                </div>
                <div className="col-span-3 px-16">
                    <p className="bg-gray-400">location</p>
                </div>
                <div className="col-span-3 px-16">
                    <p className="bg-gray-400">distance_traveled</p>
                </div>
                <div className="col-span-5 auto-rows-min">
                    <p className="bg-gray-400">Bio</p>
                    <p className="bg-gray-400">Bio</p>
                    <p className="bg-gray-400">Bio</p>
                    <p className="bg-gray-400">Bio</p>
                </div>
                <div className="col-span-5 auto-rows-min">
                    <p className="bg-gray-400">Trips</p>
                    <p className="bg-gray-400 ">Trips</p>
                    <p className="bg-gray-400 ">Trips</p>
                    <p className="bg-gray-400 ">Trips</p>
                    <p className="bg-gray-400 ">Trips</p>
                </div>
            </div>
        </div>
    )
}

export default Personal