<template>
  <div>
    <!-- <div class="btnbox"> -->
      <!-- <div class="btn" @click="toShow">打开picker</div> -->
    <!-- </div> -->
    <div class="input"><label>收货人</label><input type="text" placeholder="收货人姓名"/></div>
    <div class="input"><label>手机电话</label><input type="tel" placeholder="配送员联系你的电话"/></div>
    <div class="input" @click="toShow"><label for="adress">所在城市</label><input type="text" id="adress" disabled class="index" placeholder="请选择城市" :value="value"></div>
    <div class="input"><label>详细地址</label><input type="text" placeholder="请输入详细地址"/></div>
    <div class="result">
      <p>----选择结果----</p>
      <p>{{res}}</p>
    </div>
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
      value:''
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
      this.value = this.res.select1.text + '-'+this.res.select2.text + '-' + this.res.select3.text
      this.pickData.default = [val.select1, val.select2, val.select3]
    },
    toShow() {
      this.show = true
    }
  }
}
</script>

<style>
.input{
  font-size: 0.5rem;
  display: flex;
}
.input>label{
  margin-right: 0.4rem;
  width: 2rem;
}
.index{
  flex: 1;
  border: 0px;
  font-size: 0.3rem;
  background-color: transparent;
}
.btnbox{
  display: flex;
  justify-content: center;
}
.btn{
  background: #2e68fa;
  color: #fff;
  padding: 5px 10px;
  display: inline-block;
  margin: 0 10px;
  font-size: 14px;
  border-radius: 4px;
}
.result{
  text-align: center;
  padding: 10px;
}
.isCopy{
  margin: 10px;
  border: 1px dashed red;
  text-align: center
}
</style>

