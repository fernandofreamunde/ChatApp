<template>
  <div id="app">
    <router-view
      v-on:TokenRecieved="setUserToken($event)"
      v-bind:token="this.token"
      v-bind:currentUser="this.user"
    ></router-view>
  </div>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";

export default {
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      token: "",
      userAvatar: "https://robohash.org/username/?size=100x100",
      username: "",
      user: {
        email: "",
        username: "",
        avatar: ""
      }
    };
  },
  methods: {
    someFuntion: function(params = "some params") {
      return params;
    },
    setUserToken($event) {
      this.token = $event;
      const decodedToken = VueJwtDecode.decode(this.token);
      this.user.username = decodedToken.username;
      this.user.email = decodedToken.email;
      this.user.avatar =
        "https://robohash.org/" + this.username + "/?size=100x100";
      this.$router.push("/chat");
    }
  }
};
</script>

<style>
</style>
