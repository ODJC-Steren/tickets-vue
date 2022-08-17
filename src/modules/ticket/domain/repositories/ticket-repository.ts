import { Ticket } from "../entites/ticket";

export type TicketRepository = {
  create: (params: {
    ticket: Pick<Ticket, "idError" | "comments" | "status">;
  }) => Promise<Ticket | null>;
  findAll: () => Promise<Ticket[]>;
  findByID: (params: { idTicket: number }) => Promise<Ticket | null>;
  update: (params: { upTicket: Ticket }) => Promise<boolean>;
};
