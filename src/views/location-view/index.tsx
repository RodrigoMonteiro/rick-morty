import "./styles.css";
import React, { useEffect, useState } from "react";
import { gellAllLocations } from "../../services/locationService";
import { Location } from "../../models/Location";
import { useTheme } from "@mui/material/styles";
import { Search } from "@mui/icons-material";
export function LocationView() {
  
  const currentTheme = useTheme()
  const [dataLocations, setDataLocations] = useState<Location[]>([]);
  const [pagination, setPagination] = useState({
    previousLoction: 0,
    currentLocation: 0,
    nextLocation: 1,
  });
  useEffect(() => {
    const fetchData = async () => {
      const data = await gellAllLocations();
      setDataLocations(data);
      console.log(dataLocations);
    };
    fetchData();
  }, []);

  return (
    <div className="locationView-container">
      <h1 className="locationView-title">Locations</h1>
      <div className="locationView-card">
        <input
          className="card-input"
          style={{
            borderColor: currentTheme.palette.secondary.main,
            color: currentTheme.palette.text.primary,
          }}
        ></input>
        <Search className="card-input-btn" />
        <div className="card-content"></div>
      </div>
      <div className="background-image"></div>
    </div>
  );
}
  
  