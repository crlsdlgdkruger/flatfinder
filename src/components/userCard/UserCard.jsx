import { useNavigate } from "react-router-dom";
import "./userCard.css"
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { useContext, useEffect } from "react";
import { Utils } from "../../services/Utils";
import UserContext from "../../context/UserContext";

export const UserCard = () => {

  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const userAge = Utils.calculateAge(user[0].birthDate);

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
    <div className="user-card-container">
      <Card title={`${user[0].firstName} ${user[0].lastName},  ${userAge}`} subTitle={`${user[0].email}`} footer={cardFooter} header={cardHeader} className="md:w-25rem">
        <p className="m-0">

        </p>
      </Card>
    </div>
  )
}