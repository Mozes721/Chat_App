<template>
  <div id="room">
  <h2>Real Estate Room</h2>
  <h2>{{user}}</h2>
  </div>
</template>

<script>
import EnterRoom from './EnterRoom.vue'
export default {
  name:'RealEstateRoom',
  components:{
    EnterRoom    
  },
   props: [
    'user'
  ]
}
</script>
