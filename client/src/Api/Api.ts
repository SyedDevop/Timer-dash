import axios from "axios";
import { ConsolesApi, GpiosApi } from "../@Types";
import { isDev } from "../Utils";

const URL = isDev() ? "http://localhost:3001/api" : "/api";
export const myAxios = axios.create({
  baseURL: URL,
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

export const deleteConsole = async (id: string) => {
  const res = await myAxios.delete(`/consoles/${id}`);
  return res.data;
};

export const updateConsole = async (id: string, data: Partial<ConsolesApi>) => {
  const res = await myAxios.patch(`/consoles/${id}`, data);
  return res.data;
};
