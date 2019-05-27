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
      </div>
    <!-- 有添加过地址的情况下 -->
      <div class='address-wrapper'>
          <router-link to="/Address"  class='address-empty'  v-if="address&&address.name">
            <!-- <div class='address-full' @click='chooseAddress'> -->
                <div class='address-detail'>
                    <img src='../assets/location.png' class='location' />
                    <div class='address-content'>
                        <div class='address-top'>
                            <span style='margin-right:.1rem;font-size:.18rem;font-weight: bold;'>{{address.name}}</span>
                            <span style="font-size:.18rem;font-weight: bold;">{{address.tel.substring(0,3)}} {{address.tel.substring(3,7)}} {{address.tel.substring(7,11)}}</span>
                        </div>
                        <div class='address-bottom'>
                            <div class='address-text'>111{{address.city  + ' '+address.street + ' '+ address.addDetail}}</div>
                        </div>      
                    </div>        
                </div>
                <img src='../assets/right-arrow.png' class='right-arrow' /> 
          </router-link>
            <!-- </div> -->

      <!-- 没有添加过地址的情况下 -->
        
          <router-link to="/AddressDetail"  class='address-empty' v-else>
            <div class='address-empty-left'>
                <img src='../assets/location.png' class='location' />
                <span>暂无收货地址点击添加</span>
            </div>
            <img src='../assets/right-arrow.png' class='right-arrow' />
          </router-link>
           <div style="border-bottom: 0.005rem solid #f2f2f2;width:auto;margin:0 .2rem"></div>
      </div>

      

  </div>
</template>

<script>
  export default {
    name: 'app',
    data() {
      return {
        address: '',
        addressList: []
      }
    },
    mounted() {
      let list = window.localStorage.getItem("addressList");
      //如果有本地缓存
      if(list && JSON.parse(list).length) {
        this.addressList = JSON.parse(list);
      }else{
        //没有本地缓存的时候存储为address：[]
        window.localStorage.setItem("addressList","[]")
      }
      this.getAddress();
    },
    methods:{
      getAddress: function() {
        this.addressList.map(res => {
          if(res.pick) {
            this.address = res;
          }
        })
      }
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

/* 添加地址 */
.right-arrow {
  width: 0.065rem;
  height: 0.115rem;
  margin-left: 0.16rem;
}
.address-empty {
  padding: 0.16rem 0.16rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.address-empty-left {
  display: flex;
  align-items: center;
  font-size: 0.14rem;
}
.location {
  width: 0.145rem;
  height: 0.19rem;
  margin-right: 0.16rem;
}
.right-arrow {
  width: 0.065rem;
  height: 0.115rem;
  margin-left: 0.16rem;
}

</style>

