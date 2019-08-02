<template>
  <div class="contain">
    <PageTitle label="资料详情" />
    <h1 class="title">{{data.title}}</h1>
    <p class="desc">
      <span style="marginLeft:40px"></span>
      {{data.desc}}
    </p>
    <el-tooltip
      v-for="(file,index) in data.filePath"
      :key="index"
      class="item"
      effect="dark"
      :content="file.name"
      placement="bottom-start"
    >
      <el-button type="danger" class="downloadBtn" @click="downLoad(file)">点击下载附件{{index + 1}}</el-button>
    </el-tooltip>
  </div>
</template>

<script>
import PageTitle from '../components/PageTitle';
export default {
    components: { PageTitle },
    data () {
        return {
            data: {}
        };
    },
    mounted () {
        this.data = this.$route.params.data;
    },
    computed: {},
    methods: {
        downLoad (file) {
            window.open(file.url);
        }
    }
};
</script>
<style lang='scss' scoped>
.contain {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
}
.title {
  display: flex;
  align-self: center;
  font-size: 20px;
  margin-bottom: 10px;
}
.desc {
  font-size: 16px;
  padding: 30px;
}
.downloadBtn {
  width: 125px;
  height: 45px;
  border-radius: 20px;
  align-self: center;
}
.item {
  margin: 4px;
}
</style>
