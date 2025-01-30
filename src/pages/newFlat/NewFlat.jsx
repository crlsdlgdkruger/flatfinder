import { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../../context/UserContext";
import { AuthService } from "../../services/AuthService";
import { Header } from "../../components/header/Header";
import { Footer } from "../../components/footer/Footer";
import { FlatService } from "../../services/FlatService";
import { FlatForm } from "../../components/flatForm/FlatForm";
import { Flat } from "../../models/Flat";
import { Toast } from "primereact/toast";
import "../pages.css";
import "./newFlat.css";
import { useNavigate } from "react-router-dom";
import { User } from "../../models/User";
import { LocalStorageService } from "../../services/LocalStorageService";

export const NewFlat = () => {

  const [flat, setFlat] = useState(new Flat());
  // const { user, updateUser } = useContext(UserContext);
  const [user, setUser] = useState(new User());
  const toast = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const localStorageService = new LocalStorageService();
    if (!localStorageService.isAuthenticated()) {
      window.location.href = "/login";
    } else {
      setUser(localStorageService.getLoggedUser());
    }
  }, []);

  const createFlat = () => {
    const service = new FlatService();
    const data = service.createFlat({ ...flat, userId: user[0].id });
    if (data) {
      toast.current.show({ severity: 'success', summary: 'Success', detail: 'Flat created', life: 2000 });
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } else {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Flat not created', life: 2000 });
    }
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
          <h3 className="page-title">New Flat</h3>
          <FlatForm flat={flat} setFlat={setFlat} action={createFlat} buttonAction={"SAVE"} />
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