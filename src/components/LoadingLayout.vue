<template>
  <div
    v-if="loading"
    class="fixed z-50 bg-gray-300/75 h-screen w-full flex justify-center items-center"
  >
    <img
      src="@/assets/images/logo-circle.png"
      alt="Loading..."
      class="animate-spin w-24"
    />
  </div>

  <slot />
</template>
<script lang="ts" setup>
type LoadingLayoutProps = {
  loading: boolean;
};
defineProps<LoadingLayoutProps>();
</script>
