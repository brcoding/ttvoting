<template>
  <div id="app">
    <img alt="Tavern Tales Features" width="250" src="./assets/ttlogo.png">
    <FeaturesList/>
  </div>
</template>

<script>

import FeaturesList from './components/FeaturesList.vue'

export default {
  name: 'App',
  components: {
    FeaturesList
  }
}
</script>

<style>
#app {
  font-family: 'Montserrat', sans-serif;
  font-size: 130%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #f5f5f5;
  margin-top: 60px;
}
</style>
