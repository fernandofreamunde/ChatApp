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
    this.state.isAuthor = this.message.author == "me";
    console.log(this.message);
    //content
    //author
    //timestamp
  }
}
</script>

<style scoped>

.author {
  text-align: right;
}
</style>