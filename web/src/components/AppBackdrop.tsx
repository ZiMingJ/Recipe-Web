import { CircularProgress } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import { useState } from "react";

const AppBackdrop = () => {
  const [open, setOpen] = useState<boolean>(true);
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
      onClick={() => setOpen(false)}
    >
      <div>
        <h3>Creating New Recipe</h3>
        <CircularProgress color="inherit" />
      </div>
    </Backdrop>
  );
};

export default AppBackdrop;
