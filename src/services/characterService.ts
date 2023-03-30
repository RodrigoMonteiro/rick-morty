import { Character } from "../models/Character";

const baseAPI = "https://rickandmortyapi.com/api/";

async function getFirstPageCharacters() {
  const response = await fetch(`${baseAPI}character`);
  return await response.json();
}

async function getAllCharacters(): Promise<Character[]> {
  let allCharacter: Character[] = [];
  let nextPageURL = `${baseAPI}character`;

  while (nextPageURL) {
    const response = await fetch(nextPageURL);
    const { info, results } = await response.json();

    allCharacter = [...allCharacter, ...results];

    nextPageURL = info.next;
  }
  return allCharacter;
}

async function getCharacterByName(
  name: string
): Promise<Character | undefined> {
  const allCharacter = await getAllCharacters();
  return allCharacter.find((character) => character.name === name);
}

async function getCharactersByPage(page: number) {
  const response = await fetch(`${baseAPI}character?page=${page}`);
  return await response.json();
}

export {
  getFirstPageCharacters,
  getCharacterByName,
  getCharactersByPage,
  getAllCharacters,
};
