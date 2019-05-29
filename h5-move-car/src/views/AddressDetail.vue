<template>
  <div class="address">
    <div class="input"><label>收货人</label><input type="text" placeholder="收货人姓名" v-model="address.name"/></div>
    <div class="input"><label>手机电话</label><input type="tel" placeholder="配送员联系你的电话" v-model="address.tel"/></div>
    <div class="input" @click="toShow"><label for="adress">所在城市</label><input type="text" id="adress" disabled class="index" placeholder="请选择你所在的城市" :value="address.value"></div>
    <div class="input"><label>详细地址</label><input type="text" placeholder="请输入详细地址" v-model="address.detail"/></div>

    <!-- <div class="result">
      <p>----选择结果----</p>
      <p>{{res}}</p>
    </div> -->
    <div class="button" @click="save">保存</div>
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
// import {createToast} from "mint-ui"
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
      }
    }
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
      addressList.push(this.address);
      let json = JSON.stringify(addressList);
      window.localStorage.setItem("addressList", json);
      this.$router.push('/Address');

      console.log("!!!",addressList)
    }

  }
}
</script>

<style scoped>
.input{
  font-size: 0.5rem;
  display: flex;
  padding : 0.29rem 0 0.29rem 0.3rem;
  border-bottom: 1px solid #EAEAEA;
}

.input>label{
  margin-right: 0.3rem;
  width: 1.3rem;
  font-size: 0.28rem;
  text-align: left;
}

input {
  outline: none;
  background: transparent;
  border: none;
}

::placeholder {
   color: #CED1D7;
   font-size: 0.3rem;
}

.index{
  flex: 1;
  border: 0px;
  font-size: 0.3rem;
  background-color: transparent;
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
  width: 100%;
  height: 1.02rem;
  background: #F02D1B;
  font-size: 0.36rem;
  color: #fff;
  line-height: 1.02rem;
  border-radius: 0.08rem;
  margin-top: 1rem;
}
</style>

