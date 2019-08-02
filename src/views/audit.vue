<template>
  <div class="contain">
    <PageTitle label="审批管理" />
    <div slot="content" class="table">
      <ElTable
        class="eltable"
        :stripe="true"
        :tableData="fileList"
        :tableKey="tableKey"
        :border="true"
      >
        <div slot-scope="data">
          <el-button @click.native.prevent="apply(data.data.row.profileId)" size="small">审核通过</el-button>
          <el-button
            v-for="(url,index) in data.data.row.filePath"
            :key="index"
            @click.native.prevent="downLoad(url)"
            type="text"
            size="small"
          >{{`附件${index+1}`}}</el-button>
        </div>
      </ElTable>
    </div>
  </div>
</template>

<script>
import PageTitle from '../components/PageTitle';
import ElTable from '../components/elComponent/el-table';
import { mapState } from 'vuex';
export default {
    components: { PageTitle, ElTable },
    data () {
        return {
            fileList: [],
            tableKey: [
                { prop: 'author', label: '作者', width: '100' },
                { prop: 'title', label: '标题', width: '200' },
                { prop: 'desc', label: '描述', width: '400' },
                { label: '文件下载', width: '300' }
                // { label: '操作', width: '100' }
            ]
        };
    },
    mounted () {
        this.getPendingProfiles();
    },
    computed: {
        ...mapState({
            user: state => state.user.user
        })
    },
    methods: {
        getPendingProfiles () {
            this.$http
                .post('/api/getPendingProfiles', {
                    pageNo: 0,
                    pageSize: 20,
                    userId: this.user._id
                })
                .then(res => {
                    let { success, msg, fileList } = res;
                    if (success) {
                        this.fileList = fileList;
                    } else {
                        this.$alert(msg);
                    }
                });
        },
        downLoad (file) {
            window.open(file.url);
        },
        apply (id) {
            this.$http
                .post('/api/reviewThePost', {
                    profileId: id,
                    userId: this.user._id
                })
                .then(res => {
                    let { success, msg } = res;
                    if (success) {
                        this.$alert('审核完成');
                        this.getPendingProfiles();
                    } else {
                        this.$alert(msg);
                    }
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
  padding: 10px;
}
.table {
  display: flex;
  flex-direction: column;
  align-self: center;
  width: 1000px;
  padding: 20px;
}
.addBtn {
  width: 60px;
}
.eltable {
  display: flex;
  align-self: center;
  flex: 1;
  margin-top: 10px;
}
</style>
