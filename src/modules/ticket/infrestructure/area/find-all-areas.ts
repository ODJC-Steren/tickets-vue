import { api } from "@/utils/api";
import { Area } from "../../domain/entites/area";
import { AreaRepository } from "../../domain/repositories/area-repository";

export const findAllAreas: AreaRepository["findAll"] = async () => {
  const response = await api(`${import.meta.env.VITE_API}areas`).get();
  if (response.status === 200) {
    const rawBody = await response.data;
    return rawBody.map((item: any) => {
      const area: Area = {
        idArea: item.idArea,
        name: item.name,
        description: item.description,
        createAt: item.createAt,
        updateAt: item.updateAt,
      };
      return area;
    });
  }
  return [];
};
