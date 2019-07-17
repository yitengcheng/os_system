<template>
  <div class="contain">
    <PageTitle label="留言板" />
  </div>
</template>

<script>
import PageTitle from '../components/PageTitle';
export default {
    components: { PageTitle },
    data () {
        return {};
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
</style>
