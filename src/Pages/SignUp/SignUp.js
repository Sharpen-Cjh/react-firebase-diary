import React, { useState } from 'react';
import styles from './SignUp.module.css';

import useSignup from '../../hooks/useSignup';

export default function SignUp() {
  const [email ,setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisPlayName] = useState('');

  const { error, isPending, signup } = useSignup();


  const handleData = (event) => {
    if(event.target.type ==='email') {
      setEmail(event.target.value);
    } else if (event.target.type === 'password') {
      setPassword(event.target.value);
    } else {
      setDisPlayName(event.target.value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    signup(email, password, displayName);
  };

  return (
    <form className={styles.signup_form} onSubmit={handleSubmit}>
      <fieldset>
        <legend>회원가입</legend>
        <label htmlFor='myEmail'>email :</label>
        <input type="email" id="myEmail" required value={email} onChange={handleData} />

        <label htmlFor='myPassWord'>password :</label>
        <input type="password" id="myPassword" required value={password} onChange={handleData} />

        <label htmlFor='myNickName'>닉네임:</label>
        <input type="text" id="myNickName" required value={displayName} onChange={handleData} />

        <button type='submit' className={styles.btn}>회원가입</button>
      </fieldset>
    </form>
  )
}
