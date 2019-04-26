<template>
  <div class="contact-finder">
    <div class="error-report" v-if="this.state.errors.length > 0">{{this.state.errors}}</div>
    <div class="success" v-if="this.state.success.length > 0">{{this.state.errors}}</div>
    <input
      class="contact-query"
      v-on:keyup.enter="search"
      type="text"
      v-model="searchEmail"
      placeholder="contact email"
    >
  </div>
</template>

<script>
import Requests from "../mixins/requests.js";

export default {
  props: {
    token: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      state: {
        errors: "",
        success: ""
      },
      searchEmail: ""
    };
  },
  methods: {
    // Doesnt really search, only adds check later
    search: function() {
      this.state.errors = "";
      if (this.searchEmail.length < 3) {
        return;
      }

      this.postRequest("http://localhost:8000/contact", {
        email: this.searchEmail
      })
        .then(response => {
          this.state.success = response.body.message;
          this.$emit("contactInvited", response.body.contact);
        })
        .catch(response => {
          this.state.errors = response.body.error;
          console.error(response.body);
        });

      this.$emit("searchEmail", this.searchEmail);
      this.searchEmail = "";
    }
  },
  mixins:[Requests]
};
</script>

<style scoped>
.contact-finder {
  margin-left: 1.5em;
}
.contact-query {
  background: none;
  border: none;
  color: #ced4da;
}

.error-report {
  color: #ff8686;
}

.success {
  color: #8aff86;
}
</style>
