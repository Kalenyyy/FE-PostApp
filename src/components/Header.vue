<template>
  <header class="bg-white shadow-md sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <!-- Logo / Brand -->
      <div class="flex items-center space-x-3">
        <svg
          class="w-8 h-8 text-blue-600"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M12 20l9-5-9-5-9 5 9 5z" />
          <path d="M12 12v8" />
          <path d="M12 12l9-5" />
          <path d="M12 12L3 7" />
        </svg>
        <h1 class="text-2xl font-bold text-gray-800 select-none cursor-default">
          PostApp
        </h1>
      </div>
    </div>
  </header>
</template>

<script setup>
</script>

<style scoped>
button:hover img {
  filter: brightness(0.9);
  transition: filter 0.3s ease;
}
</style>
