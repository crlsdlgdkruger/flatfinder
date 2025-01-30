import { Menubar } from "primereact/menubar";
import { useNavigate } from "react-router-dom";
import { Avatar } from 'primereact/avatar';
import { useContext, useEffect, useState } from "react";
import { InputText } from 'primereact/inputtext';
import UserContext from "../../context/UserContext";
import "./header.css"
import { LocalStorageService } from "../../services/LocalStorageService";
import { User } from "../../models/User";
export const Header = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState(new User());
  const localStorageService = new LocalStorageService();

  useEffect(() => {
    if (!localStorageService.isAuthenticated()) {
      localStorageService.logout();
      window.location.href = "/login";
    } else {
      setUser(localStorageService.getLoggedUser());
    }
  }, []);

  const items = [
    {
      label: 'Home',
      icon: 'pi pi-fw pi-home',
      command: () => navigate("/home")
    },
    {
      label: 'My Flats',
      icon: 'pi pi-fw pi-inbox',
      command: () => navigate(`/myflats/userId/${user[0].id}`),

    },
    {
      label: 'Favorites',
      icon: 'pi pi-fw pi-heart',
      command: () => navigate(`/favorites/userId/${user[0].id}`),
    },
    ...(localStorageService.isAdmin() ? [
      {
        label: 'Users',
        icon: 'pi pi-fw pi-users',
        command: () => navigate(`/allUsers`),
      }
    ] : []),
    {
      label: `Profile`,
      icon: 'pi pi-fw pi-user',
      items: [
        {
          label: 'My Profile',
          icon: 'pi pi-fw pi-user',
          command: () => navigate(`/viewUser/userId/${user[0].id}`)
        },
        {
          label: 'Update Password',
          icon: 'pi pi-fw pi-key',
          command: () => navigate("/updatePassword")
        },
        {
          label: 'Logout',
          icon: 'pi pi-fw pi-power-off',
          command: () => {
            localStorageService.logout();
            window.location.href = "/login";
          }
        }
      ]
    }
  ];

  const start = (
    <button className="logo-container" onClick={() => navigate("/home")}>
      <img src="/images/flatfinder-logo.png" alt="flatfinder-logo" className="logo-icon" />
      <h1 className="logo-legend"> <span>FLAT - </span> FINDER</h1>
    </button>
  );

  const end = ([
    {
      label: 'User',
      icon: 'pi pi-fw pi-user',
      items: [
        {
          label: 'Profile',
          icon: 'pi pi-fw pi-user',
          command: () => navigate("/profile")
        },
        {
          label: 'Logout',
          icon: 'pi pi-fw pi-power-off',
          command: () => navigate("/login")
        }
      ]
    },
  ]);

  return (
    <div className="header-container">
      <div className="menu-container">
        <Menubar model={items} className="menubar" start={start} />
      </div>
    </div>
  )
}