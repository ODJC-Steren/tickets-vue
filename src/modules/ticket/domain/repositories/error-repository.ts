import { CustomError } from "../entites/error";

export type ErrorRepository = {
  findAll: () => Promise<CustomError[]>;
};
