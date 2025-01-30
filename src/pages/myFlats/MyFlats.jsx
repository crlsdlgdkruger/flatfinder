import { useEffect, useState } from "react";
import { FlatList } from "../../components/flatList/FlatList";
import { AddButton } from "../../components/addButton/AddButton";
import { Footer } from "../../components/footer/Footer";
import { Header } from "../../components/header/Header";
import { User } from "../../models/User";
import { LocalStorageService } from "../../services/LocalStorageService";
import "./myFlats.css";
import { useParams } from "react-router-dom";

export const MyFlats = () => {
  const [user, setUser] = useState(new User());
  const { userId } = useParams();

  useEffect(() => {
    const localStorageService = new LocalStorageService();
    if (!localStorageService.isAuthenticated()) {
      localStorageService.logout();
      window.location.href = "/login";
    } else {
      setUser(localStorageService.getLoggedUser());
    }
  }, []);

  useEffect(() => {
    console.log("user", user, " userid params", userId);
  }, [user, userId]);

  return (
    <div className="page-wrapper">
      <div className="header-wrapper">
        <header>
          <Header />
        </header>
      </div>
      <div className="content-wrapper">
        <main>
          <h3 className="page-title">My Flats</h3>
          {user[0] && userId && <FlatList userId={userId} />}
        </main>
        <div className="add-button-wrapper">
          <AddButton value={"addFlat"} />
        </div>
      </div>
      <div className="footer-wrapper">
        <footer>
          <Footer />
        </footer>
      </div>
    </div>
  );
};