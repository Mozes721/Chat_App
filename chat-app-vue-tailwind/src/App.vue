
<template>
  <div id="app">
   <component :is="currentComponent" v-bind="currentProperties"></component>
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
    EnterRoom,
    CryptoRoom,
    StockRoom,
    RealEstateRoom,
    MutualFundsRoom
  },
  data: function () {
  return {
    currentComponent: EnterRoom,
  }
},
computed: {
  currentProperties: function() {
    if (this.currentComponent === EnterRoom) {
      <EnterRoom/>
    }
    if (this.currentComponent === CryptoRoom){
      <CryptoRoom/>
    }
  }
}   
})
</script>
