import "./styles.css";
import React, { useEffect, useState } from "react";
import { gellAllLocations } from "../../services/locationService";
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
  useEffect(() => {
    const fetchData = async () => {
      const data = await gellAllLocations();
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
  if (atribute === "Name") {
    orderAtributes.nameOrdenedAsc ?  orderAsc(atribute) : orderDesc(atribute);
    setOrderAtributes({
      ...orderAtributes,
      nameOrdenedAsc: !orderAtributes.nameOrdenedAsc,
    });
  } else if (atribute === "Dimension") {
     orderAtributes.dimensionOrdenedAsc
       ? orderAsc(atribute)
       : orderDesc(atribute);
    setOrderAtributes({
      ...orderAtributes,
      dimensionOrdenedAsc: !orderAtributes.dimensionOrdenedAsc,
    });
  } else if (atribute === "Type") {
    orderAtributes.typeOrdenedAsc ? orderAsc(atribute) : orderDesc(atribute);
    setOrderAtributes({
      ...orderAtributes,
      typeOrdenedAsc: !orderAtributes.typeOrdenedAsc,
    });
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
  // function orderDesc(attribute: string) {
  //   console.log("Desc...", attribute);
  //   const newOrdened = [...dataLocations].sort((a, b) => {
  //     if (a[attribute] < b[attribute]) {
  //       return 1;
  //     } else if (a[attribute] > b[attribute]) {
  //       return -1;
  //     } else {
  //       return 0;
  //     }
  //   });
  //   setDataLocations(newOrdened);
  // }


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
        <div className="card-content">
          <TableContainer className="table-container">
            <Table stickyHeader>
              <TableHead sx={{ height: 1 / 10, borderRadius: 5 }}>
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
                {dataLocations.map((e) => (
                  <TableRow key={e.id} style={{ cursor: "pointer" }}>
                    <TableCell
                      component="th"
                      scope="row"
                      align="left"
                      sx={{ width: 2 / 5 }}
                    >
                      <strong> {e.name}</strong>
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      align="center"
                      sx={{ width: 2 / 5 }}
                    >
                      {e.dimension}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      align="center"
                      sx={{ width: 1 / 5 }}
                    >
                      {e.type}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <div className="background-image"></div>
    </div>
  );
}
