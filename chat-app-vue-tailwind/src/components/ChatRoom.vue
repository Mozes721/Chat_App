<template>
  <h2>Chat Room</h2>
  <!-- <h2>{{ }}</h2> -->
  <router-view />
</template>

<script>
import EnterRoom from './EnterRoom.vue'
export default {
  name:'ChatRoom',
  components:{
    EnterRoom    
  }
}
</script>
