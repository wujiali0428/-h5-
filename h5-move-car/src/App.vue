<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
      <img src="./assets/banner.png">

    </div>
    <div class="content">
        <div>11111</div>
        <h4>4444</h4>
    </div>
    <router-link to="/Address">输入地址</router-link>
    <router-view/>
    <!-- <div class="aaa" @click="gotoBuycode">输入地址</div> -->
    <!-- <Address /> -->
    <!-- <router-view/> -->
  </div>
</template>
<script>
  import Address from './views/Address.vue'
  export default {
    name: 'app',
    components: {
      Address
    },
    methods:{

      // gotoBuycode() {
      //   console.log("ddd");
      //   this.$router.push({
      //     path: "/Address",
          
      //   })
        
      // }
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  width: 100%;
  
}

#nav img{
  width: 100%;
  vertical-align: middle;
}

/* #nav a.router-link-exact-active {
  color: #42b983;
} */
.content{
  width: 90%;
  height: 10rem;
  background: #f0f;
  margin: 0 auto;
  font-size: 0.3rem;
  position: relative;
  top: -2rem;
}
.aaa {
  font-size: 0.5rem;
  width: 50%;
  margin: 0 auto;
  background: #ff0;
}
</style>
