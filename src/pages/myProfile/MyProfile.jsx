import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";
import { AuthService } from "../../services/AuthService";
import { Header } from "../../components/header/Header";
import { Footer } from "../../components/footer/Footer";
import { UserCard } from "../../components/userCard/UserCard";
import "../pages.css";
import "./myProfile.css";
import { LocalStorageService } from "../../services/LocalStoraeService";
import { User } from "../../models/User";


export const MyProfile = () => {

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
          <div className="user-card-wrapper">
            <UserCard />
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