
<template>
  <div id="app">
    <!-- <component v-bind:is="currentComponent" v-on:child-room="updateRoom($event)" v-on:user-to-room="addUser($event)" :users="username"></component> -->
    <StockRoom />
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
     StockRoom,
    'Real Estate': RealEstateRoom,
    'Mutual Funds and ETFs': MutualFundsRoom
  },
  data () {
  return {
    currentComponent: 'Main Room',
    username: ''
  } 
},
methods: {
    updateRoom(room) {
      this.currentComponent = room
      if (this.currentComponent === 'Main Room') {
        this.$router.push('/')
      }
      if (this.currentComponent === 'Crypto') {
        this.$router.push('/crypto-room')
      }
      if (this.currentComponent === 'Stocks') {
        this.$router.push('/stock-room')
      }
      if (this.currentComponent === 'Real Estate') {
        this.$router.push('/real-estate-room')
      }
      if (this.currentComponent === 'Mutual Funds and ETFs') {
        this.$router.push('/mutual-funds-room')
      }
    },
    addUser(user) {
      this.username = user
    }
    }
}) 
</script>
