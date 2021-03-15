<template>
<div class="login-wrapper">
  <h1>Authorization</h1>
  <form class="login-form">
    <div class="form-group form-group-login">
      <label for="email">Email:</label>
      <input
          type="email"
          class="form-control"
          id="email"
          aria-describedby="emailHelp"
          placeholder="Enter Email"
          data-required="email"
          data-invalid-message="Please provide valid email">
    </div>
    <div class="form-group form-group-login">
      <label for="password">Password:</label>
      <input
          type="password"
          class="form-control"
          id="password"
          aria-describedby="passwordHelp"
          placeholder="Enter password"
          data-required="password"
          data-invalid-message="Please provide valid password">
    </div>
    <button type="submit" class="border-none padding-2 border-radius font-18 bold-600 btn btn-log">Log in</button>
  </form>
</div>
</template>

<script>
export default {
  name: "log-in"
}
</script>

<style lang="scss">

.login-wrapper {
  h1 {
    color: $light;
  }
}

.login-form {
  margin: 50px auto;
  width: 600px;
}
.form-group-login {
  label {
    text-align: left !important;
    min-width: 100px !important;
  }
}

.btn-log{
  width: 110px;
  margin-top: 40px;
}

</style>