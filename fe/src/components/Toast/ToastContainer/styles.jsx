import { Box } from "@mui/material";
import { styled } from "@mui/system";

export const Container = styled(Box)({
  position: "fixed",
  bottom: "48px",
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: "2",
});
