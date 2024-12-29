import { Button } from 'primereact/button';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import "./login.css"

export const Login = () => {
  return (
    <div className='login-container'>
      <div className=''>
        <h2>Sign In</h2>
        <FloatLabel>
          <InputText id="email" value={""} onChange={(e) => { }} />
          <label htmlFor="email">Email</label>
        </FloatLabel>
        <FloatLabel>
          <InputText id="password" value={""} onChange={(e) => { }} />
          <label htmlFor="password">Password</label>
        </FloatLabel>
        <Button icon="pi pi-sign-in" label="Login" iconPos="right" />
        <p>Don't have an account yet? <a href='/register' className='redirect-link'>Sign Up</a></p>
      </div>
    </div>
  )
}