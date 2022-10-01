import * as React from "react";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import "./SearchOverlay.scss";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "#A7C7E7	",
  border: "3px solid #6495ED",
  borderRadius: "32px",
  boxShadow: 24,
  paddingX: 10,
  paddingY: 5,
};

export default function SearchOverlay() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <button className="buttonSearch" onClick={handleOpen}>
        <span className="icon_search" />
      </button>
      <Modal open={open} onClose={handleClose}>
        <TextField
          sx={style}
          id="filled-basic"
          label="Search"
          variant="filled"
        />
      </Modal>
    </div>
  );
}
