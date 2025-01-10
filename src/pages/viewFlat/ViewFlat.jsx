import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";
import { AuthService } from "../../services/AuthService";
import { Header } from "../../components/header/Header";
import { Footer } from "../../components/footer/Footer";
import { useLocation } from "react-router-dom";
import { FlatCard } from "../../components/flatCard/FlatCard";
import "../pages.css";
import "./viewFlat.css";
import { User } from "../../models/User";
import { LocalStorageService } from "../../services/LocalStoraeService";

export const ViewFlat = () => {

  // const { user, updateUser } = useContext(UserContext);
  const [user, setUser] = useState(new User());
  const location = useLocation();
  const flat = location.state.flat;

  useEffect(() => {
    const localStorageService = new LocalStorageService();
    if (!localStorageService.isAuthenticated()) {
      window.location.href = "/login";
    }
  }, []);


  return (
    <div className="page-wrapper">
      <div className="header-wrapper">
        <header>
          <Header />
        </header>
      </div>
      <div className="content-wrapper">
        <main>
          <div className="flat-card-wrapper">
            <FlatCard flat={flat} userId={user[0].id} />
          </div>
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