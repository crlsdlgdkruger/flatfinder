import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";
import { AuthService } from "../../services/AuthService";
import { Header } from "../../components/header/Header";
import { Footer } from "../../components/footer/Footer";
import { useLocation, useParams } from "react-router-dom";
import { FlatCard } from "../../components/flatCard/FlatCard";
import "../pages.css";
import "./viewFlat.css";
import { User } from "../../models/User";
import { LocalStorageService } from "../../services/LocalStorageService";
import { Flat } from "../../models/Flat";
import { FlatService } from "../../services/FlatService";
import { Messages } from "../../components/messages/Messages";

export const ViewFlat = () => {

  // const { user, updateUser } = useContext(UserContext);
  const [user, setUser] = useState(null);
  const [flat, setFlat] = useState(null);
  const location = useLocation();
  const { flatId } = useParams();
  // const flat = location.state.flat;

  useEffect(() => {
    const localStorageService = new LocalStorageService();
    if (!localStorageService.isAuthenticated()) {
      localStorageService.logout();
      window.location.href = "/login";
    } else {
      setUser(localStorageService.getLoggedUser());
    }
    fetchFlat();
  }, []);

  const fetchFlat = async () => {
    const service = new FlatService();
    const flat = await service.getFlatById(flatId);
    setFlat(flat);
  }


  return (
    user && (<div className="page-wrapper">
      <div className="header-wrapper">
        <header>
          <Header />
        </header>
      </div>
      <div className="content-wrapper">
        <h3 className="page-title">View Flat</h3>
        <main>
          <div className="flat-card-wrapper">
            {user && flat && <FlatCard flat={flat} userId={user[0].id} />}
            {user && flat && <Messages flatId={flat.id} senderId={user[0].id} receiverId={flat.userId} />}
          </div>
        </main>
      </div>
      <div className="footer-wrapper">
        <footer>
          <Footer />
        </footer>
      </div>
    </div>)
  )
}