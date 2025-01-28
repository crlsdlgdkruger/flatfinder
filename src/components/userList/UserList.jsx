import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import { Utils } from "../../services/Utils";
import { useNavigate } from "react-router-dom";
import { FlatService } from "../../services/FlatService";
import { InputNumber } from "primereact/inputnumber";
import "./userList.css";

export const UserList = ({ users }) => {

  const [usersDTO, setUsersDTO] = useState([]);
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    minAge: null,
    maxAge: null,
    minCountFlatsCreated: null,
    maxCountFlatsCreated: null,
    typeUser: null
  });

  const flatService = new FlatService();

  useEffect(() => {
    const fetchData = async () => {
      const formatedUsers = await Promise.all(
        users.map(async (user) => ({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          age: Utils.calculateAge(user.birthDate),
          countFlatsCreated: await flatService.countFlatsCreated(user.id),
        }))
      );
      setUsersDTO(formatedUsers);
    };

    if (users.length > 0) {
      fetchData();
    }
  }, [users]);

  const ageFilterTemplate = () => {
    return (
      <div className="filter-age">
        <InputNumber value={filters.minAge} onChange={(e) => setFilters({ ...filters, minAge: e.value })} placeholder="Min Age" />
        <InputNumber value={filters.maxAge} onChange={(e) => setFilters({ ...filters, maxAge: e.value })} placeholder="Max Age" />
      </div>
    );
  };

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
    navigate(`/viewUser/userId/${rowData.id}`);
  }

  return (
    <div className="user-list-container">
      <h2>Users</h2>
      {usersDTO &&
        <DataTable value={usersDTO} filterDisplay="row">
          <Column field="firstName" header="First Name" />
          <Column field="lastName" header="Last Name" />
          <Column field="email" header="Email" />
          <Column field="role" header="Role" />
          <Column field="age" header="Age" filterField="age" filter filterElement={ageFilterTemplate} showFilterMenu={false} showClearButton={false} />
          <Column field="countFlatsCreated" header="Flats Created" />
          <Column body={actionBodyTemplate} header="Options" />
        </DataTable>}
    </div>
  )
}