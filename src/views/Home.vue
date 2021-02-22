<template>
  <div class="wrapper">
    <router-link tag="div" to="/courses" exact active-class="active">
      <vCard title="Courses" numberCards="1" @click="$router.push({name: 'Courses'})"/>
    </router-link>
    <router-link tag="div" to="/students" exact active-class="active">
      <vCard title="Students" numberCards="2" @click="$router.push({name: 'Students'})"/>
    </router-link>
  </div>
</template>

<script>
import vCard from './../components/v-card';

export default {
  name: 'Home',
  components: {
    vCard,
  }
}
</script>

<style lang="sass" scoped>
.wrapper
  width: 100%
  display: flex
  justify-content: space-between
  align-items: center
</style>
