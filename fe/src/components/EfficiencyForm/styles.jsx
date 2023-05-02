import Switch from "@mui/material/Switch";
import { alpha, styled } from "@mui/material/styles";

export const StyledSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: theme.palette.primary[600],
    "&:hover": {
      backgroundColor: theme.palette.primary[700],
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: theme.palette.primary[200],
  },
}));
