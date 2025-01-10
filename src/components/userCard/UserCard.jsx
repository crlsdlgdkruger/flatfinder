import { useNavigate } from "react-router-dom";
import "./userCard.css"
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { useContext, useEffect, useState } from "react";
import { Utils } from "../../services/Utils";
import UserContext from "../../context/UserContext";
import { User } from "../../models/User";
import { LocalStorageService } from "../../services/LocalStoraeService";

export const UserCard = () => {

  const navigate = useNavigate();
  // const { user, setUser } = useContext(UserContext);
  const [user, setUser] = useState(new User());
  const [userAge, setUserAge] = useState(0);

  useEffect(() => {
    const localStorageService = new LocalStorageService();
    if (!localStorageService.isAuthenticated()) {
      window.location.href = "/login";
    } else {
      setUser(localStorageService.getLoggedUser());
    }
  }, []);

  useEffect(() => {
    if (user.length > 0) {
      const age = Utils.calculateAge(user[0].birthDate);
      setUserAge(age);
    }
  }, [user]);

  const cardHeader = (
    <div>
      <img alt="user_cover_image" src="/images/profile_background.jpg" className="user-card-cover" />
      <div className="close-button-container">
        <Button icon="pi pi-times" severity="danger" rounded text raised tooltip="Close" tooltipOptions={{ position: 'top', mouseTrackTop: 15, showDelay: 500 }} onClick={() => { navigate("/home") }} />
      </div>
    </div>
  )

  const cardFooter = (
    <div className="card-footer">
      <Button icon="pi pi-pencil" severity="success" rounded tooltip="Edit my profile" tooltipOptions={{ position: 'top', mouseTrackTop: 15, showDelay: 500 }} onClick={() => { navigate("/editUser") }} />
    </div>
  )


  return (
    user && (
      <div className="user-card-container">
        <Card title={`${user[0]?.firstName} ${user[0]?.lastName},  ${userAge}`} subTitle={`${user[0]?.email}`} footer={cardFooter} header={cardHeader} className="md:w-25rem">
          <p className="m-0"></p>
        </Card>
      </div>
    )
  )
}