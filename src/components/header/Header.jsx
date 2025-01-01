import { Menubar } from "primereact/menubar";
import { useNavigate } from "react-router-dom";
import { Avatar } from 'primereact/avatar';
import { useContext, useEffect } from "react";
import { InputText } from 'primereact/inputtext';
import UserContext from "../../context/UserContext";
import "./header.css"
export const Header = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const items = [
    {
      label: 'Home',
      icon: 'pi pi-fw pi-home',
      command: () => navigate("/home")
    },
  ];

  const start = (
    <div className="logo-container">
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
        className="logo-icon primary">
        <title>logo</title>
        <path
          d="M15.98 2.442H8.02L0 10.46h2.275l6.882-6.88 6.881 6.881H24l-8.02-8.018m-.492 9.348L9.157 5.459 4.01 10.605v4.987a1.33 1.33 0 0 0 1.329 1.329h6.077l4.637 4.637v-4.637h2.598a1.33 1.33 0 0 0 1.33-1.33V11.79h-4.494Z" />
      </svg>
      <h1 className="logo-legend">Flat Finder</h1>
    </div>
  );

  const end = (
    <div className="avatar-container">
      <label htmlFor="avatar" className="avatar-label"> Hello, user</label>
      <Avatar icon="pi pi-user" size="large" style={{ backgroundColor: '#2196F3', color: '#ffffff' }} shape="circle" id="avatar" />
    </div>
  );

  return (
    <div className="header-container">
      <div className="menu-container">
        <div className="options-container">
          <Menubar model={items} className="menubar" start={start} end={end} breakpoint="md" />
        </div>
      </div>
    </div>
  )
}