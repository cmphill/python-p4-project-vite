import { useNavigate } from 'react-router-dom'

function Home() {
    const navigate = useNavigate()
    return (
    <> 
        <div className="hero min-h-screen" style={{backgroundImage: 'url(https://cdn.sanity.io/images/xl8ls2xi/production/990da82d40bdda096cadf5e6f2d8b8c909848251-1999x1333.jpg?q=85&auto=format)'}}>
            <div className="hero-overlay bg-opacity-80"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold text-red-300"> Triply</h1>
                    <h1 className="mb-5 text-3xl font-bold text-red-300">Where Every Trip Tells a Story </h1>
                    <hr className='font-bold text-red-300'/>
                    <br />
                    <p className="mb-5 text-xl text-red-300">Triply is not just another social media platform – it's a thriving community of commuters like you! Share the daily journeys that bring excitement to your life, whether it's discovering hidden gems on your bike, taking serene walks through the city, or enjoying the wind in your hair on a scooter. Connect with fellow travelers, inspire one another, and make every commute count.</p>
                    <button onClick={() =>navigate("/community")}className="btn bg-red-500">Get Started</button>
                </div>
            </div>
        </div>
    </>
    )
}

export default Home