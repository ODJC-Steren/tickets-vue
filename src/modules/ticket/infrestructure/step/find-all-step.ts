import { api } from "@/utils/api";
import { Step } from "../../domain/entites/step";
import { StepRepository } from "../../domain/repositories/step-repository";

export const findAllSteps: StepRepository["findAll"] = async () => {
  const response = await api(`${import.meta.env.VITE_API}steps`).get();
  if (response.status === 200) {
    const rawBody = await response.data;
    return rawBody.map((item: any) => {
      const step: Step = {
        idStep: item.idStep,
        idError: item.idError,
        step: item.step,
        description: item.description,
        createAt: item.createAt,
        updateAt: item.updateAt,
      };
      return step;
    });
  }
  return [];
};
