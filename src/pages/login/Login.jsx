import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Messages } from 'primereact/messages';
import { useContext, useEffect, useRef, useState } from 'react';
import { UserService } from '../../services/UserService';
import UserContext from '../../context/UserContext';

import "./login.css"

export const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, updateUser } = useContext(UserContext);
  const [submitted, setSubmitted] = useState(false);
  const msgs = useRef([]);

  const addContentErrorMessage = () => {
    clearMessages();
    msgs.current.show({ severity: 'error', summary: 'Error', detail: 'Invalid email or password', closable: true });
  }

  const clearMessages = () => {
    msgs.current.clear();
  };

  const submitLogin = (e) => {
    e.preventDefault();
    login();
  }

  useEffect(() => {
    if (user.length > 0) {
      window.location.href = "/home";
    } else if (submitted) {
      addContentErrorMessage();
    }
    console.log('USER: ', user);
  }, [user]);

  const login = async () => {
    const service = new UserService();
    const user = await service.login(email, password);
    updateUser(user);
    setSubmitted(true);
  }


  return (
    <div>
      <div className='login-container'>
        <form className='' onSubmit={e => submitLogin(e)}>
          <h2>Sign In</h2>

          {/* email input*/}
          <div>
            <label htmlFor="email">Email</label>
            <InputText id="email" value={email} onChange={(e) => { setEmail(e.target.value); clearMessages(); }} type='email' />
          </div>

          {/* password input */}
          <div>
            <label htmlFor="password">Password</label>
            <Password id="password" value={password} onChange={(e) => { setPassword(e.target.value); clearMessages(); }} type='password' feedback={false} toggleMask />
          </div>

          {/* login button */}
          <Button icon="pi pi-sign-in" label="Login" iconPos="right" type='submit' />

          {/* redirect link */}
          <p>Don't have an account yet? <a href='/register' className='redirect-link'>Sign Up</a></p>
        </form>
      </div>
      <Messages ref={msgs} />
    </div>
  )
}