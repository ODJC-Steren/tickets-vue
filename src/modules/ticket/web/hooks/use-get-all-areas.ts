import { ref } from "vue";
import { Area } from "../../domain/entites/area";
import { findAllAreas } from "../../infrestructure/area/find-all-areas";

export const useGetAllAreas = () => {
  const areas = ref<Area[]>([]);
  const loading = ref<boolean>(false);

  const getAreas = async () => {
    loading.value = true;
    areas.value = await findAllAreas();
    loading.value = false;
  };

  return { areas, getAreas, loadingAreas: loading };
};
