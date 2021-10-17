<template>
  <div id="room">
  <h2>Stock Room test</h2>
  <h2>{{user}}</h2>
  </div>
</template>

<script>
import EnterRoom from './EnterRoom.vue'
export default {
  name:'StockRoom',
  components:{
    EnterRoom    
  },
   props: [
    'user'
  ]
}
</script>
