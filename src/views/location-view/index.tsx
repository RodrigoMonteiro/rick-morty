import "./styles.css";
import React, { useEffect, useState } from "react";
import {
  gellAllLocations,
  getLocationByName,
} from "../../services/locationService";
export function LocationView() {
  const [dataLocations, setDataLocations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await gellAllLocations();
      // console.log(data.results)
      setDataLocations(data);
    };
    fetchData();
  }, []);
  return (
    <div className="locationView-container">
      <h1 className="locationView-title">Locations</h1>
      <div className="background-image"></div>
    </div>
  );
}
