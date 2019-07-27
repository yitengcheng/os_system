<template>
  <div class="contain">
    <PageTitle label="车辆管理" />
    <div class="tableContain">
      <div class="buttonContain">
        <el-button type="primary" @click="showAddModel">添加车辆</el-button>
        <el-button type="primary" @click="showAddModel">添加车辆</el-button>
      </div>
      <ElTable :stripe="true" :border="true" :tableKey="labels" :tableData="tableData">
        <div slot-scope="data">
          <el-button
            v-if="data.data.row.roomStatus === '空闲'"
            @click.native.prevent="showSubscribeModel(data.data.row)"
            type="text"
            size="small"
          >预约</el-button>
          <el-button
            v-else
            @click.native.prevent="confirmAfterUse(data.data.row)"
            type="text"
            size="small"
          >确认公里数</el-button>
        </div>
      </ElTable>
    </div>
    <showModel
      title="添加车辆信息"
      :dialogVisible="addModelFlag"
      @close="closeModel"
      @doCancel="closeModel"
      @doConfirm="addCar"
    >
      <div slot="content">
        <el-form
          :model="carInfo"
          ref="carInfo"
          class="modelContain"
          :rules="addRules"
          label-width="100px"
          label-position="right"
        >
          <FormSelect
            label="部门"
            :form="carInfo"
            value="branchId"
            @onChange="getPersons"
            :options="branchList"
          />
          <FormSelect
            v-if="carInfo.branchId"
            label="员工"
            :form="carInfo"
            value="carOwner"
            @onChange="onChangeCarinfo"
            :options="personList"
          />
          <FormInput
            style="width:300px"
            label="车牌"
            :form="carInfo"
            value="plate"
            maxlength="7"
            @onChange="onChangeCarinfo"
          />
          <FormInput
            style="width:300px"
            label="车型"
            :form="carInfo"
            value="carModel"
            maxlength="10"
            @onChange="onChangeCarinfo"
          />
        </el-form>
      </div>
    </showModel>
  </div>
</template>

<script>
import PageTitle from '../components/PageTitle';
import ElTable from '../components/elComponent/el-table';
import showModel from '../components/showModel';
import FormInput from '../components/form/formInput';
import FormSelect from '../components/form/formSelect';
import FormDateTime from '../components/form/formDateTime';
export default {
    components: {
        PageTitle,
        ElTable,
        showModel,
        FormInput,
        FormDateTime,
        FormSelect
    },
    data () {
        let validatorIsvalidPlate = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入车牌号'));
            } else if (value.length !== 7) {
                callback(new Error('车牌号长度有误'));
            } else if (!this.$utils.isvalidPlate(value)) {
                callback(new Error('请输入正确车牌号'));
            } else {
                callback();
            }
        };
        return {
            labels: [
                {
                    prop: 'carOwner',
                    label: '车主',
                    width: '150'
                },
                {
                    prop: 'plate',
                    label: '车牌',
                    width: '150'
                },
                {
                    prop: 'carModel',
                    label: '车型',
                    width: '150'
                },
                {
                    prop: 'startingKm',
                    label: '起始里程数',
                    unit: 'km',
                    width: '150'
                },
                {
                    prop: 'endingKm',
                    label: '结束里程数',
                    unit: 'km',
                    width: '150'
                },
                {
                    prop: 'status',
                    label: '状态',
                    width: '150'
                },
                {
                    prop: 'serviceTime',
                    label: '预约时间',
                    width: '150'
                },
                {
                    label: '操作',
                    width: '150'
                }
            ],
            tableData: [],
            addModelFlag: false,
            carInfo: {
                branchId: '',
                carOwner: '',
                plate: '',
                carModel: ''
            },
            branchList: [],
            personList: [],
            addRules: {
                carOwner: [{ required: true, message: '请选择员工', trigger: 'blur' }],
                branchId: [{ required: true, message: '请选择部门', trigger: 'blur' }],
                plate: [
                    { required: true, validator: validatorIsvalidPlate, trigger: 'blur' }
                ],
                carModel: [{ required: true, message: '请输入车型', trigger: 'blur' }]
            }
        };
    },
    mounted () {
        this.getCarRecord();
        this.getBranch();
    },
    methods: {
        getBranch () {
            this.$http.post('/api/getBranchs').then(res => {
                let { success, branchs } = res;
                if (success) {
                    branchs.forEach(item => {
                        this.branchList.push({ label: item.name, value: item._id });
                    });
                }
            });
        },
        getPersons (value, formType) {
            this.$http
                .post('/api/getPersonsForBranch', { branchId: value })
                .then(res => {
                    let { success, persons } = res;
                    this.carInfo[formType] = value;
                    if (success) {
                        persons.forEach(item => {
                            this.personList.push({ label: item.name, value: item._id });
                        });
                    }
                });
        },
        getCarRecord () {
            this.tableData = [];
            this.$http.post('/api/getCarRecord').then(res => {
                let { success, msg, carRecordList } = res;
                if (success) {
                    carRecordList.forEach(item => {
                        this.tableData.push({
                            carOwner: item.carOwner,
                            plate: item.plate,
                            carModel: item.carModel,
                            startingKm: item.startingKm,
                            endingKm: item.endingKm,
                            status: item.status === '1' ? '未完成' : '完成',
                            serviceTime: item.serviceTime,
                            carId: item.carId
                        });
                    });
                } else {
                    this.$alert(msg);
                }
            });
        },
        onChangeCarinfo (value, formType) {
            this.carInfo[formType] = value;
        },
        closeModel () {
            this.addModelFlag = false;
        },
        showAddModel () {
            this.addModelFlag = true;
        },
        addCar () {
            this.$refs.carInfo.validate(valid => {
                if (valid) {
                    this.$http
                        .post('/api/addCar', {
                            car: this.carInfo
                        })
                        .then(res => {
                            let { msg, success } = res;
                            if (success) {
                                this.closeModel();
                            } else {
                                this.$alert(msg);
                            }
                        });
                } else {
                    this.closeModel();
                    this.$refs.carInfo && this.$refs.carInfo.resetFields();
                    this.$alert('请注意核对信息');
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
}
.modelContain {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
