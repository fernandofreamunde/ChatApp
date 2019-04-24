<template>
      <div v-bind:class="{ author: this.state.isAuthor }" class="card">
          <div class="card-body">
            {{ message.content }}
          </div>
      </div>
</template>

<script>

export default {
  props: {
    message:{
        type:Object,
        required:true
    },
    currentUserEmail:{
        type:String,
        required:true
    },
  },
  data () {
    return {
      state: {
        errors: [],
      },
    }
  },
  methods:{
  },
  created() {
    this.state.isAuthor = this.message.author.email == this.currentUserEmail;
  }
}
</script>

<style scoped>

.author {
  text-align: right;
}
</style>