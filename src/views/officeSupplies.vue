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
          <div slot-scope="data">
            <el-button @click.native.prevent="checkout(data.data.row)" type="text" size="small">领取</el-button>
            <el-button @click="edit(data.data.row)" type="text" size="small">编辑</el-button>
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
            <el-button type="primary" @click="doSearchOut">搜索</el-button>
          </div>
        </div>
        <ElTable :stripe="true" :tableData="outData" :tableKey="outTableKey" :border="true"></ElTable>
      </div>
    </Tabs>
    <showModel
      title="添加物品"
      :dialogVisible="modelVisible"
      @close="closeModel(true)"
      @doCancel="closeModel(true)"
      @doConfirm="doConfirm"
    >
      <div slot="content">
        <el-form :model="form" ref="form" class="form" :rules="rules" @onChange="onChange">
          <FormInput label="名称" :form="form" value="name" maxlength="20" @onChange="onChange" />
          <FormInput label="种类" :form="form" value="category" maxlength="10" @onChange="onChange" />
          <FormInput label="数量" :form="form" value="number" maxlength="10" @onChange="onChange" />
          <FormInput label="最小单位" :form="form" value="unit" maxlength="5" @onChange="onChange" />
        </el-form>
      </div>
    </showModel>
    <showModel
      title="领取物品"
      :dialogVisible="getModelVisible"
      @close="closeModel(true)"
      @doCancel="closeModel(true)"
      @doConfirm="doConfirmOut"
    >
      <div slot="content">
        <div class="receiveInfo">
          <div>种类：{{receive.category}}</div>
          <div>名称：{{receive.name}}</div>
          <div>剩余：{{receive.number}} {{receive.unit}}</div>
        </div>
        <el-form :model="outForm" ref="outForm" class="form" :rules="outRules" @onChange="onChange">
          <FormSelect
            :options="branchList"
            label="部门"
            :form="outForm"
            value="branchId"
            @onChange="onChangeOut"
          />
          <FormSelect
            :options="personsList"
            label="人员"
            :form="outForm"
            value="receiverId"
            @onChange="onChangeOutInfo"
          />
          <FormInput
            label="领取数量"
            :form="outForm"
            value="receiveNumber"
            maxlength="5"
            @onChange="onChangeOutInfo"
          />
          <FormInput
            label="备注"
            :form="outForm"
            value="remark"
            maxlength="20"
            @onChange="onChangeOutInfo"
          />
        </el-form>
      </div>
    </showModel>
  </div>
</template>

<script>
import PageTitle from '../components/PageTitle';
import ElTable from '../components/elComponent/el-table';
import FormDateTime from '../components/form/formDateTime';
import FormInput from '../components/form/formInput';
import Tabs from '../components/Tabs';
import showModel from '../components/showModel';
import FormSelect from '../components/form/formSelect';

