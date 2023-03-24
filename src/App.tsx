import "./App.css";
import CssBaseline from "@mui/material/CssBaseline";
import React, { useState , useRef} from "react";
import { ThemeProvider } from "@mui/material/styles";
import { darkTheme, lightTheme } from "./styles/theme";
import { Navbar } from "./components/navbar";
import { Home } from "./views/home";
import { CharacterView } from "./views/character-view";
import { EpisodeView } from "./views/episode-view";
import { LocationView } from "./views/location-view";

function App() {
  const [isLightTheme, setIsLightTheme] = useState(true);

  function handleChangeTheme() {
    setIsLightTheme(!isLightTheme);
  }
  const characterViewRef = useRef<HTMLDivElement>(null);
  const episodeViewRef = useRef<HTMLDivElement>(null);
  const locationViewRef = useRef<HTMLDivElement>(null);
  const homeViewRef = useRef<HTMLDivElement>(null);

  return (
    <ThemeProvider theme={isLightTheme ? lightTheme : darkTheme}>
      <div className="App-container">
        <Navbar changeTheme={handleChangeTheme} theme={isLightTheme} />

        <div ref={homeViewRef} id="home-view">
          <Home />
        </div>
        <div ref={characterViewRef} id="character-view">
          <CharacterView/>
        </div>
        <div ref={episodeViewRef} id="episode-view">
          <EpisodeView />
        </div>
        <div ref={locationViewRef} id="location-view">
          <LocationView />
        </div>
      </div>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
