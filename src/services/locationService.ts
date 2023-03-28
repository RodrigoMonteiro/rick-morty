import { Location } from "../models/Location";

const  baseAPI = "https://rickandmortyapi.com/api/";

async function gellAllLocations() : Promise<Location[]> {
  let allLocations : Location[] =[]
  let nextPageURL = `${baseAPI}location`;
  
  while(nextPageURL){
    const response = await fetch(nextPageURL);
    const { info, results } = await response.json();
    
    allLocations = [...allLocations, ...results];
    
    nextPageURL = info.next;
  }
  return allLocations
}

async function getLocationByName(name: string) {
  const response = await fetch(`${baseAPI}location/${name}`);
  return await response.json();
}

export  {gellAllLocations, getLocationByName}