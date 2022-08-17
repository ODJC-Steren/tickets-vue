<template>
  <div class="w-full shadow-md rounded-lg mb-6 p-4">
    <div class="flex flex-row items-center justify-between">
      <p class="text-xl mb-1 font-bold text-gray-700">
        Ticket #
        <span class="text-2xl text-purple-700 font-bold">
          {{ ticket.idTicket }}
        </span>
      </p>
    </div>
    <p class="text-xs font-bold">
      Estado:
      <span class="text-purple-800 font-extrabold">
        {{ ticket.status }}
      </span>
    </p>
    <p class="text-xs font-bold">
      Comentarios:
      <span class="text-purple-900 font-extrabold">
        {{ ticket.comments }}
      </span>
    </p>
  </div>
</template>

<script lang="ts" setup>
import { Ticket } from "../../domain/entites/ticket";

type TicketCardProps = {
  ticket: Ticket;
};

defineProps<TicketCardProps>();
</script>
