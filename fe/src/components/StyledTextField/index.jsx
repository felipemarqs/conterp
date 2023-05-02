import { TextField } from "@mui/material";
import { styled } from "@mui/system";

export const StyledTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#fff",
    fontSize: "1.25rem",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#fff",
  },
  "& .MuiOutlinedInput-root": {
    border: "none !important",
    "&.Mui-focused fieldset": {
      border: "none",
    },
    /* "& fieldset": {
      borderColor: "red",
    },
    "&:hover fieldset": {
      borderColor: "yellow",
    },
    "&.Mui-focused fieldset": {
      border: "none",
    }, */
  },
});
