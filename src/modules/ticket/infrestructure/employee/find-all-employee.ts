import { api } from "@/utils/api";
import { Employee } from "../../domain/entites/employee";
import { EmployeeRepository } from "../../domain/repositories/employee-repository";

export const findAllEmployees: EmployeeRepository["findAll"] = async () => {
  const response = await api(`${import.meta.env.VITE_API}employees`).get();
  if (response.status === 200) {
    const rawBody = await response.data;
    return rawBody.map((item: any) => {
      const employee: Employee = {
        idEmployee: item.idEmployee,
        firstName: item.firstName,
        lastName: item.lastName,
        username: item.username,
        email: item.email,
        phone: item.phone,
        password: item.password,
        createAt: item.createAt,
        updateAt: item.updateAt,
      };
      return employee;
    });
  }
  return [];
};
