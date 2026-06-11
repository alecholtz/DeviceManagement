import { useCallback } from "react";
import { IUrlParameter } from "../Interfaces";
import { HttpMethod } from "../Enums";
import { HttpBody, HttpPath } from "../Types";
import { GenerateUrl, GetOptions, ParseResponse } from "../Helpers";
import toast from "react-hot-toast";

const baseUrl = "https://localhost:7157";

export interface HttpError {
  status?: number;
  message: string;
}

export const useHttp = (resource?: string) => {
  const basePath = resource ? `${baseUrl}/${resource}` : baseUrl;

  const sendRequest = useCallback(
    async (options: RequestInit, path?: HttpPath, parameters?: IUrlParameter[]): Promise<Response> => {
      try {
        const response = await fetch(GenerateUrl(basePath, path, parameters), options);

        if (!response.ok) {
          throw {
            status: response.status,
            message: `HTTP Error! Status: ${response.status}`,
          } as HttpError;
        }

        return response;
      } catch (err) {
        const errorMsg = (err as HttpError)?.message || "An unexpected error occurred";
        toast.error(`Request Failed: ${errorMsg}`);

        throw err;
      }
    },
    [basePath],
  );

  const Get = useCallback(
    async <T>(path?: HttpPath, parameters?: IUrlParameter[]): Promise<T> => {
      const response = await sendRequest(GetOptions(HttpMethod.GET), path, parameters);
      return ParseResponse(response);
    },
    [sendRequest],
  );

  const Put = useCallback(
    async <T>(path?: HttpPath, body?: HttpBody, parameters?: IUrlParameter[]): Promise<T> => {
      const response = await sendRequest(GetOptions(HttpMethod.PUT, body), path, parameters);
      return ParseResponse(response);
    },
    [sendRequest],
  );

  const Post = useCallback(
    async <T>(path?: HttpPath, body?: HttpBody, parameters?: IUrlParameter[]): Promise<T> => {
      const response = await sendRequest(GetOptions(HttpMethod.POST, body), path, parameters);
      return ParseResponse(response);
    },
    [sendRequest],
  );

  const Delete = useCallback(
    async <T>(path?: HttpPath, parameters?: IUrlParameter[]): Promise<T> => {
      const response = await sendRequest(GetOptions(HttpMethod.DELETE), path, parameters);
      return ParseResponse(response);
    },
    [sendRequest],
  );

  return { Get, Put, Post, Delete };
};
