import { useState, useEffect } from "react";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

// axios.defaults.baseURL = "http://localhost:3001/";
const myAxios = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
  },
});
//If you are using different URLs, consider removing this line and adding a baseURL in the Axios Config parameter.

const useAxios = <T>(axiosParams: AxiosRequestConfig) => {
  const [response, setResponse] = useState<AxiosResponse<T>>();
  const [error, setError] = useState<AxiosError>();
  const [loading, setLoading] = useState(
    axiosParams.method === "GET" || axiosParams.method === "get"
  );

  const fetchData = async (params: AxiosRequestConfig) => {
    try {
      const res = await myAxios.request<T>(params);
      setResponse(res);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const sendData = () => {
    fetchData(axiosParams);
  };

  useEffect(() => {
    if (axiosParams.method === "GET" || axiosParams.method === "get") {
      fetchData(axiosParams);
    }
  }, []);

  return { response, error, loading, sendData };
};

export { useAxios };
