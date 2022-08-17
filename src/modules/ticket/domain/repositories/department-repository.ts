import { Department } from "../entites/department";

export type DepartmentRepository = {
  findAll: () => Promise<Department[]>;
};
