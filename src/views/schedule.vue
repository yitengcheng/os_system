<template>
  <div class="contain">
    <PageTitle label="日程安排" />
    <el-calendar class="item">
      <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
      <template slot="dateCell" slot-scope="{date, data}" @onClick="test">
        <el-button
          :class="data.isSelected ? 'is-selected' : ''"
          @click="test"
        >{{ data.day.split('-').slice(1).join('-') }}</el-button>
      </template>
    </el-calendar>
    <showModel
      title="添加日程"
      :dialogVisible="ModelVisible"
      @close="closeModel(true)"
      @doCancel="closeModel(true)"
      @doConfirm="doConfirm"
    >
      <div slot="content">
        <el-input
          class="input"
          :autosize="{ minRows: 5, maxRows: 5}"
          maxlength="100"
          show-word-limit
          type="textarea"
          resize="none"
          v-model="input"
          placeholder="请输入留言"
        ></el-input>
      </div>
    </showModel>
  </div>
</template>

<script>
import PageTitle from '../components/PageTitle';
import showModel from '../components/showModel';
import FormInput from '../components/form/formInput';
import { mapState } from 'vuex';

export default {
    components: { PageTitle, showModel, FormInput },
    data () {
        return {
            ModelVisible: false,
            input: ''
        };
    },
    // watch: {
    //     data: {
    //         handler (newValue) {
    //             console.log('1111', newValue);
    //         },
    //         deep: true
    //     }
    // },
    computed: {
        ...mapState({
            user: state => state.user.user
        })
    },
    mounted () {
        this.$http.post('/api/getSchedule', { userId: this.user._id }).then(res => {
            let { success, msg, scheduleList } = res;
            if (success) {
                // console.log('----', scheduleList);
            } else {
                this.$alert(msg);
            }
        });
    },
    methods: {
        test () {
            this.ModelVisible = true;
        },
        doConfirm () {},
        closeModel () {
            this.ModelVisible = false;
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
.item {
  flex-direction: column;
}
.is-selected {
  color: #1989fa;
}
.input {
  height: 100px;
  width: 500px;
}
</style>
