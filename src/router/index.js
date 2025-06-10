import { createRouter, createWebHistory } from 'vue-router'

// Import views
import PostList from '@/views/PostList.vue'
import PostDetail from '@/views/PostDetail.vue'
import CreatePost from '@/components/ModalCreatePost.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: PostList,
  },
  {
    path: '/posts/:id',
    name: 'PostDetail',
    component: PostDetail,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
