<template>
  <el-container id="app">
    <el-aside width="151px" class="sidebar-container">
      <el-scrollbar style="height:100%">
        <SideBar />
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-header class="elHeader">
        <Header />
      </el-header>
      <el-scrollbar style="height:100%">
        <el-main class="main">
          <router-view class="mainContain"></router-view>
        </el-main>
      </el-scrollbar>
    </el-container>
  </el-container>
</template>

<script>
import SideBar from './components/SideBar';
import Header from './components/Header';
export default {
    name: 'App',
    components: { Header, SideBar },
    created () {
        this.$router.replace('/');
        // 在页面加载时读取sessionStorage里的状态信息
        if (sessionStorage.getItem('store')) {
            this.$store.replaceState(
                Object.assign(
                    {},
                    this.$store.state,
                    JSON.parse(sessionStorage.getItem('store'))
                )
            );
        }

        // 在页面刷新时将vuex里的信息保存到sessionStorage里
        window.addEventListener('beforeunload', () => {
            sessionStorage.setItem('store', JSON.stringify(this.$store.state));
        });
    }
};
</script>
<style lang="scss">
@import "./assets/scss/baseAttribute.scss";
#app {
  display: flex;
  flex: 1;
  flex-direction: row;
  height: 100%;
}
.main {
  margin: 0;
  padding: 0;
  overflow: hidden;
}
.el-scrollbar__wrap {
  overflow-x: hidden;
  margin-bottom: 0px !important;
}
.elHeader {
  background-color: $color-background-d;
  display: flex;
}
.sidebar-container {
  overflow: hidden;
  background-color: $color-background;
}
</style>
