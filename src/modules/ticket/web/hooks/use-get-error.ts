import { ref } from "vue";
import { CustomError } from "../../domain/entites/error";
import { findAllErrors } from "../../infrestructure/error/find-all-error";

export const useGetErrors = () => {
  const errors = ref<CustomError[]>([]);
  const loading = ref<boolean>(false);

  const getErrors = async () => {
    loading.value = true;
    errors.value = await findAllErrors();
    loading.value = false;
  };

  return { errors, getErrors, loadingErrors: loading };
};
