import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import {
  DatePickerContainer,
  TimerPickerContainer,
  GlossHoursContainer,
  StyledInputBase,
  StyledSwitch,
  StyledFormControl,
} from "./styles";
import "dayjs/locale/pt-br";

import classifications from "../../utils/glossClassifications";

import { StyledTextField } from "../StyledTextField";
import { name } from "dayjs/locale/pt-br";

const efficiencySchema = yup.object().shape({
  date: yup.date().nullable().required("Obrigatório"),
  start_time_gloss: yup.string().nullable(),
  end_time_gloss: yup.string().nullable(),
  gloss_classification: yup.string().nullable(),
  gloss_sub_category: yup.string().nullable(),
  available_hours: yup.number().required("Obrigatório"),
  repair_hours: yup.number().required("Obrigatório"),
  dtm_hours: yup.number().required("Obrigatório"),
});

const EfficiencyForm = () => {
  const theme = useTheme();

  const user = useSelector((state) => state.user);

  const [hasGlossHours, setHasGlossHours] = useState(false);

  const initialValues = {
    date: "",
    gloss_classification: "",
    gloss_sub_category: "",
    start_time_gloss: "",
    end_time_gloss: "",
    available_hours: "",
    repair_hours: "",
    dtm_hours: "",
  };

  console.log("Classificações => ", classifications);
  const isNonMobile = useMediaQuery("(min-width:900px)");

  const handleFormSubmit = (values, onSubmitProps) => {
    console.log("clicou");
    console.log(values);
    window.alert("Enviou os dados! 😎😎", { values });
  };

  const equipment = classifications.find(
    (classification) => classification.value === "equipment"
  );

  const equipmentSubCategories = equipment["subCategory"];

  const handleSwitchChange = (event) => {
    setHasGlossHours(event.target.checked);
  };

  console.log("Tem hora glosa? =>", hasGlossHours);

  const [value, setValue] = useState(null);

  return (
    <Box
      m="1rem"
      backgroundColor={theme.palette.primary[500]}
      padding="2rem"
      maxWidth="800px"
      width={isNonMobile ? "60%" : "85%"}
      height="100%"
      borderRadius="1rem"
    >
      <Box display="flex" justifyContent="center" marginBottom="1rem">
        <h1>Formulário de Eficiência</h1>
      </Box>

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={efficiencySchema}
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
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <DatePickerContainer>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="pt-br"
                >
                  <DatePicker
                    sx={{ width: "100%" }}
                    disableFuture
                    label="Data"
                    name="date"
                    value={values.date}
                    error={Boolean(touched.date) && Boolean(errors.date)}
                    helperText={touched.date && errors.date}
                    onChange={(date) => setFieldValue("date", date)}
                  />
                </LocalizationProvider>
              </DatePickerContainer>

              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                gridColumn="span 2"
                border=".25px solid rgb(255, 255, 255, .25)"
                borderRadius="4px"
                padding=".25rem"
              >
                <Typography>Possui Glosa</Typography>

                <StyledSwitch
                  checked={hasGlossHours}
                  onChange={handleSwitchChange}
                  theme={theme}
                />
              </Box>

              {hasGlossHours && (
                <GlossHoursContainer>
                  <Typography align="center">Hora Glosa</Typography>

                  <TimerPickerContainer>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        label="Início"
                        onBlur={handleBlur}
                        onChange={(start_time_gloss) =>
                          setFieldValue("start_time_gloss", start_time_gloss)
                        }
                        value={values.start_time_gloss}
                        name="start_time_gloss"
                        error={
                          Boolean(touched.start_time_gloss) &&
                          Boolean(errors.start_time_gloss)
                        }
                        helperText={
                          touched.start_time_gloss && errors.start_time_gloss
                        }
                      />
                      <TimePicker
                        label="Fim"
                        onBlur={handleBlur}
                        name="end_time_gloss"
                        onChange={(end_time_gloss) =>
                          setFieldValue("end_time_gloss", end_time_gloss)
                        }
                        value={values.end_time_gloss}
                        error={
                          Boolean(touched.end_time_gloss) &&
                          Boolean(errors.end_time_gloss)
                        }
                        helperText={
                          touched.end_time_gloss && errors.end_time_gloss
                        }
                      />
                    </LocalizationProvider>
                  </TimerPickerContainer>

                  <StyledFormControl>
                    <InputLabel id="classification-label">
                      Classificação
                    </InputLabel>
                    <Select
                      labelId="classification-label"
                      label="Nível de acesso"
                      input={<StyledInputBase />}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.gloss_classification}
                      name="gloss_classification"
                      size="small"
                      error={
                        Boolean(touched.gloss_classification) &&
                        Boolean(errors.gloss_classification)
                      }
                      sx={{
                        padding: ".5rem",
                        borderRadius: "1rem",
                        outline: "none",
                        backgroundColor: theme.palette.primary[500],
                      }}
                    >
                      {classifications.map((classification) => (
                        <MenuItem
                          value={classification.value}
                          key={classification.id}
                        >
                          {classification.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </StyledFormControl>

                  {values.gloss_classification === "equipment" && (
                    <StyledFormControl>
                      <InputLabel id="sub-category-label">
                        Sub Categoria
                      </InputLabel>
                      <Select
                        labelId="sub-category-label"
                        label="Sub Categoria"
                        input={<StyledInputBase />}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.gloss_sub_category}
                        name="gloss_sub_category"
                        size="small"
                        error={
                          Boolean(touched.gloss_sub_category) &&
                          Boolean(errors.gloss_sub_category)
                        }
                        sx={{
                          padding: ".5rem",
                          borderRadius: "1rem",
                          outline: "none",
                          backgroundColor: theme.palette.primary[500],
                        }}
                      >
                        {equipmentSubCategories.map((category) => (
                          <MenuItem value={category.value} key={category.id}>
                            {category.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </StyledFormControl>
                  )}
                </GlossHoursContainer>
              )}

              <StyledTextField
                fullWidth
                name="available_hours"
                variant="outlined"
                type="number"
                label="Hora Disponível"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.available_hours}
                error={
                  Boolean(touched.available_hours) &&
                  Boolean(errors.available_hours)
                }
                helperText={touched.available_hours && errors.available_hours}
                sx={{ gridColumn: "span 2" }}
              />

              <StyledTextField
                fullWidth
                variant="outlined"
                type="number"
                name="repair_hours"
                label="Hora Reparo"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.repair_hours}
                error={
                  Boolean(touched.repair_hours) && Boolean(errors.repair_hours)
                }
                helperText={touched.repair_hours && errors.repair_hours}
                sx={{ gridColumn: "span 2" }}
              />

              <StyledTextField
                fullWidth
                variant="outlined"
                type="number"
                name="dtm_hours"
                label="Hora DTM"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.dtm_hours}
                error={Boolean(touched.dtm_hours) && Boolean(errors.dtm_hours)}
                helperText={touched.dtm_hours && errors.dtm_hours}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>

            <Box
              display="flex"
              justifyContent="center"
              mt="1.5rem"
              width="100%"
            >
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                size="large"
                sx={{ width: "50%" }}
              >
                Enviar
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default EfficiencyForm;
