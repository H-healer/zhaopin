<template>
  <div class="Nav">
    <el-carousel :interval="4000" type="card" height="350px">
      <!-- 轮播图 -->
      <el-carousel-item v-for="(image, index) in imglist" :key="index">
        <el-image :src="getCompanyImg(image)"/>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data(){
    return{
      imglist: [ "01.png", "02.jpg", "03.jpg", "04.jpg"]
    }
  },
  methods:{
    getCompanyImg(name){
      return require("@/assets/image/company/" + name);
    }
  }
}
</script>
