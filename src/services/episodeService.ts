import { Episode } from "../models/Episode";

const baseAPI = "https://rickandmortyapi.com/api/";

async function getAllEpisodes(): Promise <Episode[]> {
  let allEpisodes : Episode[] =[];
  let nextPageURL = `${baseAPI}episode`;

  while (nextPageURL) {
    const response = await fetch(nextPageURL);
    const { info, results } = await response.json();

    allEpisodes = [...allEpisodes, ...results];

    nextPageURL = info.next;
  }

  return allEpisodes;
}

async function getEpisodeByName(name: string) {
  const response = await fetch(`${baseAPI}episode/${name}`);
  return response.json();
}
export {getAllEpisodes, getEpisodeByName}