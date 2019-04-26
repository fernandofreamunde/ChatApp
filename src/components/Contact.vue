<template>
  <li class="sidebar-item" v-if="state.show">
    <div class="contact-list-item">
      {{ contact.username }}
      <div>
        <small>{{ contact.email }}</small>
        <span
          v-if="info.status == 'invited' && !state.amOwner == false"
          class="badge badge-secondary"
        >Invited</span>
        <span
          v-else-if="info.status == 'rejected' && !state.amOwner == false"
          class="badge badge-danger"
        >Rejected</span>
      </div>
      <div class="constrols" v-if="!state.amOwner">
        <span class="badge badge-pill badge-success clickable" v-on:click="accept">Accept</span>
        <span class="badge badge-pill badge-danger clickable" v-on:click="reject">Reject</span>
      </div>
      <div class="constrols" v-if="state.amOwner && info.status == 'rejected'">
        <span class="badge badge-pill badge-danger clickable" v-on:click="deleteInvite">Delete</span>
      </div>
    </div>
  </li>
</template>

<script>
import Requests from "../mixins/requests.js";

export default {
  props: {
    currentUser: {
      type: Object,
      required: true
    },
    info: {
      type: Object,
      required: true
    },
    owner: {
      type: Object,
      required: true
    },
    token: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      state: {
        errors: [],
        show: true,
        amOwner: false
      },
      contact: {}
    };
  },
  methods: {
    accept() {
      this.updateContact({ status: "accepted" });
      this.postRequest("http://localhost:8000/conversation", {
        contact: this.contact
      });
      this.state.show = false;
    },
    reject() {
      this.updateContact({ status: "rejected" });
      this.state.show = false;
    },
    deleteInvite() {
      const uri = "http://localhost:8000/contact/" + this.info.id;

      this.deleteRequest(uri)
        .then(response => {
          this.$emit("contactdeleted", response.body.contact);
          this.state.show = false;
        })
        .catch(response => {
          console.error("something went wrong deleting contact", response);
        });
    },
    updateContact(data) {
      const uri = "http://localhost:8000/contact/" + this.info.id;

      this.putRequest(uri, data)
        .then(response => {
          this.$emit("contactUpdated", response.body.contact);
        })
        .catch(response => {
          console.error("something went wrong updating contact", response);
        });
    }
  },
  created() {
    this.state.amOwner = this.owner.email == this.currentUser.email;
    this.contact = this.info.owner;
    if (this.state.amOwner) {
      this.contact = this.info.contact;
    }
    console.log("SOME INFO FO YU");
    console.log(this.info);
  },
  mixins: [Requests]
};
</script>

<style scoped>
.contact-list-item {
  color: #cecece;
  margin-left: 1.5em;
}

.sidebar-item {
  margin-bottom: 5px;
}

.sidebar-item:hover {
  background-color: #1a1a29;
}

.clickable {
  cursor: pointer;
}
</style>