<template>
    <div class="contact-finder">
        <input class="contact-query" v-on:keyup.enter="search" type="text" v-model="searchEmail" placeholder="contact email">
    </div>
</template>

<script>
export default {
  data () {
    return {
      searchEmail:''
    }
  },
  methods:{
    search:function(){
      //query be if email exist and is not a contact yet
      //if it is then emit event and clear textbox
      this.$emit('searchEmail', this.searchEmail);
      this.searchEmail = '';
    }
  }
}
</script>

<style scoped>
.contact-finder {
  margin-left: 1.5em;
}
.contact-query {
  background:none; 
  border:none;
  color:#ced4da;
}
</style>
