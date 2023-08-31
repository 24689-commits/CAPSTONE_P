<template>
  <div id="app">
    <NavBar />
    <main>
      <router-view />
    </main>
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
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex-grow: 1;
}
.footer {
  background-color: rgb(178, 173, 173);
  text-align: center;
  padding: 1rem;

}
</style>