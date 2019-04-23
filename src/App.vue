<template>
  <div id="app">
    <router-view 
    v-on:TokenRecieved="setUserToken($event)" 
    v-bind:token="this.userTonken" 
    v-bind:username="this.username" 
    v-bind:userAvatar="this.userAvatar"
    ></router-view>
  </div>
</template>

<script>
import VueJwtDecode from 'vue-jwt-decode'

export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      userTonken: '',
      userAvatar: 'https://robohash.org/asd/?size=100x100',
      username: '',
    }
  },
  methods: {
    someFuntion: function (params = 'some params') {
      return params;
    },
    setUserToken($event){
      this.userTonken = $event;
      const token = VueJwtDecode.decode(this.userTonken);
      this.username = token.username;
      this.userAvatar = 'https://robohash.org/'+this.username+'/?size=100x100';
      this.$router.push('/chat');
    }
  }
}
</script>

<style>

</style>
