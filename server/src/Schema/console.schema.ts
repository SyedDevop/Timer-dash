import * as yup from "yup";

export const ConsoleSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  gpio: yup.number().required("Gpio is required"),
  windowsId: yup.number().required("Windows ID is required"),
});

export const updateConsoleSchema = yup
  .object()
  .shape({
    name: yup.string(),
    gpio: yup.number(),
  })
  .test(
    "global-ok",
    "nay one files is required ex:{name:'example',gpio:'no'}",
    (value) => {
      return value.gpio !== undefined || value.name !== undefined;
    }
  );
