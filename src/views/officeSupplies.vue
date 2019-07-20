<template>
  <div class="contain">
    <PageTitle label="办公用品管理" />
    <div class="tableContain">
      <div>
        <el-button>办公用品入库</el-button>
      </div>
      <ElTable :stripe="true" :border="true" :tableKey="labels"></ElTable>
    </div>
  </div>
</template>

<script>
import PageTitle from '../components/PageTitle';
import ElTable from '../components/elComponent/el-table';
export default {
    components: { PageTitle, ElTable },
    data () {
        return {
            labels: [
                {
                    prop: 'category',
                    label: '类别',
                    width: '200'
                },
                {
                    prop: 'name',
                    label: '名称',
                    width: '200'
                },
                {
                    prop: 'number',
                    label: '数量',
                    width: '200'
                },
                {
                    label: '操作',
                    width: '300'
                }
            ]
        };
    },
    computed: {},
    methods: {}
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
.tableContain {
  display: flex;
  flex-direction: column;
  align-self: center;
}
</style>
