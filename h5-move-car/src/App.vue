<template>
  <div id="app">
    <!-- <div class="nav"> -->
      <!-- <div class="return" @click="returnClick"></div> -->
      <!-- <h4>{{this.$route.name?this.$route.name:'码上挪车'}}</h4> -->
    <!-- </div> -->
    <router-view/>
  </div>
</template>
<script>
  export default {
    data(){
      return{

      }
    },
    methods:{
      // returnClick(){
        // window.history.back()
        // this.$router.go(-1)
      // }
    }
  }
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
  user-select: none;
}
.nav{
  height: 0.88rem;
  background-color: #fff;
  overflow: hidden;
  line-height: 0.88rem;
  border-bottom: 0.01rem solid #EAEAEA;
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
  text-align: center;
  /* color :#000; */
  font-weight: bold;
}
</style>
