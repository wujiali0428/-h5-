<template>
    <div class="container">
        <div class="address-detail-wrapper">
            <div class="address-detail-field">
                <mt-field label="收货人" placeholder="收货人姓名" v-model="addressDetail.name"></mt-field>
                <div class="pxborder"></div>
                <mt-field label="手机电话" placeholder="配送员联系你的电话" v-model="addressDetail.tel" :attr="{ maxlength: 11 }"></mt-field>
                <div class="pxborder"></div>
                <div @click="showAddressPicker">
                  <mt-cell class="addr" title="所在城市"> 
                    <span v-if="addressDetail.city">{{addressDetail.city}}</span>
                    <div  v-if="!addressDetail.city" style="flex:1">
                      <span style="color:rgba(0,0,0,0.3) !important;flex:1">请选择所在城市</span>
                    </div>
                      <img v-if="!addressDetail.city" src='../assets/right-arrow.png' class='right-arrow' />
                  </mt-cell>
                </div>
                <div class="pxborder"></div>
                <mt-field label="详细地址" placeholder="请输入详细的街道地址" @input="changeLine" id="text"  type="textarea" :rows="line+''" v-model="addressDetail.addDetail" class="noborder"></mt-field>
            </div>
        </div>
            <mt-button type="default" class="address-btn" size="large" @click="confirmAddress">{{checkDetail ? '确认' : '添加收货地址'}}</mt-button>
            <mt-button v-if="checkDetail" type="default" class="address-btn address-btn-delete" size="large" @click="deleteAddress">删除地址</mt-button>
        

    </div>
</template>
<script>
import store from "../store";
// import addressPicker from "../components/addressPicker";
import addicker from "../components/addPicker";
import { provinceList, cityList, areaList } from '../util/area'

const addressData = provinceList

