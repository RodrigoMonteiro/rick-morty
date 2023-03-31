import "./styles.css";
import React, { useState, useEffect } from "react";
import { Character } from "../../models/Character";
import {
getFirstPageCharacters,
  getCharactersByPage,
  getAllCharacters
} from "../../services/characterService";
import { useTheme } from "@mui/material/styles";
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  Search,
} from "@mui/icons-material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export function CharacterView() {
  const currentTheme = useTheme();

  const [charactersCurrentPage, setCharactersCurrentPage] = useState<Character[]>([]);
  const [singleCharacter, setSingleCharacter] = useState<Character>();
  const [searchCharacter, setSearchCharacter] = useState("");
  const [pagination, setPagination] = useState({
    firstPage: 1,
    currentPage: 1,
    lastPage: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFirstPageCharacters();
      console.log(data);
      setCharactersCurrentPage(data.results);
      setPagination({
        ...pagination,
        lastPage: data.info.pages,
      });
    };
    fetchData();
    // eslint-disable-next-line
  }, []);

  function handleSingleCharacter(handleCharacter: Character) {
    setSingleCharacter(handleCharacter);
  }

  async function handlePreviousPage() {
    const prevPage = pagination.currentPage - 1;
    if (prevPage < pagination.firstPage) return;
    const newCharacters = await getCharactersByPage(prevPage);
    setCharactersCurrentPage(newCharacters.results);
    setPagination({
      ...pagination,
      currentPage: prevPage,
    });
  }
  async function handleNextPage() {
    const nextPage = pagination.currentPage + 1;
    if (nextPage > pagination.lastPage) return;
    const newCharacters = await getCharactersByPage(nextPage);
    setCharactersCurrentPage(newCharacters.results);
    setPagination({
      ...pagination,
      currentPage: nextPage,
    });
  }

  async function handleFirstCharacterPage() {
    const newCharacters = await getCharactersByPage(pagination.firstPage);
    setCharactersCurrentPage(newCharacters.results);
    setPagination({
      ...pagination,
      currentPage: pagination.firstPage,
    });
  }

  async function handleLastCharacterPage() {
    const newCharacters = await getCharactersByPage(pagination.lastPage);
    setCharactersCurrentPage(newCharacters.results);
    setPagination({
      ...pagination,
      currentPage: pagination.lastPage,
    });
  }
  
   async function handleCharacterByName(character: string) {
     const result = await getAllCharacters()
     const filteredLocations = result.filter((e) =>
       e.name.toLowerCase().includes(character.toLowerCase())
     );
     setCharactersCurrentPage(filteredLocations);
   }

  return (
    <>
      <div className="characterView-container">
        <h1 className="characterView-title">Characters</h1>

        <input
          type="text"
          placeholder="Find a character by name.."
          onChange={(e) => setSearchCharacter(e.target.value)}
          style={{
            borderColor: currentTheme.palette.secondary.main,
            color: currentTheme.palette.text.primary,
          }}
        />
        <Search
          className="characterView-search-input-btn"
          onClick={() => {
            handleCharacterByName(searchCharacter);
          }}
        />
        <div className="characterView-search-table">
          <TableContainer className="table-container">
            <Table
              stickyHeader
              sx={{ border: "2px solid #11cb5f", borderRadius: "5px" }}
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{ bgcolor: currentTheme.palette.secondary.main }}
                  >
                    <strong>Name</strong>
                  </TableCell>
                  <TableCell
                    sx={{ bgcolor: currentTheme.palette.secondary.main }}
                  ></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {charactersCurrentPage.map((character) => (
                  <TableRow
                    key={character.id}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSingleCharacter(character)}
                  >
                    <TableCell component="th" scope="row" align="left">
                      {character.name}
                    </TableCell>
                    <TableCell component="th" scope="row" align="right">
                      <KeyboardArrowRight />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div
          className="table-pagination"
          style={{ borderColor: currentTheme.palette.secondary.main }}
        >
          <span
            className="first-page"
            onClick={() => handleFirstCharacterPage()}
          >
            {pagination.firstPage}
          </span>
          <span className="previous-page">
            <KeyboardArrowLeft onClick={() => handlePreviousPage()} />
          </span>
          <span className="current-page">{pagination.currentPage}</span>
          <span className="next-page">
            <KeyboardArrowRight onClick={() => handleNextPage()} />
          </span>
          <span className="last-page" onClick={() => handleLastCharacterPage()}>
            {pagination.lastPage}
          </span>
        </div>

        <div
          className="result-container"
          style={{ borderColor: currentTheme.palette.secondary.main }}
        >
          {singleCharacter ? (
            <>
              <div
                className="result-header"
                style={{ borderColor: currentTheme.palette.secondary.main }}
              >
                <img
                  src={singleCharacter.image}
                  alt="selected_chatacter_img"
                  style={{ borderColor: currentTheme.palette.secondary.main }}
                />
              </div>
              <div
                className="result-content"
                style={{ backgroundColor: currentTheme.palette.primary.main }}
              >
                <span>
                  <strong>Name: </strong>
                  {singleCharacter.name}
                </span>
                <span>
                  <strong>Status: </strong>
                  {singleCharacter.status}
                </span>
                <span>
                  <strong>Specie(s): </strong>
                  {singleCharacter.species}
                </span>
                <span>
                  <strong>Gender: </strong>
                  {singleCharacter.gender}
                </span>
                <span>
                  <strong>Origin: </strong>
                  {singleCharacter.origin.name}
                </span>
                <span>
                  <strong>Location: </strong>
                  {singleCharacter.location.name}
                </span>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="background-image"></div>
      </div>
    </>
  );
}
