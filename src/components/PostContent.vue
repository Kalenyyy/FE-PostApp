<template>
  <div
    class="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition-shadow duration-300"
  >
    <h1 class="text-3xl font-bold text-blue-700 mb-4">{{ post.title }}</h1>
    <p class="text-gray-700 whitespace-pre-line mb-6 leading-relaxed">
      {{ post.content }}
    </p>
    <p class="text-sm text-gray-400 italic">
      Posted at: {{ new Date(post.created_at).toLocaleString() }}
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
});
</script>
