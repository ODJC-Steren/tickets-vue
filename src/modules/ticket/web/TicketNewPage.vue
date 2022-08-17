<template>
  <LoadingLayout :loading="loadingAreas || loadingErrors || loadingTicket">
    <div class="w-full h-screen flex justify-center items-center flex-col">
      <div></div>
      <form v-on:submit="onSubmit" class="max-w-md w-full">
        <div class="form-control w-full py-1">
          <label class="label">
            <span class="label-text">Area:</span>
          </label>
          <select class="select select-bordered w-full" v-model="areaSelected">
            <option value="0" selected>SELECCIONAR</option>
            <option
              v-for="(item, index) in areas"
              :value="item.idArea"
              :key="index"
            >
              {{ item.name }}
            </option>
          </select>
        </div>
        <div v-if="areaSelected > 0" class="form-control w-full py-1">
          <label class="label">
            <span class="label-text">Error:</span>
          </label>
          <select class="select select-bordered w-full" v-model="form.idError">
            <option value="0" selected>SELECCIONAR</option>
            <option
              v-for="(item, index) in errors.filter(
                (item) => item.idArea === areaSelected
              )"
              :value="item.idError"
              :key="index"
            >
              {{ item.description }}
            </option>
          </select>
        </div>
        <div
          v-if="form.idError > 0 && areaSelected > 0"
          class="form-control w-full py-2"
        >
          <label class="label">
            <span class="label-text">Comentarios</span>
          </label>
          <textarea
            class="textarea textarea-bordered w-full"
            placeholder="Escribe tus comentarios"
            v-model="form.comments"
          />
        </div>
        <div class="flex justify-end pt-2">
          <button class="btn rounded-xl">Enviar</button>
        </div>
      </form>

      <div class="text-center my-2">
        <router-link class="link" to="/tickets">Ver tickets</router-link>
      </div>
    </div>
  </LoadingLayout>
</template>
<script lang="ts" setup>
import LoadingLayout from "@/components/LoadingLayout.vue";
import Swal from "sweetalert2";
import { onMounted, ref, watch } from "vue";
import { Ticket } from "../domain/entites/ticket";
import { useCreateTicket } from "./hooks/use-create-ticket";
import { useGetAllAreas } from "./hooks/use-get-all-areas";
import { useGetErrors } from "./hooks/use-get-error";

const { areas, getAreas, loadingAreas } = useGetAllAreas();
const { errors, getErrors, loadingErrors } = useGetErrors();
const { addTicket, loadingTicket, ticket } = useCreateTicket();

const areaSelected = ref<number>(0);
const form = ref<Pick<Ticket, "idError" | "comments" | "status">>({
  idError: 0,
  comments: "",
  status: "OPEN",
});

watch(ticket, (selection, prev) => {
  if (selection !== null) {
    Swal.fire(
      "Ticket creado",
      `El ticket se creó con el ID: ${selection.idTicket}`,
      "success"
    );
    form.value = {
      idError: 0,
      comments: "",
      status: "OPEN",
    };
    areaSelected.value = 0;
  }
});

onMounted(() => {
  getErrors();
  getAreas();
});

const onSubmit = (e: Event) => {
  e.preventDefault();
  addTicket({
    comments: form.value.comments,
    idError: form.value.idError,
    status: form.value.status,
  });
};
</script>
