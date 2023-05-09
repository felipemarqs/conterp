import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import toast from "../../utils/toast";
import EfficienciesServices from "../../services/EfficienciesServices";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { useAuth } from "../../hooks/useAuth";
import { useObjectFormatDate } from "../../hooks/useObjectFormatDate";

const Efficiencies = () => {
  const [efficiencies, setEfficiencies] = useState([]);
  const { isUserAdm, isLoading: isLoadingUser } = useAuth();

  const columns = [
    {
      field: "rig_name",
      headerName: "Sonda",
      flex: 0.3,
      cellClassName: "name-column--cell",
    },
    {
      field: "date",
      headerName: "Data",
      headerAlign: "center",
      align: "center",
      flex: 0.5,
      type: "date",
    },
    {
      field: "gloss_start_hour",
      headerName: "Ínicio Glosa",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "gloss_end_hour",
      headerName: "Final Glosa",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "available_hours",
      headerName: "Hora Disponível",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
      type: "number",
    },
    {
      field: "repair_hours",
      headerName: "Hora Reparo",
      flex: 0.5,
      headerAlign: "center",
      type: "number",
      align: "center",
    },
    {
      field: "dtm_hours",
      headerName: "Hora DTM",
      flex: 0.5,
      headerAlign: "center",
      type: "number",
      align: "center",
    },
    {
      field: "user_name",
      headerName: "Enviado por:",
      flex: 0.5,
    },
  ];

  const user = useSelector((state) => state.user);
  const formattedItems = useObjectFormatDate(efficiencies);

  const [isLoading, setIsLoading] = useState(true);

  const theme = useTheme();

  console.log(efficiencies);

  useEffect(() => {
    const loadEfficiencies = async () => {
      let efficienciesData = null;
      try {
        efficienciesData = user?.rig_id
          ? await EfficienciesServices.listEfficienciesByRigId(user?.rig_id)
          : await EfficienciesServices.listEfficiencies();
        setEfficiencies(efficienciesData);
      } catch (error) {
        toast({
          type: "error",
          text: error.message,
        });
      } finally {
        setIsLoading(false);
      }
    };
    loadEfficiencies();
  }, [isUserAdm, user?.rig_id]);

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="LISTAGEM DE EFICIÊNCIA" />

      <Box
        m=".25rem"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.primary[500],
            color: "#fff",
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.primary[500],
            color: "#fff",
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: "#1c7b7b !important",
          },
        }}
      >
        <DataGrid
          loading={isLoading}
          getRowId={(row) => row.id}
          rows={formattedItems}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Efficiencies;
