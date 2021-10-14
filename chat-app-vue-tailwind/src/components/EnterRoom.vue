<template>
  <div class="bg-blue-400 h-screen w-screen">
    <div class="flex flex-col items-center flex-1 h-full justify-center px-4 sm:px-0">
        <div class="flex rounded-lg shadow-lg w-full sm:w-3/4 lg:w-1/3 bg-white sm:mx-0" style="height: 500px">
                <div class="flex flex-col flex-1 justify-center mb-8">
                    <h1 class="text-4xl text-center font-bold">Join your interest group and chat!</h1>
                    <div class="w-full mt-4">
                        <form class="form-horizontal w-3/4 mx-auto" method="GET" action="/chatroom/">
                            <div class="flex flex-col mt-4">
                                <span class="px-1 text-gray-600 " >Username</span>
                                <input type="text" class="flex-grow h-10 px-2 border rounded border-grey-400" v-model="username" required>
                            </div>
                            <label class="flex flex-col mt-4">
                              <span class= "px-1 text-gray-600 p-2">Choose your room</span>
                              <select  v-on:change="changeRoom($event)" class="form-select h-10 block w-full rounded" required>
                                <option value="Crypto">Crypto</option>
                                <option value="Stocks">Stocks</option>
                                <option value="Real Estate">Real Estate</option>
                                <option value="Mutual Funds and ETFs">Mutual Funds and ETFs</option>
                              </select>
                            </label>
                            <div class="flex flex-col mt-8">
                                <button @click="changeRoom" class="bg-blue-500 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-4 rounded">
                                    Join Chat
                                </button>
                            </div>
                        </form>
                </div>
            </div>
        </div>
        Username: {{ username }}
        Group: {{ selected }}
    </div>
    
</div>
</template>

<script>
import CryptoRoom from '@/components/CryptoRoom.vue'
import StockRoom from '@/components/StockRoom.vue'
import RealEstateRoom from '@/components/RealEstateRoom.vue'
import MutualFundsRoom from '@/components/MutualFundsRoom.vue'

export default {
  name: 'EnterRoom',
  components: {
    CryptoRoom,
    StockRoom,
    RealEstateRoom,
    MutualFundsRoom
  },
 data: () => ({
   username: "",
   selected: "selected"
 }),

  // methods: {
  //   changeRoom () {
  //     this.$router.to('/chatroom')
  //   },
  //     submit(){
  //        //if you want to send any data into server before redirection then you can do it here
  //       this.$router.push({ChatRoom});
  //       alert("Hello")
  //     }
  //   },
}

</script>

<style>

</style>
