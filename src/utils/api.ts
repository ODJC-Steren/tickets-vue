import axios, { AxiosRequestConfig } from "axios";

export const api = (url: string, isAuth: boolean = true) => {
  const getHeaders = () => {
    if (isAuth) {
      const config: AxiosRequestConfig<string> = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      };
      return config;
    }
  };
  const post = async (body: string) => {
    return await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        ...getHeaders()?.headers,
      },
    });
  };
  const get = async () => {
    return await axios.get(url, getHeaders());
  };
  const put = async (body: string) => {
    return await axios.put(url, body, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        ...getHeaders()?.headers,
      },
    });
  };
  const del = async () => {
    return await axios.delete(url, getHeaders());
  };
  return {
    post,
    get,
    put,
    del,
  };
};
