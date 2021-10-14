import { createRouter, createWebHistory } from 'vue-router'
import EnterRoom from '../components/EnterRoom.vue'
import CryptoRoom from '../components/CryptoRoom.vue'
import StockRoom from '../components/StockRoom.vue'
import RealEstateRoom from '../components/RealEstateRoom.vue'
import MutualFundsRoom from '../components/MutualFundsRoom.vue'

const routes = [
  {
    path: '/',
    name: 'EnterRoom',
    component: EnterRoom
  },
  {
    path: '/crypto-room',
    name: 'CryptoRoom',
    component: CryptoRoom
  },
  {
    path: '/stock-room',
    name: 'StockRoom',
    component: StockRoom
  },
  {
    path: '/real-estate-room',
    name: 'RealEstateRoom',
    component: RealEstateRoom
  },
  {
    path: '/mutual-funds-room',
    name: 'MutualFundsRoom',
    component: MutualFundsRoom
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router