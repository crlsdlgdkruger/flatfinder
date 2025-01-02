import { Button } from "primereact/button"
import { Calendar } from "primereact/calendar"
import { InputText } from "primereact/inputtext"
import { RadioButton } from "primereact/radiobutton"
import { useState } from "react"
// import { Flat } from "../../models/Flat";


export const FlatForm = ({ flat, setFlat, action, buttonAction }) => {

  // const [flat, setFlat] = useState(new Flat());
  const [errors, setErrors] = useState({});

  const submitFlat = (e) => {
    e.preventDefault();
    if (validate()) {
      action();
    }
  }

  const validate = () => {
    const errors = {};
    if (!flat.city) errors.city = "City is required";
    if (!flat.streetName) errors.streetName = "Street name is required";
    if (!flat.streetNumber) errors.streetNumber = "Street number is required";
    if (!flat.areaSize) errors.areaSize = "Area size is required";
    if (flat.hasAC === null || flat.hasAC === undefined) errors.hasAC = "Has AC is required";
    if (!flat.yearBuilt) errors.yearBuilt = "Year built is required";
    if (!flat.rentPrice) errors.rentPrice = "Rent price is required";
    if (!flat.dateAvailable) errors.dateAvailable = "Date available is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  return (
    <div>
      <form onSubmit={(e) => { submitFlat(e) }}>
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
            <RadioButton inputId="has-ac-yes" name="hasAC" value={true} onChange={(e) => { setFlat({ ...flat, hasAC: e.value }) }} checked={flat.hasAC === true} />
            <label htmlFor="has-ac-yes">Yes</label>
          </div>
          <div>
            <RadioButton inputId="has-ac-no" name="hasAC" value={false} onChange={(e) => { setFlat({ ...flat, hasAC: e.value }) }} checked={flat.hasAC === false} />
            <label htmlFor="has-ac-no">No</label>
          </div>
          <div>
            {errors.hasAC && <small className="p-error">{errors.hasAC}</small>}
          </div>
        </div>
        {/* Submit button */}
        <div>
          <Button label={buttonAction} type="submit" />
        </div>
      </form>
    </div>
  )
}