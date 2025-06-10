<template>
  <div class="max-w-5xl mx-auto mt-10 px-4">
    <!-- Back Button -->
    <button
      @click="$router.push('/')"
      class="flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-6"
    >
      <svg
        class="w-5 h-5 mr-2"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15 19l-7-7 7-7"
        />
      </svg>
      Back to Home
    </button>

    <!-- Post Content -->
    <PostContent v-if="!loading" :post="post" />

    <!-- Skeleton Loading -->
    <div v-else class="space-y-4 animate-pulse">
      <div class="h-8 bg-gray-200 rounded w-1/2"></div>
      <div class="h-4 bg-gray-200 rounded w-full"></div>
      <div class="h-4 bg-gray-200 rounded w-11/12"></div>
      <div class="h-4 bg-gray-200 rounded w-10/12"></div>
    </div>

    <!-- Comment Section -->
    <CommentSection
      v-if="!loading"
      :post="post"
      :newComment="newComment"
      :showAllComments="showAllComments"
      :submitComment="submitComment"
      :deleteComment="deleteComment"
      :displayedComments="displayedComments"
    />
    <p v-else class="text-gray-400 italic text-center">Loading...</p>
  </div>
</template>

<script setup>
import usePostDetail from "@/composables/usePostDetail.js";
import CommentSection from "@/components/CommentSection.vue";
import PostContent from "@/components/PostContent.vue"; 

const {
  post,
  loading,
  newComment,
  showAllComments,
  submitComment,
  deleteComment,
  displayedComments,
} = usePostDetail();
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: scale(0.95);
}
.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
.fade-leave-from {
  opacity: 1;
  transform: scale(1);
}
.fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

@keyframes fadeInOut {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  10% {
    opacity: 1;
    transform: translateY(0);
  }
  90% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-10px);
  }
}

.animate-fade-in-out {
  animation: fadeInOut 3s ease-in-out forwards;
}
</style>
