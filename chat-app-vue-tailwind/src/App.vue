
<template>
  <div id="app">
    <component v-bind:is="currentComponent" v-on:child-room="updateRoom($event)" v-on:user-to-room="addUser($event)"  :user="username"></component>
  </div>
</template>
<style>
</style>
  
<script>
import EnterRoom from '@/components/EnterRoom.vue'
import ChatRoom from '@/components/ChatRoom.vue'
export default ({
  name:'App',
  components: {
    'Main Room': EnterRoom,
    'Chat Room': ChatRoom,
  },
  data () {
  return {
    currentComponent: 'Main Room',
    username: '',
  } 
},
methods: {
    updateRoom(room) {
      this.currentComponent = room
      if (this.currentComponent === 'Main Room') {
        this.$router.push('/')
      }
      if (this.currentComponent === 'Chat Room') {
           this.$router.push("/chat-room/" + this.user)
     
      }
    },
    addUser(user) {
      this.username = user
    }
    }
}) 
</script>