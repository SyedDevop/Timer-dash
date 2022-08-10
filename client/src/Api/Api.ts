import { ConsolesApi } from "../@Types";

export const fetchConsoles = async (): Promise<ConsolesApi[]> => {
  const res = await fetch("http://192.168.1.120:3001/console");
  return res.json();
};
