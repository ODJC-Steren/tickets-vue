import { api } from "@/utils/api";
import { Ticket } from "../../domain/entites/ticket";
import { TicketRepository } from "../../domain/repositories/ticket-repository";

export const findAllTickets: TicketRepository["findAll"] = async () => {
  const response = await api(`${import.meta.env.VITE_API}tickets`).get();
  if (response.status === 200) {
    const rawBody = await response.data;
    const tickets: Ticket[] = rawBody.map((item: any) => {
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
    });
    return tickets;
  }
  return [];
};
