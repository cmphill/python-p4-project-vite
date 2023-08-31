import {NavLink, Outlet} from 'react-router-dom';


function Layout({user}) {

        return( 

        <div className = 'Layout'>
            <header>
                <div className="NavBar">
                    <nav className="flex place-content-between m-4 px-4">
                        <div>
                            <img src='./assets/logo.png'/>
                        </div>
                        <div className='header-container flex gap-3 place-content-evenly'>
                            <NavLink to="/">Home</NavLink>
                            <NavLink to="community"> Community </NavLink>
                            <NavLink to="personal"> Personal </NavLink>
                            {user ? <a>Log Out</a> : <NavLink to="login"> Log In </NavLink>}
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

export default Layout;