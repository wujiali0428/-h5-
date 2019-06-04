<template>
  <div class="container">
      
      <div class='address-wrapper'>
        <!-- 有添加过地址的情况下 -->
          <router-link to="/AddressAll" class='address-empty'  v-if="address&&address.name">
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
           <!-- 没有添加过地址的情况下 -->
          <router-link to="/AddressDetail"  class='address-empty' v-else>
            <div class='address-empty-left'>
                <img src='../assets/location.png' class='location' />
                <span>暂无收货地址点击添加</span>
            </div>
            <img src='../assets/right-arrow.png' class='right-arrow' />
          </router-link>
      </div>
      <!-- 新疆西藏地区邮费问题 -->
      <div>
          <div v-if="xj||xz" class="hint">
            <div>温馨提示</div><span>新疆、西藏地区邮费自理</span>
            <div class="buttn" v-if="aplay">
                <div style="background-color:#fff">运费:  <span style="color:#F02C1C;font-size:0.3rem">￥15.00</span></div>
                <div @click="payment">立即支付</div>
            </div>
            <div class="method" v-else>
              <div class="method-title"><p style="flex:1;padding-left:0.3rem;">请选择支付方式</p><div @click="choosePay"><img src="./../assets/cancel.png" alt=""></div></div>
              <div class="alipay" @click="alipay"><div style="width:0.8rem;"><img src="./../assets/alipay.png" alt=""></div><div><p>支付宝</p><p>数亿用户都在用，安全可托付</p></div></div>
              <div class="wxpay"  @click="wxpay"><div style="width:0.8rem;"><img src="./../assets/wxpay.png" alt=""></div><div><p>微信支付</p></div></div>
            </div>
          </div>
          <div class="buton" v-else @click="conversion">立即兑换</div>
      </div>
