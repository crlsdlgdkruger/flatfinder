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
import "./editFlat.css";
import { useLocation, useNavigate } from "react-router-dom";
import { User } from "../../models/User";
import { LocalStorageService } from "../../services/LocalStorageService";

export const EditFlat = () => {

  const [flat, setFlat] = useState(new Flat());
  // const { user, updateUser } = useContext(UserContext);
  const [user, setUser] = useState(new User());
  const toast = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const flatToEdit = location.state.flat;

  useEffect(() => {
    const localStorageService = new LocalStorageService();
    if (!localStorageService.isAuthenticated()) {
      window.location.href = "/login";
    }
  }, []);

  useEffect(() => {
    const formattedFlat = {
      ...flatToEdit,
      dateAvailable: flatToEdit.dateAvailable ? new Date(flatToEdit.dateAvailable) : null
    };
    setFlat(formattedFlat);
  }, [flatToEdit]);

  useEffect(() => { console.log('Flat to edit', flat); }, [flat]);

  const updateFlat = () => {
    const service = new FlatService();
    const data = service.updateFlat(flat);
    if (data) {
      toast.current.show({ severity: 'info', summary: 'Info', detail: 'Flat updated', life: 2000 });
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } else {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Flat not updated', life: 2000 });
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
          <h1>Edit Flat</h1>
          <FlatForm flat={flat} setFlat={setFlat} action={updateFlat} buttonAction={"UPDATE"} />
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