addressData.forEach(province => {
  province.children = cityList[province.value]
  province.children.forEach(city => {
    city.children = areaList[city.value]
  })
})
import { Toast } from "mint-ui";
export default {
  components: {
    // "address-picker": addressPicker,
    "add-picker": addicker
  },
  data() {
    return {
      line: 1,
      addressDetail: {
        name: "",
        tel: "",
        addDetail: "",
        city: "",
        pick: false,
        street: "",
        cityList: [0, 0, 0]
      },
      tel: "",
      showPicker: false,
      checkDetail: false,
      currentIndex: "",
      addr: '',
    };
  },
  computed: {
    user: function() {
      return store.getters.user;
    }
  },
  mounted() {
    this.addressPicker = this.$createCascadePicker({
      title: '选择城市',
      data: addressData,
      onSelect: this.selectHandle,
      onCancel: this.cancelHandle
    })
    if (this.$route.query && this.$route.query.index) {
      let index = this.$route.query.index;
      this.currentIndex = index;
      let list = window.localStorage.getItem("addressList");
      let currentAddress = JSON.parse(list)[index];
      this.addressDetail.city = currentAddress.city;
      this.addressDetail.street = currentAddress.street;
      this.addressDetail.name = currentAddress.name;
      this.addressDetail.tel = currentAddress.tel;
      this.addressDetail.cityList = currentAddress.cityList;
      this.addressDetail.addDetail = currentAddress.addDetail;

      this.addressDetail.pick = currentAddress.pick;

      this.checkDetail = true;
    } else {
      this.checkDetail = false;
    }
  },
  methods: {
    changeLine() {
      var text = document.querySelector("textarea");
      if (text.scrollHeight <= 48) {
        text.style.height = "auto";
        text.style.height = text.scrollHeight + "px";
      } else {
        text.style.height = "48px";
      }
    },
    handleConfirm: function(res, res2, res3) {
      this.addressDetail.city = res;
      this.addressDetail.street = res2;
      this.addressDetail.cityList = res3;
      console.log(res3);
    },
    isShowPicker: function() {
      this.showPicker = !this.showPicker;
    },
    deleteAddress: function() {
      let index = this.$route.query.index;
      let old = window.localStorage.getItem("addressList", json);
      let addressList = JSON.parse(old);
      let arr = addressList.filter((item, i) => {
        return i != index;
      });
      arr.forEach(res => {
        res.pick = false;
      });
      let json = JSON.stringify(arr);
      window.localStorage.setItem("addressList", json);
      const toast = this.$createToast({
        txt: '删除成功',
        type: 'correct',
        time: 3000,
      })
      toast.show()
              

      this.$router.go(-1);
    },
    confirmAddress: function() {
      if (!this.addressDetail.name) {
        const toast = this.$createToast({
            txt: '请输入收货人姓名',
            type: 'error',
            time: 3000,
          })
        toast.show()
        return;
      }
      let tel = this.addressDetail.tel 
      let reg = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
      if (!reg.test(tel)) {
        const toast = this.$createToast({
            txt: '请输入正确的手机号',
            type: 'error',
            time: 3000,
          })
        toast.show()
        return;
      }
      if (!this.addressDetail.city || this.addressDetail.city == "请选择") {
        const toast = this.$createToast({
            txt: '请选择城市',
            type: 'error',
            time: 3000,
          })
        toast.show()
        return;
      }
      // if (!this.addressDetail.street || this.addressDetail.street == "请选择") {
      //   Toast({
      //     message: "请选择街道",
      //     position: "middle",
      //     duration: 3000
      //   });
      //   return;
      // }
      if (!this.addressDetail.addDetail) {
        const toast = this.$createToast({
            txt: '请输入详细地址',
            type: 'error',
            time: 3000,
          })
        toast.show()
        return;
      }
      this.addressDetail.tel = tel;

      let old = window.localStorage.getItem("addressList", json);
      // let addressList = store.getters.addressList
      let addressList = JSON.parse(old);
      if (old && JSON.parse(old).length) {
        addressList = JSON.parse(old);
      } else {
        addressList = [];
      }
      if (this.checkDetail) {
        addressList.splice(this.currentIndex, 1, this.addressDetail);
        const toast = this.$createToast({
            txt: '修改成功',
            type: 'correct',
            time: 3000,
          })
        toast.show()
      } else {
        addressList.push(this.addressDetail);
        const toast = this.$createToast({
            txt: '添加成功',
            type: 'correct',
            time: 3000,
          })
        toast.show()
      }

      addressList.map(res => {
        res.pick = false;
      });
      let json = JSON.stringify(addressList);
      window.localStorage.setItem("addressList", json);
      this.$router.push({
          path: "/Address"
        });
    },
    //滴滴城市
    showAddressPicker() {
      this.addressPicker.show()
    },
    selectHandle(selectedVal, selectedIndex, selectedText) {
      console.log(selectedVal,selectedIndex,selectedText)
      this.addressDetail.city = selectedText[0] + ',' + selectedText[1]  + ',' + selectedText[2]
    },
    cancelHandle() {
      // this.$createToast({
      //   type: 'correct',
      //   txt: 'Picker canceled',
      //   time: 1000
      // }).show()
    }
  }
};
</script>
<style scoped>
.container {
  width: 100%;
}
.address-detail-wrapper {
  background: #fff;
  box-sizing: border-box;
}

.address-detail-field {
  padding: 0 0.15rem;
}

.address-btn {
  width: 90%;
  /* background-image: linear-gradient(-149deg, #fe534f 0%, #ff8361 100%); */
  background:#FC9153;
  border-radius: 0.02rem;
  color: #fff;
  font-size: 0.14rem;
  margin: 0.5rem 0.15rem 0;
  height: 0.46rem;
}
.address-btn-delete {
  /* background: transparent; */
  background: #fff;
  color: #333;
  margin: 0.2rem 0.15rem 0;
  border-color: rgba(0,0,0,0.3);
}

.btn-wrapper {
  display: flex;
  justify-content: center;
}
.noborder {
  border-bottom: none;
}
.mint-cell:last-child {
  background: none;
}
.right-arrow {
  width: 0.065rem;
  height: 0.115rem;
}

</style>
<style>
.mint-cell-value span{
  color:rgba(0,0,0,0.84) !important;
}
.address-detail-field .mint-cell-title{
    width: 87.5px!important;
    flex: none!important;
}
.addr .mint-cell-value {
  flex:1;
}
.mint-cell-text {
  color: rgba(0,0,0,0.84)
}
.mint-cell-wrapper {
  /* height: .48px; */
  padding-left:0;
  padding-right:0;
}
</style>
