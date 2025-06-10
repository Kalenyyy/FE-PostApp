<template>
  <transition name="modal-fade">
    <div
      v-if="show"
      class="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div
        class="bg-white rounded-2xl p-8 w-full max-w-lg shadow-lg border border-gray-200 transform transition-transform duration-300 ease-out relative"
      >
        <button
          @click="$emit('close')"
          class="absolute top-4 right-4 text-gray-600 hover:text-blue-600 transition-colors"
          aria-label="Close modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
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

        <h2
          class="text-3xl font-extrabold mb-8 text-gradient bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent"
        >
          {{ existingPost ? "Edit Post" : "Create New Post" }}
        </h2>

        <form @submit.prevent="submitPost" class="space-y-6">
          <input
            v-model="title"
            type="text"
            placeholder="Post Title"
            class="w-full rounded-xl border border-gray-300 px-5 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition placeholder-gray-400"
            required
          />
          <textarea
            v-model="content"
            placeholder="Post Content"
            rows="6"
            class="w-full rounded-xl border border-gray-300 px-5 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition placeholder-gray-400"
            required
          ></textarea>

          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full bg-gradient-to-r from-indigo-500 via-blue-600 to-indigo-700 hover:brightness-110 text-white font-bold py-3 rounded-xl shadow-lg flex items-center justify-center gap-3 transition-transform active:scale-95"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span v-if="!isSubmitting">
              {{ existingPost ? "Update Post" : "Submit Post" }}
            </span>
            <span v-else>Submitting...</span>
          </button>
        </form>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { watch } from "vue";
import { usePostForm } from "@/composables/usePostForm";

const props = defineProps({
  show: Boolean,
  existingPost: { type: Object, default: null },
});
const emit = defineEmits(["close", "submitted"]);

const { title, content, isSubmitting, submitPost, resetFields } = usePostForm(
  props,
  emit
);

watch(
  () => props.existingPost,
  () => resetFields(),
  { immediate: true }
);
</script>

<style>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
  transform: translateY(-15px);
}
.modal-fade-enter-to,
.modal-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}

@keyframes fade-in-out {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  10%,
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
  animation: fade-in-out 3s ease-in-out forwards;
}
</style>
