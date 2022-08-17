import { api } from "@/utils/api";
import { CustomError } from "../../domain/entites/error";
import { ErrorRepository } from "../../domain/repositories/error-repository";

export const findAllErrors: ErrorRepository["findAll"] = async () => {
  const response = await api(`${import.meta.env.VITE_API}errors`).get();
  if (response.status === 200) {
    const rawBody = await response.data;
    return rawBody.map((item: any) => {
      const error: CustomError = {
        idArea: item.idArea,
        description: item.description,
        idError: item.idError,
        createAt: item.createAt,
        updateAt: item.updateAt,
      };
      return error;
    });
  }
  return [];
};
