<template>
      <div class="card">
          <div class="card-body">
            <input type="text" v-on:keyup.enter="send" v-model="message">
          </div>
      </div>
</template>

<script>

export default {
  data () {
    return {
      state: {
        errors: [],
      },
      message:''
    }
  },
  methods:{
    send() {
      if (this.message.length === 0){
        console.log('nothing to be done!');
        return;
      }
      console.log(this.message);
      console.log('post message to BE');
      //emit evend new message sent
      this.message='';
    }
  },
  created() {
    //this.state.isAuthor = this.message.author == "me";
    //console.log(this.message);

  }
}
</script>

<style scoped>

input {
  width: 100%;
}
</style>