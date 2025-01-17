import { useEffect, useState } from "react";
import { FlatList } from "../../components/flatList/FlatList";
import { AddButton } from "../../components/addButton/AddButton";
import { Footer } from "../../components/footer/Footer";
import { Header } from "../../components/header/Header";
import { User } from "../../models/User";
import { LocalStorageService } from "../../services/LocalStoraeService";
import "./myFlats.css";

export const MyFlats = () => {
  const [user, setUser] = useState(new User());

  useEffect(() => {
    const localStorageService = new LocalStorageService();
    if (!localStorageService.isAuthenticated()) {
      window.location.href = "/login";
    } else {
      setUser(localStorageService.getLoggedUser());
    }
  }, []);

  useEffect(() => {
    console.log("user", user);
  }, [user]);

  return (
    <div className="page-wrapper">
      <div className="header-wrapper">
        <header>
          <Header />
        </header>
      </div>
      <div className="content-wrapper">
        <main>
          <h3>My Flats</h3>
          {user[0] && <FlatList userId={user[0].id} />}
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