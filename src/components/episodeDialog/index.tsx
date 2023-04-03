import React, { useState } from "react";
import { QuestionMark } from "@mui/icons-material";
    import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    } from "@mui/material";
    import "./styles.css";

    export function EpisodeDialog() {

    const [isDialogOpen, setIsDialogOpen] = useState(false);  
   
    const handleClickOpen = () => {
      setIsDialogOpen(true);
      console.log("dialog: ", isDialogOpen);
    };

    const handleClose = () => {
      setIsDialogOpen(false);
      console.log("dialog: ", isDialogOpen);
    };

    return (
      <div className="dialog-container">
        <button onClick={() => handleClickOpen()} className="extra-informtion">
          <QuestionMark />
        </button>
        <Dialog
          open={isDialogOpen}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          sx={{ zIndex: 5 }}
        >
          <DialogTitle id="alert-dialog-title">
            {"Season information"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              There are currently 6 seasons. the last one still active. the
              information obtained from rickandmortyAPI has data until the fifth
              season.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Ok</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
    }
