// composables/usePosts.js
import { ref } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";

const router = useRouter();

// Ini digunakan untuk mengambil daftar postingan, dan menghapus postingan
export function usePosts() {
  const posts = ref([]);
  const loading = ref(false);

  const fetchPosts = async () => {
    loading.value = true;
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/posts");
      posts.value = res.data.data;
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      loading.value = false;
    }
  };

  const deletePost = async (id) => {
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
        await axios.delete(`http://127.0.0.1:8000/api/posts/${id}`);
        await fetchPosts();
        Swal.fire("Deleted!", "Your post has been deleted.", "success");
      } catch (error) {
        Swal.fire("Error", "Failed to delete the post.", "error");
        console.error(error);
      }
    }
  };

  return {
    posts,
    loading,
    fetchPosts,
    deletePost,
  };
}
