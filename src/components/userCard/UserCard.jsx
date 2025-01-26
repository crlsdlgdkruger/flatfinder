import { useNavigate } from "react-router-dom";
import "./userCard.css"
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { useEffect, useState } from "react";
import { Utils } from "../../services/Utils";

export const UserCard = ({ user }) => {

  const navigate = useNavigate();
  const [userAge, setUserAge] = useState(0);

  useEffect(() => {
    if (user) {
      const age = Utils.calculateAge(user.birthDate);
      setUserAge(age);
    }
    console.log('UserCard', user);
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
      <Button icon="pi pi-pencil" severity="success" rounded tooltip="Edit my profile" tooltipOptions={{ position: 'top', mouseTrackTop: 15, showDelay: 500 }} onClick={() => { navigate(`/editUser/userId/${user.id}`) }} />
    </div>
  )


  return (
    user && (
      <div className="user-card-container">
        <Card title={`${user.firstName} ${user.lastName},  ${userAge}`} subTitle={`${user.email}`} footer={cardFooter} header={cardHeader} className="md:w-25rem">
          <p className="m-0"></p>
        </Card>
      </div>
    )
  )
}