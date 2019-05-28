<template>
  <div id="body">
    <div id="nav">
        <img src="./../assets/banner.png">
         <div class="content">
        <div><input type="text" placeholder="请输入兑换码" value="" v-model="text"/></div>
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
  export default {
    name: 'app',
    data() {
      return {
        text: ''
      }
    },
    mounted() {
     
    },
    methods:{
      conversion() {
          let reg=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{12}$/;
          if(!reg.test(this.text)){
              alert("请输入正确的兑换码!")
              return;
          }
          this.$router.push('/Address');
      }
    }
  }
</script>
<style scoped>
#body{
  background: #4512C2;
}

#nav {
  width: 100%;
  position: relative;
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
  color: #BCBDD1;
  padding-left: 0.28rem;
}

.content button {
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

/* 兑换说明 */
.explain {
  width: 90%;
  height: 5.14rem;
  background: #3204A2;
  border-radius: 12px;
  margin: 0 auto;
  position: relative;
  top: -1rem;
}

.explain h3 {
  font-size: 0.3rem;
  color: #B89EF9;
  padding-top: 0.3rem;
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

