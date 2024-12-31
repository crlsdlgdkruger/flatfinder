import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Password } from 'primereact/password';

import { User } from '../../models/User';
import { useState } from 'react';
import "./register.css"
import { UserService } from '../../services/UserService';

export const Register = () => {

  const [user, setUser] = useState(new User());
  const [confirmPassword, setConfirmPassword] = useState("");

  const submitRegister = async (e) => {
    e.preventDefault();
    // const service = new UserService();
    // const user = await service.register(user, confirmPassword);
    console.log(user);
  }

  return (
    <div className='register-container'>
      <form className='' onClick={(e) => { submitRegister(e) }}>
        <h2>Sign Up</h2>

        {/* First name input */}
        <div>
          <label htmlFor="first-name">First Name</label>
          <InputText id="first-name" value={user.firstName} onChange={(e) => { setUser({ ...user, firstName: e.target.value }) }} type='text' required />
        </div>

        {/* last name input */}
        <div>
          <label htmlFor="last-name">Last Name</label>
          <InputText id="last-name" value={user.lastName} onChange={(e) => { setUser({ ...user, lastName: e.target.value }) }} type='text' required />
        </div>

        {/* birth date input */}
        <div>
          <label htmlFor="birth-date">Birth Date</label>
          <Calendar id="birth-date" value={user.birthDate} onChange={(e) => { setUser({ ...user, birthDate: e.target.value }) }} dateFormat="dd/mm/yy" required />
        </div>

        {/* email input */}
        <div>
          <label htmlFor="email">Email</label>
          <InputText id="email" value={user.email} onChange={(e) => { setUser({ ...user, email: e.target.value }) }} type='email' required />
        </div>

        {/* password input */}
        <div>
          <label htmlFor="password">Password</label>
          <Password id="password" value={user.password} onChange={(e) => { setUser({ ...user, password: e.target.value }) }} type='password' toggleMask required />
        </div>

        {/* confirm password input */}
        <div>
          <label htmlFor="confirm-password">Confirm Password</label>
          <Password id="confirm-password" value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} type='password' toggleMask required />
        </div>

        {/* register button  */}
        <Button icon="pi pi-user-plus" label="Register" iconPos="right" type='submit' />

        {/* redirect link */}
        <p>Already have an account? <a href='/login' className='redirect-link'>Sign In</a></p>
      </form>
    </div>
  )
}