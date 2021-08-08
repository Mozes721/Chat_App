import { createRouter, createWebHistory } from 'vue-router'
import EnterRoom from '../components/EnterRoom.vue'
import ChatRoom from '../components/ChatRoom.vue'

const routes = [
  {
    path: '/',
    name: 'EnterRoom',
    component: EnterRoom
  },
  {
    path: '/chatroom',
    name: 'Chatroom',
    component: ChatRoom
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router