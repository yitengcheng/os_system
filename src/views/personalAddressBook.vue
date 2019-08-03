<template>
  <div class="contain">
    <PageTitle label="个人通讯录" />
    <div class="table">
      <el-button type="success" @click="add" class="addBtn">添加</el-button>
      <ElTable
        class="eltable"
        :stripe="true"
        :tableData="addressBookList"
        :tableKey="tableKey"
        :border="true"
      >
        <div slot-scope="data">
          <el-button @click.native.prevent="deleteRow(data.data.row.addressBookId)" size="small">删除</el-button>
        </div>
      </ElTable>
    </div>
    <showModel
      title="添加联系人"
      :dialogVisible="ModelVisible"
      @close="closeModel(true)"
      @doCancel="closeModel(true)"
      @doConfirm="doConfirm"
    >
      <div slot="content">
        <el-form
          :model="addressBook"
          ref="addressBook"
          class="form"
          :rules="rules"
          @onChange="onChange"
        >
          <FormInput
            label="姓名"
            :form="addressBook"
            value="name"
            maxlength="20"
            @onChange="onChange"
          />
          <FormInput
            label="手机号码"
            :form="addressBook"
            value="phone"
            maxlength="11"
            @onChange="onChange"
          />
          <FormInput
            label="公司"
            :form="addressBook"
            value="company"
            maxlength="20"
            @onChange="onChange"
          />
          <FormInput
            label="备注"
            :form="addressBook"
            value="remark"
            maxlength="20"
            @onChange="onChange"
          />
        </el-form>
      </div>
    </showModel>
  </div>
</template>
<script>
import ElTable from '../components/elComponent/el-table';
import PageTitle from '../components/PageTitle';
import showModel from '../components/showModel';
import FormInput from '../components/form/formInput';
import { mapState } from 'vuex';

export default {
    components: { ElTable, PageTitle, showModel, FormInput },
    computed: {
        ...mapState({
            user: state => state.user.user
        })
    },
    mounted () {
        this.getAddressBook();
    },
    data () {
        let validatePhone = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入手机号'));
            } else if (!this.$utils.isvalidPhone(value)) {
                callback(new Error('请输入正确的手机号'));
            } else {
                callback();
            }
        };
        return {
            tableData: [],
            ModelVisible: false,
            addressBook: {
                name: '',
                phone: '',
                company: '',
                remark: ''
            },
            addressBookList: [],
            rules: {
                name: [
                    {
                        required: true,
                        message: '请填写姓名',
                        trigger: 'blur'
                    }
                ],
                phone: [
                    {
                        required: true,
                        validator: validatePhone,
                        trigger: 'blur'
                    }
                ],
                company: [{ required: false, message: '请填写公司名', trigger: 'blur' }]
            },
            tableKey: [
                { prop: 'name', label: '姓名', width: '150' },
                { prop: 'phone', label: '手机号码', width: '200' },
                { prop: 'company', label: '公司', width: '200' },
                { prop: 'createTime', label: '添加时间', width: '200' },
                { prop: 'remark', label: '备注', width: '150' },
                { label: '操作', width: '100' }
            ]
        };
    },
    methods: {
        onChange (value, formType) {
            this.addressBook[formType] = value;
        },
        getAddressBook () {
            this.$http
                .post('/api/getAddressBook', { userId: this.user._id })
                .then(res => {
                    let { success, msg, addressBookList } = res;
                    if (success) {
                        this.addressBookList = addressBookList;
                    } else {
                        this.$alert(msg);
                    }
                });
        },
        closeModel () {
            this.ModelVisible = false;
        },
        doConfirm () {
            this.$refs.addressBook.validate(valid => {
                if (valid) {
                    this.$http
                        .post('/api/addAddressBook', {
                            userId: this.user._id,
                            name: this.addressBook.name,
                            phone: this.addressBook.phone,
                            company: this.addressBook.company
                        })
                        .then(res => {
                            let { success, msg } = res;
                            if (success) {
                                this.$refs.addressBook.resetFields();
                                this.$alert('添加成功');
                                this.getAddressBook();
                                this.ModelVisible = false;
                            } else {
                                this.$alert(msg);
                            }
                        });
                } else {
                    this.$alert('信息填写有误，请重新填写');
                }
            });
        },
        deleteRow (addressBookId) {
            this.$http
                .post('/api/removeAddressBook', {
                    userId: this.user._id,
                    addressBookId
                })
                .then(res => {
                    let { success, msg } = res;
                    if (success) {
                        this.$alert('删除成功');
                        this.getAddressBook();
                    } else {
                        this.$alert(msg);
                    }
                });
        },
        add () {
            this.ModelVisible = true;
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
