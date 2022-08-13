import axios from "axios";
import { ConsolesApi, GpiosApi } from "../@Types";

export const myAxios = axios.create({
  baseURL: "http://localhost:3001/api",
});

type FetchConsoles = Array<ConsolesApi & { Gpio: GpiosApi }>;
export const fetchConsoles = async () => {
  const res = await myAxios.get<FetchConsoles>("/consoles", {
    params: { gpio: true },
  });
  return res.data;
};

export const fetchGpios = async () => {
  const res = await myAxios.get<GpiosApi[]>("/gpios", {
    params: { available: true },
  });
  return res.data;
};

export const postConsole = async (data: Omit<ConsolesApi, "id">) => {
  const res = await myAxios.post<ConsolesApi>("/consoles", data);
  return res.data;
};
