import { useEffect, useState } from "react";
import { Footer } from "../../components/footer/Footer"
import { Header } from "../../components/header/Header"
import { UserList } from "../../components/userList/UserList"
import { User } from "../../models/User";
import { LocalStorageService } from "../../services/LocalStoraeService";
import { UserService } from "../../services/UserService";

export const AllUsers = () => {
  const [userLogged, setUserLogged] = useState(new User());
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const localStorageService = new LocalStorageService();
    if (!localStorageService.isAuthenticated() && localStorageService.getLoggedUser().role !== "admin") {
      window.location.href = "/login";
    } else {
      setUserLogged(localStorageService.getLoggedUser());
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const service = new UserService();
    const users = await service.getUsers();
    setUsers(users);
  };

  return (
    <div>
      <div className="page-wrapper">
        <div className="header-wrapper">
          <header>
            <Header />
          </header>
        </div>
        <div className="content-wrapper">
          <main>
            <h3>All Users</h3>
            <UserList users={users} />
          </main>
        </div>
        <div className="footer-wrapper">
          <footer>
            <Footer />
          </footer>
        </div>
      </div>
    </div>
  )
}