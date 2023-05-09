import { useEffect } from "react";
import EfficienciesServices from "../../services/EfficienciesServices";
import Header from "../../components/Header";
import { Box } from "@mui/material";
import placeholder from "./placeholder.png";

const UserHome = () => {
  useEffect(() => {
    const loadEfficiencies = async () => {
      try {
        const efficiencies = await EfficienciesServices.listEfficiencies();
      } catch (error) {
        console.log(error);
      }
    };
    loadEfficiencies();
  }, []);

  return (
    <>
      <Header title="User Home Page" subtitle="Página de início do usuário." />

      <Box
        display="flex"
        justifyContent="center"
        height="90%"
        width="100%"
        padding="2rem"
        sx={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundImage: `url(${placeholder})`,
        }}
      >
        FUTURO DASHBOARD
      </Box>
    </>
  );
};

export default UserHome;
