
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
import io from 'socket.io-client';

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
         console.log(this.username)
        this.$router.push('/')
      }
      if (this.currentComponent === 'Chat Room') {
           console.log(this.username)
           this.$router.push('/chat-room')
      }
    },
    addUser(user) {
      this.username = user
    }
    }
}) 
</script>
