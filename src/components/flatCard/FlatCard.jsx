import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { useNavigate } from "react-router-dom";
import "./flatCard.css"
import { Utils } from "../../services/Utils";
import { useEffect, useState } from "react";
import { LocalStorageService } from "../../services/LocalStoraeService";

export const FlatCard = ({ flat, userId }) => {

  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [userLogged, setUserLogged] = useState([]);

  useEffect(() => {
    const localStorageService = new LocalStorageService();
    setUserLogged(localStorageService.getLoggedUser());
  }, []);

  useEffect(() => {
    console.log('userLogged', userLogged);
  }, [userLogged]);

  const handleFavorite = async (flat) => {
    try {
      await Utils.toggleFavorite(flat);

      const updatedUser = { ...userLogged[0] };
      if (updatedUser.favoriteFlats?.includes(flat.id)) {
        updatedUser.favoriteFlats = updatedUser.favoriteFlats.filter(
          (favId) => favId !== flat.id
        );
        setIsFavorite(false);
      } else {
        updatedUser.favoriteFlats = [...(updatedUser.favoriteFlats || []), flat.id];
        setIsFavorite(true);
      }
      setUserLogged([updatedUser]);
    } catch (error) {
      console.error("Error al actualizar favoritos:", error);
      alert("No se pudo actualizar el favorito. Inténtalo nuevamente.");
    }
  };

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
      {!userLogged[0]?.favoriteFlats.includes(flat.id) ?
        <Button
          icon="pi pi-heart"
          rounded
          severity='danger'
          outlined
          tooltip="Add to favorites" tooltipOptions={{ position: 'top', mouseTrackTop: 15, showDelay: 500 }}
          onClick={() => handleFavorite(flat)}
        /> :
        <Button
          icon="pi pi-heart"
          rounded
          severity='danger'
          tooltip="Remove to favorites" tooltipOptions={{ position: 'top', mouseTrackTop: 15, showDelay: 500 }}
          onClick={() => handleFavorite(flat)}
        />
      }
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