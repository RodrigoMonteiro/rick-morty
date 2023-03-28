import "./styles.css";
import React, { useState, useEffect } from "react";
import { getAllEpisodes } from "../../services/episodeService";
import { useTheme } from "@mui/material/styles";
import { Episode } from "../../models/Episode";
import {EpisodeCard} from './../../components/episodeCard'
import {
  QuestionMark,
} from "@mui/icons-material";

export function EpisodeView() {
  const [selectedSeason, setSelectedSeason] = useState("Season 1");
  const [episodesSeason1, setEpisodesSeason1] = useState<Episode[]>([]);
  const [episodesSeason2, setEpisodesSeason2] = useState<Episode[]>([]);
  const [episodesSeason3, setEpisodesSeason3] = useState<Episode[]>([]);
  
  const currentTheme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllEpisodes();
      console.log(data.results)
      handleEpisodesBySeason(data.results);
    };
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleEpisodesBySeason(allEpisodes: Episode[]) {
   
     allEpisodes.forEach((el) => {
      let season = handleSeason(el.episode);
     
      switch (season) {
        case "01":
           setEpisodesSeason1((prevEpisodes) => [...prevEpisodes, el]);

          break;
        case "02":
          setEpisodesSeason2((prevEpisodes) => [...prevEpisodes, el]);
          break;
        case "03":
          setEpisodesSeason3((prevEpisodes) => [...prevEpisodes, el]);
          break;
      }
    });
  }

  function handleSelectedSeasson(newSelected: string) {
    setSelectedSeason(newSelected);
  }

  function handleSeason(completeEpisode: string) {
    return completeEpisode.substring(1, 3);
  }
  return (
    <div className="episodeView-container">
      <h1 className="episodesView-title">Episodes</h1>
      <button className="extra-informtion">
        <QuestionMark />
      </button>
      <div className="background-image"></div>
      <div className="header-options">
        <button
          style={{ color: currentTheme.palette.text.primary }}
          className={selectedSeason === "Season 1" ? "btn-selected" : ""}
          onClick={() => {
            handleSelectedSeasson("Season 1");
            console.log(episodesSeason1)
          }
        }
        >
          Season 1
        </button>
        <button
          style={{ color: currentTheme.palette.text.primary }}
          className={selectedSeason === "Season 2" ? "btn-selected" : ""}
          onClick={() => {
            handleSelectedSeasson("Season 2");
            console.log(episodesSeason2)
          }}
          >
          Season 2
        </button>
        <button
          style={{ color: currentTheme.palette.text.primary }}
          className={selectedSeason === "Season 3" ? "btn-selected" : ""}
          onClick={() => {
            handleSelectedSeasson("Season 3");
            console.log(episodesSeason3)
          }}
        >
          Season 3
        </button>
      </div>
      {(() => {
        switch (selectedSeason) {
          case "Season 1":
            return <EpisodeCard 
            episodes={episodesSeason1} />;
          case "Season 2":
            return <EpisodeCard episodes={episodesSeason2}/>;
          case "Season 3":
            return <EpisodeCard episodes={episodesSeason3} />;
          default:
            return null;
        }
      })()}
    </div>
  );
 
}
