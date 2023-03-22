import "./styles.css";
import React, { useState, useEffect } from "react";
import { getAllEpisodes } from "../../services/episodeService";
export function EpisodeView() {
  const [dataEpisodes, setDataEpisodes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllEpisodes();
      // console.log(data.results);
      setDataEpisodes(data);
    };
    fetchData();
  }, []);
  return (
    <div className="episodeView-container">
      <h3>Episode view component</h3>
      <div className="background-image"></div>
    </div>
  );
}
