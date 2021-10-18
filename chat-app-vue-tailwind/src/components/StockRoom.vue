<template>
  <!-- <h2>{{user}}</h2> -->
  <div class="bg-blue-400 h-screen w-screen overflow-hidden">
    <h1 class="flex justify-center text-2xl">Stock Room test</h1>
    <div class="flex flex-row rounded-lg shadow-lg items-center flex-2 h-full justify-center px-2 sm:px-0" >
      <div class="flex rounded-lg shadow-lg w-full sm:w-3/4 lg:w-3/4  sm:mx-0" style="height: 700px">
        <div class="w-1/4  bg-green-500 flex justify-center">Room Members</div>
        <div class="w-3/4  bg-blue-500 flex justify-center">Chat</div>
      </div>
    </div>
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