</div>
</template>
<script>
import { Toast,Indicator } from 'mint-ui';
import axios from 'axios';
export default {
    name: 'Address',
    props: {
      msg: String
    },
    data() {
      return {
        address: '',  //所有用户地址信息
        addressList: [],
        xj:null,    //判断是否是新疆地区
        xz:null,     //判断是否是西藏地区
        aplay:true,
        token: '',
        oldconversion:''
      }
    },
    created() {
      if(!window.localStorage.getItem("newConversion")){
        this.$router.push('/');
      }
      if(window.localStorage.getItem('token')){
        this.token = window.localStorage.getItem('token')
      }
      // console.log(this.token)
      if(window.localStorage.getItem("queryAddress")){
        let data = JSON.parse(window.localStorage.getItem("queryAddress"))
        this.getAddress(data.address);
      }else{
        let list = window.localStorage.getItem("addressList");
        console.log(list);
        //如果有本地缓存
        if(list && JSON.parse(list).length) {
          this.addressList = JSON.parse(list);
        }
        this.addressList.map(res => {
          this.getAddress(res);
        })
      }
    },
    mounted(){
      if(window.localStorage.getItem("order_id")){
        console.log("chaxundingdan")
        Indicator.open("订单状态查询中");
        let numberQuery = 0
        window.timer = window.setInterval(()=>{
          numberQuery++;
          if(numberQuery>20){
            window.clearInterval(window.timer);
            Indicator.close();
            Toast({
              message: "查询失败",
              duration: 3000
            })
            this.$router.push('/');
          }
          axios({
              url:'/v5/nc/order/pay_status',
              method: 'post',
              data:"order_id=" + window.localStorage.getItem("order_id"),
              headers:{'Content-Type':'application/x-www-form-urlencoded',"cache-contral":'no-cache'}
          }).then((res)=>{
              if(res){
                window.clearInterval(window.timer);
                Indicator.close();
                window.localStorage.removeItem("order_id");
                Toast({
                  message: "订单已完成",
                  duration: 3000
                })
                this.$router.push('/');
              }
          }).catch(()=>{

          })
        },1000)
      }
    },
    methods:{
      getAddress: function(res) {
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

      },
      choosePay(){
        this.aplay = true;
      },
      //点击立即支付
      payment() {
        this.aplay = false
      },
      //点击立即兑换
      conversion() {
        if(this.address==="") {
          Toast({
            message: '请输入收货地址',
            duration: 3000
          })
          return;
        }
        if(window.localStorage.getItem("oldConversion") == window.localStorage.getItem("newConversion")){
          Toast({
            message: '您已经兑换过了！',
            duration: 3000
          })
          return;
        }
        if (this.address && this.address.tel) {
          let data = {
          access_token: this.token,
          num: 1,
          tel: this.address.tel,
          name: this.address.name,
          addr:this.address.value + " " +this.address.detail,
          channel: 114  
          }
         axios.post('v5/nc/order/new',data).then((res)=>{
           if(res.data.code>0) {
             Toast({
                 message: res.data.msg,
                 duration: 3000
               })
               return
            }
            axios({
              url:'/v5/nc/order/pay_by_key',    
              method: 'post',
              data:"order_id=" + res.data.data.Id + "&code_key=" + window.localStorage.getItem("newConversion") + "&access_token=" + window.localStorage.getItem("token"),
              headers:{'Content-Type':'application/x-www-form-urlencoded',"cache-contral":'no-cache'}
            }).then((res)=>{
               if(res.data.code===0) {
               Toast({
                 message: '兑换成功',
                 duration: 3000
               })
                this.$router.push('/');

                }else{
                  Toast({
                    message: res.data.msg,
                    duration: 3000
                  })
                }
            })
           
           
            this.oldconversion = window.localStorage.getItem("newConversion")
            window.localStorage.setItem("oldConversion",this.oldconversion)
            console.log(res)

          }).catch((res)=>{
            console.log(res);
            // if(res.code> 0){
            //   Toast({
            //     message: res.msg,
            //     duration: 3000
            //   })
            // }
          })
        }
      },
      alipay(){
        console.log(this.address);
        axios({
              url:'/v5/nc/order/new',
              method: 'post',
              data:"num=1&tel=" + this.address.tel + '&name=' + this.address.name + "&addr=" + this.address.value + this.address.detail + "&channel=ali_h5&access_token=" + window.localStorage.getItem('token'),
              headers:{'Content-Type':'application/x-www-form-urlencoded',"cache-contral":'no-cache'}
        }).then((res)=>{
          if(res.data.code>0){
            Toast({
                message: res.data.msg,
                duration: 3000
            })
            return;
          }
          window.localStorage.setItem("order_id",res.data.data.Id);
          axios({
              url:'/v5/nc/order/pay_by_key',
              method: 'post',
              data:"order_id=" + res.data.data.Id + "&code_key=" + window.localStorage.getItem("newConversion") + "&access_token=" + window.localStorage.getItem("token"),
              headers:{'Content-Type':'application/x-www-form-urlencoded',"cache-contral":'no-cache'}
          }).then((res)=>{
            if(res.data.data.order_status === 0) {
                Indicator.open({
                  // text: 'Loading...',
                  spinnerType: 'fading-circle' 
                })
                axios({
                  url: '/v5/nc/order/pay',
                  method: 'post',
                  data: "order_id="+res.data.data.order_id + "&access_token="+window.localStorage.getItem("token")+"&pay_method=ali_h5",
                  headers:{'Content-Type':'application/x-www-form-urlencoded',"cache-contral":'no-cache'}
                }).then((res)=>{
                  // console.log("aaaaaa",res)
                  if(res.data.code>0) {
                    Indicator.close();
                    Toast({
                      message: res.data.msg,
                      duration: 3000
                    })
                    return;
                  }
                  if (res.data && res.data.data.qr_code) {
                    Indicator.close();
                    window.location.href=res.data.qr_code
                  }
                }).catch((err)=>{
                  console.log(err)
                })
             }
          }).catch((err)=>{
            console.log(err);
          })
        }).catch((res)=>{
          console.log('ali',res);
        })

      },
      wxpay(){
        axios({
              url:'/v5/nc/order/new',
              method: 'post',
              data:"num=1&tel=" + this.address.tel + '&name=' + this.address.name + "&addr=" + this.address.value + this.address.detail + "&channel=wechat_h5&access_token=" + window.localStorage.getItem('token'),
              headers:{'Content-Type':'application/x-www-form-urlencoded',"cache-contral":'no-cache'}
        }).then((res)=>{
          if(res.data.code>0){
            Toast({
                message: res.data.msg,
                duration: 3000
            })
            return;
          }
          window.localStorage.setItem("order_id",res.data.data.Id);
          axios({
              url:'/v5/nc/order/pay_by_key',    
              method: 'post',
              data:"order_id=" + res.data.data.Id + "&code_key=" + window.localStorage.getItem("newConversion") + "&access_token=" + window.localStorage.getItem("token"),
              headers:{'Content-Type':'application/x-www-form-urlencoded',"cache-contral":'no-cache'}
          }).then((res)=>{
            if(res.data.data.order_status === 0) {
               Indicator.open({
                  // text: 'Loading...',
                  spinnerType: 'fading-circle'
                })
                axios({
                  url: '/v5/nc/order/pay',
                  method: 'post',
                  data: "order_id="+res.data.data.order_id + "&access_token="+window.localStorage.getItem("token")+"&pay_method=wechat_h5",
                  headers:{'Content-Type':'application/x-www-form-urlencoded',"cache-contral":'no-cache'}
                }).then((res)=>{
                  if(res.data.code>0) {
                    Indicator.close();
                    Toast({
                      message: res.data.msg,
                      duration: 3000
                    })
                    return;
                  }
                  if (res.data && res.data.data.MwebUrl) {
                    Indicator.close();
                    window.location.href=res.data.MwebUrl
                    console.log(res.data.data.MwebUrl)
                  }
                }).catch((err)=>{
                  console.log(err)
                })
             }
            
          }).catch((err)=>{
            console.log(err);
          })
        }).catch((res)=>{
          console.log("weixin",res);
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
  background: #fff;
  border-radius: 0.08rem;
  box-shadow: 0 0.04rem 0.08rem #EFEFEF;
  margin: 0 auto;
  line-height: 1.3rem;
  margin-top: 0.3rem;
  text-align: left;
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
}
.address-detail {
  display: flex;
  justify-content: space-between;
  align-items: center;
  vertical-align: middle;
}
.address-content {
  flex: 1;
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
  padding-bottom: 0.2rem;
}
.hint {
  margin-top: 0.4rem;
  display: flex;
  align-items: center;
  margin-left: 0.35rem;
}
.hint>div:first-child {
  height: 0.32rem;
  background: linear-gradient(148deg, #FF9067, #F56B38);
  padding: 0.05rem;
  font-size: 0.2rem;
  color: #fff;
  border-radius: 0.08rem;
}
.hint span {
  font-size: 0.26rem;
  margin-left: 0.3rem;
  color: #9C9EA8;
}
.buttn {
  width: 100%;
  height: 1.01rem;
  border-top: 0.01rem solid #EAEAEA;
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
  width: 50%;
  color: #000;
  font-size: 0.32rem
}
.buttn>div:last-child{
  width: 50%;
  color: #fff;
  font-size: 0.32rem;
  background:  #F02D1B;
}
.method {
  width: 100%;
  /* height: 3.6rem; */
  font-size: 0.3rem;
  background: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
}
.method>div:first-child {
  font-weight: bold;
}
.method>div {
  height: 1.2rem;
  text-align: center;
  line-height: 1.2rem;
  border-bottom: 0.01rem solid #f0f0f0;
}

.method-title{
  display: flex;
  padding: 0 0.3rem;
}
.method-title>div>img{
  width: 0.3rem;
  height: 0.3rem;
}
.alipay{
  display: flex;
  padding: 0.2rem 0.4rem;
}
.alipay>div>img{
  width: 100%;
  padding-top: 0.2rem;
  /* vertical-align: middle; */
}
.alipay>div:last-child{
  padding-top: 0.2rem;
  padding-left: 0.3rem;
  text-align: left;
  line-height: 0.4rem;
}
.alipay>div:last-child>p:last-child{
  font-size: 0.25rem;
  color: #666;
}

.wxpay{
  display: flex;
  padding: 0.2rem 0.4rem;
}
.wxpay>div>img{
  width: 100%;
  padding-top: 0.2rem;
  /* vertical-align: middle; */
}
.wxpay>div:last-child{
  padding-left: 0.3rem;
  text-align: left;
  line-height: 0.4rem;
}
.wxpay>div:last-child>p{
  line-height: 1.2rem;
}
</style>