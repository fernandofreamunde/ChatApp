<template>
  <div class="sorry">
    <h1 class="h3 mb-3 font-weight-normal">Welcome to Chat App!</h1>
    <p>This is part of an accessment therefore may not have all the features shown in the UI.</p>
    <p>I know this is bad UX, if I was going to actually deploy this I would not display any link or button to unimplemented features.</p>
    <p>Tho I do think I went a bit overboard by building an entire Vue.js app for this, since I am still learning there may be some major problems with this App Frontend. It also took me way mor time than I expected solving issues with the Frontend, hence the late deliver.</p>
    <p>I did learn alo about Vue, JS and Symfony configurations during the development of this app, saddly I did not learn much about design to provide a better user experience.</p>
    <p>
      Thank you for understanding,
      <br>Fernando
    </p>
    <div>
      <a class="float-left" href="/register">Register Account</a>
      <a class="float-right" href="/login">Login</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      state: {
        errors: []
      }
    };
  }
};
</script>

<style scoped>
body {
  background-color: #fff;
}
.sorry {
  width: 100%;
  max-width: 45em;
  padding: 15px;
  margin: auto;
  margin-top: 50px;
}
</style>