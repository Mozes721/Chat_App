
<template>
  <div id="app">
   <component v-bind:is="currentComponent" v-on:child-room="updateRoom($event)" v-on:user-to-room="addUser($event)"></component>
  </div>
</template>
<style>
</style>
  
<script>
import EnterRoom from '@/components/EnterRoom.vue'
import CryptoRoom from '@/components/CryptoRoom.vue'
import StockRoom from '@/components/StockRoom.vue'
import RealEstateRoom from '@/components/RealEstateRoom.vue'
import MutualFundsRoom from '@/components/MutualFundsRoom.vue'
export default ({
  name:'App',
  components: {
    'Main Room': EnterRoom,
    'Crypto': CryptoRoom,
    'Stocks': StockRoom,
    'Real Estate': RealEstateRoom,
    'Mutual Funds and ETFs': MutualFundsRoom
  },
  data () {
  return {
    currentComponent: 'Main Room',
    user: ''
  }
},
props: {
  username: ''
},
methods: {
    updateRoom(room) {
      this.currentComponent = room
    },
    addUser(user) {
      this.user = user
    }
    }
})
</script>
