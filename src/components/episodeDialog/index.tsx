import React from "react";
import './styles.css'
import { useTheme } from "@mui/material/styles";

export function EpisodeDialog(props: any) {
  const { dialogState, closeDialog } = props;
  const currentTheme = useTheme()
  
  return (
    <div
      style={{
        color: currentTheme.palette.text.primary,
        backgroundColor: currentTheme.palette.background.default,
      }}
      className={
        dialogState
          ? "dialog-visible dialog-container"
          : "dialog-hide dialog-container"
      }
    >
      <h3 className="dialog-title"> Season information </h3>
      <div className="dialog-content">
        <img src="assets/rickCool.png" alt="rick_cool" />
        <span>
          There are currently 6 seasons. the last one still active. The
          information obtained from rickandmortyAPI has data until the fifth
          season. Seasons 7 and 8 have already been confirmed but no release
          date has been announced.
        </span>
      </div>
      <div className="dialog-actions">
        <button
          style={{
            color: currentTheme.palette.text.primary,
            backgroundColor: currentTheme.palette.background.default,
          }}
          onClick={() => {
            closeDialog();
          }}
        >
          <strong>Ok</strong>
        </button>
      </div>
    </div>
  );
}
