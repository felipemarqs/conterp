import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";

//Assets
import sonda from "../../assets/spt60.png";
import sondaMar from "../../assets/sonda_mar.png";
import logo from "../../assets/logo.png";

export const Container = styled(Box)({
  width: "100%",
  height: "100%",
  padding: "1rem 6%",
  textAlign: "center",
});

export const FormContainer = styled(Box)(({ width }) => ({
  width: width,
  margin: "2rem auto",
  borderRadius: "1.5rem",
}));

export const ImageContainer = styled(Box)(({ pageType }) => ({
  width: "100%",
  height: "300px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundImage: `url(${pageType === "login" ? sondaMar : sonda})`,
  borderRadius: "1rem 1rem 0 0",
  clipPath: "polygon(0 0, 100% 0, 100% 70%, 0% 100%);",
}));

export const LogoContainer = styled(Box)(() => ({
  width: "100px",
  height: "100px",

  backgroundRepeat: "no-repeat",
  backgroundSize: "contain",
  backgroundPosition: "center",
  backgroundImage: `url(${logo})`,
}));

export const LinkTypography = styled(Typography)(() => ({
  textDecoration: "underline",
  cursor: "pointer",
  fontSize: "14px",
  marginBottom: "1rem",
  paddingBottom: "1rem",
}));
