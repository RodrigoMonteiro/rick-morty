import { Button } from "@mui/material";
import React, { useRef } from "react";
import './styles.css'
import {DarkMode, LightMode} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
export function Navbar(props: any) {
  


const {changeTheme, theme} = props
const currentTheme = useTheme();

function handleHomeClick() {
  const homeViewRef = document.getElementById("home-view");
  homeViewRef?.scrollIntoView({ behavior: "smooth" });
}
function handleCharacterClick() {
  const characterViewRef = document.getElementById("character-view");
  characterViewRef?.scrollIntoView({ behavior: "smooth" });
}
function handleEpisodeClick() {
  const episodeViewRef = document.getElementById("episode-view");
  episodeViewRef?.scrollIntoView({ behavior: "smooth" });
}
function handleLocationClick() {
  const locationViewRef = document.getElementById("location-view");
  locationViewRef?.scrollIntoView({ behavior: "smooth" });
}
 
  return (
    <>
      <header
        className="header-container"
        style={{ backgroundColor: currentTheme.palette.background.default }}
      >
        <img
          onClick={handleHomeClick}
          style={{ width: "15%", height: "100%", cursor: 'pointer'}}
          src="assets/logo.png"
          alt="Logo_alt"
        />
        <ul>
          <li>
            <button
              className="btn"
              color="secondary"
              onClick={handleCharacterClick}
            >
              Characters
            </button>
          </li>
          <li>
            <button
              className="btn"
              color="secondary"
              onClick={handleEpisodeClick}
            >
              Episodes
            </button>
          </li>
          <li>
            <button
              className="btn"
              color="secondary"
              onClick={handleLocationClick}
            >
              Locations
            </button>
          </li>
          <li>
            <Button
              className="btn-theme"
              color="secondary"
              onClick={() => changeTheme()}
            >
              {theme === true ? <LightMode /> : <DarkMode />}
            </Button>
          </li>
        </ul>
      </header>
    </>
  );
}
