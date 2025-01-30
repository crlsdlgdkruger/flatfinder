import { useState } from 'react';
import { User } from '../../models/User';
import { UserService } from '../../services/UserService';
import { UserForm } from '../../components/userForm/UserForm';
import Swal from 'sweetalert2';

export const Register = () => {
  const [user, setUser] = useState(new User());

  const submitRegister = async (userToEdit) => {
    const service = new UserService();
    const data = await service.register({ ...userToEdit, favoriteFlats: [], role: "user" });

    if (data) {
      Swal.fire({
        icon: 'success',
        title: 'User Created',
        text: 'User created successfully, please login!',
        confirmButtonColor: '#1D4ED8',
      }).then(() => {
        window.location.href = "/login";
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Email already exists!',
        confirmButtonColor: '#DC2626',
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center p-4 sm:p-6" style={{ backgroundImage: "url('images/ciudad11.jpg')" }}>
      <div className="bg-black bg-opacity-75 p-6 sm:p-8 rounded-md shadow-lg max-w-lg sm:max-w-2xl w-full text-white min-h-[300px] relative">
        <div className="absolute top-6 sm:top-12 left-0 w-full h-14 sm:h-16 bg-white flex items-center justify-center">
          <img
            src="images/logo.png"
            alt="Logo"
            className="h-10 sm:h-12 w-auto"
          />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold mt-24 sm:mt-28 mb-4 sm:mb-6 text-center text-sky-500">Create Account</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <UserForm user={user} setUser={setUser} action={submitRegister} buttonAction="Register" />
        </div>
        <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-center">
          Already have an account?{' '}
          <a href="/login" className="text-blue-400 hover:underline">Sign In</a>
        </p>
      </div>
    </div>
  );
};
