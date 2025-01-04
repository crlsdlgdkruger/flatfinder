import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { useNavigate } from "react-router-dom";
import "./flatCard.css"

export const FlatCard = ({ flat, userId }) => {

  const navigate = useNavigate();

  const cardHeader = (
    <div>
      <img alt="flat" src="https://primefaces.org/cdn/primereact/images/usercard.png" />
      <div className="close-button-container">
        <Button icon="pi pi-times" severity="danger" rounded text raised tooltip="Close" tooltipOptions={{ position: 'top', mouseTrackTop: 15, showDelay: 500 }} onClick={() => { navigate("/home") }} />
      </div>
    </div>
  );

  const cardFooter = (
    <div className="card-footer">
      <Button icon="pi pi-heart" severity="danger" rounded outlined tooltip="Add to favorites" tooltipOptions={{ position: 'top', mouseTrackTop: 15, showDelay: 500 }} />
      {flat.userId === userId && <Button icon="pi pi-pencil" severity="success" rounded tooltip="Edit Flat" tooltipOptions={{ position: 'top', mouseTrackTop: 15, showDelay: 500 }} onClick={() => { navigate("/editflat", { state: { flat } }) }} />}

    </div>
  )
  return (
    <div className="flat-card-container">
      <Card title={flat.city} subTitle={`${flat.streetName}, ${flat.streetNumber}`} footer={cardFooter} header={cardHeader} className="md:w-25rem">
        <p className="m-0">
          {`This apartment, with an area of ​​${flat.areaSize} square meters, was built in year ${flat.yearBuilt} and has a monthly rent of $${flat.rentPrice} US dollars. It is available from ${flat.dateAvailable}. ${flat.hasAC ? "PS, The apartement  has  AC." : ""}`}
        </p>
      </Card>
    </div>
  )
}