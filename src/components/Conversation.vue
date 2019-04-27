<template>
  <div class="card stiky" v-if="state.show">
    <div class="card-header">
      <button
        class="float-right"
        v-if="state.page < state.pageCount"
        v-on:click="loadOldMessages"
      >load older messages</button>
      <h3 class="card-title">{{ contact.username }}</h3>
      <h6 class="card-subtitle text-muted">{{ contact.email }}</h6>
    </div>
    <div class="card-body scrollable" ref="messageLog">
      <message
        v-for="message in messages"
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
import Requests from "../mixins/requests.js";
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
        errors: [],
        pageCount: 0,
        page: 1,
        show: false
      },
      contact: {},
      messages: []
    };
  },
  methods: {
    newMessage(message) {
      this.scrollToEnd();
      this.messages.push(message);
    },
    scrollToEnd() {
      var messagelog = this.$refs.messageLog;
      messagelog.scrollTop = messagelog.scrollHeight;
    },
    lastMessageAt() {
      return this.messages[this.messages.length - 1].id;
    },
    getNewMessages() {
      this.getRequest(
        "http://localhost:8000/conversation/" +
          this.conversation.id +
          "/messages?since=" +
          this.lastMessageAt()
      )
        .then(response => {
          response.body.messages.forEach(element => {
            this.messages.push(element);

            this.scrollToEnd();
          });
        })
        .catch(response => {
          console.error("something went wrong getting messages!", response);
        });
    },
    pullMessages(page = 0) {
      let uri =
        "http://localhost:8000/conversation/" +
        this.conversation.id +
        "/messages";

      if (page > 0) {
        uri += "?page=" + page;
      }

      return this.getRequest(uri);
    },
    getConversationPageCount() {
      this.getRequest(
        "http://localhost:8000/conversation/" +
          this.conversation.id +
          "/messages/pages"
      )
        .then(response => {
          this.state.pageCount = response.body.pages;
        })
        .catch(response => {
          console.error(
            "something went wrong getting message pages!",
            response
          );
        });
    },
    loadOldMessages() {
      console.log("load older messages");
      console.log(this.state.page, this.state.pageCount);

      this.state.page = this.state.page + 1;

      this.pullMessages(this.state.page)
        .then(response => {
          response.body.messages.forEach(element => {
            this.messages = prepend(element, this.messages);
          });
        })
        .catch(response => {
          this.state.page = this.state.page - 1;
        });
    },
    init(conversation) {
      this.conversation = conversation;
      console.log(conversation);
      this.state.show = true;
      this.state.page = 1;
      this.state.pageCount = 0;

      const currentUserIndex = findWithAttr(
        conversation.participants,
        "email",
        this.currentUser.email
      );

      this.contact = conversation.participants[currentUserIndex === 0 ? 1 : 0];
      this.conversationId = conversation.id;

      this.pullMessages().then(response => {
        this.messages = response.body.messages.reverse();
      });

      console.log(this.messages);
      this.getConversationPageCount();
      //this.scrollToEnd();
    }
  },
  updated() {
    this.state.show = true;
    const currentUserIndex = findWithAttr(
      this.conversation.participants,
      "email",
      this.currentUser.email
    );
    this.contact = this.conversation.participants[
      currentUserIndex === 0 ? 1 : 0
    ];

    //this.scrollToEnd();
  },
  mounted() {
    window.setInterval(() => {
      if (this.conversation.id !== 0) {
        this.getNewMessages();
      }
    }, 5000);
  },
  mixins: [Requests]
};

function findWithAttr(array, attr, value) {
  for (var i = 0; i < array.length; i += 1) {
    if (array[i][attr] === value) {
      return i;
    }
  }
  return -1;
}

function prepend(value, array) {
  var newArray = array.slice();
  newArray.unshift(value);
  return newArray;
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

.float-right {
  float: right;
}
</style>