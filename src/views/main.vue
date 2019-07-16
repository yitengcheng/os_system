<template>
  <div>
    <div class="companyInfoContain">
      <div class="companyItem">
        <icon name="职员" w="150px" h="150px" />
        <div class="infoContain">
          <p class="infoTitle">总人数</p>
          <p class="info">50人</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    components: {},
    data () {
        return {};
    },
    computed: {},
    methods: {}
};
</script>
<style lang='scss' scoped>
.companyInfoContain {
  display: flex;
  height: 200px;
  background-color: #f3f3f3;
}
.companyItem {
  display: flex;
  flex-direction: row;
  width: 350px;
  background-color: #fff;
  padding: 10px;
  margin: 20px;
}
.infoContain {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  padding: 20px 30px;
}
.infoTitle {
  font-size: 28px;
}
.info {
  font-size: 18px;
}
</style>
