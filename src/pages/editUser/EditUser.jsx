import { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../../context/UserContext";
import { AuthService } from "../../services/AuthService";
import { Header } from "../../components/header/Header";
import { Footer } from "../../components/footer/Footer";
import { Toast } from "primereact/toast";
import "../pages.css";
import "./editUser.css";
import { useNavigate, useParams } from "react-router-dom";
import { UserService } from "../../services/UserService";
import { UserForm } from "../../components/userForm/UserForm";
import { User } from "../../models/User";
import { LocalStorageService } from "../../services/LocalStorageService";
import { use } from "react";

export const EditUser = () => {

  const [user, setUser] = useState(null);
  const [userLogged, setUserLogged] = useState(null);
  const toast = useRef(null);
  const navigate = useNavigate();
  const { userId } = useParams();

  const userService = new UserService();
  const localStorageService = new LocalStorageService();


  useEffect(() => {
    if (!localStorageService.isAuthenticated()) {
      localStorageService.logout();
      window.location.href = "/login";
    }
    setUserLogged(localStorageService.getLoggedUser());
  }, []);

  useEffect(() => {
    if (userId) {
      fetchUser();
    }
  }, []);

  useEffect(() => {
    // console.log('USER', user);
    console.log('userLogged', userLogged);
    console.log('user', user);
    if (user) {
      if (user?.id !== userLogged[0]?.id && userLogged[0]?.role !== "admin") {

        localStorageService.logout();
        window.location.href = "/login";
      }
    }
  }, [user]);

  const fetchUser = async () => {
    let userAux = await userService.getUserById(userId);
    userAux = formatedUser(userAux);
    console.log('userAux', userAux);
    setUser(userAux);
  }

  const editUser = async (userToEdit) => {
    const data = userService.editUser(userToEdit);
    const auxUser = await userService.getUser(userToEdit.email);
    console.log('auxUser', auxUser, "userLogged", userLogged);
    if (userLogged[0].id === auxUser[0].id) {
      localStorageService.addLoggedUser(auxUser);
    }

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
          <h3 className="page-title">Edit User</h3>
          {user && <UserForm user={user} setUser={setUser} action={editUser} buttonAction="Update" />}
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
