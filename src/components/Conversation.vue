<template>
  <div class="card">
    <div class="card-header">
        <h3 class="card-title">Conversation</h3>
        <h6 class="card-subtitle text-muted">contact name.</h6>
    </div>
    <div class="card-body">
        
      <message v-for="message in this.messages"
      v-bind:key="message.id"
      v-bind:message="message"></message>

    </div>
  </div>
</template>

<script>
import Message from "./Message.vue";

export default {
  components:{
      'message':Message
  },
  data () {
    return {
      state: {
        errors: [],
      },
      messages:[
        {
          id:1,
          content: "Hi!",
          author:"me",
        },
        {
          id:2,
          content: "Hi how are you?",
          author:"someone@somewhere.com",
        },
        {
          id:3,
          content: "I'm fine! ",
          author:"me",
        },
        {
          id:4,
          content: "and you?",
          author:"me",
        },
        {
          id:5,
          content: "I'm Great :)",
          author:"someone@somewhere.com",
        },
      ]
    }
  },
  methods:{
  }
}
</script>

<style scoped>
</style>