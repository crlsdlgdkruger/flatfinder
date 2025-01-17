import { Button } from "primereact/button"
import { useNavigate } from "react-router-dom"

export const AddButton = ({ value }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (value == "addFlat") {
      navigate("/newflat");
    } else if (value == "addUser") {
      // navigate("/newUser");
    }
  }
  return (
    <Button icon="pi pi-plus" rounded severity="success" tooltip="Add" tooltipOptions={{ position: 'top', mouseTrackTop: 15, showDelay: 500 }} onClick={handleClick} />
  )
}