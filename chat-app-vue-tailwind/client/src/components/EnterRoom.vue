<template>
  <div class="bg-blue-400 h-screen w-screen">
    <div class="flex flex-col items-center flex-1 h-full justify-center px-4 sm:px-0">
        <div class="flex rounded-lg shadow-lg w-full sm:w-3/4 lg:w-1/3 bg-white sm:mx-0" style="height: 500px">
                <div class="flex flex-col flex-1 justify-center mb-8">
                    <h1 class="text-4xl text-center font-bold">Join the chat!</h1>
                    <div class="w-full mt-4">
                        <form class="form-horizontal w-3/4 mx-auto" method="GET">
                            <div class="flex flex-col mt-4" required>
                                <span class="px-1 text-gray-600 " >Username</span>
                                <input type="text" class="flex-grow h-10 px-2 border rounded border-grey-400" v-model="username" required>
                            </div>
                            <label class="flex flex-col mt-4">
                              <span class= "px-1 text-gray-600 p-2">Choose your room</span>
                              <select  v-on:change="changeRoom($event)" class="form-select h-10 block w-full rounded">
                                <option value="Chat Room">Chat Room</option>
                              </select>
                            </label>
                            <div class="flex flex-col mt-8">
                                <button v-on:click.prevent="enterRoom()" class="bg-blue-500 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-4 rounded">
                                    Join Chat
                                </button>
                            </div>
                        </form>
                </div>
            </div>
        </div>
    </div>
    
</div>
</template>

<script>
import io from 'socket.io-client';

export default {
  name: 'EnterRoom',
  
 data: () => ({
   username: '',
   selected: "Chat Room",
   socket: null,
 }),
 computed: {
        users() {
            console.log(this.$store.state.users)
            return this.$store.state.users
            
        }
    },
  methods: {
    changeRoom () {
      this.selected = target.value
    },
    enterRoom () {
      if (this.username === ''){
        alert("You have to enter your name") 
      }
      if (this.username.length < 6) {
        alert("Your username is too short it has to be of lenght 6 or more")
      }
      if (this.users.includes(this.username)) {
        alert("User already in room choose different name")
      }
      else {
      this.$emit('child-room', this.selected)
      this.$emit('user-to-room', this.username)
      }
    }
  },
  created() {
    this.socket = io('localhost:3000');
    this.socket.on('user_list_update', (userList) => {
      this.$store.dispatch('updateUserList', userList);
    });
  }
}
</script>

<style>
</style>
