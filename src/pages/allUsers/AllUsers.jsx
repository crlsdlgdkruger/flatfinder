import { useEffect, useState } from "react";
import { Footer } from "../../components/footer/Footer"
import { Header } from "../../components/header/Header"
import { UserList } from "../../components/userList/UserList"
import { User } from "../../models/User";
import { LocalStorageService } from "../../services/LocalStorageService";
import { UserService } from "../../services/UserService";
import { UserFilter } from "../../components/userFilter/UserFilter";

export const AllUsers = () => {
  const [userLogged, setUserLogged] = useState(new User());
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({
    minAge: null,
    maxAge: null,
    minCountFlatsCreated: null,
    maxCountFlatsCreated: null,
    role: null
  });

  useEffect(() => {
    const localStorageService = new LocalStorageService();
    if (!localStorageService.isAuthenticated() && localStorageService.getLoggedUser().role !== "admin") {
      localStorageService.logout();
      window.location.href = "/login";
    } else {
      setUserLogged(localStorageService.getLoggedUser());
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [filters]);

  const fetchUsers = async () => {
    const service = new UserService();
    const users = await service.getUsers(filters);
    setUsers([]);
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
            <UserFilter filters={filters} setFilters={setFilters} />
            {/* <UserList users={users} filters={filters} setFilters={setFilters} /> */}
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