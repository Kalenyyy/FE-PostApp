<template>
  <div
    @click="goToDetail(post.id)"
    class="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 relative group cursor-pointer"
  >
    <h3 class="text-xl font-semibold text-blue-700 mb-2 truncate">
      {{ post.title }}
    </h3>
    <p class="text-gray-600 mb-4 line-clamp-3">{{ post.content }}</p>

    <div class="flex items-center justify-between text-sm text-gray-500">
      <span>{{ post.comments.length }} Comments</span>
      <span class="italic text-gray-400">
        {{ new Date(post.created_at).toLocaleDateString() }}
      </span>
    </div>

    <!-- Action buttons -->
    <div
      class="flex justify-end space-x-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity"
    >
      <button
        @click.stop="$emit('edit', post)"
        class="px-3 py-1 text-sm bg-yellow-400 hover:bg-yellow-500 text-white rounded-full shadow-sm transition"
        title="Edit Post"
      >
        ✏️ Edit
      </button>
      <button
        @click.stop="$emit('delete', post.id)"
        class="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded-full shadow-sm transition"
        title="Delete Post"
      >
        🗑️ Delete
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const props = defineProps({
  post: Object,
});

const emit = defineEmits(['edit', 'delete']);
const router = useRouter();

const goToDetail = (id) => {
  router.push(`/posts/${id}`);
};
</script>


