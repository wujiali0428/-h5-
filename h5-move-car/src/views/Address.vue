<template>
  <div class="container">
    <!-- <div class="address-wrapper" v-if="!!list.length">
      <div class="address-cell" v-for="(item, index) in list" :key="index">
          <img v-if="item.pick" src="../assets/address-didi.png" class="address-pick"  @click="pickAddress(index)">
          <img v-else src="../assets/circle_empty.png" class="address-pick" @click="pickAddress(index)">

          <div class="address-content" @click="pickAddress(index)">
            <span style="font-size:.15rem;font-weight:bold;margin-bottom:.1rem;color:#000">{{item.name}} {{item.tel.substring(0,3)}} {{item.tel.substring(3,7)}} {{item.tel.substring(7,11)}}</span>
            <span style="font-size:.13rem;color:rgba(0,0,0,0.84);line-height:.20rem">{{item.city + ' ' +item.street + ' ' + item.addDetail}}</span>
          </div>
          <span class="address-edit" @click="editAddress(index)" >编辑</span>
      </div>
    </div>
    <div style="min-height:40px;"></div>
    <mt-button type="default" class="add-address-btn" @click="goAddAddress">新增收货地址</mt-button> -->
    <h3>这是address页面</h3>
</div>
</template>
<script>
//   export default {
//   name: 'about',
//   components: {
//     About
//   }
// }
export default {
  name: 'Address',
  props: {
    msg: String
  }
}
</script>

