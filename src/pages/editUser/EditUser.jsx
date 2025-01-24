import { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../../context/UserContext";
import { AuthService } from "../../services/AuthService";
import { Header } from "../../components/header/Header";
import { Footer } from "../../components/footer/Footer";
import { Toast } from "primereact/toast";
import "../pages.css";
import "./editUser.css";
import { useNavigate } from "react-router-dom";
import { UserService } from "../../services/UserService";
import { UserForm } from "../../components/userForm/UserForm";
import { User } from "../../models/User";
import { LocalStorageService } from "../../services/LocalStoraeService";

export const EditUser = () => {

  // const [flat, setFlat] = useState(new Flat());
  // const { user, updateUser } = useContext(UserContext);
  const [user, setUser] = useState(new User());
  const toast = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const localStorageService = new LocalStorageService();
    if (!localStorageService.isAuthenticated()) {
      window.location.href = "/login";
    }
    setUser(localStorageService.getLoggedUser());
  }, []);

  const editUser = async (userToEdit) => {
    const service = new UserService();
    const data = service.editUser({ ...userToEdit, id: user[0].id });
    const auxUser = await service.getUser(userToEdit.email);
    // console.log('auxUser', auxUser);
    setUser(auxUser);
    const localStorageService = new LocalStorageService();
    localStorageService.addLoggedUser(auxUser);

    if (data) {
      toast.current.show({ severity: 'info', summary: 'Info', detail: 'User updated', life: 2000 });
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } else {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'User not updated', life: 2000 });
    }
  }

  const formatedUser = (user) => {
    return { ...user, birthDate: new Date(user.birthDate.seconds * 1000) };
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
          <h1>Edit User</h1>
          {user[0] && <UserForm user={formatedUser(user[0])} setUser={setUser} action={editUser} buttonAction="Update" />}
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
