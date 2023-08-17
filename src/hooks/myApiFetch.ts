import { IErrorLertData } from "../types";
import { getLocalStorage } from "./useLocalStorage";

interface IOptionsFetch {
  method?: string;
  headers?: HeadersInit;
  body?: any;
  referrer?: string;
  referrerPolicy?: ReferrerPolicy;
  mode?: RequestMode;
  credentials?: RequestCredentials;
  cache?: RequestCache;
  redirect?: RequestRedirect;
  integrity?: string;
  keepalive?: boolean;
  signal?: AbortSignal | null;
}

export async function myApiFetch(
  url: string,
  options?: IOptionsFetch | null | undefined,
  isAuth = false,
  setErrorAlert?: (data: IErrorLertData) => void
): Promise<any> {
  const jwtToken = getLocalStorage("jwt");

  if (options) {
    const requestOptions: RequestInit = {
      method: options.method,
      headers: {
        "Content-Type": "application/json",
        ...(jwtToken && isAuth ? { Authorization: "Bearer " + jwtToken } : {}),
      },
      body: JSON.stringify(options.body),
    };
    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      if (data?.message && setErrorAlert) {
        setErrorAlert({ message: data?.error + ": " + data?.message, type: "error" });
      }
      return data;
    } catch (error: any) {
      console.error(error);
    }
  }
  try {
    const response = await fetch(url, {
      headers: {
        ...(jwtToken && isAuth ? { Authorization: "Bearer " + jwtToken } : {}),
      },
    });

    const data = await response.json();
    if (data?.message && setErrorAlert) {
      setErrorAlert({ message: data?.error + ": " + data?.message, type: "error" });
    }
    return data;
  } catch (error: any) {
    console.error(error);
  }
}
