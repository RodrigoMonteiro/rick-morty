import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import React from "react";
import { Episode } from "../../models/Episode";
import "./styles.css";

interface EpisodeCardProps {
  episodes: Episode[];
}

export function EpisodeCard(props: EpisodeCardProps) {
  const currentTheme = useTheme();
  if (!props.episodes || props.episodes.length === 0) {
    return null;
  }

  function handleEpisode(completeEpisode: string) {
    return completeEpisode.substring(4);
  }
  function handleSeason(completeEpisode: string) {
    return completeEpisode.substring(1, 3);
  }

  return (
    <div
      className="card-episode"
      style={{ color: currentTheme.palette.text.primary }}
    >
      <KeyboardArrowLeft className="arrow-left" />
      <span>
        <strong>Name: </strong>
        {props.episodes[0].name}
      </span>
      <span>
        <strong>Season: </strong>
        {handleSeason(props.episodes[0].episode)}
      </span>
      <span>
        <strong>Episode: </strong>
        {handleEpisode(props.episodes[0].episode)}
      </span>
      <span>
        <strong>Air date: </strong>
        {props.episodes[0].air_date}
      </span>
      <KeyboardArrowRight className="arrow-right" />
    </div>
  );
}
