<template>
  <div id="app">
    <router-view v-on:TokenRecieved="setUserToken($event)" v-bind:token="this.userTonken"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      userTonken: '',
    }
  },
  methods: {
    someFuntion: function (params = 'some params') {
      return params;
    },
    setUserToken($event){
      this.userTonken = $event;
      console.log(this.userTonken);
      this.$router.push('/chat');
    }
  },
  created() {
    if (this.userTonken.length == 0) {
      this.$router.push('/login');
    }
  }
}
</script>

<style>

</style>
