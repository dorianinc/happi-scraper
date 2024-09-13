import React, { useState, useEffect } from "react";
import { useDarkMode } from "../../../../context/DarkModeContext";
import { useDispatch, useSelector } from "react-redux";
import * as TargetActions from "../../../../store/searchTargetsReducer";
import "./TargetDetails.css"

const TargetDetails = () => {
  const dispatch = useDispatch();
  const { darkMode } = useDarkMode();

  // Initialize states for all fields, including isExcluded
  const [searchFieldLocation, setSearchFieldLocation] = useState("");
  const [titleLocation, setTitleLocation] = useState("");
  const [linkLocation, setLinkLocation] = useState("");
  const [imageLocation, setImageLocation] = useState("");
  const [priceLocation, setPriceLocation] = useState("");
  const [dollarLocation, setDollarLocation] = useState("");
  const [centLocation, setCentLocation] = useState("");
  const [isExcluded, setIsExcluded] = useState(false); // New boolean field

  const target = useSelector((state) => state.searchTarget.currentTarget);
  console.log("🖥️  target: ", target);

  useEffect(() => {
    dispatch(TargetActions.getSingleTargetThunk());
  }, [dispatch]);

  // Set all fields from target when available
  useEffect(() => {
    if (target) {
      if (target.searchFieldLocation) setSearchFieldLocation(target.searchFieldLocation);
      if (target.titleLocation) setTitleLocation(target.titleLocation);
      if (target.linkLocation) setLinkLocation(target.linkLocation);
      if (target.imageLocation) setImageLocation(target.imageLocation);
      if (target.priceLocation) setPriceLocation(target.priceLocation);
      if (target.dollarLocation) setDollarLocation(target.dollarLocation);
      if (target.centLocation) setCentLocation(target.centLocation);
      if (typeof target.isExcluded !== 'undefined') setIsExcluded(target.isExcluded);
    }
  }, [target]); // Runs when target changes

  if (!target) return null;

  // Handle input changes for all fields
  const handleInputChange = (setter) => (e) => setter(e.target.value);

  // Handle checkbox change for isExcluded
  const handleCheckboxChange = (e) => setIsExcluded(e.target.checked);

  return (
    <div>
      <h1 style={{ padding: "20px" }}>{`Target: ${target.siteName}`}</h1>
      <div className="potato">
        <p>Search bar locator:</p>
        <input
          type="text"
          placeholder="Enter search location"
          value={searchFieldLocation}
          onChange={handleInputChange(setSearchFieldLocation)}
        />
      </div>
      <div className="potato">
        <p>Title locator:</p>
        <input
          type="text"
          placeholder="Enter title location"
          value={titleLocation}
          onChange={handleInputChange(setTitleLocation)}
        />
      </div>
      <div className="potato">
        <p>Link locator:</p>
        <input
          type="text"
          placeholder="Enter link location"
          value={linkLocation}
          onChange={handleInputChange(setLinkLocation)}
        />
      </div>
      <div className="potato">
        <p>Image locator:</p>
        <input
          type="text"
          placeholder="Enter image location"
          value={imageLocation}
          onChange={handleInputChange(setImageLocation)}
        />
      </div>
      <div className="potato">
        <p>Price locator:</p>
        <input
          type="text"
          placeholder="Enter price location"
          value={priceLocation}
          onChange={handleInputChange(setPriceLocation)}
        />
      </div>
      <div className="potato">
        <p>Dollar locator:</p>
        <input
          type="text"
          placeholder="Enter dollar location"
          value={dollarLocation}
          onChange={handleInputChange(setDollarLocation)}
        />
      </div>
      <div className="potato">
        <p>Cent locator:</p>
        <input
          type="text"
          placeholder="Enter cent location"
          value={centLocation}
          onChange={handleInputChange(setCentLocation)}
        />
      </div>
      <div className="potato">
        <p>Is Excluded:</p>
        <input
          type="checkbox"
          checked={isExcluded}
          onChange={handleCheckboxChange}
        />
      </div>
    </div>
  );
};

export default TargetDetails;