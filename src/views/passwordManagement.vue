<template>
  <div class="contain">
    <PageTitle label="密码管理" />
    <div class="tableContain">
      <div class="buttonContain">
        <el-button type="primary" @click="showModel('addModelFlag')">添加账号信息</el-button>
      </div>
      <ElTable :stripe="true" :border="true" :tableKey="labels" :tableData="tableData">
        <div slot-scope="data">
          <el-button
            @click.native.prevent="showConfirModel(data.data.row)"
            type="text"
            size="small"
          >确认公里数</el-button>
        </div>
      </ElTable>
    </div>
  </div>
</template>

<script>
import PageTitle from '../components/PageTitle';
import ElTable from '../components/elComponent/el-table';
import showModel from '../components/showModel';
import FormInput from '../components/form/formInput';
export default {
    components: {
        PageTitle,
        ElTable,
        showModel,
        FormInput
    },
    data () {
        return {
            labels: [
                {
                    prop: 'desc',
                    label: '描述',
                    width: '150'
                },
                {
                    prop: 'accountNumber',
                    label: '账号',
                    width: '200'
                },
                {
                    prop: 'accountPassword',
                    label: '密码',
                    width: '200'
                },
                {
                    prop: 'createTime',
                    label: '日期',
                    width: '200'
                },
                {
                    label: '操作',
                    width: '200'
                }
            ],
            addModelFlag: false
        };
    },
    mounted () {},
    methods: {
        showModel (model) {
            this[model] = true;
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
.tableContain {
  display: flex;
  align-self: center;
  flex-direction: column;
}
.buttonContain {
  margin-bottom: 10px;
  display: flex;
  justify-content: flex-end;
}
.modelContain {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
