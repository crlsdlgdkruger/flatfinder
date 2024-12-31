import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Password } from 'primereact/password';

import { useEffect, useRef, useState } from 'react';
import { User } from '../../models/User';
import { UserService } from '../../services/UserService';
import "./register.css"
import { Messages } from 'primereact/messages';

export const Register = () => {

  const [user, setUser] = useState(new User());
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const msgs = useRef([]);

  const submitRegister = async (e) => {
    e.preventDefault();
    if (validate()) {
      const service = new UserService();
      const data = await service.register(user);
      if (data) {
        addContentSuccessMessage();
        redirectLogin();
      } else {
        addContentErrorMessage();
      }
    }
  }

  const redirectLogin = () => {
    setTimeout(() => {
      window.location.href = "/login";
    }, 2000);
  }

  const validate = () => {
    const errors = {};
    if (!user.firstName) errors.firstName = "First name is required";
    if (!user.lastName) errors.lastName = "Last name is required";
    if (!user.birthDate) errors.birthDate = "Birth date is required";
    if (!user.email) errors.email = "Email is required";
    if (!user.password || user.password.length < 6) errors.password = "Password must be at least 6 characters";
    if (user.password !== confirmPassword) errors.confirmPassword = "Passwords do not match";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  const addContentErrorMessage = () => {
    clearMessages();
    msgs.current.show({ severity: 'error', summary: 'Error', detail: 'Email already exists', closable: true });
  }

  const addContentSuccessMessage = () => {
    clearMessages();
    msgs.current.show({ severity: 'success', summary: 'Success', detail: 'User created successfully, please login', closable: true });
  }

  const clearMessages = () => {
    msgs.current.clear();
  };

  return (
    <div>
      <div className='register-container'>
        <form className='' onSubmit={(e) => { submitRegister(e) }}>
          <h2>Sign Up</h2>

          {/* First name input */}
          <div>
            <label htmlFor="first-name">First Name</label>
            <InputText id="first-name" value={user.firstName} onChange={(e) => { setUser({ ...user, firstName: e.target.value }) }} type='text' />
            {errors.firstName && <small className="p-error">{errors.firstName}</small>}
          </div>

          {/* last name input */}
          <div>
            <label htmlFor="last-name">Last Name</label>
            <InputText id="last-name" value={user.lastName} onChange={(e) => { setUser({ ...user, lastName: e.target.value }) }} type='text' />
            {errors.lastName && <small className="p-error">{errors.lastName}</small>}
          </div>

          {/* birth date input */}
          <div>
            <label htmlFor="birth-date">Birth Date</label>
            <Calendar id="birth-date" value={user.birthDate} onChange={(e) => { setUser({ ...user, birthDate: e.target.value }) }} dateFormat="dd/mm/yy" />
            {errors.birthDate && <small className="p-error">{errors.birthDate}</small>}
          </div>

          {/* email input */}
          <div>
            <label htmlFor="email">Email</label>
            <InputText id="email" value={user.email} onChange={(e) => { setUser({ ...user, email: e.target.value }) }} type='email' />
            {errors.email && <small className="p-error">{errors.email}</small>}
          </div>

          {/* password input */}
          <div>
            <label htmlFor="password">Password</label>
            <Password id="password" value={user.password} onChange={(e) => { setUser({ ...user, password: e.target.value }) }} type='password' toggleMask />
            {errors.password && <small className="p-error">{errors.password}</small>}
          </div>

          {/* confirm password input */}
          <div>
            <label htmlFor="confirm-password">Confirm Password</label>
            <Password id="confirm-password" value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} type='password' toggleMask />
            {errors.confirmPassword && <small className="p-error">{errors.confirmPassword}</small>}
          </div>

          {/* register button  */}
          <Button icon="pi pi-user-plus" label="Register" iconPos="right" type='submit' />

          {/* redirect link */}
          <p>Already have an account? <a href='/login' className='redirect-link'>Sign In</a></p>
        </form>
      </div>
      <Messages ref={msgs} />
    </div>
  )
}