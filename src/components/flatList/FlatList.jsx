import { DataTable } from 'primereact/datatable';
import { useEffect, useState } from 'react';
import { FlatService } from '../../services/FlatService';
import { UserService } from '../../services/UserService';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import "./flatList.css";
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { LocalStorageService } from '../../services/LocalStoraeService';

export const FlatList = () => {

  const [flats, setFlats] = useState([]);
  const [cityFilter, setCityFilter] = useState("");
  const [minRentPriceFilter, setMinRentPriceFilter] = useState(0);
  const [maxRentPriceFilter, setMaxRentPriceFilter] = useState(0);
  const [minAreaFilter, setMinAreaFilter] = useState(0);
  const [maxAreaFilter, setMaxAreaFilter] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFlats = async () => {
      const service = new FlatService();
      const data = await service.getFlats();
      setFlats(data);
    };

    fetchFlats();
  }, []);

  useEffect(() => {
    console.log('flats', flats);
  }, [flats]);

  const handleView = (flat) => {
    navigate("/viewflat", { state: { flat } });
  };

  const handleFavorite = async (flat) => {
    try {
      await toggleFavorite(flat);
      setFlats((prevFlats) =>
        prevFlats.map((f) =>
          f.id === flat.id
            ? { ...f, isFavorite: !f.isFavorite } // Actualiza el estado local
            : f
        )
      );
    } catch (error) {
      console.error("Error al actualizar favoritos:", error);
      alert("No se pudo actualizar el favorito. Inténtalo nuevamente.");
    }
  };

  const toggleFavorite = async (flat) => {
    const userService = new UserService();
    const localStorageService = new LocalStorageService();
    const userLogged = localStorageService.getLoggedUser();
    try {
      const us = await userService.toggleFavorite(userLogged[0], flat.id);
      console.log('US', us);
      if (us) {
        console.log('userLogged actualizado', us);
        localStorageService.addLoggedUser(us);
      } else {
        console.warn('El usuario no fue encontrado en la base de datos.');
      }
    } catch (error) {
      console.error('Ocurrió un error al intentar actualizar los favoritos:', error.message);
      alert('Hubo un problema al actualizar tus favoritos. Por favor, inténtalo de nuevo más tarde.');
    }
  };


  const actionBodyTemplate = (rowData) => {
    const localStorageService = new LocalStorageService();
    const userLogged = localStorageService.getLoggedUser();
    return (
      <div className='action-buttons'>
        {!userLogged[0].favoriteFlats.includes(rowData.id) ?
          <Button
            icon="pi pi-heart"
            rounded
            severity='danger'
            outlined
            tooltip="Add to favorites" tooltipOptions={{ position: 'top', mouseTrackTop: 15, showDelay: 500 }}
            onClick={() => handleFavorite(rowData)}
          /> :
          <Button
            icon="pi pi-heart"
            rounded
            severity='danger'
            tooltip="Remove to favorites" tooltipOptions={{ position: 'top', mouseTrackTop: 15, showDelay: 500 }}
            onClick={() => handleFavorite(rowData)}
          />
        }

        <Button
          icon="pi pi-eye"
          rounded
          severity='info'
          tooltip="View Flat" tooltipOptions={{ position: 'top', mouseTrackTop: 15, showDelay: 500 }}
          onClick={() => handleView(rowData)}
        />
      </div>
    );
  };

  const cityFilterElement = () => {
    return (
      <span className="p-input-icon-right">
        <InputText
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
          placeholder="Search by city"
        />
        <i className="pi pi-search search-icon" />
      </span>
    );
  };

  const rentPriceFilterElement = () => {
    return (
      <div className="p-inputgroup">
        <span className="p-inputgroup-addon">Min</span>
        <InputNumber
          value={minRentPriceFilter}
          onValueChange={(e) => setMinRentPriceFilter(e.value)}
          placeholder="Min price"
          mode="currency"
          currency="USD"
          locale="en-US"
        />
        <span className="p-inputgroup-addon">Max</span>
        <InputNumber
          value={maxRentPriceFilter}
          onValueChange={(e) => setMaxRentPriceFilter(e.value)}
          placeholder="Max price"
          mode="currency"
          currency="USD"
          locale="en-US"
        />
      </div>
    );
  };

  const areaFilterElement = () => {
    return (
      <div className="p-inputgroup">
        <span className="p-inputgroup-addon">Min</span>
        <InputNumber
          value={minAreaFilter}
          onValueChange={(e) => setMinAreaFilter(e.value)}
          placeholder="Min Area"
        />
        <span className="p-inputgroup-addon">Max</span>
        <InputNumber
          value={maxAreaFilter}
          onValueChange={(e) => setMaxAreaFilter(e.value)}
          placeholder="Max Area"
        />
      </div>
    );
  };

  const filteredFlats = flats.filter((flat) => {
    const matchesCity = cityFilter
      ? flat.city?.toLowerCase().includes(cityFilter.toLowerCase())
      : true;

    const matchesRentPrice =
      (!minRentPriceFilter || flat.rentPrice >= minRentPriceFilter) &&
      (!maxRentPriceFilter || flat.rentPrice <= maxRentPriceFilter);

    const matchesArea =
      (!minAreaFilter || flat.areaSize >= minAreaFilter) &&
      (!maxAreaFilter || flat.areaSize <= maxAreaFilter);

    return matchesCity && matchesRentPrice && matchesArea;
  });

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };

  const rentPriceBodyTemplate = (rowData) => {
    return formatCurrency(rowData.rentPrice);
  };

  const formatArea = (value) => {
    return `${value} m²`;
  };

  const areaBodyTemplate = (rowData) => {
    return formatArea(rowData.areaSize);
  };

  const formatAC = (value) => {
    return value ? 'Yes' : 'No';
  };

  const hasACBodyTemplate = (rowData) => {
    return formatAC(rowData.hasAC);
  };

  return (
    <div className="flat-list-container">
      <h4>Flat List</h4>
      <div className="flat-list">
        <DataTable value={filteredFlats} scrollable scrollDirection="horizontal">
          <Column field="city" header="City" sortable filter filterElement={cityFilterElement} />
          <Column field="streetName" header="Street Name" />
          <Column field="streetNumber" header="Street Number" />
          <Column field="areaSize" header="Area Size" sortable filter filterElement={areaFilterElement} body={areaBodyTemplate} />
          <Column field="yearBuilt" header="Year Built" />
          <Column field="rentPrice" header="Rent Price" sortable filter filterElement={rentPriceFilterElement} body={rentPriceBodyTemplate} />
          <Column field="dateAvailable" header="Date Available" />
          <Column field="hasAC" header="Has AC" body={hasACBodyTemplate} />
          <Column
            body={actionBodyTemplate}
            header="Options"
            style={{ textAlign: 'center', width: '150px' }}
          />
        </DataTable>
      </div>
    </div>
  )
}