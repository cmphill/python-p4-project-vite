
import {NavLink, Outlet} from 'react-router-dom';


function CommunityLayout() {

    return( 

    <div className = 'CommunityLayout'>
        <header>
            <div className="PostsNavigtor">
                <nav className="flex place-content-between m-4 px-4">
                    <div className='header-container flex gap-3 place-content-evenly'>
                        <NavLink to='community-posts'> Community Posts </NavLink>
                        <NavLink to='trip-posts'> Trip Posts </NavLink>
                    </div>
                </nav>
            </div>
        </header>
        <main>
            <Outlet />
        </main>
            <p />
    </div>
    );
    
}

export default CommunityLayout;