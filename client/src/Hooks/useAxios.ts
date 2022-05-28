import { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001";

interface UseAxiosReturn {
  response: null;
  error: string;
  loading: boolean;
}

type Url = "/console";

function useAxios(url: Url, media: "get"): UseAxiosReturn;
function useAxios(url: Url, media: "post", data: any): UseAxiosReturn;
function useAxios(url: Url, method: "get" | "post", data?: any) {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setloading] = useState(true);

  const fetchData = () => {
    axios
      // .[method](url)
      // .then((res) => {
      //   setResponse(res.data);
      // })
      // .catch((err) => {
      //   setError(err);
      // })
      // .finally(() => {
      //   setloading(false);
      // });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // custom hook returns value
  return { response, error, loading };
}

export { useAxios };
