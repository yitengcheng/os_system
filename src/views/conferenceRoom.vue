<template>
  <div class="contain">
    <PageTitle label="会议室管理" />
    <div class="tableContain">
      <div class="buttonContain">
        <el-button type="primary" @click="showAddModel">添加会议室</el-button>
      </div>
      <ElTable :stripe="true" :border="true" :tableKey="labels" :tableData="tableData">
        <div slot-scope="data">
          <el-button
            @click.native.prevent="showSubscribeModel(data.data.row)"
            type="text"
            size="small"
          >预约</el-button>
        </div>
      </ElTable>
    </div>
    <showModel
      title="添加会议室"
      :dialogVisible="addModelFlag"
      @close="closeModel"
      @doCancel="closeModel"
      @doConfirm="addConferenceRoom"
    >
      <div slot="content">
        <el-form
          :model="conferenceRoom"
          ref="conferenceRoom"
          class="modelContain"
          :rules="addRules"
          label-width="100px"
          label-position="left"
        >
          <FormInput label="名称" :form="conferenceRoom" value="name" @onChange="onChange" />
          <FormInput label="面积" :form="conferenceRoom" value="area" @onChange="onChange" />
          <FormInput label="编号" :form="conferenceRoom" value="roomNumber" @onChange="onChange" />
          <FormInput
            label="可容纳人数"
            :form="conferenceRoom"
            value="galleryful"
            @onChange="onChange"
            append="人"
          />
        </el-form>
      </div>
    </showModel>
    <showModel
      title="预约会议室"
      :dialogVisible="subscribeModelFlag"
      @close="closeModel"
      @doCancel="closeModel"
      @doConfirm="subscribeRoom"
    >
      <div slot="content">
        <el-form
          :model="subscribe"
          ref="subscribeRoom"
          class="modelContain"
          :rules="subscribeRules"
          label-width="100px"
          label-position="left"
        >
          <FormDateTime
            label="预约时间"
            :form="subscribe"
            value="appointmentTime"
            @onChange="onChangeSubscribe"
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
import FormDateTime from '../components/form/formDateTime';
export default {
    components: { PageTitle, ElTable, showModel, FormInput, FormDateTime },
    data () {
        return {
            labels: [
                {
                    prop: 'name',
                    label: '名称',
                    width: '150'
                },
                {
                    prop: 'area',
                    label: '面积',
                    unit: 'm³',
                    width: '150'
                },
                {
                    prop: 'roomNumber',
                    label: '编号',
                    width: '150'
                },
                {
                    prop: 'galleryful',
                    label: '可容纳',
                    unit: '人',
                    width: '150'
                },
                {
                    prop: 'roomStatus',
                    label: '状态',
                    width: '150'
                },
                {
                    prop: 'appointmentTime',
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
            subscribeModelFlag: false,
            subscribe: {
                appointmentTime: ''
            },
            room: {},
            conferenceRoom: {
                name: '',
                area: '',
                roomNumber: '',
                galleryful: ''
            },
            addRules: {
                name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
                area: [{ required: true, message: '请输入面积', trigger: 'blur' }],
                roomNumber: [
                    { required: true, message: '请输入编号', trigger: 'blur' }
                ],
                galleryful: [
                    { required: true, message: '请输入可容纳人数', trigger: 'blur' }
                ]
            },
            subscribeRules: {
                appointmentTime: [
                    { required: true, message: '请选择预约时间', trigger: 'blur' }
                ]
            }
        };
    },
    mounted () {
        this.getConferenceRooms();
    },
    methods: {
        getConferenceRooms () {
            this.tableData = [];
            this.$http.post('/api/getConferenceRooms').then(res => {
                let { success, msg, conferenceRoomList } = res;
                if (success) {
                    conferenceRoomList.forEach(item => {
                        this.tableData.push({
                            name: item.name,
                            area: item.area,
                            roomNumber: item.roomNumber,
                            galleryful: item.galleryful,
                            roomStatus: item.roomStatus === '1' ? '空闲' : '已有预约',
                            appointmentTime: item.appointmentTime,
                            roomId: item._id
                        });
                    });
                } else {
                    this.$alert(msg);
                }
            });
        },
        onChange (value, formType) {
            this.conferenceRoom[formType] = value;
        },
        onChangeSubscribe (value, formType) {
            this.subscribe[formType] = value;
        },
        closeModel () {
            this.addModelFlag = false;
            this.subscribeModelFlag = false;
        },
        showAddModel () {
            this.addModelFlag = true;
        },
        addConferenceRoom () {
            this.$refs.conferenceRoom.validate(valid => {
                if (valid) {
                    this.$http
                        .post('/api/addConferenceRoom', {
                            room: this.conferenceRoom
                        })
                        .then(res => {
                            let { msg, success } = res;
                            if (success) {
                                this.closeModel();
                                this.getConferenceRooms();
                            } else {
                                this.$alert(msg);
                            }
                        });
                } else {
                    this.closeModel();
                    this.$refs.conferenceRoom && this.$refs.conferenceRoom.resetFields();
                    this.$alert('请注意核对信息');
                }
            });
        },
        showSubscribeModel (room) {
            this.subscribeModelFlag = true;
            this.room = room;
        },
        subscribeRoom () {
            this.$refs.subscribeRoom.validate(valid => {
                if (valid) {
                    this.$http
                        .post('/api/subscribeConferenceRoom', {
                            roomId: this.room.roomId,
                            ...this.subscribe
                        })
                        .then(res => {
                            let { msg, success } = res;
                            if (success) {
                                this.closeModel();
                                this.getConferenceRooms();
                            } else {
                                this.$alert(msg);
                            }
                        });
                } else {
                    this.closeModel();
                    this.$refs.subscribeRoom && this.$refs.subscribeRoom.resetFields();
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
