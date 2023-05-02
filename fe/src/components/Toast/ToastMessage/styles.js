import { css, keyframes } from "@emotion/react";
import { Box } from "@mui/material";
import { styled } from "@mui/system";

const messageIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(100px);
  }

  to {
    opacity: 1;
    transform: translateY(0px);
  }
`

const messageOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0px);
  }

  to {
    opacity: 0;
    transform: translateY(100px);
  }
`


export const Container = styled(Box)(({ isLeaving, type }) => ({
  padding: "16px 23px",
  color: "#fff",
  borderRadius: "4px",
  boxShadow: " 0px 20px 20px -16px rgba(0, 0, 0, 0.25)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  animation: `${messageIn} 3s`,
  marginBottom: "5px",

  animation: isLeaving ? css`animation: ${messageOut} 3s` : undefined,

  background: type === "error" ? "#fc5050" : "#1c7b7b"
}))


