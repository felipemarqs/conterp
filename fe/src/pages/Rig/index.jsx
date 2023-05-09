import { Box } from "@mui/material";
import EfficiencyForm from "../../components/EfficiencyForm";
import Header from "../../components/Header";

import { useSelector } from "react-redux";

const Rig = () => {
  const user = useSelector((state) => state.user);
  return (
    <>
      <Header
        title={`Sonda ${user?.rig_name || ""}`}
        subtitle="Submissão dos dados de eficiência da sonda."
      />

      <Box display="flex" justifyContent="center">
        <EfficiencyForm />
      </Box>
    </>
  );
};

export default Rig;
