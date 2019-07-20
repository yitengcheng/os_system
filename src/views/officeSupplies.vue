<template>
  <div class="contain">
    <PageTitle label="办公用品管理" />
    <Tabs :tabsData="tabsData" ref="tabs" @tabClick="tabClick">
      <div slot="物品列表">
        <div class="searchWarpper">
          <div class="searchWarpper">
            <div class="search">
              <p class="searchTitle">类别：</p>
              <el-input maxlength="16" v-model="category" class="searchInput" placeholder="请输入类别名称"></el-input>
            </div>
            <div class="search">
              <p class="searchTitle">名称：</p>
              <el-input maxlength="7" v-model="name" class="searchInput" placeholder="请输入名称"></el-input>
            </div>
          </div>
          <div class="searchBtnWarpper">
            <el-button type="info" @click="resetSearch">清空</el-button>
            <el-button type="primary" @click="doSearch">搜索</el-button>
            <el-button type="success" @click="add">添加</el-button>
          </div>
        </div>
        <ElTable :stripe="true" :tableData="stockData" :tableKey="tableKey" :border="true">
          <div>
            <el-button @click.native.prevent="checkout" type="text" size="small">领取</el-button>
          </div>
        </ElTable>
      </div>
      <div slot="领取记录">
        <div class="searchWarpper">
          <div class="searchWarpper">
            <div class="search">
              <p class="searchTitle">类别：</p>
              <el-input maxlength="16" v-model="category" class="searchInput" placeholder="请输入类别名称"></el-input>
            </div>
            <div class="search">
              <p class="searchTitle">名称：</p>
              <el-input maxlength="7" v-model="name" class="searchInput" placeholder="请输入名称"></el-input>
            </div>
          </div>
          <div class="searchBtnWarpper">
            <el-button type="info" @click="resetSearch">清空</el-button>
            <el-button type="primary" @click="doSearch">搜索</el-button>
          </div>
        </div>
        <ElTable :stripe="true" :tableData="outData" :tableKey="outTableKey" :border="true"></ElTable>
      </div>
    </Tabs>
  </div>
</template>

<script>
import PageTitle from '../components/PageTitle';
import ElTable from '../components/elComponent/el-table';
import FormDateTime from '../components/form/formDateTime';
import FormInput from '../components/form/formInput';
import Tabs from '../components/Tabs';

export default {
    components: { PageTitle, ElTable, FormDateTime, FormInput, Tabs },
    data () {
        return {
            tabsData: [{ name: '物品列表' }, { name: '领取记录' }],
            stockData: [
                { name: 'A4纸', category: '打印', number: '10包' },
                { name: 'A3纸', category: '打印', number: '10包' },
                { name: '打印机', category: '打印', number: '10台' }
            ],
            outData: [
                {
                    date: '2019/7/20',
                    department: '行政部',
                    receiver: '陈德沁',
                    name: '网线',
                    category: '网络',
                    number: '1箱',
                    remark: '测试'
                },
                {
                    date: '2019/7/20',
                    department: '行政部',
                    receiver: '陈德沁',
                    name: '网线',
                    category: '网络',
                    number: '1箱',
                    remark: '测试'
                },
                {
                    date: '2019/7/20',
                    department: '行政部',
                    receiver: '陈德沁',
                    name: '网线',
                    category: '网络',
                    number: '1箱',
                    remark: '测试'
                }
            ],
            category: '',
            name: '',
            refresh: true,
            tableKey: [
                { prop: 'name', label: '名称', width: '200' },
                { prop: 'category', label: '类别', width: '200' },
                { prop: 'number', label: '数量', width: '200' },
                { label: '操作', width: '220' }
            ],
            outTableKey: [
                { prop: 'date', label: '时间', width: '200' },
                { prop: 'department', label: '部门', width: '200' },
                { prop: 'receiver', label: '领取人', width: '200' },
                { prop: 'name', label: '名称', width: '200' },
                { prop: 'category', label: '类别', width: '200' },
                { prop: 'number', label: '数量', width: '200' },
                { prop: 'remark', label: '备注', width: '200' }
            ]
        };
    },
    computed: {},
    methods: {
        tabClick () {
            console.log('111');
        },
        resetSearch () {
            this.name = '';
            this.category = '';
        },
        doConfirm () {},
        checkout () {
            console.log('---');
        },
        editorRow () {
            console.log('===');
        },
        add () {},
        doSearch () {
            // this.$http
            //     .post('/api/doSearch', {
            //         category: this.category,
            //         name: this.name
            //     })
            //     .then(res => {
            //         let { success, msg, data } = res;
            //         if (success) {
            //             this.tableData = data;
            //         }
            //     });
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
.listWarrper {
  display: flex;
  flex: 0.5;
  min-width: 600px;
  flex-direction: column;
  align-self: center;
}
.addBtn {
  width: 100px;
  align-self: center;
  margin-left: 80px;
}
.searchWarpper {
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  justify-content: space-between;
}
.search {
  display: flex;
  flex-direction: row;
  padding-left: 10px;
  margin-right: 20px;
}
.searchTitle {
  width: 80px;
  line-height: 30px;
}
.searchInput {
  width: 150px;
}
.searchBtnWarpper {
  justify-self: flex-end;
}
</style>
