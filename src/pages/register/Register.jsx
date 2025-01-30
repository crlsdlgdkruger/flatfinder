
import { useRef, useState } from 'react';
import { User } from '../../models/User';
import { UserService } from '../../services/UserService';
import "./register.css"
import { Toast } from 'primereact/toast';
import { UserForm } from '../../components/userForm/UserForm';

export const Register = () => {

  const [user, setUser] = useState(new User());
  const toast = useRef([]);

  const submitRegister = async (userToEdit) => {
    const service = new UserService();
    const data = await service.register({ ...userToEdit, favoriteFlats: [], role: "user" });
    if (data) {
      toast.current.show({ severity: 'success', summary: 'Success', detail: 'User created successfully, please login', life: 3000 });
      setTimeout(() => {
        window.location.href = "/login";
      }, 3000);
    } else {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Email already exists', life: 3000 });
    }
  }

  return (
    <div>
      <div className='register-container'>
        <Toast ref={toast} />
        <UserForm user={user} setUser={setUser} action={submitRegister} buttonAction="Register" />
        {/* redirect link */}
        <p>Already have an account? <a href='/login' className='redirect-link'>Sign In</a></p>
      </div>
    </div>
  )
}