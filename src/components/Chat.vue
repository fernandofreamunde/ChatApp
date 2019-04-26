<template>
  <div class="wrapper">
    <nav class="sidebar">
      <div class="sidebar-content">
        <a class="sidebar-brand" href="index.html">
          <span class="align-middle">Bunq Chat</span>
        </a>

        <ul class="sidebar-nav">
          <li class="sidebar-header">Contacts</li>
          <contact
            v-bind:token="token"
            v-for="contact in contacts"
            v-bind:key="contact.id"
            v-bind:id="contact.id"
            v-bind:contact="contact.contact"
            v-bind:status="contact.status"
            v-bind:isInvite="false"
            v-on:click.native="showConversation({owner:contact.owner, contact:contact.contact, status:contact.status})"
          ></contact>

          <li class="sidebar-header">add contact</li>
          <contactFinder v-bind:token="this.token" v-on:contactInvited="addContact($event)"></contactFinder>

          <li class="sidebar-header">invites</li>
          <contact
            v-bind:token="token"
            v-for="contact in invites"
            v-bind:key="contact.id"
            v-bind:id="contact.id"
            v-bind:contact="contact.owner"
            v-bind:status="contact.status"
            v-bind:isInvite="true"
            v-on:contactUpdated="updateContact($event)"
          ></contact>
        </ul>
      </div>

      <div class="sidebar-bottom">
        <div class="media">
          <img
            class="rounded-circle mr-3 bg-white"
            v-bind:src="this.currentUser.avatar"
            alt
            width="40"
            height="40"
          >

          <div class="media-body">
            <h5 class="mb-1 text-white">{{ this.currentUser.username }}</h5>
            <div class="mb-1 text-white">{{ this.currentUser.email }}</div>
          </div>
        </div>
      </div>
    </nav>

    <div class="main">
      <div
        class="alert alert-danger alert-dismissible fade show"
        v-if="this.state.errors.length !== 0"
        role="alert"
      >
        <button type="button" class="close" aria-label="Close" v-on:click="state.errors = []">
          <span aria-hidden="true">×</span>
        </button>
        <div class="alert-message">
          <strong>Alert!</strong>
          <ul>
            <li v-for="error in this.state.errors" v-bind:key="error">{{error}}</li>
          </ul>
        </div>
      </div>

      <main class="container-fluid">
        <div class="row">
          <div class="col">
            <conversation
              v-bind:token="token"
              v-bind:conversation="conversation"
              v-bind:currentUser="currentUser"
              v-bind:contact="contact"
            ></conversation>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import Conversation from "./Conversation.vue";
import Contact from "./Contact.vue";
import ContactFinder from "./ContactFinder.vue";

export default {
  components: {
    conversation: Conversation,
    contact: Contact,
    contactFinder: ContactFinder
  },
  props: {
    token: {
      type: String,
      required: false
    },
    currentUser: {
      type: Object,
      required: false
    },
    userAvatar: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      state: {
        errors: []
      },
      contacts: [],
      contact: {},
      conversation: { id: 0, messages: [] },
      messages: [],
      invites: [],
      email: "",
      password: ""
    };
  },
  methods: {
    showConversation(conversation) {
      if (conversation.status == "invited") {
        return;
      }
      this.contact = conversation.contact;

      this.getRequest(
        "http://localhost:8000/conversation/" + conversation.contact.email
      )
        .then(response => {
          this.conversation = response.body.conversation;
        })
        .catch();
    },
    addContact(contact) {
      this.contacts.push(contact);
    },
    updateContact(contact) {
      if (contact.status == "accepted") {
        this.contacts.push(contact);
      }
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
  created() {
    if (this.token.length === 0) {
      //I need to check seesion storage so that refreshing does not make me log out.
      this.$router.push("/login");
    }

    this.getRequest("http://localhost:8000/contact")
      .then(response => {
        this.contacts = response.body.contacts;
      })
      .catch(response => {
        console.error("something went wrong getting contacts", response);
      });

    this.getRequest("http://localhost:8000/contact/invites")
      .then(response => {
        this.invites = response.body.contacts;
      })
      .catch(response => {
        console.error("something went wrong getting invites", response);
      });
  }
};
</script>

<style scoped>
body {
  background-color: #fff;
}
.chat {
  width: 100%;
  max-width: 45em;
  padding: 15px;
  margin: auto;
  margin-top: 50px;
  background-color: #333;
}

.author {
  text-align: right;
}

.float-left {
  float: left;
}

.float-right {
  float: right;
}

.sidebar,
.sidebar-content {
  background: #262637;
}
.sidebar {
  min-width: 240px;
  max-width: 240px;
  transition: all 0.4s ease-in-out;
}
.sidebar-brand {
  font-weight: 500;
  font-size: 1.15rem;
  padding: 1.15rem 1.25rem;
  color: #f8f9fa;
  display: block;
}
.sidebar-nav {
  padding-bottom: 3.5rem;
  padding-left: 0;
  list-style: none;
}
.sidebar-header {
  background: transparent;
  color: #adb5bd;
  padding: 0.375rem 1.25rem;
  font-size: 0.75rem;
}
.sidebar [data-toggle="collapse"] {
  position: relative;
}
.sidebar-link,
a.sidebar-link {
  display: block;
  padding: 0.75rem 1.25rem;
  color: #ced4da;
  transition: background 0.1s ease-in-out, color 0.1s ease-in-out;
  position: relative;
  text-decoration: none;
}
.sidebar-link:hover {
  background-color: #1a1a29;
}
.sidebar-link .feather,
.sidebar-link svg {
  margin-right: 0.75rem;
  color: #fff;
}

.sidebar-bottom {
  bottom: 0px;
  position: absolute;
  min-width: 240px;
  max-width: 240px;
  border-top: #1a1a29 solid 1px;
}
.main {
  width: 100%;
  min-height: 100vh;
  transition: all 0.4s ease-in-out;
}

.wrapper {
  -ms-flex-align: stretch;
  align-items: stretch;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
}
</style>