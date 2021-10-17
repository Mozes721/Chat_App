<template>
 <div id="room">
  <h2>Crypto Room</h2>
  <h2>{{user}}</h2>
  </div> 
</template>

<script>
import EnterRoom from './EnterRoom.vue'
export default {
  name:'CryptoRoom',
  components:{
    EnterRoom    
  },
  props: [
    'user'
  ]
}
</script>
