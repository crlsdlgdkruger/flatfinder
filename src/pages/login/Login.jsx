import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { useContext, useEffect, useRef, useState } from 'react';
import { UserService } from '../../services/UserService';
import UserContext from '../../context/UserContext';

import { useNavigate } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import { LocalStorageService } from '../../services/LocalStoraeService';
import "./login.css"

export const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const { user, updateUser } = useContext(UserContext);
  const [user, setUser] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const toast = useRef([]);

  const addContentErrorMessage = () => {
    clearMessages();
    toast.current.show({ severity: 'error', summary: 'Error', detail: 'Invalid email or password', closable: true });
  }

  const clearMessages = () => {
    toast.current.clear();
  };

  const submitLogin = (e) => {
    e.preventDefault();
    login();
  }

  useEffect(() => {
    if (user.length > 0) {
      navigate("/home");
    } else if (submitted) {
      addContentErrorMessage();
    }
  }, [user]);


  const login = async () => {
    const service = new UserService();
    const us = await service.login(email, password);
    // updateUser(us);
    const localStorageService = new LocalStorageService();
    localStorageService.addLoggedUser(us);
    setUser(us);
    setSubmitted(true);
  }


  return (
    <div>
      <div className='login-container'>
        <Toast ref={toast} />
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
    </div>
  )
}