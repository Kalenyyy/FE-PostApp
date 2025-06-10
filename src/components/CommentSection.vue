<template>
  <div class="mt-12 bg-white p-6 rounded-xl shadow-md">
    <h2 class="text-2xl font-semibold text-gray-800 mb-2">
      Comments ({{ post.comments.length }})
    </h2>
    <hr class="mb-4" />

    <!-- Comment Form -->
    <form @submit.prevent="submitComment" class="space-y-4 mb-6">
      <input
        v-model="newComment.author"
        type="text"
        placeholder="Your Name"
        class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />
      <textarea
        v-model="newComment.message"
        placeholder="Your Comment"
        class="w-full px-4 py-2 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
        rows="4"
        required
      ></textarea>
      <button
        type="submit"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Post Comment
      </button>
    </form>

    <!-- List Comments -->
    <transition-group name="fade" tag="div" class="space-y-4">
      <div
        v-for="comment in displayedComments"
        :key="comment.id"
        class="relative bg-gray-50 p-4 rounded-lg shadow-sm border-l-4 border-blue-500 hover:shadow-md transition duration-300"
      >
        <button
          @click="deleteComment(comment.id)"
          class="absolute top-2 right-2 text-red-500 hover:text-red-700"
          title="Delete Comment"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h3 class="text-lg font-semibold text-blue-700">
          {{ comment.author }}
        </h3>
        <p class="text-gray-700 mt-1 mb-2">{{ comment.message }}</p>
        <p class="text-xs text-gray-400 italic">
          {{ new Date(comment.created_at).toLocaleString() }}
        </p>
      </div>
    </transition-group>

    <!-- Toggle Comments -->
    <div v-if="post.comments.length > 4" class="text-center mt-4">
      <button
        @click="showAllComments = !showAllComments"
        class="text-blue-600 hover:underline font-medium"
      >
        {{ showAllComments ? "Show Less" : "View All Comments" }}
      </button>
    </div>

    <!-- No Comments Yet -->
    <div
      v-if="post.comments.length === 0"
      class="mt-6 text-gray-400 italic text-sm text-center"
    >
      No comments yet.
    </div>
  </div>
</template>

<script setup>
defineProps([
  "post",
  "newComment",
  "showAllComments",
  "submitComment",
  "deleteComment",
  "displayedComments",
]);
</script>
