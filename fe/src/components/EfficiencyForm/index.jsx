import { Box, Button, TextField, useMediaQuery, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import "dayjs/locale/pt-br";

import { StyledTextField } from "../StyledTextField";
import { StyledSwitch } from "./styles";

const efficiencySchema = yup.object().shape({
  date: yup.date().required("Obrigatório"),
  gloss_hours: yup.number(),
  available_hours: yup.number().required("Obrigatório"),
  repair_hours: yup.number().required("Obrigatório"),
  dtm_hours: yup.number().required("Obrigatório"),
});

const EfficiencyForm = () => {
  const user = useSelector((state) => state.user);

  const [hasGlossHours, setHasGlossHours] = useState(true);

  const initialValues = {
    date: "",
    gloss_hours: "",
    available_hours: "",
    repair_hours: "",
    dtm_hours: "",
  };

  console.log("user no form de eficiencia: ", user);
  const isNonMobile = useMediaQuery("(min-width:900px)");

  const handleFormSubmit = (values, onSubmitProps) => {
    console.log("clicou");
    console.log(values);
    window.alert("Enviou os dados! 😎😎", { values });
  };

  const handleSwitchChange = (event) => {
    setHasGlossHours(event.target.checked);
  };

  console.log("Tem hora glosa? =>", hasGlossHours);

  const theme = useTheme();

  const [value, setValue] = useState(null);

  return (
    <Box
      m="1rem"
      backgroundColor={theme.palette.primary[500]}
      padding="2rem"
      width={isNonMobile ? "60%" : "85%"}
      height="100%"
      borderRadius="1rem"
      /*  sx={{
        borderRadius: "1rem",
        background: "#1c7b7b",
        boxShadow: "-6px 6px 2px #186969, 6px -6px 2px #208d8d",
      }} */
    >
      <Box display="flex" justifyContent="center" marginBottom="1rem">
        <h1>Formulário de Eficiência</h1>
      </Box>
      <Box>
        <StyledSwitch
          checked={hasGlossHours}
          onChange={handleSwitchChange}
          theme={theme}
        />
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
              <Box
                display="flex"
                justifyContent="center"
                sx={{ gridColumn: "span 4" }}
              >
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="pt-br"
                >
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      disableFuture
                      label="Data"
                      value={values.date}
                      error={Boolean(touched.date) && Boolean(errors.date)}
                      helperText={touched.date && errors.date}
                      onChange={(date) => setFieldValue("date", date)}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Box>

              <StyledTextField
                fullWidth
                variant="outlined"
                type="number"
                name="gloss_hours"
                label="Hora Glosa"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.gloss_hours}
                error={
                  Boolean(touched.gloss_hours) && Boolean(errors.gloss_hours)
                }
                helperText={touched.gloss_hours && errors.gloss_hours}
                sx={{ gridColumn: "span 2" }}
              />

              {values.gloss_hours && "teste"}

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
