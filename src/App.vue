<template>
  <el-container id="app">
    <el-scrollbar>
      <el-aside width="150px">
        <SideBar></SideBar>
      </el-aside>
    </el-scrollbar>
    <el-main>
      <router-view class="contain"></router-view>
    </el-main>
  </el-container>
</template>

<script>
import SideBar from './components/SideBar';
export default {
    name: 'App',
    components: { SideBar },
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
<style>
#app {
  display: flex;
  flex: 1;
  flex-direction: row;
  height: 100%;
}
.contain {
  display: flex;
  flex: 1;
}
.el-scrollbar__wrap {
  overflow-x: hidden;
  background-color: rgb(218, 185, 106);
}
</style>
