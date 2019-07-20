<template>
  <div class="contain">
    <PageTitle label="公共通讯录" />
    <div class="table">
      <ElTable :stripe="true" :tableData="tableData" :tableKey="tableKey" :border="true"></ElTable>
    </div>
  </div>
</template>

<script>
import ElTable from '../components/elComponent/el-table';
import PageTitle from '../components/PageTitle';

export default {
    components: { ElTable, PageTitle },
    mounted () {
        this.$http
            .post('/api/getPublicAddressBook', { pageNo: 0, pageSize: 10 })
            .then(res => {
                let { success, msg, addressBook } = res;
                if (success) {
                    this.tableData = addressBook;
                } else {
                    this.$alert(msg);
                }
            });
    },
    data () {
        return {
            tableData: [],
            tableKey: [
                { prop: 'department', label: '部门', width: '300' },
                { prop: 'position', label: '职位', width: '300' },
                { prop: 'name', label: '姓名', width: '300' },
                { prop: 'phone', label: '联系电话', width: '400' }
            ]
        };
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
.table {
  display: flex;
  flex: 1;
  justify-content: center;
  padding: 10px;
}
</style>
