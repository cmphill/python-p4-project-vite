import {NavLink, Outlet} from 'react-router-dom';


function Layout() {

    return( 

    <div className = 'Layout'>
        <header>
        <div className="NavBar">
          <nav>
            {/* <img src='./assets/logo.png'/> */}
            <NavLink to="/">Home</NavLink>
            <NavLink to="community"> Community </NavLink>
            <NavLink to="personal"> Personal </NavLink>
            <NavLink to="login"> Log In </NavLink>
            <NavLink to="signup"> Sign Up </NavLink>
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