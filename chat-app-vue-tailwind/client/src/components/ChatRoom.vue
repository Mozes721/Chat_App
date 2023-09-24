<template>
  <div class="bg-blue-400 h-screen w-screen overflow-hidden">
    <div class="flex flex-col items-center flex-1 h-full justify-center px-4 sm:px-0">
    <div class="flex flex-cols-2 w-3/4 border rounded items-center justify-center mb-8" style="min-height: 60vh;">
            <div class="w-1/4 h-full bg-gray-100  border-r border-gray-300">
                <div class="my-3 mx-3 "> 
                    <button  class= " bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" v-on:click.prevent="enterRoom()">
                      Exit Room 
                    </button>  
                </div>
                <ul class="overflow-auto" style="height: 500px;">
                    <h2 class="ml-2 mb-2 text-gray-600 text-lg my-2">Chats</h2>
                    <li>
                        <a class="hover:bg-gray-100 border-b border-gray-300 px-3 py-2 cursor-pointer flex items-center text-sm focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out" v-for="(user, idx) in users" :key="idx">
                             
                            <div class="w-full pb-2">
                                <div class="flex justify-between">
                                    <span class="block ml-2 font-semibold text-base text-gray-600 ">{{user}}</span>
                                </div>
                               
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="w-3/4 bg-white">
                <div class="w-full">
                    <div class="flex items-center border-b border-gray-300 pl-3 py-3">
                      
                        <span class="block ml-2 font-bold  text-gray-700 text-2xl align-middle">Chat Room</span><br>
                        <h5 class="block ml-2 font-bold text-base text-gray-600 float-left">{{this.user}}</h5>
                      
                    </div>
                    <div id="chat" class="w-full overflow-y-auto p-10 relative" style="height: 600px;" ref="toolbarChat">
                        <ul>
                            <li class="clearfix2">
                                 <div v-for="(msg, index) in messages" :key="index">
                                     <div class="w-full flex " v-bind:class="{'justify-end': User(msg.user)}">
                                        <div class="bg-gray-100 rounded px-5 py-2 my-2 text-gray-700 relative"  style="max-width: 300px;">
                                            <span class="block text-blue-400">{{ msg.user }}</span>
                                            <span class="block">{{ msg.message }}</span>
                                            <span class="block text-xs text-right">{{msg.timestamp}}</span>
                                        </div>
                                     </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <p v-if="joined" class="pl-4 italic text-green-600">{{this.user_joined}}</p>
                    <p v-if="left" class="pl-4 italic text-red-600">{{this.user_left}}</p>
                    <p v-if="typing" class="pl-4 italic text-gray-600">{{this.user_typing}}</p>
                     <form @submit.prevent="sendMessage">
                        <div class="w-full py-3 px-3 flex items-center justify-between border-t border-gray-300">
                        
                                <input aria-placeholder="Enter your message" placeholder="Enter your message" type="text" v-model="message"
                                    class="py-2 mx-3 pl-5 block w-full rounded-full bg-gray-100 outline-none focus:text-gray-700" name="message" required/>

                                <button class="outline-none focus:outline-none" type="submit">
                                    <svg class="text-gray-400 h-7 w-7 origin-center transform rotate-90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                                    </svg>
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
import EnterRoom from './EnterRoom.vue';
import io from 'socket.io-client';
export default {
  name:'ChatRoom',
  components:{
    EnterRoom    
  },
   props: [
    'user'
  ],
  data() {
        return {
            joined: false,
            left: false,
            typing: false,
            user_joined: '',
            user_left: '',
            user_typing: '',
            message: '',
            messages: [],
            socket: io('localhost:3000')
        }
    },
    created: function () {
          this.$router.push("/chat-room/" + this.user)
          this.socket.emit('join', this.user); 
          this.$store.dispatch('addUser', this.user)
          console.log('User added to store:', this.user);
    },
    computed: {
        users() {
            console.log(this.$store.state.users)
            return this.$store.state.users
            
        }
    },
    methods: {
        enterRoom(){
        this.socket.disconnect()
        this.$emit('child-room', 'Main Room')
            },
        sendMessage(e) {
            e.preventDefault();
            this.socket.emit('SEND_MESSAGE', {
                user: this.user,
                message: this.message,
            });
            this.message = ''
            this.typing = false
            window.scrollTo(0, document.body.scrollHeight);
        },
        
        User(User) {
            if (this.user === User) {
                return true
            }
        },
	userTyping() {
        this.socket.emit('typing', {
            user: this.user
        })
        }
    },
    mounted() {
        this.socket.on('MESSAGE', (data) => {
            this.messages = [...this.messages, data];
        });
        this.socket.on('user_joined', (data) => {
            this.joined = true
            this.$store.dispatch('addUser', data.username)
            this.user_joined = `User ${data.username} has joined.`
            setTimeout(() =>{
                this.joined = false
            }, 5000);
        }),
        this.socket.on('userTyping', (data) => {
            this.typing = true
            this.user_typing = `${data.user} is typing...`
            setTimeout(() =>{
                this.typing = false
            }, 5000);
        }),
        this.socket.on('userLeft', (data) => {
            this.left = true 
            this.user_left = `A user has left has left the chat`
            this.$store.dispatch('removeUser', data.user)
            setTimeout(() =>{
                this.left = false
            }, 5000);
        })
        
    },
    watch: {
        message() {
            this.userTyping()
        },   
}
}
</script>