import { useContext, useEffect } from "react";
import UserContext from "../../context/UserContext";
import { AuthService } from "../../services/AuthService";
import { Header } from "../../components/header/Header";
import { Footer } from "../../components/footer/Footer";

export const NewFlat = () => {

  const { user, updateUser } = useContext(UserContext);

  useEffect(() => {
    // AuthService.isAuthenticated(user);
  }, []);


  return (
    <div>
      <div className="header-container">
        <Header />
      </div>
      <div className="content-container">
        <h1>NewFlat</h1>
      </div>
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  )
}