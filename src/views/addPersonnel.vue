<template>
  <div class="contain">
    <PageTitle label="添加人员" />
    <el-form class="formContain" :model="form" label-width="110px" label-position="right">
      <FormInput label="姓名" :form="form" value="name" @onChange="onChange" />
      <FormSelect
        :options="branchList"
        label="部门"
        :form="form"
        value="branch"
        @onChange="onChange"
      />
      <FormSelect
        :options="positionList"
        label="职位"
        :form="form"
        value="position"
        @onChange="onChange"
      />
      <FormInput label="电话" :form="form" value="phone" @onChange="onChange" />
      <FormInput label="电子邮箱" :form="form" value="email" @onChange="onChange" />
      <FormInput label="登录系统用户名" :form="form" value="userName" @onChange="onChange" />
      <FormInput label="登录系统密码" :form="form" value="password" @onChange="onChange" />
      <FormRadio :checks="['男','女']" label="性别" :form="form" value="sex" @onChange="onChange" />
      <FormDateTime
        options="[]"
        label="生日"
        type="date"
        :form="form"
        value="birthday"
        @onChange="onChange"
      />
      <el-button type="success" class="submitBtn" @click="doSubmit">确认</el-button>
    </el-form>
  </div>
</template>

<script>
import FormInput from '../components/form/formInput';
import FormRadio from '../components/form/formRadio';
import FormSelect from '../components/form/formSelect';
import FormDateTime from '../components/form/formDateTime';
import PageTitle from '../components/PageTitle';
export default {
    components: { PageTitle, FormInput, FormRadio, FormDateTime, FormSelect },
    data () {
        return {
            form: {
                name: '',
                branchId: '',
                positionId: '',
                phone: '',
                email: '',
                userName: '',
                password: '',
                sex: 0,
                birthday: ''
            },
            rules: [],
            branchList: [],
            positionList: []
        };
    },
    computed: {},
    mounted () {
        this.$http.post('/api/getBranchs').then(res => {
            let { success, branchs } = res;
            if (success) {
                branchs.forEach(item => {
                    this.branchList.push({ label: item.name, value: item._id });
                });
            }
        });
        this.$http.post('/api/getPositions').then(res => {
            let { success, positions } = res;
            if (success) {
                positions.forEach(item => {
                    this.positionList.push({ label: item.position, value: item._id });
                });
            }
        });
    },
    methods: {
        onChange (value, formType) {
            this.form[formType] = value;
        },
        doSubmit () {
            this.$http.post('/api/addPerson', { user: this.form }).then(res => {
                let { success, msg } = res;
                if (success) {
                    this.$confirm('创建成功,点击确定回到上一页面', '提示', {
                        confirmButtonText: '确定',
                        type: 'success'
                    })
                        .then(() => {
                            this.$router.back();
                        })
                        .catch(() => {});
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
  flex-direction: column;
  padding: 10px;
}
.formContain {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  width: 800px;
}
.submitBtn {
  align-self: center;
  width: 300px;
}
</style>
