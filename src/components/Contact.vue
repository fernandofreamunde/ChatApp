<template>
  <li class="sidebar-item">
    <div class="contact-list-item">{{ contact.email }}</div>
  </li>
</template>

<script>

export default {
  props: {
    contact:{
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
    console.log(this.contact);
  }
}
</script>

<style scoped>
.contact-list-item {
  color: #cecece;
  margin-left:1.5em;
}
</style>