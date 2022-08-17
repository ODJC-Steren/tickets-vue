import { api } from "@/utils/api";
import { TicketRepository } from "../../domain/repositories/ticket-repository";

export const createTicket: TicketRepository["create"] = async (params) => {
  const headers: HeadersInit = new Headers();
  headers.append("Content-Type", "application/json");
  const response = await api(`${import.meta.env.VITE_API}tickets`).post(
    JSON.stringify(params.ticket)
  );
  if (response.status === 201) {
    const item = await response.data;
    return {
      idTicket: item.idTicket,
      idError: item.idError,
      idAssigned: item.idAssigned,
      idClosed: item.idClosed,
      status: item.status,
      comments: item.comments,
      createAt: item.createAt,
      updateAt: item.updateAt,
    };
  }
  return null;
};
