import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import Layout from "./pages/Layout";
import { useAuth } from "./hooks/useAuth";
import {ToastContainer}  from 'react-toastify'

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  const {auth , loading} = useAuth()

  console.log("Auth",auth)

  if (loading) {
    return <p>loading</p>;
  }

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
          

            <Route path="/" element={<Navigate to="/login" replace/>}/>
            <Route path="/login" element={auth ? <Navigate to="/home"/> : <Login /> }></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/home" element={auth ? <Layout /> : <Navigate to="/login"/>}>
              
            </Route>
          </Routes>
          
        </ThemeProvider>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
