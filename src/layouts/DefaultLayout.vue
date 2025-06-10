<template>
  <div class="min-h-screen flex flex-col bg-gray-50 text-gray-900">
    <Header />
    <main class="flex-grow max-w-5xl mx-auto px-4 py-8 w-full">
      <slot />
    </main>
    <footer class="bg-white border-t text-center py-4 text-sm text-gray-500">
      &copy; 2025 PostApp. All rights reserved.
    </footer>
  </div>
</template>

<script setup>
import Header from "@/components/Header.vue";
</script>
