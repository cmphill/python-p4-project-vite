
import {NavLink, Outlet} from 'react-router-dom';


function Layout() {
function Layout() {
    console.log('hello')

    return( 
    
    <div className = 'Layout'>
        <header>
        <div className="NavBar">
          <nav>
            <img src='./src/assets/Triply_logo.png' width={100}/>
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