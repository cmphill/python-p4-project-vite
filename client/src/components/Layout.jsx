import React from 'react';
import {NavLink, Outlet} from 'react-router-dom';
import Search from './Search.jsx';

function Layout() {
    console.log('hello')

    return( 
    
    <div className = 'Layout'>
        <header>
        <div className="NavBar">
          <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="community"> Community </NavLink>
            <NavLink to="personal"> Personal </NavLink>
            <NavLink to="login"> Sign Up </NavLink>
          </nav>
          <Search onSearchMemorabilia={onSearchMemorabilia} />
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