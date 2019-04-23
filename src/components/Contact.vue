<template>
  <li class="sidebar-item" v-if="state.show">
    <div class="contact-list-item">{{ contact.username }} 
      <div>
        <small>{{ contact.email }}</small> 
        <span v-if="status == 'invited' && isInvite == false" class="badge badge-secondary">Invited</span>
        <span v-else-if="status == 'rejected' && isInvite == false" class="badge badge-danger">Rejected</span>
      </div>
      <div class="constrols" v-if="isInvite">
        <span class="badge badge-pill badge-success clickable" v-on:click="accept">Accept</span>
        <span class="badge badge-pill badge-danger clickable" v-on:click="reject">Reject</span>
      </div>
      <div class="constrols" v-if="!isInvite && status == 'rejected'">
        <span class="badge badge-pill badge-danger clickable" v-on:click="deleteInvite">Delete</span>
      </div>
    </div>
  </li>
</template>

<script>

export default {
  props: {
    contact:{
        type:Object,
        required:true
    },
    isInvite:{
        type:Boolean,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    id:{
        type:Number,
        required:true
    },
    token:{
      type:String,
      required:false
    },
  },
  data () {
    return {
      state: {
        errors: [],
        show:true,
      },
    }
  },
  methods:{
    accept() {
      this.updateContact({status:'accepted'});
      this.state.show = false;
    },
    reject() {
      this.updateContact({status:'rejected'});
      this.state.show = false;
    },
    deleteInvite() {
      const uri = 'http://localhost:8000/contact/'+this.id;

      this.deleteRequest(uri)
      .then(response => {
        this.$emit('contactdeleted', response.body.contact);
        this.state.show = false;
      })
      .catch(response => {
        console.error('something went wrong deleting contact', response);
      });

    },
    updateContact(data) {

      const uri = 'http://localhost:8000/contact/'+this.id;

      this.putRequest(uri, data)
      .then(response => {
        this.$emit('contactUpdated', response.body.contact);
      })
      .catch(response => {
        console.error('something went wrong updating contact', response);
      });
    },
    putRequest(uri, data) {

      let headers = {
        'Content-Type': 'application/json'
      };

      if(this.token !== '') {
        headers['Authorization'] = "Bearer " + this.token
      }

      return this.$http.put(uri, data, {headers});
    },
    deleteRequest(uri) {

      let headers = {
        'Content-Type': 'application/json'
      };

      if(this.token !== '') {
        headers['Authorization'] = "Bearer " + this.token
      }

      return this.$http.delete(uri, {headers});
    }
  }
}
</script>

<style scoped>
.contact-list-item {
  color: #cecece;
  margin-left:1.5em;
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