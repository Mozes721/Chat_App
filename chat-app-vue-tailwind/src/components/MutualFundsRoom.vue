<template>
  <div id="room">
  <h2>Mutual Funds Room</h2>
  <h2>{{user}}</h2>
  </div>  
</template>

<script>
import EnterRoom from './EnterRoom.vue'
export default {
  name:'MutualFundsRoom',
  components:{
    EnterRoom    
  },
   props: [
    'user'
  ]
}
</script>
