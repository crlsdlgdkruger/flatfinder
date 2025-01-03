import { DataTable } from 'primereact/datatable';
import { useEffect, useState } from 'react';
import { FlatService } from '../../services/FlatService';
import { Column } from 'primereact/column';
import "./flatList.css";

export const FlatList = () => {

  const [flats, setFlats] = useState([]);

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
        </DataTable>
      </div>
    </div>
  )
}