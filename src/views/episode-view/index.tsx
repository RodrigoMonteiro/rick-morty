import "./styles.css";
import React, { useState, useEffect } from "react";
import { getAllEpisodes } from "../../services/episodeService";
import { useTheme } from "@mui/material/styles";
import { Episode } from "../../models/Episode";
import { EpisodeCard } from "./../../components/episodeCard";
import { QuestionMark } from "@mui/icons-material";
import { EpisodeDialog } from "../../components/episodeDialog";

export function EpisodeView() {
  const [selectedSeason, setSelectedSeason] = useState("Season 1");
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const currentTheme = useTheme();
  const [isDialogOpen, setIsDialogOpen] = useState(false);  

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllEpisodes();
      setEpisodes(data);
    };
    fetchData();
  }, []);

    const handleClickOpen = () => {
      setIsDialogOpen(true);
      console.log("dialog: ", isDialogOpen)
    };
    
    const handleClose = () => {
      setIsDialogOpen(false);
      console.log("dialog: ", isDialogOpen)
    };
   

  function handleSelectedSeason(newSelected: string) {
    setSelectedSeason(newSelected);
  }

  function filterEpisodesBySeason(episodes: Episode[], season: string) {
    return episodes.filter((episode) => episode.episode.includes(`S${season}`));
  }
type EpisodesBySeason = {
  [key: string]: Episode[];
};

const episodesBySeason: EpisodesBySeason = {
  
  "Season 1": filterEpisodesBySeason(episodes, "01"),
  "Season 2": filterEpisodesBySeason(episodes, "02"),
  "Season 3": filterEpisodesBySeason(episodes, "03"),
  "Season 4": filterEpisodesBySeason(episodes, "04"),
  "Season 5": filterEpisodesBySeason(episodes, "05"),
};

  return (
    <div className="episodeView-container">
      <h1 className="episodesView-title">Episodes</h1>
      <EpisodeDialog/>
      <div className="background-image"></div>
      <div className="header-options">
        {Object.keys(episodesBySeason).map((season) => (
          <button
            key={season}
            style={{ color: currentTheme.palette.text.primary }}
            className={selectedSeason === season ? "btn-selected" : ""}
            onClick={() => {
              handleSelectedSeason(season);
            }}
          >
            {season}
          </button>
        ))}
      </div>
      <EpisodeCard episodes={episodesBySeason[selectedSeason]} />
    </div>
  );
}
