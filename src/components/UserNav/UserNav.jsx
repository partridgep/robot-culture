import React from 'react';
import { Link } from 'react-router-dom';
import styles from './UserNav.module.css';

const UserNav = ({user, handleLogout}) => {
  return (
    <div className={styles.userNav}>
      {user ? 
        <div>
          <Link onClick={handleLogout} className={styles.login}>LOGOUT</Link>
        </div>
        :
        <div>
          <Link to="/login" className={styles.login}>LOGIN</Link>
        </div>
    }
    </div>
  );
};

export default UserNav;