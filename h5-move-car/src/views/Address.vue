<template>
  <div class="container">
      <!-- 有添加过地址的情况下 -->
      <div class='address-wrapper'>
          <router-link to="/AddressAll" class='address-empty'  v-if="address&&address.name">
            <!-- <div class='address-full' @click='chooseAddress'> -->
                <div class='address-detail'>
                    <img src='../assets/location.png' class='location' />
                    <div class='address-content'>
                        <div class='address-top'>
                            <span style="font-weight: bolder;margin-right:0.2rem;color: #323336;">{{address.name}}</span>
                            <span style="font-size:0.26rem">{{address.tel}}</span>
                        </div>
                        <div class='address-bottom'>
                            <div class='address-text'>{{address.value  + ' '+ address.detail}}</div>
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
      <!-- <div class="buton" v-if="!xj || xz">立即兑换</div> -->
      <div>
          <div v-if="xj||xz" class="hint">
            <div>温馨提示</div><span>新疆、西藏地区邮费自理</span>
            <div class="buttn">
                <div style="background-color:#fff">运费:  <span>￥15.00</span></div>
                <div>立即支付</div>
            </div>
          </div>
          <div class="buton" v-else>立即兑换</div>
      </div>
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
      }
      this.getAddress();
    },
    methods:{
      getAddress: function() {
        // debugger;
        this.addressList.map(res => {
            this.address = res;
            if(res.value.indexOf("新疆维吾尔") != -1){
              this.xj = res.value;
            }else {
              this.xj = "";
            }
            if(res.value.indexOf("西藏自治区") != -1){
              this.xz = res.value;
            }else {
              this.xz = "";
            }
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
  overflow: hidden;
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
  margin-left:0.22rem;
}
.right-arrow {
  width: 0.14rem;
  height: 0.24rem;
  margin-left: 0.16rem;
}
.buton {
  width: 100%;
  height: 1.02rem;
  background: #F02D1B;
  font-size: 0.36rem;
  color: #fff;
  line-height: 1.02rem;
  position: absolute;
  bottom: 0;
}
/* 有默认地址情况下 */
.address-text {
  font-size: 0.26rem;
  color: #323336;
  vertical-align: center;
  /* background: #fef; */
}
.address-detail {
  display: flex;
  justify-content: space-between;
  /* line-height: 0.26rem; */
   align-items: center;
   vertical-align: middle;
    /* background: #ff0; */
}
.address-content {
  flex: 1;
  /* background: #f0f; */
}
.address-top {
  height: 0.38rem;
  text-align: left;
  line-height: 0.38rem;
  overflow: hidden;
  font-size: 0.3rem;
  margin-top: 0.3rem;
  margin-bottom: 0.1rem;
}
.address-bottom {
  line-height: 0.4rem;
  font-size: 0.26rem;
}
.hint {
  margin-top: 0.4rem;
  display: flex;
  /* justify-content: space-between; */
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
.buttn {
  width: 100%;
  height: 1.02rem;

  font-size: 0.36rem;
  color: #fff;
  line-height: 1.02rem;
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 0;
  left: 0;
}
.buttn>div:first-child{
  width: 60%;
  color: #000;
  font-size: 0.32rem
}
.buttn>div:last-child{
  width: 40%;
  color: #fff;
  font-size: 0.32rem;
  background:  #F02D1B;
}
</style>