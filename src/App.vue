<!-- Copyright (c) 2018 by coollsk. All Rights Reserved. -->
<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Sider from "@/components/Sider";
import Header from "@/components/Header";
export default {
  components: {
    Sider,
    Header
  },
  name: "App",
  computed: {
  }
};
</script>

<style>
*{
  padding: 0;
  margin: 0;
  font-size: 14px;
}

html, body {
	height: 100%;
}

  
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* border: 1px solid #d7dde4; */
  position: relative;
  border-radius: 4px;
  height: 100%;
}
  /* 滚动条样式 */
  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    display:block;
    background-color: rgb(221, 219, 219);
  }

  /*定义滚动条轨道 内阴影+圆角*/

  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 4px rgba(221, 216, 216, 0.3);
    border-radius: 5px;
    background-color: #F5F5F5;
  }

  /*定义滑块 内阴影+圆角*/

  ::-webkit-scrollbar-thumb {
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 4px rgba(0, 0, 0, .3);
    background-color: rgb(219, 219, 219);
  }

</style>
