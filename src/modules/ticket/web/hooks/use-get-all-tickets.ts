import { ref } from "vue";
import { Ticket } from "../../domain/entites/ticket";
import { findAllTickets } from "../../infrestructure/ticket/find-all-ticket";

export const useGetAllTickets = () => {
  const tickets = ref<Ticket[]>([]);
  const loading = ref<boolean>(false);

  const getTickets = async () => {
    loading.value = true;
    tickets.value = await findAllTickets();
    loading.value = false;
  };

  return { tickets, getTickets, loadingTickets: loading };
};
