<template>
  <div id="app">
    <div class="nav">
      <div class="return"></div>
      <h4>马上挪车</h4>
    </div>
    <router-view/>
  </div>
</template>
<script>

</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  background-color: #F8F8F8;
}
.nav{
  height: 0.88rem;
  background-color: #fff;
  overflow: hidden;
  line-height: 0.88rem;
}
.return{
  width: 0.88rem;
  height: 0.88rem;
  background:url('./assets/return.png') no-repeat center center;
  float: left;
  cursor: pointer;
  background-size: 0.24rem 0.45rem;
}
.nav>h4{
  padding-right: 0.88rem;
  font-size: 0.36rem;
  font-weight: bold;
}
</style>
