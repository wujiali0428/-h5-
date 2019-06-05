<template>
  <div class="container">
      <div class='address-wrapper'>
          <div class='address-empty' v-for="(address,index) in addressList" :key="index">
                <div class='address-detail' @click='queryAddress({address,index})'>
                    <div class='location'>{{address.name.substring(0,1)}}</div>
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
                <div class="ediuts" @click="queryEdiuts({address,index})">编辑</div>
          </div>
      </div>
      <!-- <div class="empty" v-else>
        <div>暂无地址</div>
      </div> -->
    <!-- <router-link to="/AddressDetail"> -->
      <div class="addAdress" @click="newAddress">添加新地址</div>
    <!-- </router-link> -->
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
        addressList: [],
        xj:null,
        xz:null,
        timer: 0,
        startTimer: 0,
      }
    },
    created(){
      if(!window.localStorage.getItem("newConversion")){
        this.$router.push('/');
      }
    },
    mounted() {
      document.getElementById('title').innerHTML = this.$route.name
      let list = window.localStorage.getItem("addressList");
      console.log(list);
      //如果有本地缓存
      if(list && JSON.parse(list).length) {
        this.addressList = JSON.parse(list);
      }
    },
    methods:{
      queryEdiuts(data) {
        window.localStorage.setItem("queryEdiuts",JSON.stringify(data));
        window.localStorage.setItem("newAddress","0");
        
        this.$router.push('/AddressDetail');
      },
      queryAddress(data){
        console.log(data);
        window.localStorage.setItem("queryAddress",JSON.stringify(data));
        this.$router.push('/Address');
      },
      newAddress(){
        window.localStorage.setItem("newAddress","1");
        this.$router.push('/AddressDetail')
      },
    }
  }

</script>
<style scoped>
/* 添加地址 */
.container{
  user-select: none;
  overflow: hidden;
}
.address-wrapper {
  width: 6.9rem;
  border-radius: 0.08rem;
  box-shadow: 0 0.04rem 0.08rem #EFEFEF;
  margin: 0 auto;
  line-height: 1.3rem;
  margin-top: 0.5rem;
}
.address-empty {
  padding: 0.16rem 0.16rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-decoration: none;
  margin-bottom: 0.2rem;
  background-color: #fff;
   -webkit-touch-callout:none; /*系统默认菜单被禁用*/
  -webkit-user-select:none; /*webkit浏览器*/
  -khtml-user-select:none; /*早期浏览器*/
  -moz-user-select:none;/*火狐*/
  -ms-user-select:none; /*IE10*/
  user-select:none;
}
.location {
  width: 0.6rem;
  height: 0.6rem;
  margin:0 0.2rem;
  background-color: #b7b8bf;
  border-radius: 50%;
  font-size: 0.3rem;
  color: #fcfbff;
  line-height: 0.6rem;
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
}
.address-detail {
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  vertical-align: middle;
  padding-right: 0.2rem;
}
.address-content {
  flex: 1;
  text-align: left;
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
    font-size: 0.26rem;
    color: #9D9EA4;
    line-height: 0.46rem;
    border-left: 1px solid #9D9EA4; 
    padding-left: 0.2rem;
}
/* .empty {
  font-size: 0.3rem;
  width: 100%;
  height: 80%;
  margin: 0 auto;
  vertical-align: center;
  background: #f0f;
}
.empty>div {
  padding: 65% 0;
} */
</style>
