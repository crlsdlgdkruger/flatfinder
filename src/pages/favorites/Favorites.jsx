import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";
import { AuthService } from "../../services/AuthService";
import { Header } from "../../components/header/Header";
import { Footer } from "../../components/footer/Footer";
import "../pages.css";
import { LocalStorageService } from "../../services/LocalStoraeService";
import { User } from "../../models/User";

export const Favorites = () => {

  // const { user, updateUser } = useContext(UserContext);
  const [user, setUser] = useState(new User());

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
          <h1>Favorites</h1>
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