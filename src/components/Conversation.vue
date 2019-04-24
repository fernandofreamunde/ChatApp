<template>
  <div class="card stiky" v-if="this.conversation.id !== 0">
    <div class="card-header">
        <h3 class="card-title">{{ contact.username }}</h3>
        <h6 class="card-subtitle text-muted">{{ contact.email }}</h6>
    </div>
    <div class="card-body scrollable">
        
      <message v-for="message in this.conversation.messages"
      v-bind:key="message.id"
      v-bind:message="message"
      v-bind:currentUserEmail="currentUser.email"
      ></message>

    </div>
    <messageInput
    v-bind:token="token"
    v-bind:conversationId="conversation.id"
    v-on:messagePosted="newMessage($event)"
    ></messageInput>
  </div>
  <div class="card" v-else>
    Select a conversation
  </div>
</template>

<script>
import Message from "./Message.vue";
import MessageInput from "./MessageInput.vue";

export default {
  props: {
    token:{
      type:String,
      required:true
    },
    conversation:{
      type:Object,
      required:true
    },
    contact:{
      type:Object,
      required:true
    },
    currentUser:{
      type:Object,
      required:true
    },
  },
  components:{
    'message':Message,
    'messageInput':MessageInput,
  },
  data () {
    return {
      state: {
        errors: [],
      },
      contact:{}
    }
  },
  methods:{
    newMessage(message) {
      this.conversation.messages.push(message);
    }
  },
}

function findWithAttr(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}
</script>

<style scoped>

.stiky {
  position: fixed;
  bottom: 5px;
  top: 10px;
  width: 75%;
}

.scrollable{
  overflow-y: scroll;
}
</style>