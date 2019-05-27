<template>
  <div>
    <div id="nav">
        <!-- <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> -->
        <img src="./../assets/banner.png">

      </div>
      <div class="content">
          <div>11111</div>
          <h4>4444</h4>
          <router-link to="/Address">输入地址</router-link>
      </div>
  </div>
</template>

<script>
  export default {
    name: 'app',
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
<style scoped>
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

