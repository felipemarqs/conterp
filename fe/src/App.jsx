//React / Redux / Router
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { useMemo } from "react";
import { useSelector } from "react-redux";

//MUI
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

//Layout
import Layout from "./pages/Layout";

//Pages
import Login from "./pages/Login";
import UserHome from "./pages/UserHome";
import Efficiencies from "./pages/Efficiencies";
import Rig from "./pages/Rig";
import Admin from "./pages/Admin";

//Hooks
import { useAuth } from "./hooks/useAuth";

//Toast
import ToastContainer from "./components/Toast/ToastContainer";

/*======================= IMPORT AREA *END* ==================================================*/

function App() {
  const mode = useSelector((state) => state.mode);
  const user = useSelector((state) => state.user);

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  const { auth, loading, isUserAdm } = useAuth();

  if (loading) {
    return <p>loading</p>;
  }

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <ToastContainer />
          <CssBaseline />
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route
              path="/login"
              element={auth ? <Navigate to="/user/home" /> : <Login />}
            />

            {/* Inicio do Layout */}
            <Route
              path="/user"
              element={auth ? <Layout /> : <Navigate to="/login" />}
            >
              {/* Inicio das rotas do Layout */}
              <Route path="/user/home" element={<UserHome />} />
              <Route
                path="/user/admin"
                element={isUserAdm ? <Admin /> : <Navigate to="/user/home" />}
              />
              <Route path="/user/rig-form" element={<Rig />} />
              <Route
                path="/user/list-efficiencies"
                element={<Efficiencies />}
              />
              {/* Fim das rotas do Layout */}
            </Route>
            {/* Fim do Layout */}
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
