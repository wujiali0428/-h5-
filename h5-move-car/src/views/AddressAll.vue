<template>
  <div class="container">
      <!-- 有添加过地址的情况下 -->
      <div class='address-wrapper'>
          <router-link to="/AddressAll" class='address-empty'>
            <!-- <div class='address-full' @click='chooseAddress'> -->
                <div class='address-detail'>
                    <img src='../assets/location.png' class='location' />
                    <div class='address-content'>
                        <div class='address-top'>
                            <span style='margin-right:.1rem;font-size:0.3rem;font-weight: bold;color:#323336'>{{address.name}}</span>
                            <span style="font-size:0.26rem;font-weight: bold;color:#9D9EA4">{{address.tel}}</span>
                        </div>
                        <div class='address-bottom'>
                            <div class='address-text'>{{address.value  + ' '+ address.detail}}</div>
                        </div>      
                    </div>
                </div>
                <!-- <img src='../assets/right-arrow.png' class='right-arrow' />  -->
                <div class="ediuts">| 编辑</div>
                
          </router-link>
          
    </div>
    <div class="addAdress">添加新地址</div>
     
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
        addressList: [],
        xj:null,
        xz:null
      }
    },
    mounted() {
      
      let list = window.localStorage.getItem("addressList");
      console.log(list);
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
        // debugger;
        this.addressList.map(res => {
            this.address = res;
            console.log(";;;;"+res);
        })

      },
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
.address-empty {
  padding: 0.16rem 0.16rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-decoration: none;
}
.location {
  width: 0.6rem;
  height: 0.6rem;
  margin-right: 0.22rem;
  margin-left:0.22rem;
}
.right-arrow {
  width: 0.14rem;
  height: 0.24rem;
  margin-left: 0.16rem;
}

.address-text {
  font-size: 0.26rem;
  color: #323336;
  vertical-align: center;
  background: #fef;
}
.address-detail {
  display: flex;
  justify-content: space-between;
   align-items: center;
   vertical-align: middle;
    background: #ff0;
}
.address-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f0f;
}
.address-top {
  line-height: 0.4rem;
}
.address-bottom {
  line-height: 0.4rem;
}
.hint {
  margin-top: 0.4rem;
  display: flex;
  align-items: center;
  margin-left: 0.3rem;
}
.hint>div:first-child {
  width: 0.95rem;
  height: 0.32rem;
  background: #F02D1B;
  padding: 0.1rem;
  font-size: 0.16rem;
  color: #fff;
}
.hint span {
  font-size: 0.26rem;
  margin-left: 0.3rem;
}
.addAdress {
    width: 90%;
    height: 1.02rem;
    background:  #F02D1B;
    margin: 0 auto;
    font-size: 0.36rem;
    color: #fff;
    line-height:1.02rem;
    margin-top: 0.8rem;
}
.ediuts {
    font-size: 0.32rem;
    color: #ccc;
}
</style>
