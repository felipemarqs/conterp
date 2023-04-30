import { Box, Button, TextField, useMediaQuery, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { Formik } from "formik";
import * as yup from "yup";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const efficiencySchema = yup.object().shape({
  date: yup.string(),
  gloss_hours: yup.number().required("Obrigatório"),
  available_hours: yup.number().required("Obrigatório"),
  repair_hours: yup.number().required("Obrigatório"),
  dtm_hours: yup.number().required("Obrigatório"),
});

const EfficiencyForm = () => {
  const user = useSelector((state) => state.user);

  const initialValues = {
    date: Date.now().toString(),
    gloss_hours: "",
    available_hours: "",
    repair_hours: "",
    dtm_hours: "",
  };

  console.log("user no form de eficiencia: ", user);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values, onSubmitProps) => {
    console.log("clicou");
    console.log(values);
  };

  const theme = useTheme();

  return (
    <Box
      m="1rem"
      backgroundColor={theme.palette.grey[700]}
      padding="2rem"
      width="80%"
      height="100%"
    >
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
              <TextField
                fullWidth
                variant="filled"
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

              <TextField
                fullWidth
                name="available_hours"
                variant="filled"
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

              <TextField
                fullWidth
                variant="filled"
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

              <TextField
                fullWidth
                variant="filled"
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

             {/*  <KeyboardDatePicker
                fullWidth
                label="Date picker label"
                name="selectedDate"
                inputFormat="dd/MM/yyyy"
                value={values.selectedDate}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.selectedDate && Boolean(errors.selectedDate)}
                helperText={touched.selectedDate && errors.selectedDate}
              /> */}
            </Box>

            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
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
