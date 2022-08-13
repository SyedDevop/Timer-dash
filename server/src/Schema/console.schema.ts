import * as yup from "yup";

export const ConsoleSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  gpio: yup.number().required("Gpio is required"),
  windowsId: yup.number().required("Windows ID is required"),
});
