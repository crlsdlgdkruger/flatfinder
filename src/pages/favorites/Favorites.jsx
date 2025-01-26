import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";
import { AuthService } from "../../services/AuthService";
import { Header } from "../../components/header/Header";
import { Footer } from "../../components/footer/Footer";
import "../pages.css";
import { LocalStorageService } from "../../services/LocalStorageService";
import { User } from "../../models/User";
import { FlatList } from "../../components/flatList/FlatList";
import { useParams } from "react-router-dom";

export const Favorites = () => {

  // const { user, updateUser } = useContext(UserContext);
  const [user, setUser] = useState(new User());
  const { userId } = useParams();

  useEffect(() => {
    const localStorageService = new LocalStorageService();
    if (!localStorageService.isAuthenticated()) {
      window.location.href = "/login";
    } else {
      setUser(localStorageService.getLoggedUser());
    }
  }, []);

  // useEffect(() => { console.log('favoritepage user', user[0].favoriteFlats) }, [user]);

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
          {user[0] && userId && <FlatList favoriteFlats={user[0].favoriteFlats} />}
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