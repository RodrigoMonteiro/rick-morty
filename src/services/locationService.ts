import { Location } from "../models/Location";

const baseAPI = "https://rickandmortyapi.com/api/";

async function getAllLocations(): Promise<Location[]> {
  let allLocations: Location[] = [];
  let nextPageURL = `${baseAPI}location`;

  while (nextPageURL) {
    const response = await fetch(nextPageURL);
    const { info, results } = await response.json();

    allLocations = [...allLocations, ...results];

    nextPageURL = info.next;
  }
  return allLocations;
}

async function getLocationByName(name: string): Promise<Location | undefined> {
  const allLocations = await getAllLocations();
  return allLocations.find((location) => location.name === name);
}

export { getAllLocations, getLocationByName };
