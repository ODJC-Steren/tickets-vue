import { Step } from "../entites/step";

export type StepRepository = {
  findAll: () => Promise<Step[]>;
};
