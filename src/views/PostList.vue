<template>
  <div class="bg-gray-50 min-h-screen py-10 px-6">
    <!-- Heading -->
    <div class="text-center mb-10">
      <h2 class="text-4xl font-extrabold text-gray-800">📚 All Posts</h2>
      <p class="text-gray-500 mt-2">
        Explore all the shared thoughts and stories
      </p>
      <hr class="mt-4 border-t-2 border-blue-600 w-24 mx-auto rounded" />
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center h-48">
      <svg
        class="animate-spin -ml-1 mr-3 h-10 w-10 text-blue-600"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        ></path>
      </svg>
      <span class="text-blue-600 font-medium text-lg">Loading posts...</span>
    </div>

    <!-- Posts Grid -->
    <div v-else class="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <PostCard
        v-for="post in posts"
        :key="post.id"
        :post="post"
        @edit="openEditModal"
        @delete="deletePost"
        class="transition-transform hover:scale-[1.02] hover:shadow-lg duration-300"
      />
    </div>

    <!-- Create Button -->
    <button
      @click="openCreateModal"
      class="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-xl text-3xl"
      title="Add New Post"
      aria-label="Add New Post"
    >
      +
    </button>

    <!-- Modal -->
    <ModalCreatePost
      :show="showModal"
      :existingPost="selectedPost"
      @close="showModal = false"
      @submitted="fetchPosts"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import ModalCreatePost from "@/components/ModalCreatePost.vue";
import PostCard from "@/components/PostCard.vue";
import { usePosts } from "@/composables/usePosts";

const showModal = ref(false);
const selectedPost = ref(null);

const { posts, loading, fetchPosts, deletePost } = usePosts();

const openCreateModal = () => {
  selectedPost.value = null;
  showModal.value = true;
};

const openEditModal = (post) => {
  selectedPost.value = post;
  showModal.value = true;
};

onMounted(() => {
  fetchPosts();
});
</script>
