<template>
  <div id="app">
    <Navbar/>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';

export default {
  name: 'App',
  components: {
    Navbar,
  },
}
</script>

<style lang="scss">
@import '~materialize-css/dist/css/materialize.min.css';
@import "~vue2-timepicker/dist/VueTimepicker.css";
</style>
