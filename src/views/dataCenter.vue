<template>
  <div class="contain">
    <PageTitle label="资料中心" />
    <div class="dataContain" v-infinite-scroll="load" infinite-scroll-disabled="disabled">
      <div
        v-for="(item,index) in dataList"
        :key="index"
        class="dataItem"
        @click="toDataDetail(item)"
      >
        <h2 class="dataTitle">{{item.title}}</h2>
        <p class="dataDesc">
          <span style="marginLeft:40px"></span>
          {{item.desc}}
        </p>
      </div>
      <icon v-if="disabled" name="没有更多" w="80px" h="80px" class="noMore" />
    </div>
  </div>
</template>

<script>
import PageTitle from '../components/PageTitle';
import { mapState } from 'vuex';
export default {
    components: { PageTitle },
    data () {
        return {
            dataList: [],
            pageNo: 0,
            disabled: false
        };
    },
    computed: {
        ...mapState({
            user: state => state.user.user
        })
    },
    mounted () {
        this.getProfiles(false);
    },
    methods: {
        toDataDetail (data) {
            this.$router.push({
                name: 'dataDetail',
                params: {
                    data
                }
            });
        },
        load () {
            this.getProfiles(true);
        },
        getProfiles (flag) {
            if (flag) {
                this.pageNo += 1;
            } else {
                this.dataList = [];
                this.pageNo = 0;
            }
            this.$http
                .post('/api/getProfiles', {
                    pageNo: this.pageNo,
                    pageSize: 10,
                    userId: this.user._id
                })
                .then(res => {
                    let { success, msg, fileList } = res;
                    if (success) {
                        if (fileList.length === 0) {
                            this.disabled = true;
                        } else {
                            this.dataList.push(...fileList);
                        }
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
  justify-content: center;
  padding: 10px;
}
.dataContain {
  display: flex;
  flex-direction: column;
  align-self: center;
  width: 800px;
}
.dataItem {
  display: flex;
  flex-direction: column;
  margin: 20px;
}
.dataTitle {
  font-size: 20px;
  margin-bottom: 10px;
}
.dataDesc {
  height: 105px;
  font-size: 16px;
  padding-left: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
}
.noMore {
  display: flex;
  align-self: center;
}
</style>
