import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import { Utils } from "../../services/Utils";
import { useNavigate } from "react-router-dom";

export const UserList = ({ users }) => {

  const [usersDTO, setUsersDTO] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const formatedUsers = users.map(user => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      age: Utils.calculateAge(user.birthDate),
    }));
    setUsersDTO(formatedUsers);
  }, [users]);

  // useEffect(() => { console.log('usersDTO', usersDTO) }, [usersDTO]);

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="actions-buttons">
        <Button
          icon="pi pi-eye"
          rounded
          severity='info'
          tooltip="View User" tooltipOptions={{ position: 'top', mouseTrackTop: 15, showDelay: 500 }}
          onClick={() => handleViewUser(rowData)}
        />
      </div>
    )
  }

  const handleViewUser = (rowData) => {
    // console.log('view user', rowData);
    navigate(`/viewUser/userId/${rowData.id}`);
  }

  return (
    <div className="user-list-container">
      <h2>Users</h2>
      {usersDTO &&
        <DataTable value={usersDTO} >
          <Column field="firstName" header="First Name" />
          <Column field="lastName" header="Last Name" />
          <Column field="email" header="Email" />
          <Column field="role" header="Role" />
          <Column field="age" header="Age" />
          <Column body={actionBodyTemplate} header="Options" />
        </DataTable>}
    </div>
  )
}