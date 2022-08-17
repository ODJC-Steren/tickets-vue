import { ref } from "vue";
import { Ticket } from "../../domain/entites/ticket";
import { createTicket } from "../../infrestructure/ticket/create-ticket";

export const useCreateTicket = () => {
  const ticket = ref<Ticket | null>(null);
  const loading = ref<boolean>(false);

  const addTicket = async (
    item: Pick<Ticket, "idError" | "comments" | "status">
  ) => {
    loading.value = true;
    ticket.value = await createTicket({ ticket: item });
    loading.value = false;
  };

  return { ticket, addTicket, loadingTicket: loading };
};
