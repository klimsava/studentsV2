<template>
  <nav class="teal accent-4">
    <div class="nav-wrapper">
      <router-link to="/" class="brand-logo">IT courses</router-link>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <router-link tag="li" to="/students" exact active-class="active">
          <a href="#">Students</a>
        </router-link>
        <router-link tag="li" to="/courses" exact active-class="active">
          <a href="#">Courses</a>
        </router-link>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style lang="sass" scoped>
  nav
    padding: 0 20px
</style>