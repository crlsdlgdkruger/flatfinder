import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { RadioButton } from "primereact/radiobutton";
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
  }

  useEffect(() => {
    console.log('User to edit', userToEdit, 'Errors', errors);
  }, [userToEdit, errors]);

  useEffect(() => {
    const localStorageService = new LocalStorageService();
    console.log('Is UserLogged admin', localStorageService.isAdmin());
    if (user) {
      setIsUserLoggedAdmin(localStorageService.isAdmin());
    }
  }, []);


  const validate = () => {
    const errors = {};
    if (!userToEdit.firstName) errors.firstName = "First name is required";
    if (!userToEdit.lastName) errors.lastName = "Last name is required";
    if (!userToEdit.birthDate) errors.birthDate = "Birth date is required";
    if (!userToEdit.email) errors.email = "Email is required";
    if (!userToEdit.password || userToEdit.password.length < 6) errors.password = "Password must be at least 6 characters";
    if ((userToEdit.password !== confirmPassword) && buttonAction === "Register") errors.confirmPassword = "Passwords do not match";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }


  return (
    <div className="user-form-container">
      <form onSubmit={(e) => { submitUser(e) }}>
        {/* First name input */}
        <div>
          <label htmlFor="first-name">First Name</label>
          <InputText id="first-name" value={userToEdit.firstName} onChange={(e) => { setUserToEdit({ ...userToEdit, firstName: e.target.value }) }} type='text' />
          {errors.firstName && <small className="p-error">{errors.firstName}</small>}
        </div>

        {/* last name input */}
        <div>
          <label htmlFor="last-name">Last Name</label>
          <InputText id="last-name" value={userToEdit.lastName} onChange={(e) => { setUserToEdit({ ...userToEdit, lastName: e.target.value }) }} type='text' />
          {errors.lastName && <small className="p-error">{errors.lastName}</small>}
        </div>

        {/* birth date input */}
        <div>
          <label htmlFor="birth-date">Birth Date</label>
          <Calendar id="birth-date" value={userToEdit.birthDate} onChange={(e) => { setUserToEdit({ ...userToEdit, birthDate: e.target.value }) }} dateFormat="dd/mm/yy" />
          {errors.birthDate && <small className="p-error">{errors.birthDate}</small>}
        </div>

        {/* email input */}
        {buttonAction === "Update" &&
          <div>
            <label htmlFor="email">Email</label>
            <InputText id="email" disabled value={userToEdit.email} onChange={(e) => { setUserToEdit({ ...userToEdit, email: e.target.value }) }} type='email' />
            {errors.email && <small className="p-error">{errors.email}</small>}
          </div>}

        {buttonAction === "Register" &&
          <div>
            <label htmlFor="email">Email</label>
            <InputText id="email" value={userToEdit.email} onChange={(e) => { setUserToEdit({ ...userToEdit, email: e.target.value }) }} type='email' />
            {errors.email && <small className="p-error">{errors.email}</small>}
          </div>}

        {/* password input */}
        {buttonAction === "Register" &&
          <div>
            <label htmlFor="password">Password</label>
            <Password id="password" value={userToEdit.password} onChange={(e) => { setUserToEdit({ ...userToEdit, password: e.target.value }) }} type='password' toggleMask />
            {errors.password && <small className="p-error">{errors.password}</small>}
          </div>}

        {/* confirm password input */}
        {buttonAction === "Register" &&
          <div>
            <label htmlFor="confirm-password">Confirm Password</label>
            <Password id="confirm-password" value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} type='password' toggleMask />
            {errors.confirmPassword && <small className="p-error">{errors.confirmPassword}</small>}
          </div>}

        {/* role input */}
        {isUserLoggedAdmin &&
          <div className="role-input-container">
            <div>
              <label htmlFor="role-user">Role</label>
            </div>
            <div>
              <RadioButton inputId="role-user" name="role" value="user" onChange={(e) => { setUserToEdit({ ...userToEdit, role: e.value }) }} checked={userToEdit.role === "user"} />
              <label htmlFor="role-user">User</label>
            </div>
            <div>
              <RadioButton inputId="role-admin" name="role" value="admin" onChange={(e) => { setUserToEdit({ ...userToEdit, role: e.value }) }} checked={userToEdit.role === "admin"} />
              <label htmlFor="role-admin">Admin</label>
            </div>
          </div>}

        {/* submit button  */}
        <Button icon="pi pi-user-plus" label={buttonAction} iconPos="right" type='submit' />
      </form>
    </div>
  )
}