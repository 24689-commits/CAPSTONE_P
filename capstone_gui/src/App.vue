<template>
  <div id="app">
    <NavBar />
      <router-view />
    <FooterComp />
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';
import FooterComp from './components/FooterComp.vue';

export default {
  components: {
    NavBar,
    FooterComp
  }
}
</script>

<style scoped>

</style>