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
      label: 'Profile',
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
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
        className="logo-icon primary">
        <title>logo</title>
        <path
          d="M15.98 2.442H8.02L0 10.46h2.275l6.882-6.88 6.881 6.881H24l-8.02-8.018m-.492 9.348L9.157 5.459 4.01 10.605v4.987a1.33 1.33 0 0 0 1.329 1.329h6.077l4.637 4.637v-4.637h2.598a1.33 1.33 0 0 0 1.33-1.33V11.79h-4.494Z" />
      </svg>
      <h1 className="logo-legend">Flat Finder</h1>
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