export default {
    components: {
        PageTitle,
        ElTable,
        FormDateTime,
        FormInput,
        Tabs,
        showModel,
        FormSelect
    },
    data () {
        let validateNumber = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入数量'));
            } else if (!this.$utils.isPositiveInteger(value)) {
                callback(new Error('请输入正确的数量'));
            } else {
                callback();
            }
        };
        return {
            modelVisible: false,
            getModelVisible: false,
            tabsData: [{ name: '物品列表' }, { name: '领取记录' }],
            form: {
                name: '',
                category: '',
                number: '',
                unit: ''
            },
            outForm: {
                stationeryId: '',
                branchId: '',
                receiverId: '',
                receiveNumber: '',
                remark: ''
            },
            receive: {},
            rules: {
                name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
                category: [{ required: true, message: '请输入类别', trigger: 'blur' }],
                number: [
                    { required: true, validator: validateNumber, trigger: 'blur' }
                ],
                unit: [{ required: true, message: '请输入单位', trigger: 'blur' }]
            },
            outRules: {
                branchId: [{ required: true, message: '请选择部门', trigger: 'blur' }],
                receiverId: [
                    { required: true, message: '请选择领取人', trigger: 'blur' }
                ],
                receiveNumber: [
                    { required: true, validator: validateNumber, trigger: 'blur' }
                ],
                remark: { required: false, trigger: 'blur' }
            },
            stockData: [],
            confirm: true,
            outData: [],
            category: '',
            number: '',
            name: '',
            branchList: [],
            personsList: [],
            branchId: '',
            refresh: true,
            tableKey: [
                { prop: 'name', label: '名称', width: '200' },
                { prop: 'category', label: '类别', width: '200' },
                { prop: 'number', label: '数量', width: '200' },
                { prop: 'unit', label: '最小单位', width: '200' },
                { label: '操作', width: '220' }
            ],
            outTableKey: [
                { prop: 'receiveTime', label: '领取时间', width: '150' },
                { prop: 'receiveBranch', label: '领取部门', width: '150' },
                { prop: 'receiver', label: '领取人', width: '150' },
                { prop: 'receiveGoodCategory', label: '物品类别', width: '150' },
                { prop: 'receiveGoodName', label: '物品名称', width: '150' },
                { prop: 'receiveNumber', label: '物品数量', width: '150' },
                { prop: 'receiveGoodUnit', label: '物品单位', width: '200' },
                { prop: 'remark', label: '备注', width: '150' }
            ]
        };
    },
    computed: {},
    mounted () {
        this.getStationery();
        this.getBranchs();
        this.getStationeryRecord();
    },
    methods: {
        onChange (value, formType) {
            this.form[formType] = value;
        },
        onChangeOutInfo (value, formType) {
            this.outForm[formType] = value;
        },
        onChangeOut (value, formType) {
            this.outForm[formType] = value;
            this.$http
                .post('/api/getPersonsForBranch', { branchId: value })
                .then(res => {
                    let { success, msg, persons } = res;
                    if (success) {
                        this.personsList = [];
                        persons.forEach(item => {
                            this.personsList.push({
                                label: item.name,
                                value: item._id
                            });
                        });
                    } else {
                        this.$alert(msg);
                    }
                });
        },
        getBranchs () {
            this.$http.post('/api/getBranchs').then(res => {
                let { success, branchs } = res;
                if (success) {
                    branchs.forEach(item => {
                        this.branchList.push({ label: item.name, value: item._id });
                    });
                }
            });
        },
        closeModel (flag) {
            this.modelVisible = false;
            this.getModelVisible = false;
        },
        getStationery () {
            this.$http
                .post('/api/getStationery', {
                    pageNo: 0,
                    pageSize: 20,
                    category: this.category,
                    name: this.name
                })
                .then(res => {
                    let { success, msg, stationeryList } = res;
                    if (success) {
                        this.stockData = stationeryList;
                    } else {
                        this.$alert(msg);
                    }
                });
        },
        getStationeryRecord () {
            this.$http
                .post('/api/getStationeryRecord', {
                    pageNo: 0,
                    pageSize: 20,
                    category: this.category,
                    name: this.name
                })
                .then(res => {
                    let { success, msg, recordList } = res;
                    if (success) {
                        this.outData = recordList;
                    } else {
                        this.$alert(msg);
                    }
                });
        },
        addStationeryRecord () {},
        doConfirm () {
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.$http
                        .post('/api/addStationery', {
                            stationery: this.form
                        })
                        .then(res => {
                            let { success, msg } = res;
                            if (success) {
                                this.$alert('添加成功');
                                this.$refs.form.resetFields();
                                this.modelVisible = false;
                                this.getStationery();
                            } else {
                                this.$alert(msg);
                            }
                        });
                } else {
                    this.$alert('信息填写有误，请重新填写');
                }
            });
        },
        doConfirmOut () {
            if (this.outForm.receiveNumber > this.number) {
                this.$alert('领取的数量不能大于库存数量');
            } else {
                this.$http
                    .post('/api/addStationeryRecord', {
                        stationeryId: this.outForm.stationeryId,
                        receiveNumber: this.outForm.receiveNumber,
                        receiverId: this.outForm.receiverId,
                        remark: this.outForm.remark
                    })
                    .then(res => {
                        let { success, msg } = res;
                        if (success) {
                            this.$alert('领取成功');
                            this.$refs.outForm.resetFields();
                            this.getModelVisible = false;
                            this.getStationery();
                        } else {
                            this.$alert(msg);
                        }
                    });
            }
        },
        tabClick () {
            this.getStationery();
            this.category = '';
            this.number = '';
            this.getStationeryRecord();
        },
        resetSearch () {
            this.name = '';
            this.category = '';
        },
        checkout (data) {
            this.receive = data;
            this.outForm.stationeryId = data.stationeryId;
            this.number = data.number;
            this.getModelVisible = true;
        },
        add (data) {
            this.modelVisible = true;
        },
        edit (data) {
            this.modelVisible = true;
            if (data) {
                data.number = '';
                this.form = data;
            }
        },
        doSearch () {
            this.getStationery();
        },
        doSearchOut () {
            this.getStationeryRecord();
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
.receiveInfo {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 500px;
  height: 50px;
  border: 1px solid #000000;
  margin-bottom: 20px;
  border-radius: 5px;
}
.form {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.nameItem {
  width: 400px;
}
.typeItem {
  width: 400px;
}
.numberItem {
  width: 400px;
}
.unitItem {
  width: 400px;
}
</style>
