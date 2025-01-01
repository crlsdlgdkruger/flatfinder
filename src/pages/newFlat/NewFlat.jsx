import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";
import { AuthService } from "../../services/AuthService";
import { Header } from "../../components/header/Header";
import { Footer } from "../../components/footer/Footer";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { RadioButton } from "primereact/radiobutton";
import { Flat } from "../../models/Flat";
import "../pages.css";
import "./newFlat.css";

export const NewFlat = () => {

  const [flat, setFlat] = useState(new Flat());
  const [errors, setErrors] = useState({});
  const { user, updateUser } = useContext(UserContext);

  useEffect(() => {
    // AuthService.isAuthenticated(user);
  }, []);


  return (
    <div className="page-wrapper">
      <div className="header-wrapper">
        <header>
          <Header />
        </header>
      </div>
      <div className="content-wrapper">
        <main>
          <form action="">
            <h1>NewFlat</h1>
            {/* City input */}
            <div>
              <label htmlFor="city-input">City</label>
              <InputText id="city-input" value={flat.city} onChange={(e) => { setFlat({ ...flat, city: e.target.value }) }} type='text' />
              {errors.city && <small className="p-error">{errors.city}</small>}
            </div>
            {/* Street name input */}
            <div>
              <label htmlFor="street-name-input">Street Name</label>
              <InputText id="street-name-input" value={flat.streetName} onChange={(e) => { setFlat({ ...flat, streetName: e.target.value }) }} type='text' />
              {errors.streetName && <small className="p-error">{errors.streetName}</small>}
            </div>
            {/* Street number input */}
            <div>
              <label htmlFor="street-number-input">Street Number</label>
              <InputText id="street-number-input" value={flat.streetNumber} onChange={(e) => { setFlat({ ...flat, streetNumber: e.target.value }) }} type='number' />
              {errors.streetNumber && <small className="p-error">{errors.streetNumber}</small>}
            </div>
            {/* Area size input */}
            <div>
              <label htmlFor="area-size-input">Area Size</label>
              <InputText id="area-size-input" value={flat.areaSize} onChange={(e) => { setFlat({ ...flat, areaSize: e.target.value }) }} type='number' />
              {errors.areaSize && <small className="p-error">{errors.areaSize}</small>}
            </div>
            {/* Year built input */}
            <div>
              <label htmlFor="year-built-input">Year Built</label>
              <InputText id="year-built-input" value={flat.yearBuilt} onChange={(e) => { setFlat({ ...flat, yearBuilt: e.target.value }) }} type='number' />
              {errors.yearBuilt && <small className="p-error">{errors.yearBuilt}</small>}
            </div>
            {/* rent price input */}
            <div>
              <label htmlFor="rent-price-input">Rent Price</label>
              <InputText id="rent-price-input" value={flat.rentPrice} onChange={(e) => { setFlat({ ...flat, rentPrice: e.target.value }) }} type='number' />
              {errors.rentPrice && <small className="p-error">{errors.rentPrice}</small>}
            </div>
            {/* Date available input */}
            <div>
              <label htmlFor="date-available-input">Date Available</label>
              <Calendar id="date-available-input" value={flat.dateAvailable} onChange={(e) => { setFlat({ ...flat, dateAvailable: e.target.value }) }} dateFormat="dd/mm/yy" />
              {errors.dateAvailable && <small className="p-error">{errors.dateAvailable}</small>}
            </div>

            {/* Has AC input */}
            <div className="has-ac-radio-container">
              <div>
                <label htmlFor="has-ac-yes">Has AC</label>
              </div>
              <div>
                <RadioButton inputId="has-ac-yes" name="hasAC" value="Yes" onChange={(e) => { setFlat({ ...flat, hasAC: e.value }) }} checked={flat.hasAC === "Yes"} />
                <label htmlFor="has-ac-yes">Yes</label>
              </div>
              <div>
                <RadioButton inputId="has-ac-no" name="hasAC" value="No" onChange={(e) => { setFlat({ ...flat, hasAC: e.value }) }} checked={flat.hasAC === "No"} />
                <label htmlFor="has-ac-no">No</label>
              </div>
            </div>
            {/* Submit button */}
            <div>
              <Button label="Save" type="submit" />
            </div>
          </form>
        </main>
      </div>
      <div className="footer-wrapper">
        <footer>
          <Footer />
        </footer>
      </div>
    </div>
  )
}