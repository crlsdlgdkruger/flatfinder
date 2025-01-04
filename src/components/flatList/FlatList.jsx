import { DataTable } from 'primereact/datatable';
import { useEffect, useState } from 'react';
import { FlatService } from '../../services/FlatService';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import "./flatList.css";

export const FlatList = () => {

  const [flats, setFlats] = useState([]);
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

  const handleFavorite = (flat) => {
    console.log("Favorite flat:", flat);
  };


  const actionBodyTemplate = (rowData) => {
    return (
      <div className='action-buttons'>
        <Button
          icon="pi pi-heart"
          rounded
          severity='danger'
          outlined
          tooltip="Add to favorites" tooltipOptions={{ position: 'top', mouseTrackTop: 15, showDelay: 500 }}
          onClick={() => handleFavorite(rowData)}
        />
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

  return (
    <div className="flat-list-container">
      <h4>Flat List</h4>
      {/* hacer un scrooll horizontal con primereact para pantallas pequenas */}
      <div className="flat-list">
        <DataTable value={flats} scrollable scrollDirection="horizontal">
          <Column field="city" header="City" sortable />
          <Column field="streetName" header="Street Name" />
          <Column field="streetNumber" header="Street Number" />
          <Column field="areaSize" header="Area Size" sortable />
          <Column field="yearBuilt" header="Year Built" />
          <Column field="rentPrice" header="Rent Price" sortable />
          <Column field="dateAvailable" header="Date Available" />
          <Column field="hasAC" header="Has AC" />
          {/* Columna de opciones */}
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