import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import styles from './UserNav.module.css';

function UserNav({user, handleLogout}) {

  //define state in hook component
  //clickedOnUserNav is a boolean, handleUserNavClick will toggle that boolean
  const [clickedOnUserNav, handleUserNavClick] = useState(false);

  return (
    <div className={styles.userNav}  onClick={() => handleUserNavClick(!clickedOnUserNav)}>
      {/* only show user icon if logged in */}
      {user ? 
          <div>
            <Link to="/robots" onClick={() => handleUserNavClick(!clickedOnUserNav)} className={styles.userAccess}>
              {user.name[0].toUpperCase()}
            </Link>
             {/* if user has clicked on user icon, show menu */}
            {clickedOnUserNav && 
              <div className={styles.userMenu}>
                <Link to="/user" className={styles.userMenuOption}>My Account</Link>
                <Link to="/robots" onClick={handleLogout} className={styles.userMenuOption}>Logout</Link>
              </div>
          }
            </div>
        :
        // allow user to login
        <div>
          <Link to="/login" className={styles.login}>LOGIN</Link>
        </div>
    }
    </div>
  );
};

export default UserNav;