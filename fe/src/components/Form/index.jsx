import { useState } from "react";

import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin, setMode } from "../../state/index";
import FlexBetween from "../FlexBetween";
import UsersServices from "../../services/UsersServices";

const registerSchema = yup.object().shape({
  email: yup.string().email("Email Inválido!").required("Obrigatório"),
  password: yup.string().required("Obrigatório"),
  access_level: yup.string().required("Obrigatório"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  email: "",
  password: "",
  access_level: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = ({ formType = "login" }) => {
  //States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accessLevel, setAccessLevel] = useState("");

  //Tema
  const { palette } = useTheme();
  const isNonMobile = useMediaQuery("(min-width: 600px)");

  //State Redux
  const dispatch = useDispatch();

  //Router
  const navigate = useNavigate();
  const isLoginPage = formType === "login";
  const isRegisterPage = formType === "register";

  const register = async (values) => {
    try {
      const newUser = await UsersServices.createUser(values);
      console.log("newUser", newUser);
    } catch (error) {
      console.log("error", error.message);
    }
  };

  const login = async (values) => {
    try {
    } catch (error) {
      console.log("error", error.message);
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isRegisterPage) await register(values);
    if (isLoginPage) await login(values);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLoginPage ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLoginPage ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap="2rem" padding="2rem"
          sx={{
            "& .MuiTextField-root": {
              outline: "none",
            },
          }}
          >
            <>
              <TextField
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                size="small"
                
                name="email"
                error={Boolean(touched.email) && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                sx={{
                  borderRadius: "1rem",
                  outline: "none",
                  backgroundColor: palette.primary[500],                
                }}
              />

              <TextField
                label="Password"
                type="password"
                size="small"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={Boolean(touched.password) && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                sx={{
                  border: "none",
                  borderRadius: "1rem",
                  outline: "none !important",
                  backgroundColor: palette.primary[500],
                }}
              />
            </>

            {isRegisterPage && (
              <>
                <FormControl>
                  <InputLabel id="access-label">Nível de acesso</InputLabel>
                  <Select
                    labelId="access-label"
                    label="Nível de acesso"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.access_level}
                    name="access_level"
                    size="small"
                    error={
                      Boolean(touched.access_level) &&
                      Boolean(errors.access_level)
                    }
                    sx={{
                      borderRadius: "1rem",
                      outline: "none",
                      backgroundColor: palette.primary[500],
                    }}
                  >
                    <MenuItem value="adm">Administrador</MenuItem>
                    <MenuItem value="user">Usuário</MenuItem>
                  </Select>
                </FormControl>
              </>
            )}
            <Box>
              <Button
                fullWidth
                type="submit"
                sx={{
                  m: "2rem 0",
                  p: "1rem",
                  backgroundColor: palette.primary.main,
                  color: "#fff",
                  "&:hover": { color: palette.primary.main },
                }}
              >
                {isLoginPage ? "LOGIN" : "REGISTER"}
              </Button>
            </Box>
          </Box>

          {/* BUTTONS */}
        </form>
      )}
    </Formik>
  );
};

export default Form;

/* 
<TextField
label="Nivel de Acesso"
type="access_level"
onBlur={handleBlur}
onChange={handleChange}
value={values.access_level}
name="access_level"
error={
  Boolean(touched.access_level) &&
  Boolean(errors.access_level)
}
helperText={touched.access_level && errors.access_level}
sx={{
  borderRadius: "1rem",
  outline: "none",
  backgroundColor: palette.primary[500],
}}
/> */
