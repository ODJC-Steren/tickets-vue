<template>
  <LoadingLayout :loading="loadingTickets">
    <div class="w-full min-h-screen">
      <div class="text-center py-4 text-2xl font-bold">Tickets</div>
      <div class="flex justify-center items-center py-4 flex-col">
        <div class="max-w-md w-full max-h-[500px] overflow-y-scroll">
          <div class="w-full" v-for="ticket in tickets">
            <TicketCard :ticket="ticket" />
          </div>
        </div>
        <div class="text-center my-2">
          <router-link class="link" to="/new">Crear tickets</router-link>
        </div>
      </div>
    </div>
  </LoadingLayout>
</template>

<script lang="ts" setup>
import LoadingLayout from "@/components/LoadingLayout.vue";
import { onMounted } from "vue";
import TicketCard from "./components/TicketCard.vue";
import { useGetAllTickets } from "./hooks/use-get-all-tickets";

const { tickets, getTickets, loadingTickets } = useGetAllTickets();

onMounted(() => {
  getTickets();
});
</script>
