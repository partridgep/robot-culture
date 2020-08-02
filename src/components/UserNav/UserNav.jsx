import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import styles from './UserNav.module.css';

function UserNav({user, robots, handleLogout}) {

  //define state in hook component
  //clickedOnUserNav is a boolean, handleUserNavClick will toggle that boolean
  const [clickedOnUserNav, handleUserNavClick] = useState(false);

  function getNumNotifications() {
    let num = 0;
    for (var robot of robots) {
      if (!robot.approved) num++;
    }
    return num;
  }

  return (
    <div className={styles.userNav}  onClick={() => handleUserNavClick(!clickedOnUserNav)}>
      {/* only show user icon if logged in */}
      {user ? 
          <div style={{position: "relative"}}>
          {user.admin && getNumNotifications() &&
            <div className={styles.notification}>
              {getNumNotifications()}
              </div>
          }
            <Link to="/robots" onClick={() => handleUserNavClick(!clickedOnUserNav)} className={styles.userAccess}>
              {user.name[0].toUpperCase()}
            </Link>
             {/* if user has clicked on user icon, show menu */}
            {clickedOnUserNav && 
              <div className={styles.userMenu}>
                <Link to="/user" className={styles.userMenuOption}>My Account</Link>
                {user.admin && <Link to="/admin" className={styles.userMenuOption}>Updates</Link>}
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