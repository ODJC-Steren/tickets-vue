import { api } from "@/utils/api";
import { Ticket } from "../../domain/entites/ticket";
import { TicketRepository } from "../../domain/repositories/ticket-repository";

export const findByIDTicket: TicketRepository["findByID"] = async (params) => {
  const response = await api(
    `${import.meta.env.VITE_API}tickets/${params.idTicket}`
  ).get();
  if (response.status === 200) {
    const item = await response.data;
    const ticket: Ticket = {
      idTicket: item.idTicket,
      idError: item.idError,
      idAssigned: item.idAssigned,
      idClosed: item.idClosed,
      status: item.status,
      comments: item.comments,
      createAt: item.createAt,
      updateAt: item.updateAt,
    };
    return ticket;
  }
  return null;
};
