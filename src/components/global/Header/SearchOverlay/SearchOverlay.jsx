import * as React from "react";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import "./SearchOverlay.scss";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "#d9d8dd",
  border: "1px solid white",
  borderRadius: "20px",
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
