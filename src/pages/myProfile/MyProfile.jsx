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
import { useParams } from "react-router-dom";
import { use } from "react";
import { UserService } from "../../services/UserService";


export const MyProfile = () => {

  const [user, setUser] = useState(null);// este usuario es el que se mostrara en el card, no necesariamente al usuario logueado
  const { userId } = useParams(); // id del usuario que se va a mostrar en el card

  useEffect(() => {
    const localStorageService = new LocalStorageService();
    if (!localStorageService.isAuthenticated()) {
      window.location.href = "/login";
    }
    // else {
    //   setUserLogged(localStorageService.getLoggedUser());
    // }
  }, []);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const service = new UserService();
    const user = await service.getUserById(userId);
    setUser(user);
  }


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
            {user && <UserCard user={user} />}
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