<template>
  <div class="m-header">
    <div class="_left">
      <img src="" alt="" class="logo fn-left">
      <span class="_t">校本数据统计管理平台</span>
    </div>
    <el-menu
      class="nav-menu"
      mode="horizontal"
      background-color="#F1493D"
      text-color="#fff"
      active-text-color="#fff">
      <el-submenu index="2">
        <template slot="title">
          <img class="avatar" src="" alt="">
          admin
        </template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: 'mHeader'
  }
</script>

<style lang="scss" scoped>
@import '~@style/_index.scss';
.m-header{
  margin-left: -20px;
  margin-right: -20px;
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  background-color: $color-primary;
  color: #ffffff;
  .logo{
    display: inline-block;
    width: 150px;
    height: 50px;
    background: $color-gray;
  }
  ._t{
    font-size: 3rem;
  }
}
</style>
