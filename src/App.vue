<template>
  <div id="app">
    <user />
  </div>
</template>

<script>
  import user from './components/user'

export default {
  name: 'App',
  components: {
    user
  }
}
</script>

<style>
  #app {
    margin: 15px;
    font-family: Arial, sans-serif;
  }
  .add-user {
    margin-top: 15px;
  }
</style>
