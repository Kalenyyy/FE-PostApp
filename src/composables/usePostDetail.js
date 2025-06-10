// composables/usePostDetail.js
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";

// Ini digunakan untuk mengambil detail postingan, menambah komentar, dan menghapus komentar
export default function usePostDetail() {
  const route = useRoute();
  const post = ref({});
  const loading = ref(true);

  const newComment = ref({
    author: "",
    message: "",
  });

  const showAllComments = ref(false);

  // Ambil data post
  const fetchPost = async () => {
    loading.value = true;
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/posts/${route.params.id}`
      );
      post.value = response.data.data;
    } catch (error) {
      console.error("Failed to fetch post:", error);
    } finally {
      loading.value = false;
    }
  };

  onMounted(fetchPost);

  // Tambah komentar
  const submitComment = async () => {
    try {
      await axios.post(
        `http://127.0.0.1:8000/api/posts/${route.params.id}/comments`,
        {
          post_id: route.params.id,
          author: newComment.value.author,
          message: newComment.value.message,
        }
      );

      newComment.value.author = "";
      newComment.value.message = "";
      await fetchPost();

      const toast = document.createElement("div");
      toast.innerText = "✅ Comment added successfully!";
      toast.className =
        "fixed top-6 right-6 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in-out z-[9999]";
      document.body.appendChild(toast);
      setTimeout(() => {
        toast.remove();
      }, 3000);
    } catch (error) {
      const toast = document.createElement("div");
      toast.innerText = "❌ Failed to add comment.";
      toast.className =
        "fixed top-6 right-6 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in-out z-[9999]";
      document.body.appendChild(toast);
      setTimeout(() => {
        toast.remove();
      }, 3000);
      console.error("Failed to add comment:", error);
    }
  };

  // Hapus komentar
  const deleteComment = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/posts/comments/${id}`);
        await fetchPost();
        Swal.fire("Deleted!", "Your comment has been deleted.", "success");
      } catch (error) {
        Swal.fire("Error", "Failed to delete the comment.", "error");
        console.error(error);
      }
    }
  };

  const displayedComments = computed(() => {
    if (!post.value?.comments) return [];
    return showAllComments.value
      ? post.value.comments
      : post.value.comments.slice(0, 4);
  });

  return {
    post,
    loading,
    newComment,
    showAllComments,
    fetchPost,
    submitComment,
    deleteComment,
    displayedComments,
  };
}
