<template>
  <div class="form-signin">
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
            
    <h1 class="h3 mb-3 font-weight-normal">Welcome to BunqChat.</h1>
    <label for="inputEmail" class="sr-only">Email address</label>
    <input v-model="email" type="email" name="email"  class="form-control" placeholder="me@some-provider.com" required autofocus>
    <input v-model="emailConfirm" type="email" name="email-confirm"  class="form-control" placeholder="me@some-provider.com" required>

    <label for="pasword" class="sr-only">Password</label>
    <input v-model="password" type="password" name="password" class="form-control" placeholder="Password" required>
    <input v-model="passwordConfirm" type="password" name="password-confirm" class="form-control" placeholder="Password" required>

    <button class="btn btn-lg btn-primary btn-block" v-on:click="register">
        Sign up
    </button>

  </div>
</template>

<script>
export default {
  data () {
    return {
      state: {
        errors: [],
      },
      email:'',
      password:'',
      emailConfirm:'',
      passwordConfirm:'',
    }
  },
  methods:{
    register: function(){
      this.state.errors = [];
      if (this.email !== this.emailConfirm) {
        this.state.errors.push('email confirmation failed!');
      }

      if (this.password !== this.passwordConfirm) {
        this.state.errors.push('password confirmation failed!');
      }
        
      console.log(this.email);
      console.log(this.password);
      console.log(this.emailConfirm);
      console.log(this.passwordConfirm);
      console.log(this.state);
    
      console.log('post this to BE');
    }
  }
}
</script>

<style scoped>
body {
    background-color: #fff;
}
.form-signin {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: auto;
    margin-top: 50px;
}
.form-signin .checkbox {
    font-weight: 400;
}
.form-signin .form-control {
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
}
.form-signin .form-control:focus {
    z-index: 2;
}
.form-signin input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    margin-bottom: 10px;
}
.form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}
</style>