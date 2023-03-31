import './styles.css'
import React from 'react'
import { useTheme } from "@mui/material/styles";
export function Home(){

  const currentTheme = useTheme()
    return (
      <div className="home-container">
        <h1 className="home-title">Dive into Ricky & Morty World!</h1>
        <span className="home-subtitle">
          Get ready for a wild ride through multiple dimensions with Rick and
          Morty! Follow the adventures of the eccentric scientist and his
          hapless grandson as they encounter strange creatures and navigate
          their dysfunctional family life. Meet the quirky characters and visit
          unforgettable locations. With hilarious episodes, Rick and Morty is a
          must-watch for any fan of sci-fi and comedy.
        </span>
        <span className="home-information">
          The data used on this web page was provided by rickandmortyapi. For
          additional information, please visit their website {" "}
          <a
            style={{ color: currentTheme.palette.text.primary }}
            className="home-information-link"
            href="https://rickandmortyapi.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
          .
        </span>

        <div className="background-image"></div>
      </div>
    );
}