import { useContext, useEffect } from "react";
import UserContext from "../../context/UserContext";
import { AuthService } from "../../services/AuthService";
import { Header } from "../../components/header/Header";

export const Home = () => {

  const { user, updateUser } = useContext(UserContext);

  useEffect(() => {
    // AuthService.isAuthenticated(user); 
  }, []);


  return (
    <div>
      <Header />
    </div>
  )
}