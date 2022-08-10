import axios from "axios";
import { ConsolesApi } from "../@Types";

const myAxios = axios.create({
  baseURL: "http://localhost:3001",
});

export const fetchConsoles = async () => {
  const res = await myAxios.get<ConsolesApi[]>("/console");
  return res.data;
};
