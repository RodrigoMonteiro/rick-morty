import "./styles.css";
import React, { useState, useEffect } from "react";
import { Character } from "../../models/Character";
import { getAllCharacters } from "../../services/characterService";
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

  const [characters, setCharacters] = useState<Character[]>([]);
  const [singleCharacter, setSingleCharacter] = useState<Character>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllCharacters();
      setCharacters(data.results);
    };
    fetchData();
  }, []);

  function handleSingleCharacter(handleCharacter: Character) {
    setSingleCharacter(handleCharacter);
    // console.log(singleCharacter);
  }
  return (
    <>
      <div className="characterView-container">
        <h1 className="characterView-title">Characters</h1>

        <div className="characterView-search-container">
          <input
            type="text"
            style={{
              borderColor: currentTheme.palette.secondary.main,
              color: currentTheme.palette.text.primary,
            }}
          />
          <Search className="characterView-search-input-btn" />
          <div className="characterView-search-list">
            <TableContainer className="table-container">
              <Table stickyHeader>
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
                  {characters.map((character) => (
                    <TableRow
                      key={character.name}
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

            <div
              className="table-pagination"
              style={{ borderColor: currentTheme.palette.secondary.main }}
            >
              <span className="first-page">1</span>
              <span className="previous-page">
                <KeyboardArrowLeft />
              </span>
              <span className="current-page">3</span>
              <span className="next-page">
                <KeyboardArrowRight />
              </span>
              <span className="last-page">80</span>
            </div>
          </div>
        </div>
        <div className="characterView-search-result">
          <div
            className="result-container"
            style={{ borderColor: currentTheme.palette.secondary.main }}
          >
            {singleCharacter && (
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
                  <span className="character-name">{singleCharacter.name}</span>
                </div>
                <div className="result-content">
                  <span>Status: {singleCharacter.status}</span>
                  <span>Specie(s): {singleCharacter.species}</span>
                  <span>Gender: {singleCharacter.gender}</span>
                  <span>Origin: {singleCharacter.origin.name}</span>
                  <span>Location: {singleCharacter.location.name}</span>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="background-image"></div>
      </div>
    </>
  );
}
