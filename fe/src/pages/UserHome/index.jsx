import { useEffect } from "react";
import EfficienciesServices from "../../services/EfficienciesServices";
import Header from "../../components/Header";
import EfficiencyForm from "../../components/EfficiencyForm";
import { Box } from "@mui/material";

const UserHome = () => {
  useEffect(() => {
    const loadEfficiencies = async () => {
      try {
        const efficiencies = await EfficienciesServices.listEfficiencies();
        console.log("Efficiencies ==>", efficiencies);
      } catch (error) {
        console.log(error);
      }
    };
    loadEfficiencies();
  }, []);

  return (
    <>
      <Header title="User Home Page" subtitle="Página de início do usuário." />

      <Box display="flex" justifyContent="center">
        <EfficiencyForm />
      </Box>
    </>
  );
};

export default UserHome;
