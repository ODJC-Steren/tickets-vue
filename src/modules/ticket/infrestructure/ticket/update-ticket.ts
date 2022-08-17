import { api } from "@/utils/api";
import { TicketRepository } from "../../domain/repositories/ticket-repository";

export const updateTicket: TicketRepository["update"] = async (params) => {
  const headers: HeadersInit = new Headers();
  headers.append("Content-Type", "application/json");
  const response = await api(
    `${import.meta.env.VITE_API}tickets/${params.upTicket.idTicket}`
  ).get();
  if (response.status === 204) return true;
  return false;
};
