import { useEffect, useState } from "react";

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
import { Formik, yupToFormErrors } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogin, setMode } from "../../state/index";
import FlexBetween from "../FlexBetween";
import UsersServices from "../../services/UsersServices";
import RigsServices from "../../services/RigsServices";
import { FormContainer, RegisterSelectContainer } from "./styles.jsx";

const registerSchema = yup.object().shape({
  name: yup.string().required("Obrigatório"),
  email: yup.string().email("Email Inválido!").required("Obrigatório"),
  password: yup.string().required("Obrigatório"),
  access_level: yup.string().required("Obrigatório"),
  rig_id: yup.string(),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValues = {
  name: "",
  email: "",
  password: "",
  access_level: "",
  rig_id: "",
};

const Form = ({ formType = "login" }) => {
  //States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accessLevel, setAccessLevel] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoginPage, setIsLoginPage] = useState(true);
  const [isRegisterPage, setIsRegisterPage] = useState(false);
  const [isLoadingrigs, setIsLoadingrigs] = useState(true);
  const [rigs, setRigs] = useState([]);

  //Tema
  const { palette } = useTheme();
  const isNonMobile = useMediaQuery("(min-width: 600px)");

  //State Redux
  const dispatch = useDispatch();

  //Router
  const navigate = useNavigate();

  useEffect(() => {
    const loadrigs = async () => {
      try {
        const rigs = await RigsServices.listrigs();
        setRigs(rigs);
        console.log("rigs ===>", rigs);
      } catch (error) {
        setErrorMessage("Erro ao carregar as rigs!");
        console.log(error);
      } finally {
        setIsLoadingrigs(false);
      }
    };
    loadrigs();
  }, [setRigs, setIsLoadingrigs]);

  const register = async (values, onSubmitProps) => {
    setIsLoading(true);
    try {
      const newUser = await UsersServices.createUser(values);
      onSubmitProps.resetForm();
      setErrorMessage("");
      dispatch(
        setLogin({
          user: newUser.user,
          token: newUser.token,
        })
      );
    } catch (error) {
      console.log("error", error.message);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const user = useSelector((state) => state.user);
  console.log("user", user);

  const login = async (values, onSubmitProps) => {
    setIsLoading(true);
    try {
      const user = {
        email: values.email,
        password: values.password,
      };
      const loggedUser = await UsersServices.loginUser(user);
      onSubmitProps.resetForm();
      dispatch(
        setLogin({
          user: loggedUser.user,
          token: loggedUser.token,
        })
      );
      setErrorMessage("");
      console.log("Usuário", loggedUser, "Logado com sucesso!");
    } catch (error) {
      console.log("error", error.message);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setErrorMessage("");
    if (formType === "login") {
      setIsLoginPage(true);
      setIsRegisterPage(false);
    }

    if (formType === "register") {
      setIsLoginPage(false);
      setIsRegisterPage(true);
    }
  }, [formType]);

  const handleFormSubmit = async (values, onSubmitProps) => {
    console.log(values);

    if (isRegisterPage) await register(values, onSubmitProps);
    if (isLoginPage) await login(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
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
          <FormContainer
            sx={{
              "& .MuiTextField-root": {
                outline: "none",
              },
            }}
          >
            <>
              {isRegisterPage && (
                <TextField
                  label="Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  size="small"
                  InputProps={{
                    autoComplete: "off",
                  }}
                  name="name"
                  error={Boolean(touched.name) && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                  sx={{
                    borderRadius: "1rem",
                    outline: "none",
                    border: "2px solid #fff",
                    backgroundColor: palette.primary[500],
                  }}
                />
              )}
              <TextField
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                size="small"
                InputProps={{
                  autoComplete: "off",
                }}
                name="email"
                error={Boolean(touched.email) && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                sx={{
                  borderRadius: "1rem",
                  outline: "none",
                  border: "2px solid #fff",
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
                  borderRadius: "1rem",
                  outline: "none !important",
                  border: "2px solid #fff",
                  backgroundColor: palette.primary[500],
                }}
              />
            </>
            {isRegisterPage && (
              <RegisterSelectContainer
                height="100%"
                width="100%"
                display="flex"
                gap="1rem"
                justifyContent="space-between"
                alignItems="center"
              >
                <FormControl
                  sx={{
                    width: "100%",
                  }}
                >
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
                      padding: ".5rem",
                      borderRadius: "1rem",
                      outline: "none",
                      backgroundColor: palette.primary[500],
                    }}
                  >
                    <MenuItem value="adm">Administrador</MenuItem>
                    <MenuItem value="user">Usuário</MenuItem>
                  </Select>
                </FormControl>
                <FormControl
                  sx={{
                    width: "100%",
                  }}
                >
                  <InputLabel id="rig-label">Sonda</InputLabel>
                  <Select
                    labelId="rig-label"
                    label="Sonda"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.rig_id}
                    name="rig_id"
                    size="small"
                    error={Boolean(touched.rig_id) && Boolean(errors.rig_id)}
                    sx={{
                      padding: ".5rem",
                      borderRadius: "1rem",
                      outline: "none",
                      backgroundColor: palette.primary[500],
                    }}
                  >
                    {rigs.map(({ id, name }) => (
                      <MenuItem value={id} key={id}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </RegisterSelectContainer>
            )}
            <Box>
              <Button
                disabled={isLoading}
                size="medium"
                type="submit"
                sx={{
                  p: "1rem",
                  width: "50%",
                  backgroundColor: palette.primary.main,
                  color: "#fff",
                  ":hover": { backgroundColor: palette.primary[700] },
                }}
              >
                {isLoginPage ? "LOGIN" : "REGISTER"}
              </Button>
              {errorMessage && (
                <Box
                  padding="1rem .2rem"
                  borderRadius=".5rem"
                  backgroundColor={palette.red[500]}
                  color="#fff"
                  width="45%"
                  margin="2rem auto"
                >
                  <Typography fontWeight="bold">{errorMessage}</Typography>
                </Box>
              )}
            </Box>
          </FormContainer>
          {/* BUTTONS */}
        </form>
      )}
    </Formik>
  );
};

export default Form;
