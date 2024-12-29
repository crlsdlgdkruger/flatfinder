import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import "./register.css"

export const Register = () => {
  return (
    <div className='register-container'>
      <div className=''>
        <h2>Sign Up</h2>

        {/* First name input */}
        <div>
          <label htmlFor="first-name">First Name</label>
          <InputText id="first-name" value={""} onChange={(e) => { }} type='text' />
        </div>

        {/* last name input */}
        <div>
          <label htmlFor="last-name">Last Name</label>
          <InputText id="last-name" value={""} onChange={(e) => { }} type='text' />
        </div>

        {/* birth date input */}
        <div>
          <label htmlFor="birth-date">Birth Date</label>
          <Calendar id="birth-date" value={""} onChange={(e) => { }} dateFormat="dd/mm/yy" />
        </div>

        {/* email input */}
        <div>
          <label htmlFor="email">Email</label>
          <InputText id="email" value={""} onChange={(e) => { }} type='email' />
        </div>

        {/* password input */}
        <div>
          <label htmlFor="password">Password</label>
          <InputText id="password" value={""} onChange={(e) => { }} type='password' />
        </div>

        {/* confirm password input */}
        <div>
          <label htmlFor="confirm-password">Confirm Password</label>
          <InputText id="confirm-password" value={""} onChange={(e) => { }} type='password' />
        </div>

        {/* register button  */}
        <Button icon="pi pi-user-plus" label="Register" iconPos="right" />

        {/* redirect link */}
        <p>Already have an account? <a href='/login' className='redirect-link'>Sign In</a></p>
      </div>
    </div>
  )
}