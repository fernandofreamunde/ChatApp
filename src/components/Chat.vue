<template>
<div class="wrapper">
  <nav class="sidebar">
    <div class="sidebar-content ">
      <a class="sidebar-brand" href="index.html">
        <span class="align-middle">Bunq Chat</span>
      </a>

      <ul class="sidebar-nav">
          <li class="sidebar-header">
              Contacts
          </li>
          <contact v-for="contact in contacts"
          v-bind:key="contact.id"
          v-bind:contact="contact"
          v-on:click.native="showConversation(contact.conversation)"></contact>

          <li class="sidebar-header">
              add contact
          </li>
          <contactFinder></contactFinder>

      </ul>

    </div>
  </nav>
    
  <div class="main">
    <div class="alert alert-danger alert-dismissible fade show" v-if="this.state.errors.length !== 0" role="alert">
      <button type="button" class="close" aria-label="Close" v-on:click="state.errors = []">
        <span aria-hidden="true">×</span>
      </button>
      <div class="alert-message">
        <strong>Alert!</strong> 
        <ul>
          <li v-for="error in this.state.errors"
          v-bind:key="error">{{error}}</li>
        </ul>
      </div>
    </div>

     <main class="container-fluid">
        <div class="row">
          <div class="col">
            <conversation></conversation>
            <messageInput></messageInput>
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
import MessageInput from "./MessageInput.vue";

export default {
  components:{
      'conversation':Conversation,
      'contact':Contact,
      'contactFinder':ContactFinder,
      'messageInput':MessageInput,
  },
  data () {
    return {
      state: {
        errors: [],
      },
      contacts:[
        {
          id: 1,
          email:'some-email@place.com',
          conversation:234,
        },
        {
          id: 2,
          email:'someemail@place.com',
          conversation:234,
        },
        {
          id: 3,
          email:'email@place.com',
          conversation:234,
        },
      ],
      conversation:[
        {
          id: 1,
          contacts:[],
        },
        {
          id: 2,
          contacts:['someemail@place.com'],
        },
        {
          id: 3,
          contacts:['email@place.com','someemail@place.com'],
        },
      ],
      invites:[
        {
          id: 1,
          email:'ssssss',
          accepted:false,
        },
        {
          id: 2,
          email:'aaaaa',
          accepted:false,
        },
        {
          id: 3,
          email:'asdd',
          accepted:false,
        },
      ],
      email:'',
      password:'',
    }
  },
  methods:{
    showConversation(conversation) {
      //load conversation based on this contact
      console.log(conversation);
    }
  },
  created() {
    console.log(this.contacts);
  }
}
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

.sidebar, .sidebar-content {
    background: #262637;
}
.sidebar {
    min-width: 240px;
    max-width: 240px;
    transition: all .4s ease-in-out;
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
    padding: .375rem 1.25rem;
    font-size: .75rem;
}
.sidebar [data-toggle=collapse] {
    position: relative;
}
.sidebar-link, a.sidebar-link {
    display: block;
    padding: .75rem 1.25rem;
    color: #ced4da;
    transition: background .1s ease-in-out,color .1s ease-in-out;
    position: relative;
    text-decoration: none;
}
.sidebar-link:hover{
    background-color: #1a1a29;
}
.sidebar-link .feather, .sidebar-link svg {
    margin-right: .75rem;
    color: #fff;
}

.main {
    width: 100%;
    min-height: 100vh;
    transition: all .4s ease-in-out;
}

.wrapper {
    -ms-flex-align: stretch;
    align-items: stretch;
    display: -ms-flexbox;
    display: flex;
    width: 100%;
}

</style>