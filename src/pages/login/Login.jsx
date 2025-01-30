import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { useContext, useEffect, useRef, useState } from 'react';
import { UserService } from '../../services/UserService';
import UserContext from '../../context/UserContext';

import { useNavigate } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import { LocalStorageService } from '../../services/LocalStorageService';
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
    <div className='page-wrapper'>
      <div className='login-container glass-background'>
        <Toast ref={toast} />
        <form className='' onSubmit={e => submitLogin(e)}>
          <h2 className='login-title'>Sign In</h2>

          {/* email input*/}
          <div className='input-container-login '>
            <label htmlFor="email" className='input-label'>Email</label>
            <InputText id="email" value={email} onChange={(e) => { setEmail(e.target.value); clearMessages(); }} type='email' className='input-email' />
          </div>

          {/* password input */}
          <div className='input-container-login'>
            <label htmlFor="password" className='input-label'>Password</label>
            <Password id="password" value={password} onChange={(e) => { setPassword(e.target.value); clearMessages(); }} type='password' feedback={false} toggleMask />
          </div>

          {/* login button */}
          <Button icon="pi pi-sign-in" label="Login" iconPos="right" type='submit' className='login-button' />

          {/* redirect link */}
          <p>Don't have an account yet? <a href='/register' className='redirect-link'>Sign Up</a></p>
        </form>
      </div>
    </div>
  )
}