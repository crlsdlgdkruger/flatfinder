import { useEffect, useState } from "react";
import { LocalStorageService } from "../../services/LocalStorageService";

export const UserForm = ({ user = {}, setUser, action, buttonAction }) => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [userToEdit, setUserToEdit] = useState(user);
  const [isUserLoggedAdmin, setIsUserLoggedAdmin] = useState(false);

  const submitUser = (e) => {
    e.preventDefault();
    if (validate()) {
      action(userToEdit);
    }
  };

  useEffect(() => {
    console.log("User to edit", userToEdit, "Errors", errors);
  }, [userToEdit, errors]);

  useEffect(() => {
    const localStorageService = new LocalStorageService();
    console.log("Is UserLogged admin", localStorageService.isAdmin());
    if (user) {
      setIsUserLoggedAdmin(localStorageService.isAdmin());
    }
  }, []);

  const validate = () => {
    const errors = {};
    if (!userToEdit.firstName || userToEdit.firstName.length < 2) errors.firstName = "First name must be at least 2 characters";
    if (!userToEdit.lastName || userToEdit.lastName.length < 2) errors.lastName = "Last name must be at least 2 characters";
    if (!userToEdit.birthDate) {
      errors.birthDate = "Birth date is required";
    } else {
      const birthDate = new Date(userToEdit.birthDate);
      const age = new Date().getFullYear() - birthDate.getFullYear();
      if (age < 18 || age > 120) {
        errors.birthDate = "Age must be between 18 and 120 years";
      }
    }
    if (!userToEdit.email || !/\S+@\S+\.\S+/.test(userToEdit.email)) errors.email = "Invalid email format";
    if (!userToEdit.password || userToEdit.password.length < 6) errors.password = "Password must be at least 6 characters";
    if (!/[A-Za-z]/.test(userToEdit.password) || !/[0-9]/.test(userToEdit.password) || !/[^A-Za-z0-9]/.test(userToEdit.password)) {
      errors.password = "Password must include letters, numbers, and a special character";
    }
    if ((userToEdit.password !== confirmPassword) && buttonAction === "Register") errors.confirmPassword = "Passwords do not match";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <div className="bg-black bg-opacity-30 p-6 sm:p-8 rounded-md shadow-md max-w-5xl w-full text-white">
      <form onSubmit={submitUser} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* First Name */}
        <div>
          <label htmlFor="first-name" className="block text-sm font-medium mb-2 text-gray-300">First Name</label>
          <input id="first-name" value={userToEdit.firstName} onChange={(e) => setUserToEdit({ ...userToEdit, firstName: e.target.value })} className="w-full p-2 sm:p-2.5 rounded-md border border-gray-500 text-black" />
          {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
        </div>

        {/* Last Name */}
        <div>
          <label htmlFor="last-name" className="block text-sm font-medium mb-2 text-gray-300">Last Name</label>
          <input id="last-name" value={userToEdit.lastName} onChange={(e) => setUserToEdit({ ...userToEdit, lastName: e.target.value })} className="w-full p-2 sm:p-2.5 rounded-md border border-gray-500 text-black" />
          {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
        </div>

        {/* Birth Date */}
        <div>
          <label htmlFor="birth-date" className="block text-sm font-medium mb-2 text-gray-300">Birth Date</label>
          <input id="birth-date" type="date" value={userToEdit.birthDate} onChange={(e) => setUserToEdit({ ...userToEdit, birthDate: e.target.value })} className="w-full p-2 sm:p-2.5 rounded-md border border-gray-500 text-black" />
          {errors.birthDate && <p className="text-red-500 text-sm">{errors.birthDate}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-300">Email</label>
          <input id="email" type="email" value={userToEdit.email} onChange={(e) => setUserToEdit({ ...userToEdit, email: e.target.value })} className="w-full p-2 sm:p-2.5 rounded-md border border-gray-500 text-black" />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-2 text-gray-300">Password</label>
          <input id="password" type="password" value={userToEdit.password} onChange={(e) => setUserToEdit({ ...userToEdit, password: e.target.value })} className="w-full p-2 sm:p-2.5 rounded-md border border-gray-500 text-black" />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>

        {/* Confirm Password */}
        {buttonAction === "Register" && (
          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium mb-2 text-gray-300">Confirm Password</label>
            <input id="confirm-password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full p-2 sm:p-2.5 rounded-md border border-gray-500 text-black" />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
          </div>
        )}

        {/* Submit Button */}
        <div className="col-span-1 sm:col-span-2 mt-4">
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 sm:py-3 px-4 rounded-md">
            {buttonAction}
          </button>
        </div>
      </form>
    </div>
  );
};
