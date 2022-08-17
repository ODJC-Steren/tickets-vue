import { api } from "@/utils/api";
import { Department } from "../../domain/entites/department";
import { DepartmentRepository } from "../../domain/repositories/department-repository";

export const findAllDepartments: DepartmentRepository["findAll"] = async () => {
  const response = await api(`${import.meta.env.VITE_API}departments`).get();
  if (response.status === 200) {
    const rawBody = await response.data;
    return rawBody.map((item: any) => {
      const department: Department = {
        idDepartment: item.idDepartment,
        name: item.name,
        description: item.description,
        idArea: item.idArea,
        createAt: item.createAt,
        updateAt: item.updateAt,
      };
      return department;
    });
  }
  return [];
};
