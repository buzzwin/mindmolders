import React, { PropTypes } from 'react';


const Header = ({authenticated, signOut}) => {
  return (
    <header className="header">
      <div className="g-row">
        <div className="g-col">
          <h1 className="header__title">Mentoris</h1>
          <ul className="header__actions">
            
            
            {authenticated ? <li><button className="btn" onClick={signOut}>My Mentors</button></li> : null}
            
            {authenticated ?  <li><a className="link link--user" href="https://github.com/buzzwin/"></a></li> : null}
            
            {authenticated ?  <li><a className="link link--calendar" href="https://github.com/buzzwin/"></a></li> : null}
            
            {authenticated ?  <li><a className="link link--bell" href="https://github.com/buzzwin/"></a></li>  : null}
            
             
            
            {authenticated ? <li><button className="btn" onClick={signOut}>Sign out</button></li> : null}
            
          </ul>
        </div>
      </div>
      
    </header>
  );
};

Header.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired
};

export default Header;
