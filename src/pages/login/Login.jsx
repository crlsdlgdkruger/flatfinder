import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { useEffect, useState } from 'react';
import { UserService } from '../../services/UserService';

import "./login.css"

export const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitLogin = (e) => {
    e.preventDefault();
    console.log(email, password);
  }

  useEffect(() => {
    // getUsers();
  }, [])

  // const getUsers = async () => {
  //   const service = new UserService();
  //   const result = await service.getUsers();
  //   console.log('RESULTADO', result);
  // }


  return (
    <div className='login-container'>
      <form className='' onSubmit={e => submitLogin(e)}>
        <h2>Sign In</h2>

        {/* email input*/}
        <div>
          <label htmlFor="email">Email</label>
          <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)} type='email' />
        </div>

        {/* password input */}
        <div>
          <label htmlFor="password">Password</label>
          <Password id="password" value={password} onChange={(e) => setPassword(e.target.value)} type='password' feedback={false} toggleMask />
        </div>

        {/* login button */}
        <Button icon="pi pi-sign-in" label="Login" iconPos="right" type='submit' />

        {/* redirect link */}
        <p>Don't have an account yet? <a href='/register' className='redirect-link'>Sign Up</a></p>
      </form>
    </div>
  )
}