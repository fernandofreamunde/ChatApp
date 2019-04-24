<template>
      <div class="card">
          <div class="card-body">
            <input type="text" v-on:keyup.enter="send" v-model="message">
          </div>
      </div>
</template>

<script>

export default {
  props: {
    token:{
      type:String,
      required:true
    },
    conversationId:{
      type:Number,
      required:true
    }
  },
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

      this.postRequest('http://localhost:8000/conversation/'+this.conversationId+'/message', {message:this.message})
      .then(resonense => {
        this.$emit('messagePosted', resonense.body.message);
        this.message='';
      })
      //emit evend new message sent
      this.message='';
    },
    postRequest(uri, data) {

      let headers = {
        'Content-Type': 'application/json'
      };

      if(this.token !== '') {
        headers['Authorization'] = "Bearer " + this.token
      }

      return this.$http.post(uri, data, {headers});
    },
  }
}
</script>

<style scoped>

input {
  width: 100%;
}
</style>