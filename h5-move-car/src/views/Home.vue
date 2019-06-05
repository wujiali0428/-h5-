<template>
  <div id="body">
    <div id="nav">
        <img src="./../assets/banner.png">
        <div class="content">
          <div><input type="text" placeholder="请输入兑换码" value="" v-model="text"/></div>
          <div><input placeholder="请输入手机号码" v-model="userMobile" type="number" @change="mobileRels"/></div>
          <div class="mobileAuthCode"><input placeholder="请输入验证码" v-model="mobileAuthCode" type="text"/><button @click="getAuthCode
          " :disabled="disabled">{{theCountdown}}</button></div>
          <button @click="conversion">立即兑换</button>
        </div>
    </div>
    <div class="explain">
        <h3>兑换说明</h3>
        <div>
          <span>1、兑换码格式为12位数字和字母的组合</span>
          <span>2、务必确认邮寄地址是否正确，避免出现邮寄不到的情况，挪车贴包邮范围：除西藏、新疆地区外（西藏、新疆地区邮费自理）；</span>
          <span>3、收到挪车贴后，请支付宝或微信扫码绑定手机激活，有效期从激活日开始计算；</span>
          <span>4、挪车二维码同时只能绑定一辆车，如需更换车辆，可以扫描正面二维码进行换绑操作，换绑无次数限制；</span>
          <span>5、如有任何问题，请联系客服400-000-1199。</span>
        </div>
    </div>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui';
  import axios from 'axios';

  export default {
    name: 'app',
    data() {
      return {
        text: '',
        userMobile:"",
        mobileAuthCode:"",
        disabled:false,
        theCountdown: "获取验证码",
        
      }
    },
    methods:{
      conversion() {
          let reg=/^(?![0-9]+$)(?![A-Z]+$)[0-9A-Z]{12}$/;
          if(!reg.test(this.text)){
              Toast({
                message: '请输入正确的兑换码!',
                duration: 3000
              })
              return;
          }
          if(!this.userMobile){
              Toast({
                message: '请输入手机号!',
                duration: 3000
              })
                return;
          }
          if(!this.mobileAuthCode){
              Toast({
                message: '请输入验证码!',
                duration: 3000
              })
              return;
          }
          axios({
                  url:'/v5/user/login',
                  method: 'post',
                  data:"tel=" + this.userMobile + "&code=" + this.mobileAuthCode,
                  headers:{'Content-Type':'application/x-www-form-urlencoded',"cache-contral":'no-cache'}
            }).then((res)=>{
              let token = res.data.data.Token
              window.localStorage.setItem("token",token)
              // console.log(token)
              axios({
                url:'/v5/nc/key/check',
                method: 'post',
                
                data:'access_token=' + token + "&code_key=" + this.text,
              }).then((res)=>{
                console.log("res",res);
                if(res.data.code>0) {
                  Toast({
                    message: res.data.msg,
                     duration: 3000
                  })
                  return;
                }
                if(res.data.code==0){
                  
                  this.$router.push('/Address');
                  window.localStorage.setItem("newConversion",this.text) //存兑换码
                }else{
                  Toast({
                    message: res.data.message,
                    duration: 3000
                  })
                }
              }).catch((err)=>{
                console.log("error",err)
                Toast({
                  message: '兑换码已失效！',
                  duration: 3000
                })
              })
            }).catch((res)=>{
              console.log(res)
              Toast({
                message: '登陆失败请重试!',
                duration: 3000
              })
            })
      },
      getAuthCode(){
            let reg = /(^[1][1,2,3,4,5,6,7,8,9][0-9]{9}$)/
            if(this.userMobile=="") {
              Toast({
                message: '请输入手机号!',
                duration: 3000
              })
              return;
            }
            if(reg.test(this.userMobile) !== true){
                Toast({
                message: '请输入正确的手机号!',
                duration: 3000
              })
              return;
            }else{
                this.disabled = true;
                this.countdown({
                    second:60,
                    millisec: 1000,
                    onChange:(second)=>{
                        this.theCountdown = second + "s";
                    },
                    onEnd:()=>{
                        this.disabled = false;
                        this.theCountdown = "重新获取"
                    }
                })
            }
            axios({
                  url:'/v5/user/code',
                  method: 'post',
                  data:"tel=" + this.userMobile,
                  headers:{'Content-Type':'application/x-www-form-urlencoded',"cache-contral":'no-cache'}
            }).then((res)=>{
              console.log("res",res);
              if(res.data.code>0) {
                Toast({
                      message: res.data.data,
                      duration: 3000
                  })
                  return;
              }else{
                 Toast({
                      message: "发送成功",
                      duration: 3000
                  })
              }
              
            }).catch((err)=>{
              console.log('err',err)
            })
        },
        mobileRels(){
            let reg = /^\d{1,11}$/
            if(reg.test(this.userMobile) !== true){
                this.$message.warning('手机号码格式有误');
                return
            }
        },
        countdown(options){
          var second = options.second;
          var millisec = options.millisec || 1000;
          //定时器调用前调用
          options.onBefore && options.onBefore(options);
          var timer = setInterval(() => {
              if(second<=0){
                  //end
                  clearInterval(timer);
                  options.onEnd && options.onEnd();
              }else{
                  //onchange
                  second--;
                  options.onChange && options.onChange(second)
              }
          }, millisec);
        }
    }
  }
</script>
<style scoped>
#body{
  background: #4512C2;
  padding-bottom: 0.5rem;
}

#nav {
  width: 100%;
  height: 13.5rem;
  position: relative;
  /* overflow: hidden; */
}


#nav img{
  width: 100%;
  vertical-align: middle;
}

.content{
  width: 100%;
  margin: 0 auto;
  font-size: 0.3rem;
  position: absolute;
  top: 7.64rem;
}
.content input {
  height: 1rem;
  width: 5.22rem;
  font-size: 0.34rem;
  letter-spacing: 0.015rem;
  color: #000;
  padding-left: 0.28rem;
  border: 0;
  border-radius: 0.1rem;
}

.content>button {
  height: 1rem;
  width: 5.5rem;
  background: #F02D1B;
  border: none;
  color: #fff;
  line-height: 1rem;
  text-align: center;
  margin-top: 0.4rem;
  font-size: 0.36rem;
}
.content>div{
  margin-top: 0.3rem
}
.mobileAuthCode{
  display: flex;
  width: 5.5rem;
  height: 1rem;
  margin: 0 auto;
  border-radius: 0.1rem;
  -webkit-border-radius: 0.1rem;
  overflow: hidden;
}
.mobileAuthCode>button{
  width: 2.2rem;
  height: 100%;
  background: #fff;
  color: #ff6420;
  border: 0;
  padding: 0;
  /* padding-right: 0.2rem; */
  outline: none;
  font-size: 0.32rem;
}
.mobileAuthCode>input{
  flex: 1;
  height: 100%;
  width: 0;
  border-radius: 0rem;
}
/* 兑换说明 */
.explain {
  width: 90%;
  height: 5.14rem;
  background: #3204A2;
  border-radius: 12px;
  margin: 0 auto;
  /* position: relative; */
  top: -1rem;
}

.explain h3 {
  font-size: 0.3rem;
  color: #B89EF9;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
}

.explain>div {
  width: 90%;
  margin: 0 auto;
  text-align: left;
}

.explain span {
  font-size: 0.26rem;
  color: #B89EF9;
  line-height: 0.26rem;
  display: block;
  line-height: 0.37rem
}



</style>

