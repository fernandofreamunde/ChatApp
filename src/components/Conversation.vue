<template>
  <div class="card stiky" v-if="this.conversation.id !== 0">
    <div class="card-header">
      <h3 class="card-title">{{ contact.username }}</h3>
      <h6 class="card-subtitle text-muted">{{ contact.email }}</h6>
    </div>
    <div class="card-body scrollable">
      <message
        v-for="message in this.conversation.messages"
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
  <div class="card stiky" v-else>
    <div class="card-header">
      <h3 class="card-title">Select a conversation</h3>
      <h6 class="card-subtitle text-muted">Click on one of your established contacts</h6>
    </div>
    <div class="card-body empty-message">
      <h3>Select a conversation</h3>
    </div>
  </div>
</template>

<script>
import Message from "./Message.vue";
import MessageInput from "./MessageInput.vue";

export default {
  props: {
    token: {
      type: String,
      required: true
    },
    conversation: {
      type: Object,
      required: true
    },
    contact: {
      type: Object,
      required: true
    },
    currentUser: {
      type: Object,
      required: true
    }
  },
  components: {
    message: Message,
    messageInput: MessageInput
  },
  data() {
    return {
      state: {
        errors: []
      },
      contact: {}
    };
  },
  methods: {
    newMessage(message) {
      this.conversation.messages.push(message);
    },
    getRequest(uri) {
      let headers = {
        "Content-Type": "application/json"
      };

      if (this.token !== "") {
        headers["Authorization"] = "Bearer " + this.token;
      }

      return this.$http.get(uri, { headers });
    }
  },
  mounted() {
    window.setInterval(() => {
      if (this.conversation.id !== 0) {
        this.getRequest(
          "http://localhost:8000/conversation/" +
            this.conversation.id +
            "/messages"
        )
          .then(response => {
            this.conversation.messages = response.body.messages;
          })
          .catch(response => {
            console.error("something went wrong getting messages!", response);
          });
      }
      //this.countDown();
    }, 5000);
  }
};

function findWithAttr(array, attr, value) {
  for (var i = 0; i < array.length; i += 1) {
    if (array[i][attr] === value) {
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

.scrollable {
  overflow-y: scroll;
}

.empty-message {
  text-align: center;
  margin-top: 20%;
}
</style>