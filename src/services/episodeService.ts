const baseAPI = "https://rickandmortyapi.com/api/";

async function getAllEpisodes() {
  const response = await fetch(`${baseAPI}episode`);
  return await response.json();
}

async function getEpisodeByName(name: string) {
  const response = await fetch(`${baseAPI}episode/${name}`);
  return response.json();
}
export {getAllEpisodes, getEpisodeByName}