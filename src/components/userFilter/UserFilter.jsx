import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import './userFilter.css'

export const UserFilter = ({ filters, setFilters }) => {
  const [minCountFlatsCreated, setMinCountFlatsCreated] = useState(filters.minCountFlatsCreated || null);
  const [maxCountFlatsCreated, setMaxCountFlatsCreated] = useState(filters.maxCountFlatsCreated || null);
  const [minAge, setMinAge] = useState(filters.minAge || null);
  const [maxAge, setMaxAge] = useState(filters.maxAge || null);
  const [role, setRole] = useState(filters.role || null);

  const roleOptions = [
    { label: 'All', value: 0 },
    { label: 'Admin', value: 'admin' },
    { label: 'User', value: 'user' },
  ];

  const submitFilter = (e) => {
    e.preventDefault();
    setFilters({ ...filters, minAge, maxAge, minCountFlatsCreated, maxCountFlatsCreated, role });
  };

  const resetFilters = () => {
    setFilters({});
    setMinCountFlatsCreated(null);
    setMaxCountFlatsCreated(null);
    setMinAge(null);
    setMaxAge(null);
    setRole(null);
  };

  return (
    <div className="filter-container">
      <form className="filter-form" onSubmit={submitFilter}>
        <div className="filter-role-container">
          <label className="filter-label">Filter by role</label>
          <Dropdown value={role} onChange={(e) => setRole(e.target.value)} className="dropdown-role-filter" options={roleOptions} placeholder="Select a role">
          </Dropdown>
        </div>
        <div className="filter-countFlatsCreated-container">
          <label className="filter-label">Filter by count flats created</label>
          <div className="input-container">
            <InputNumber className="input-number-filter" value={minCountFlatsCreated} onChange={(e) => setMinCountFlatsCreated(e.value)} placeholder="Min" />
            <InputNumber className="input-number-filter" value={maxCountFlatsCreated} onChange={(e) => setMaxCountFlatsCreated(e.value)} placeholder="Max" />
          </div>
        </div>
        <div className="filter-age-container">
          <label className="filter-label">Filter by age</label>
          <div className="input-container">
            <InputNumber className="input-number-filter" value={minAge} onChange={(e) => setMinAge(e.value)} placeholder="Min" />
            <InputNumber className="input-number-filter" value={maxAge} onChange={(e) => setMaxAge(e.value)} placeholder="Max" />
          </div>
        </div>
        <div className="filter-buttons-container">
          <Button type="submit" icon="pi pi-search" className="filter-buttons p-button-info" />
          <Button type="button" icon="pi pi-filter-slash" className="filter-buttons p-button-info" outlined onClick={() => resetFilters()} />
        </div>
      </form>
    </div>
  );
};