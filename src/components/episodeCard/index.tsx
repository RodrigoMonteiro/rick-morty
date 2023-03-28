import "./styles.css";
import React, { useEffect, useState } from "react";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { Episode } from "../../models/Episode";

interface EpisodeCardProps {
  episodes: Episode[];
}

export function EpisodeCard(props: EpisodeCardProps) {
  useEffect(() => {
    setStatCurrentPage({
      previousEpisode: 0,
      currentEpisode: 0,
      nextEpisode: props.episodes.length > 1 ? 1 : 0,
    });
  }, [props.episodes]);

  const [statCurrentPage, setStatCurrentPage] = useState({
    previousEpisode: 0,
    currentEpisode: 0,
    nextEpisode: 1,
  });
  const currentTheme = useTheme();

  if (!props.episodes || props.episodes.length === 0) {
    return null;
  }
  function handleOnlyEpisode(completeEpisode: string) {
    return completeEpisode.substring(4);
  }
  function handleOnlySeason(completeEpisode: string) {
    return completeEpisode.substring(1, 3);
  }

  function handleNextEpisode() {
    const nextEpisodeIndex = statCurrentPage.currentEpisode + 1;
    if (nextEpisodeIndex < props.episodes.length) {
      setStatCurrentPage({
        previousEpisode: statCurrentPage.currentEpisode,
        currentEpisode: nextEpisodeIndex,
        nextEpisode: nextEpisodeIndex + 1,
      });
    }
  }

  function handlePreviousEpisode() {
    const previousEpisodeIndex = statCurrentPage.currentEpisode - 1;
    if (previousEpisodeIndex >= 0) {
      setStatCurrentPage({
        previousEpisode: previousEpisodeIndex - 1,
        currentEpisode: previousEpisodeIndex,
        nextEpisode: statCurrentPage.currentEpisode + 1,
      });
    }
  }

  return (
    <div
      className="card-episode"
      style={{ color: currentTheme.palette.text.primary }}
    >
      <KeyboardArrowLeft
        className="arrow-left"
        onClick={() => handlePreviousEpisode()}
      />
      <span>
        <strong>Name: </strong>
        {props.episodes[statCurrentPage.currentEpisode].name}
      </span>
      <span>
        <strong>Season: </strong>
        {handleOnlySeason(
          props.episodes[statCurrentPage.currentEpisode].episode
        )}
      </span>
      <span>
        <strong>Episode: </strong>
        {handleOnlyEpisode(
          props.episodes[statCurrentPage.currentEpisode].episode
        )}
      </span>
      <span>
        <strong>Air date: </strong>
        {props.episodes[statCurrentPage.currentEpisode].air_date}
      </span>
      <KeyboardArrowRight
        className="arrow-right"
        onClick={() => handleNextEpisode()}
      />
    </div>
  );
}
