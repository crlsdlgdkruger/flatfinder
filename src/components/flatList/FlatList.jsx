import { DataTable } from 'primereact/datatable';
import { useEffect, useState } from 'react';
import { FlatService } from '../../services/FlatService';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { LocalStorageService } from '../../services/LocalStorageService';
import { Utils } from '../../services/Utils';
import { Dropdown } from 'primereact/dropdown';
import "./flatList.css";

export const FlatList = ({ favoriteFlats = [], userId }) => {

  const [flats, setFlats] = useState([]);
  const [cityFilter, setCityFilter] = useState("");
  const [minRentPriceFilter, setMinRentPriceFilter] = useState(0);
  const [maxRentPriceFilter, setMaxRentPriceFilter] = useState(0);
  const [minAreaFilter, setMinAreaFilter] = useState(0);
  const [maxAreaFilter, setMaxAreaFilter] = useState(0);
  const [filteredFlats, setFilteredFlats] = useState([]);
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState("city");
  const [ascDesc, setAscDesc] = useState("asc");
  const navigate = useNavigate();

  const sortOptions = [
    { label: 'City', value: 'city' },
    { label: 'Area', value: 'areaSize' },
    { label: 'Price', value: 'rentPrice' },
  ];

  useEffect(() => {
    if (Object.keys(favoriteFlats).length === 0 && !userId) {
      fetchFlats();
    } else if (userId) {
      fetchMyFlats();
    } else {
      fetchFavoriteFlats();
    }
  }, [filters, sortBy, ascDesc]);

  // useEffect(() => {
  //   console.log('flats', flats, userId);
  // }, [flats, userId]);

  // useEffect(() => {
  //   console.log('filters', filters);
  // }, [filters]);

  const fetchFlats = async () => {
    const service = new FlatService();
    const data = await service.getFlats(filters, sortBy, ascDesc);
    setFlats(data);
  };

  const fetchFavoriteFlats = async () => {
    const service = new FlatService();
    const data = await service.getFlatsByIds(favoriteFlats, filters, sortBy, ascDesc);
    setFlats(data);
  };

  const fetchMyFlats = async () => {
    const service = new FlatService();
    const data = await service.getFlatsByUserId(userId, filters, sortBy, ascDesc);
    console.log('data', data)
    setFlats(data);
  };

  const handleView = (flat) => {
    navigate(`/viewflat/flatId/${flat.id}`);
  };

  const handleFavorite = async (flat) => {
    try {
      await Utils.toggleFavorite(flat);
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

  // const cityFilterElement = () => {
  //   return (
  //     <span className="p-input-icon-right">
  //       <InputText
  //         value={cityFilter}
  //         onChange={(e) => setCityFilter(e.target.value)}
  //         placeholder="Search by city"
  //       />
  //       <i className="pi pi-search search-icon" />
  //     </span>
  //   );
  // };

  // const rentPriceFilterElement = () => {
  //   return (
  //     <div className="p-inputgroup">
  //       <span className="p-inputgroup-addon">Min</span>
  //       <InputNumber
  //         value={minRentPriceFilter}
  //         onValueChange={(e) => setMinRentPriceFilter(e.value)}
  //         placeholder="Min price"
  //         mode="currency"
  //         currency="USD"
  //         locale="en-US"
  //       />
  //       <span className="p-inputgroup-addon">Max</span>
  //       <InputNumber
  //         value={maxRentPriceFilter}
  //         onValueChange={(e) => setMaxRentPriceFilter(e.value)}
  //         placeholder="Max price"
  //         mode="currency"
  //         currency="USD"
  //         locale="en-US"
  //       />
  //     </div>
  //   );
  // };

  // const areaFilterElement = () => {
  //   return (
  //     <div className="p-inputgroup">
  //       <span className="p-inputgroup-addon">Min</span>
  //       <InputNumber
  //         value={minAreaFilter}
  //         onValueChange={(e) => setMinAreaFilter(e.value)}
  //         placeholder="Min Area"
  //       />
  //       <span className="p-inputgroup-addon">Max</span>
  //       <InputNumber
  //         value={maxAreaFilter}
  //         onValueChange={(e) => setMaxAreaFilter(e.value)}
  //         placeholder="Max Area"
  //       />
  //     </div>
  //   );
  // };

  // const filteredFlats = flats.filter((flat) => {
  //   const matchesCity = cityFilter
  //     ? flat.city?.toLowerCase().includes(cityFilter.toLowerCase())
  //     : true;

  //   const matchesRentPrice =
  //     (!minRentPriceFilter || flat.rentPrice >= minRentPriceFilter) &&
  //     (!maxRentPriceFilter || flat.rentPrice <= maxRentPriceFilter);

  //   const matchesArea =
  //     (!minAreaFilter || flat.areaSize >= minAreaFilter) &&
  //     (!maxAreaFilter || flat.areaSize <= maxAreaFilter);

  //   return matchesCity && matchesRentPrice && matchesArea;
  // });

  const submitFilters = (e) => {
    e.preventDefault();
    setFilters({
      ...filters,
      city: cityFilter,
      minArea: minAreaFilter,
      maxArea: maxAreaFilter,
      minRentPrice: minRentPriceFilter,
      maxRentPrice: maxRentPriceFilter,
    });
  };

  const resetFilters = () => {
    setCityFilter('');
    setMinRentPriceFilter(null);
    setMaxRentPriceFilter(null);
    setMinAreaFilter(null);
    setMaxAreaFilter(null);
    setFilters({});
  };

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
      <div>
        <form onSubmit={(e) => { submitFilters(e) }}>
          <div className='flats-filters'>
            <div className='city-filter glass-background'>
              <label className='filter-label'>Filter by city</label>
              <InputText className='input-city-filter' value={cityFilter} onChange={(e) => setCityFilter(e.target.value)} placeholder="Search by city" />
            </div>
            <div className='area-filter glass-background'>
              <label className='filter-label'>Filter by area</label>
              <div className='input-container'>
                <InputNumber className='input-number-filter' value={minAreaFilter} onValueChange={(e) => setMinAreaFilter(e.value)} placeholder="Min area" />
                <InputNumber className='input-number-filter' value={maxAreaFilter} onValueChange={(e) => setMaxAreaFilter(e.value)} placeholder="Max area" />
              </div>
            </div>
            <div className='rent-price-filter glass-background'>
              <label className='filter-label'>Filter by rent price</label>
              <div className='input-container'>
                <InputNumber className='input-number-filter' value={minRentPriceFilter} onValueChange={(e) => setMinRentPriceFilter(e.value)} placeholder="Min price" mode="currency" currency="USD" locale="en-US" />
                <InputNumber className='input-number-filter' value={maxRentPriceFilter} onValueChange={(e) => setMaxRentPriceFilter(e.value)} placeholder="Max price" mode="currency" currency="USD" locale="en-US" />
              </div>
            </div>
            <div className="filter-buttons-container glass-background">
              <Button type="submit" icon="pi pi-search" className="filter-buttons button-filter-search" />
              <Button type="button" icon="pi pi-filter-slash" className="filter-buttons button-filter-clear" outlined onClick={() => resetFilters()} />
            </div>
          </div>
        </form>
        <form onSubmit={(e) => { submitFilters(e) }}>
          <div className="sort-container glass-background">
            <Dropdown options={sortOptions} value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-dropdown" />
            {ascDesc === "asc" ?
              <Button icon="pi pi-sort-amount-up" text severity="info" aria-label="Cancel" onClick={() => setAscDesc("desc")} className="sort-button" /> :
              <Button icon="pi pi-sort-amount-down" text severity="info" aria-label="Cancel" onClick={() => setAscDesc("asc")} className="sort-button" />}
          </div>
        </form>
      </div>
      <div className="flat-list">
        <DataTable value={flats} scrollable scrollDirection="horizontal">
          {/* <Column field="city" header="City" sortable filter filterElement={cityFilterElement} /> */}
          <Column field="city" header="City" />
          <Column field="streetName" header="Street Name" />
          <Column field="streetNumber" header="Street Number" />
          {/* <Column field="areaSize" header="Area Size" sortable filter filterElement={areaFilterElement} body={areaBodyTemplate} /> */}
          <Column field="areaSize" header="Area Size" body={areaBodyTemplate} />
          <Column field="yearBuilt" header="Year Built" />
          {/* <Column field="rentPrice" header="Rent Price" sortable filter filterElement={rentPriceFilterElement} body={rentPriceBodyTemplate} /> */}
          <Column field="rentPrice" header="Rent Price" body={rentPriceBodyTemplate} />
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