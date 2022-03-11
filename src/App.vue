<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    this.$storage.setItem('age', 29)
  }
}

</script>

<style lang='scss'>
@import './assets/style/index.scss';
@import './assets/style/reset.css';

</style>
