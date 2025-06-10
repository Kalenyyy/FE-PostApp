import { ref } from "vue";
import axios from "axios";

// Ini digunakan untuk membuat dan mengedit postingan
// composables/usePostForm.js
export function usePostForm(props, emit) {
  const title = ref("");
  const content = ref("");
  const isSubmitting = ref(false);

  const resetFields = () => {
    if (props.existingPost) {
      title.value = props.existingPost.title;
      content.value = props.existingPost.content;
    } else {
      title.value = "";
      content.value = "";
    }
  };

  const submitPost = async () => {
    if (isSubmitting.value) return;
    isSubmitting.value = true;

    try {
      if (props.existingPost) {
        await axios.put(`http://127.0.0.1:8000/api/posts/${props.existingPost.id}`, {
          title: title.value,
          content: content.value,
        });
      } else {
        await axios.post("http://127.0.0.1:8000/api/posts", {
          title: title.value,
          content: content.value,
        });
      }

      emit("submitted");
      emit("close");

      showToast(props.existingPost ? "✅ Post updated!" : "✅ Post created!");
    } catch (err) {
      alert("❌ Failed to submit post.");
    } finally {
      isSubmitting.value = false;
    }
  };

  const showToast = (message) => {
    const toast = document.createElement("div");
    toast.innerText = message;
    toast.className =
      "fixed top-6 right-6 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in-out z-[9999]";
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  return {
    title,
    content,
    isSubmitting,
    submitPost,
    resetFields,
  };
}
