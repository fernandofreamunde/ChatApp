<template>
  <div class="sorry">
    <h1 class="h3 mb-3 font-weight-normal">Sorry!</h1>
    <p>Sorry this is part of an accessment therefore may not have all the features shown in the UI.</p>
    <p>I know this is bad UX, if I was going to actually deploy this I would not display any link or button to unimplemented features.</p>
    <p>
      Thank you for understanding,
      <br>Fernando
    </p>
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