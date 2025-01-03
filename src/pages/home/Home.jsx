import { useContext, useEffect } from "react";
import UserContext from "../../context/UserContext";
import { AuthService } from "../../services/AuthService";
import { Header } from "../../components/header/Header";
import { Footer } from "../../components/footer/Footer";
import "../pages.css";
import { FlatList } from "../../components/flatList/FlatList";

export const Home = () => {

  const { user, updateUser } = useContext(UserContext);

  useEffect(() => {
    // AuthService.isAuthenticated(user);
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
          <h3>Home</h3>
          <FlatList />
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