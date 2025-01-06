import { useContext, useEffect, useRef } from "react";
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

export const EditUser = () => {

  // const [flat, setFlat] = useState(new Flat());
  const { user, updateUser } = useContext(UserContext);
  const toast = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // AuthService.isAuthenticated(user);
  }, []);

  const editUser = async (userToEdit) => {
    const service = new UserService();
    const data = service.editUser({ ...userToEdit, id: user[0].id });
    updateUser(await service.getUser(userToEdit.email));

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
    return { ...user, birthDate: new Date(user.birthDate.toDate()) };
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
          <UserForm user={formatedUser(user[0])} setUser={updateUser} action={editUser} buttonAction="Update" />
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
