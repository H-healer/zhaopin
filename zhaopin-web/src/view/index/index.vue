<template>
  <div id="app">
    <Top></Top>
    <Search></Search>
    <el-backtop :right="100" :bottom="100" />
  </div>
</template>

<script>
import Top from '@/components/index/top.vue'
import Search from "@/components/index/Search";
export default {
  components: {
    Search,
    Top
  }
}
</script>

<style scoped>

</style>
