<script setup lang="ts">
import { ref } from "vue";

const form = ref({
  name: "dasda",
  lang: "TS",
});

const onChange = (value: string) => {
  form.value.name = value;
};
</script>

<template>
  <div class="w-full min-h-screen bg-green-700">
    <div class="text-center py-16">Test</div>
    <div class="flex justify-center items-center">
      <div class="max-w-sm w-full">
        <div>
          <label>Name (C)</label>
          <n-input :value="form.name" @update:value="onChange" />
        </div>
        <div class="mt-3">
          <label>Lang (U)</label>
          <n-input @update:value="(value : string) => (form.lang = value)" />
        </div>
        <div class="mt-3">
          <label>Native (U)</label>
          <input type="text" v-model="form.lang" />
        </div>
        <div class="mt-4">
          {{ form }}
        </div>
      </div>
    </div>
    <n-gradient-text type="info"> Live Forever </n-gradient-text>
  </div>
</template>
