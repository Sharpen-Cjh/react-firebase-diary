import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';

import styles from './Nav.module.css';

export default function Nav() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  return (
    <nav className={styles.nav}>
      <h1 className={styles.title}>비밀 일기</h1>
      <ul className={styles.list_nav}>
      {!user &&
        <>
          <Link to='/Login'>로그인</Link>
          <Link to='SignUp'>가입하기</Link>
        </>
       }
       {user &&
        <li>
          <strong>환영합니다 {user.displayName}님!</strong>
            <button type="button" onClick={logout}>로그아웃</button>
        </li>
       }
      </ul>
    </nav>
  )
}
