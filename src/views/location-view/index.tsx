import "./styles.css";
import React, { useEffect, useState } from "react";
import { getAllLocations } from "../../services/locationService";
import { Location } from "../../models/Location";
import { useTheme } from "@mui/material/styles";
import { Search, UnfoldMore } from "@mui/icons-material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export function LocationView() {
  const currentTheme = useTheme();
  const [dataLocations, setDataLocations] = useState<Location[]>([]);
  const [orderAtributes, setOrderAtributes] = useState({
    nameOrdenedAsc: true,
    dimensionOrdenedAsc: false,
    typeOrdenedAsc: false,
  })
  const [searchLocation, setSearchLocation] = useState("")

  async function handleAllLocations(){
    const allLocations = await getAllLocations();  
    setDataLocations(allLocations);
  }
  
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllLocations();
      data.sort((a, b) => {
        if (a.name < b.name) {
        
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
      setDataLocations(data);
    };
    fetchData();
  }, []);


function orderByAtribute(atribute: string) {
  const attributeKey = atribute.toLowerCase();
  if (attributeKey === "name") {
    setOrderAtributes({
      ...orderAtributes,
      nameOrdenedAsc: !orderAtributes.nameOrdenedAsc,
    });
    orderAtributes.nameOrdenedAsc
      ? orderAsc(attributeKey)
      : orderDesc(attributeKey);
  } else if (attributeKey === "dimension") {
    setOrderAtributes({
      ...orderAtributes,
      dimensionOrdenedAsc: !orderAtributes.dimensionOrdenedAsc,
    });
    orderAtributes.dimensionOrdenedAsc
      ? orderAsc(attributeKey)
      : orderDesc(attributeKey);
  } else if (attributeKey === "type") {
    setOrderAtributes({
      ...orderAtributes,
      typeOrdenedAsc: !orderAtributes.typeOrdenedAsc,
    });
    orderAtributes.typeOrdenedAsc
      ? orderAsc(attributeKey)
      : orderDesc(attributeKey);
  }
}


 function orderAsc(atribute: string) {
   setDataLocations((prevState) => {
    const newData = [...prevState].sort((a, b) => {
      if (a[atribute] < b[atribute]) {
        return -1;
      }
      if (a[atribute] > b[atribute]) {
        return 1;
      }
      return 0;
    });
    return newData;
  });
}

function orderDesc(atribute: string) {
  console.log("Desc...", atribute)
  setDataLocations((prevState) => {
    const newData = [...prevState].sort((a, b) => {
      if (a[atribute] < b[atribute]) {
        return 1;
      }
      if (a[atribute] > b[atribute]) {
        return -1;
      }
      return 0;
    });
    return newData;
  });
  }

 async function handleLocationByName(location: string) {
   const result = await getAllLocations();
   const filteredLocations = result.filter((e) =>
     e.name.toLowerCase().includes(location.toLowerCase())
   );
   setDataLocations(filteredLocations);
   setSearchLocation("")
 }
 
  return (
    <div className="locationView-container">
      <h1 className="locationView-title">Locations</h1>
      <div className="locationView-card">
        <input
          value={searchLocation}
          placeholder="Find a location by name..."
          className="card-input"
          onChange={(e) => {
            setSearchLocation(e.target.value);
          }}
          style={{
            borderColor: currentTheme.palette.secondary.main,
            color: currentTheme.palette.text.primary,
          }}
        ></input>
        <Search
          className="card-input-btn"
          onClick={() => handleLocationByName(searchLocation)}
        />
        <div className="card-content">
          <TableContainer
            className="table-container"
            sx={{ border: "2px solid #11cb5f", borderRadius: "5px" }}
          >
            <Table stickyHeader>
              <TableHead sx={{ height: 1 / 10 }}>
                <TableRow>
                  <TableCell
                    sx={{
                      bgcolor: currentTheme.palette.secondary.main,
                      width: 2 / 5,
                    }}
                  >
                    <strong>Name</strong>
                    <UnfoldMore
                      className="order-icon-btn"
                      onClick={() => orderByAtribute("Name")}
                    />
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      bgcolor: currentTheme.palette.secondary.main,
                      width: 2 / 5,
                    }}
                  >
                    Dimension
                    <UnfoldMore
                      className="order-icon-btn"
                      onClick={() => orderByAtribute("Dimension")}
                    />
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      bgcolor: currentTheme.palette.secondary.main,
                      width: 1 / 5,
                    }}
                  >
                    Type
                    <UnfoldMore
                      className="order-icon-btn"
                      onClick={() => orderByAtribute("Type")}
                    />
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataLocations.length ? (
                  dataLocations.map((e) => (
                    <TableRow key={e.id} style={{ cursor: "pointer" }}>
                      <TableCell
                        colSpan={1}
                        component="th"
                        scope="row"
                        align="left"
                        sx={{ width: 2 / 5 }}
                      >
                        <strong> {e.name}</strong>
                      </TableCell>
                      <TableCell
                        colSpan={1}
                        component="th"
                        scope="row"
                        align="center"
                        sx={{ width: 2 / 5 }}
                      >
                        {e.dimension}
                      </TableCell>
                      <TableCell
                        colSpan={1}
                        component="th"
                        scope="row"
                        align="center"
                        sx={{ width: 1 / 5 }}
                      >
                        {e.type}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      <strong>No location(s) found. </strong>
                      Back to list
                      <button
                        onClick={() => {
                          handleAllLocations();
                        }}
                        className="btn-back-list-location"
                      >
                        here.
                      </button>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <div className="background-image"></div>
    </div>
  );
}
