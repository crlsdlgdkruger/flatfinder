import { useEffect, useState } from "react";
import { Footer } from "../../components/footer/Footer"
import { Header } from "../../components/header/Header"
import { UserList } from "../../components/userList/UserList"
import { User } from "../../models/User";
import { LocalStorageService } from "../../services/LocalStorageService";
import { UserService } from "../../services/UserService";
import { UserFilter } from "../../components/userFilter/UserFilter";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import "./allUsers.css"

export const AllUsers = () => {
  const [userLogged, setUserLogged] = useState(new User());
  const [users, setUsers] = useState([]);
  const [sortBy, setSortBy] = useState("firstName");
  const [ascDesc, setAscDesc] = useState("asc");
  const [filters, setFilters] = useState({
    minAge: null,
    maxAge: null,
    minCountFlatsCreated: null,
    maxCountFlatsCreated: null,
    role: null
  });
  const sortOptions = [
    { label: "First Name", value: "firstName" },
    { label: "Last Name", value: "lastName" },
    { label: "Flats Created", value: "countFlatsCreated" },
  ];


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
  }, [filters, sortBy, ascDesc]);


  const fetchUsers = async () => {
    const service = new UserService();
    const users = await service.getUsers(filters, sortBy, ascDesc);
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
            <h3 className="page-title">All Users</h3>
            <UserFilter filters={filters} setFilters={setFilters} />
            <div className="sort-container glass-background">
              <Dropdown options={sortOptions} onChange={(e) => setSortBy(e.target.value)} value={sortBy} className="sort-dropdown" />
              {ascDesc === "asc" ?
                <Button icon="pi pi-sort-amount-up" text severity="info" aria-label="Cancel" onClick={() => setAscDesc("desc")} className="sort-button" /> :
                <Button icon="pi pi-sort-amount-down" text severity="info" aria-label="Cancel" onClick={() => setAscDesc("asc")} className="sort-button" />}
            </div>
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