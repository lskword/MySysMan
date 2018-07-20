<template>
    <el-container >
      <el-aside width="200px">
        <Sider></Sider>
      </el-aside>
      <el-container>
        <el-header>
          <Header></Header>
        </el-header>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
</template>

<script>
import Sider from "@/components/Sider";
import Header from "@/components/Header";
export default {
  components: {
    Sider,
    Header
  },
    created () {
        
    }
}
</script>

<style >
    .el-header{
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    height: 100%;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  .el-container,
  .el-menu {
    /* margin-bottom: 40px; */
    height: 100%;
  }
</style>
