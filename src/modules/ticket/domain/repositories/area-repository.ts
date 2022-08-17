import { Area } from "../entites/area";

export type AreaRepository = {
  findAll: () => Promise<Area[]>;
};
