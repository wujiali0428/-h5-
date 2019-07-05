<template>
    <div class="picker">
      <mt-cell title="所在城市:" :class="areaString=='请选择'?' ':'black'" v-model="areaString" is-link @click.native="handlerArea"></mt-cell>
      <div class="pxborder"></div>
      <mt-cell title="选择街道:" :class="streetString=='请选择'?' ':'black'" v-model="streetString" is-link @click.native="handlerStreet"></mt-cell>
      <mt-popup v-model="areaVisible" class="area-class" position="bottom">
        <mt-picker :slots="slots" @change="onValuesChange" showToolbar >
           <span class="mint-datetime-action mint-datetime-cancel third"
                     @click="areaVisible = false">{{ cancelText }}</span>
            <span class="mint-datetime-action mint-datetime-confirm third " @click="confirm1">{{ confirmText }}</span>
        </mt-picker>
      </mt-popup>
      <mt-popup v-model="streetVisible" class="area-class" position="bottom">
        <mt-picker :slots="slotstree" @change="onStreeChange" showToolbar>
           <span class="mint-datetime-action mint-datetime-cancel third" @click="streetVisible = false">{{ cancelText }}</span>
                <span class="mint-datetime-action mint-datetime-confirm third" @click="confirm2">{{ confirmText }}</span>
        </mt-picker>
      </mt-popup>
    </div>
</template>

<script>
// 导入数据
import { Toast } from 'mint-ui';
import data from '../assets/data.json'
let index = 0
let index2 = 0
let index3 = 0
// 初始化省
let province = data.map(res => {
  return res.name
})
// 初始化市
let city = data[index].childs.map(res => {
  return res.name
})
// 初始化区
let area = data[index].childs[index2].childs.map(res => {
  return res.name
})
// 初始化街
let street = data[index].childs[index2].childs[index3].childs.map(res => {
  return res.name
})
export default {
  name: 'index',
  data() {
    return {
      input1:'',
      input2:'',
      cityList:[],
      areaVisible: false,
      streetVisible: false,
      areaString:'请选择',
      streetString:'请选择',
      slots: [{
        flex: 1,
        values: province,
        className: 'slot1',
        textAlign: 'left'
      }, {
        divider: true,
        content: '-',
        className: 'slot2'
      }, {
        flex: 1,
        values: city,
        className: 'slot3',
        textAlign: 'left'
      }, {
        divider: true,
        content: '-',
        className: 'slot4'
      }, {
        flex: 1,
        values: area,
        className: 'slot5',
        textAlign: 'left'
      }],
      slotstree: [{
        flex: 1,
        values: street,
        className: 'slot1',
        textAlign: 'center'
      }]
    }
  },
  props: {
    areaStringDefault: {
        type: String,
        default: '请选择'
      },
      streetStringDefault: {
        type: String,
        default: '请选择'
      },
       list: {
        type: Array,
      },
      cancelText: {
        type: String,
        default: '取消'
      },
      confirmText: {
        type: String,
        default: '确定'
      },
        visibleItemCount: {
            type: Number,
            default: 7
        },
      value : {
        type : Boolean,
        defualt : false
      }
    },
     watch:{
      areaStringDefault:function(){
        this.areaString = this.areaStringDefault;
        this.streetString = this.streetStringDefault;
      },
      streetStringDefault:function(){
        this.areaString = this.areaStringDefault;
        this.streetString = this.streetStringDefault;
      },
       list:function(){
        let streetList = data[this.list[0]].childs[this.list[1]].childs[this.list[2]].childs.map(res => {
        return res.name
      })
      this.slotstree = [{
        flex: 1,
        values: streetList,
        className: 'slot1',
        textAlign: 'center'
      }]
      }
    },
    mounted(){
        this.slots = [{
        flex: 1,
        values: province,
        className: 'slot1',
        textAlign: 'left'
      }, {
        divider: true,
        content: '-',
        className: 'slot2'
      }, {
        flex: 1,
        values: city,
        className: 'slot3',
        textAlign: 'left'
      }, {
        divider: true,
        content: '-',
        className: 'slot4'
      }, {
        flex: 1,
        values: area,
        className: 'slot5',
        textAlign: 'left'
      }];
      // 初始化街
      let streetList = data[this.list[0]].childs[this.list[1]].childs[this.list[2]].childs.map(res => {
        return res.name
      })
      this.slotstree = [{
        flex: 1,
        values: streetList,
        className: 'slot1',
        textAlign: 'center'
      }]
    },
  methods: {
    confirm1 () {
      this.areaVisible = false;
      this.areaString = this.input1;
      // this.input2 = '';
      this.streetString = '请选择';
      this.$emit('confirm', this.areaString , this.streetString,this.cityList);
    },
    confirm2 () {
      this.streetVisible = false;
      this.streetString = this.input2;
      this.$emit('confirm', this.areaString , this.streetString,this.cityList);
    },
    handlerArea() {
      this.areaVisible = true
    },
    handlerStreet() {
      if(this.areaString!='请选择'){
        if (this.slotstree[0].values.length === 0) {
          this.streetString = '无可选街道'
          return
        }
        this.streetVisible = true
     }else{
        const toast = this.$createToast({
          txt: '请先选择城市',
          type: 'error',
          time: 3000,
        })
        toast.show()
     }
     
    },
    onValuesChange(picker, values) {
     
      let one = values[0]
      let two = values[1]
      let three = values[2]
      index = province.indexOf(one)
       
      if (index >= 0 && province.length > 0) {
        city = data[index].childs.map(res => {
          return res.name
        })
        picker.setSlotValues(1, city)
        two = values[1]
      }

      index2 = city.indexOf(two)
      if (index2 >= 0 && city.length > 0) {
        area = data[index].childs[index2].childs.map(res => {
          return res.name
        })
        picker.setSlotValues(2, area)
        three = values[2]
      }
      index3 = area.indexOf(three)
      if (index >= 0 && index2 >= 0 && index3 >= 0) {
        street = data[index].childs[index2].childs[index3].childs.map(res => {
          return res.name
        })
        this.slotstree[0].values = street
      }

      if (index2 === -1 || index3 === -1) {
        this.streetString = '请选择'
      }
      this.input1 = values.join(',')
      this.cityList = [index,index2,index3]
      // this.$emit('confirm', this.areaString , this.streetString);
    },
    onStreeChange(picker, values) {
      this.input2 = values[0]
      // this.$emit('confirm', this.areaString , this.streetString);

    }
  }
}
</script>
<style>
.area-class {
  width: 100%;
  /* height: 30%; */
}
.third {
  width: 30%;
}
.picker .mint-cell-title{
    width: 105px!important;
    flex: none!important;
}

.picker .black .mint-cell-value {
  color: #000!important;
}
.picker-item {
    text-align: center;
}

</style>
