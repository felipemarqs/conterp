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

import { StyledTextField } from "../StyledTextField";

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
import toast from "../../utils/toast";

const registerSchema = yup.object().shape({
  name: yup.string().required("Obrigatório"),
  email: yup.string().email("Email Inválido!").required("Obrigatório"),
  password: yup.string().required("Obrigatório"),
  access_level: yup.string().required("Obrigatório"),
  rig_id: yup.string(),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("Email Inválido!").required("Obrigatório"),
  password: yup.string().required("Obrigatório"),
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

  useEffect(() => {
    const loadRigs = async () => {
      try {
        const rigs = await RigsServices.listRigs();
        setRigs(rigs);
        console.log("rigs ===>", rigs);
      } catch (error) {
        toast({
          type: "error",
          text: "Erro ao carregar as rigs!",
        });
        console.log(error);
      } finally {
        setIsLoadingrigs(false);
      }
    };
    loadRigs();
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
      toast({
        text: "Registrado com Sucesso!",
      });
    } catch (error) {
      toast({
        type: "error",
        text: error.message,
      });
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
      toast({
        text: `Bem-vindo de volta ${loggedUser.user.name}!`,
      });
      console.log("Usuário", loggedUser, "Logado com sucesso!");
    } catch (error) {
      toast({
        type: "error",
        text: error.message,
      });
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
                <StyledTextField
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
              <StyledTextField
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

              <StyledTextField
                label="Senha"
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
              <RegisterSelectContainer>
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
                    <MenuItem value="adm">Diretor</MenuItem>
                    <MenuItem value="user">Administrador</MenuItem>
                  </Select>
                </FormControl>
                <FormControl
                  sx={{
                    width: "100%",
                  }}
                >
                  <InputLabel id="rig-label">Sonda</InputLabel>
                  <Select
                    disabled={
                      !values.access_level || values.access_level === "adm"
                    }
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
            </Box>
          </FormContainer>
          {/* BUTTONS */}
        </form>
      )}
    </Formik>
  );
};

export default Form;
