import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserService } from '../../services/UserService';
import { LocalStorageService } from '../../services/LocalStorageService';
import Swal from 'sweetalert2';
import "./login.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const showErrorAlert = () => {
    Swal.fire({
      icon: 'error',
      title: 'Login Failed',
      text: 'Invalid email or password',
      confirmButtonColor: '#DC2626'
    });
  };

  const showSuccessAlert = () => {
    Swal.fire({
      icon: 'success',
      title: 'Login Successful',
      text: 'Welcome back!',
      confirmButtonColor: '#1D4ED8'
    }).then(() => {
      navigate("/home");
    });
  };

  const submitLogin = (e) => {
    e.preventDefault();
    login();
  };

  useEffect(() => {
    if (user.length > 0) {
      showSuccessAlert();
    } else if (submitted) {
      showErrorAlert();
    }
  }, [user]);

  const login = async () => {
    const service = new UserService();
    const us = await service.login(email, password);
    const localStorageService = new LocalStorageService();
    localStorageService.addLoggedUser(us);
    setUser(us);
    setSubmitted(true);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center p-6" style={{ backgroundImage: "url('images/ciudad11.jpg')" }}>
      <div className="bg-black bg-opacity-75 p-8 rounded-md shadow-md max-w-sm w-full text-white relative">
        <div className="absolute top-8 left-0 w-full h-20 bg-white flex items-center justify-center">
          <img src="images/logo.png" alt="Logo" className="h-12 w-auto" />
        </div>
        <h2 className="text-2xl font-bold mt-28 mb-6 text-center text-sky-500">Sign In</h2>
        <form onSubmit={submitLogin} className="flex flex-col gap-4">
          <div className="w-full">
            <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-300">Email</label>
            <input 
              id="email" 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full p-3 rounded-md border border-gray-500 text-black" 
              required 
            />
          </div>
          <div className="w-full">
            <label htmlFor="password" className="block text-sm font-medium mb-1 text-gray-300">Password</label>
            <input 
              id="password" 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full p-3 rounded-md border border-gray-500 text-black" 
              required 
            />
          </div>
          <div className="mt-8">
            <button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md">
              Login
            </button>
          </div>
          <p className="mt-4 text-sm text-center">
            Don't have an account yet? <a href='/register' className='text-blue-400 hover:underline'>Sign Up</a>
          </p>
        </form>
      </div>
    </div>
  );
};
