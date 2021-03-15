<template>
  <div class="registration-wrapper">
    <form class="registration-form">
      <div class="form-group form-group-registration">
        <label for="name">Name:</label>
        <input
            type="text"
            class="form-control"
            id="name"
            aria-describedby="nameHelp"
            placeholder="Enter name"
            data-required="name"
            data-invalid-message="Please provide valid name">
      </div>
      <div class="form-group form-group-registration">
        <label for="last_name">Last name:</label>
        <input
            type="text"
            class="form-control"
            id="last_name"
            aria-describedby="lastNameHelp"
            placeholder="Enter last name"
            data-required="last_name"
            data-invalid-message="Please provide valid last name">
      </div>
      <div class="form-group form-group-registration">
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
      <div class="form-group form-group-registration">
        <label for="phone">Phone:</label>
        <input
            type="phone"
            class="form-control"
            id="phone"
            aria-describedby="phoneHelp"
            placeholder="Enter phone"
            data-required="phone"
            data-invalid-message="Please provide valid phone">
      </div>
      <div class="form-group form-group-registration">
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
      <div class="form-group form-group-registration">
        <label for="confirm_password">Confirm password:</label>
        <input
            type="password"
            class="form-control"
            id="confirm_password"
            aria-describedby="repeatPasswordHelp"
            placeholder="Confirm Password"
            data-required="confirm-password"
            data-invalid-message="Please provide valid confirm password">
      </div>
      <button type="submit" class="border-none padding-2 margin-2 font-18 border-radius btn btn-primary">Register</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "registration"
}
</script>

<style lang="scss">
.registration-wrapper {
  margin-top: 50px;
}
.registration-form {
  background: rgba(#61c85b, 0.1);
  border-radius: $radius*8;
  padding: $padding*6 $padding*2;
}
.form-group-registration {
  label {
    &:after {
      content: '*' !important;
      margin: 0 0 0 10px;
      color: #e85319;
    }
  }
}
.btn-primary {
  width: 150px;
  margin-top: 50px;
}
</style>