<template>
  <div class="address">
    <div class="input"><div>收货人</div><input type="text" placeholder="收货人姓名" v-model="address.name"/></div>
    <div class="input"><div>联系电话</div><input type="tel" placeholder="配送员联系你的电话" v-model="address.tel" maxlength="11"/></div>
    <div class="input" @click="toShow"><div>所在城市</div><input type="text" id="adress" disabled class="index" placeholder="请选择你所在的城市" :value="address.value"></div>
    <div class="input"><div>详细地址</div><input type="text" placeholder="请输入详细地址" v-model="address.detail"/></div>
    <div class="button" @click="save">保存</div>
    <div class="editus" v-if="editus" @click="deleteAddress">删除</div>
    <vue-pickers
      :show="show"
      :link="link"
      :columns="columns"
      :selectData="pickData"
      @cancel="close"
      @confirm="confirmFn"></vue-pickers>
  </div>
</template>

<script>
import vuePickers from 'vue-pickers'
import {provs_data, citys_data, dists_data} from 'vue-pickers/lib/areaData'
import { Toast } from 'mint-ui';

export default {
  components: {
    vuePickers
  },
  data() {
    return {
      isCopy: '',
      res: null,
      show: false,
      columns: 3,
      link: true,
      pickData: {
        data1: provs_data,
        data2: citys_data,
        data3: dists_data
      },
      address: {
          name: '',
          tel: '',
          city:'',
          detail:'',
          value:'',
      },
      editus:false,
      index:-1
    }
  },
  created(){
    console.log(window.localStorage.getItem("newConversion"))
    if(!window.localStorage.getItem("newConversion")){
        this.$router.push('/');
    }
    if(window.localStorage.getItem("newAddress")==0 && window.localStorage.getItem("queryEdiuts")){
      this.editus = true;
      let data = JSON.parse(window.localStorage.getItem("queryEdiuts"))
      this.address = data.address
      this.index = data.index
    }else {
      this.editus = false;
    }
  },
  mounted(){
    document.getElementById('title').innerHTML = this.$route.name
  },
  methods: {
    close() {
      this.show = false
    },
    confirmFn(val) {
      this.show = false
      console.log(val)
      this.res = val
      this.address.value = this.res.select1.text + '-'+this.res.select2.text + '-' + this.res.select3.text
      this.pickData.default = [val.select1, val.select2, val.select3]
    },
    toShow() {
      this.show = true
    },
    //点击保存
    save() {
        if (!this.address.name) {
          Toast({
              message: '请输入收货人姓名',
              duration: 3000
          });
          return;
        }
      let reg = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
      if (!reg.test(this.address.tel)) {
        Toast({
            message: '请输入正确手机号',
            duration: 3000
          })
        return;
      }
      if (!this.address.value || this.address.value == "请选择你所在的城市") {
        Toast({
            message: '请选择城市',
            duration: 3000
          })
        return;
      }
      if (!this.address.detail) {
        Toast({
          message: '请输入详细地址',
          duration: 3000
        })
        return;
      }
      let old = window.localStorage.getItem("addressList",json);
      let addressList = JSON.parse(old);
      if(old && JSON.parse(old).length) {
          addressList = JSON.parse(old);
      } else {
        addressList = [];
      }
      if(this.index != -1){
        addressList[this.index] = this.address
      }else{
        addressList.push(this.address);
      }
      let json = JSON.stringify(addressList);
      window.localStorage.setItem("addressList", json);
      this.$router.replace('/AddressAll');
      this.$router.go(-1)
    },
    //点击删除
    deleteAddress() {
        let old = window.localStorage.getItem("addressList",json);
        let addressList = JSON.parse(old);
        addressList.splice(this.index,1)
        let json = JSON.stringify(addressList);
        window.localStorage.setItem("addressList", json);
        window.localStorage.setItem("queryAddress","")
        window.localStorage.setItem("queryEdiuts","")
        this.$router.replace('/AddressAll');
        this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.address {
    background: #fff;
}
.input{
  font-size: 0.28rem;
  display: flex;
  padding : 0.29rem 0 0.29rem 0.3rem;
  height: 0.6rem;
  border-bottom: 1px solid #EAEAEA;
}

.input>div{
  margin-right: 0.3rem;
  width: 1.3rem;
  height: 0.6rem;
  line-height: 0.6rem;
  font-size: 0.28rem;
  text-align: left;
}

input {
  width: 3.5rem;
  outline: none;
  background: transparent;
  border: none;
  font-size: 0.3rem;
  color: rgb(84, 84, 84);
  -webkit-appearance:none;
  outline:none;
  background:none;
  padding: 0;
  margin: 0;
}

::placeholder {
  color: rgb(84, 84, 84);
  font-size: 0.28rem;
  padding: 0;
}

.index{
  flex: 1;
  border: 0px;
  font-size: 0.28rem;
  background-color: transparent;
}
.index:disabled{  
    color:rgb(84, 84, 84);
    opacity: 1;
    -webkit-text-fill-color: rgb(84, 84, 84);
}

.result{
  text-align: center;
  padding: 10px;
}

.isCopy{
  margin: 10px;
  text-align: center
}

.button {
  width: 90%;
  height: 1.02rem;
  background: #F02D1B;
  margin: 0 auto;
  font-size: 0.36rem;
  color: #fff;
  line-height: 1.02rem;
  border-radius: 0.08rem;
  margin-top: 1rem;
  
}
.editus{
    width: 90%;
  height: 1.02rem;
  /* background: #F02D1B; */
  border: 0.01rem solid #F02D1B;
  margin: 0 auto;
  font-size: 0.36rem;
  color: #F02D1B;
  line-height: 1.02rem;
  border-radius: 0.08rem;
  margin-top: 0.5rem;
}
</style>

