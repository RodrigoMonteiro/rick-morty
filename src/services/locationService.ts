const  baseAPI = "https://rickandmortyapi.com/api/";

async function gellAllLocations() {
  const response = await fetch(`${baseAPI}location`);
  return await response.json();
}

async function getLocationByName(name: string) {
  const response = await fetch(`${baseAPI}location/${name}`);
  return await response.json();
}

export  {gellAllLocations, getLocationByName}