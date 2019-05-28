<template>
  <div class="container">
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
           <!-- <div style="border-bottom: 0.005rem solid #f2f2f2;width:auto;margin:0 .2rem"></div> -->
      </div>

      <div class="button">立即兑换</div>
    <!-- <h3>这是address页面</h3> -->
</div>
</template>
<script>
export default {
    name: 'Address',
    props: {
      msg: String
    },
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
    }
  }

</script>
<style scoped>
/* 添加地址 */
body {
  background: #F8F9FA;
}
.address-wrapper {
  width: 6.9rem;
  height: 1.54rem;
  background: #fff;
  border-radius: 0.08rem;
  /* border: 1px solid #000; */
  box-shadow: 0 0.04rem 0.08rem #EFEFEF;
  margin: 0 auto;
  line-height: 1.3rem;
  margin-top: 0.3rem;
}
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
  text-decoration: none;
}
.address-empty-left {
  display: flex;
  align-items: center;
  font-size: 0.3rem;
  color: #000;
}
.location {
  width: 0.6rem;
  height: 0.6rem;
  margin-right: 0.22rem;
}
.right-arrow {
  width: 0.14rem;
  height: 0.24rem;
  margin-left: 0.16rem;
}
.button {
  width: 100%;
  height: 1.02rem;
  background: #F02D1B;
  font-size: 0.36rem;
  color: #fff;
  line-height: 1.02rem;
  position: absolute;
  bottom: 0;
}
</style>