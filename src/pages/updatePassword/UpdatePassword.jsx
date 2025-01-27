import { Toast } from "primereact/toast"
import { Header } from "../../components/header/Header"
import { Footer } from "../../components/footer/Footer"
// import { UpdatePasswordForm } from "../../components/updatePasswordForm/UpdatePasswordForm"
import { useContext, useEffect, useRef, useState } from "react"
import { UserService } from "../../services/UserService"
import { Password } from "primereact/password"
import { Button } from "primereact/button"
import { useNavigate } from "react-router-dom"
import { LocalStorageService } from "../../services/LocalStorageService"

export const UpdatePassword = () => {

  // const { user, updateUser } = useContext(UserContext);
  const [user, setUser] = useState(null);
  const [userToEdit, setUserToEdit] = useState({});
  const [errors, setErrors] = useState({});
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const navigate = useNavigate();
  const toast = useRef(null);

  useEffect(() => {
    if (user) {
      setUserToEdit({ ...user[0], birthDate: new Date(user[0].birthDate.seconds * 1000) });
    }
  }, [user]);

  useEffect(() => {
    const localStorageService = new LocalStorageService();
    if (!localStorageService.isAuthenticated()) {
      localStorageService.logout();
      window.location.href = "/login";
    } else {
      setUser(localStorageService.getLoggedUser());
    }
  }, []);

  const updatePassword = async (e) => {
    e.preventDefault();
    if (validatePassword()) {
      const service = new UserService();
      setUserToEdit({ ...userToEdit, password: newPassword });
      const updatedUser = { ...userToEdit, password: newPassword }; // Actualiza solo aquí
      const data = service.editUser(updatedUser);
      setUser(await service.getUser(updatedUser.email));
      console.log('updated User', updatedUser);
      console.log('data', data);
      if (data) {
        toast.current.show({ severity: 'info', summary: 'Info', detail: 'Password updated', life: 2000 });
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      } else {
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Password not updated', life: 2000 });
      }
    }
  }

  const validatePassword = () => {
    const errors = {};
    if (currentPassword.trim() === "") {
      errors.password = "Current password is required";
    }
    if (currentPassword !== user[0].password) {
      errors.password = "Current password is incorrect";
    }
    if (newPassword.trim() === "") {
      errors.newPassword = "New password is required";
    }
    if (confirmNewPassword.trim() === "") {
      errors.confirmNewPassword = "Confirm new password is required";
    }
    if (newPassword !== confirmNewPassword) {
      errors.confirmNewPassword = "Passwords do not match";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  return (
    <div className="page-wrapper">
      <div className="header-wrapper">
        <header>
          <Header />
        </header>
      </div>
      <div className="content-wrapper">
        <Toast ref={toast} />
        <main>
          <h1>Update Password</h1>
          {/* <UpdatePasswordForm /> */}
          <form onSubmit={(e) => { updatePassword(e); }}>
            {/* current password */}
            <div>
              <label htmlFor="current-password">Current Password</label>
              <Password id="current-password" value={currentPassword} onChange={(e) => { setCurrentPassword(e.target.value); }} type='password' toggleMask />
              {errors.password && <small className="p-error">{errors.password}</small>}
            </div>
            {/* new password */}
            <div>
              <label htmlFor="new-password">New Password</label>
              <Password id="new-password" value={newPassword} onChange={(e) => { setNewPassword(e.target.value); }} type='password' toggleMask />
              {errors.newPassword && <small className="p-error">{errors.newPassword}</small>}
            </div>
            {/* confirm new password */}
            <div>
              <label htmlFor="confirm-new-password">Confirm New Password</label>
              <Password id="confirm-new-password" value={confirmNewPassword} onChange={(e) => { setConfirmNewPassword(e.target.value); }} type='password' toggleMask />
              {errors.confirmNewPassword && <small className="p-error">{errors.confirmNewPassword}</small>}
            </div>
            {/* submit button  */}
            <Button icon="pi pi-key" label="Update Password" iconPos="right" type='submit' />
          </form>
        </main>
      </div>
      <div className="footer-wrapper">
        <footer>
          <Footer />
        </footer>
      </div>
    </div>
  )
}