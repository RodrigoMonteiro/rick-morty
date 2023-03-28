const baseAPI = "https://rickandmortyapi.com/api/";

async function getAllCharacters() {
  const response = await fetch(`${baseAPI}character`);
  return await response.json();
}

async function getCharacterByName(name : string){
    const response = await fetch(`${baseAPI}character/${name}`)
    return await response.json()
}


export  {getAllCharacters , getCharacterByName} 
