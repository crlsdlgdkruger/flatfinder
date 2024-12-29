import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import "./login.css"

export const Login = () => {
  return (
    <div className='login-container'>
      <div className=''>
        <h2>Sign In</h2>

        {/* email input*/}
        <div>
          <label htmlFor="email">Email</label>
          <InputText id="email" value={""} onChange={(e) => { }} type='email' />
        </div>

        {/* password input */}
        <div>
          <label htmlFor="password">Password</label>
          <InputText id="password" value={""} onChange={(e) => { }} type='password' />
        </div>

        {/* login button */}
        <Button icon="pi pi-sign-in" label="Login" iconPos="right" />

        {/* redirect link */}
        <p>Don't have an account yet? <a href='/register' className='redirect-link'>Sign Up</a></p>
      </div>
    </div>
  )
}