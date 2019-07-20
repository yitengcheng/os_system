<template>
  <div class="contain">
    <PageTitle label="人员管理" />
    <div class="tableContain">
      <div>
        <el-button type="primary" class="addBtn" @click="addPerson">添加人员</el-button>
      </div>
      <ElTable :stripe="true" :border="true" :tableKey="labels" :tableData="tableData">
        <div slot-scope="data">
          <el-button
            @click.native.prevent="editorRow(data.data.$index, data.data.row)"
            type="text"
            size="small"
          >编辑</el-button>
          <el-button
            @click.native.prevent="deleteRow(data.data.$index, data.data.row)"
            type="text"
            size="small"
          >移除</el-button>
        </div>
      </ElTable>
    </div>
  </div>
</template>

<script>
import ElTable from '../components/elComponent/el-table';
import PageTitle from '../components/PageTitle';
export default {
    components: { ElTable, PageTitle },
    data () {
        return {
            labels: [
                {
                    prop: 'branch',
                    label: '部门',
                    width: '200'
                },
                {
                    prop: 'position',
                    label: '职位',
                    width: '200'
                },
                {
                    prop: 'name',
                    label: '姓名',
                    width: '200'
                },
                {
                    label: '操作',
                    width: '300'
                }
            ],
            tableData: []
        };
    },
    computed: {},
    mounted () {
        this.$http.post('/api/getPersons').then(res => {
            let { success, msg, persons } = res;
            if (success) {
                persons.forEach(person => {
                    this.tableData.push({
                        name: person.name,
                        branch: person.branch.name,
                        position: person.position.position
                    });
                });
            } else {
                this.$alert(msg);
            }
        });
    },
    methods: {
        editorRow () {},
        deleteRow () {},
        addPerson () {
            this.$router.push({
                path: '/addPersonnel'
            });
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
.addBtn {
  margin-bottom: 20px;
}
.tableContain {
  display: flex;
  flex-direction: column;
  align-self: center;
}
</style>
