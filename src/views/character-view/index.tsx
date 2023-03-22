import "./styles.css";
import React, { useState, useEffect } from "react";
import { getAllCharacters } from "../../services/characterService";
export function CharacterView() {
  const [dataCharacters, setDataCharacters] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllCharacters();
      console.log(data)
      setDataCharacters(data);
    };
    fetchData()
  }, []);
  return (
    <div className="characterView-container">
      <h3>Character view component</h3>
      <div className="background-image"></div>
    </div>
  );
}
