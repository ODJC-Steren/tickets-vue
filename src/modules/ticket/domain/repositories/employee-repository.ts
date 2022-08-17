import { Employee } from "../entites/employee";

export type EmployeeRepository = {
  findAll: () => Promise<Employee[]>;
};
