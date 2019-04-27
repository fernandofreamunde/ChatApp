<template>
  <div v-bind:class="{ author: this.state.isAuthor }" class="card">
    <div class="card-body">
      <span v-bind:class="[this.state.isAuthor ? 'float-left' : 'float-right']" class="faint"><small>{{message.createdAt}}</small></span>
      {{ message.content }}
      </div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: Object,
      required: true
    },
    currentUserEmail: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      state: {
        isAuthor: false,
        errors: []
      }
    };
  },
  methods: {},
  created() {
    this.state.isAuthor = this.message.author.email == this.currentUserEmail;
  }
};
</script>

<style scoped>
.author {
  text-align: right;
  background-color: #eee;
}

.float-right {
  text-align: right;
}

.float-left {
  text-align: left;
}

.faint {
  color: #b9b9b9;
}
</style>