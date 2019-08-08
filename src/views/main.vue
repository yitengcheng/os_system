<template>
  <div>
    <div class="companyInfoContain">
      <div class="companyItem">
        <icon name="职员" w="150px" h="150px" />
        <div class="infoContain">
          <p class="infoTitle">总人数</p>
          <p class="info">{{totalNumberOfPeople}}人</p>
        </div>
      </div>
      <div class="companyItem">
        <icon name="男毕业生" w="150px" h="150px" />
        <div class="infoContain">
          <p class="infoTitle">研究生以上学历</p>
          <p class="info">{{numberOfHighlyEducated}}人</p>
        </div>
      </div>
      <div class="companyItem">
        <icon name="老人" w="150px" h="150px" />
        <div class="infoContain">
          <p class="infoTitle">返聘人数</p>
          <p class="info">{{numberOfRestart}}人</p>
        </div>
      </div>
      <div class="companyItem">
        <icon name="党员" w="150px" h="150px" />
        <div class="infoContain">
          <p class="infoTitle">党员人数</p>
          <p class="info">{{numberOfParty}}人</p>
        </div>
      </div>
      <div class="companyItem">
        <icon name="留言板" w="150px" h="150px" />
        <div class="infoContain">
          <p class="infoTitle">留言板</p>
          <p class="info">{{messageNum}}条</p>
        </div>
      </div>
      <div class="companyItem">
        <icon name="文件" w="150px" h="150px" />
        <div class="infoContain">
          <p class="infoTitle">公司发文</p>
          <p class="info">{{profileNum}}份</p>
        </div>
      </div>
    </div>
    <div class="wordCloudContain">
      <WordCloud v-if="worldCloudoption['series'][0]['data']" :option="worldCloudoption"></WordCloud>
      <v-chart v-if="option['xAxis'][0]['data'] && option['series'][0]['data']" :options="option"></v-chart>
    </div>
  </div>
</template>

<script>
import WordCloud from '../components/WordCloud';
import { mapState } from 'vuex';
export default {
    components: { WordCloud },
    data () {
        return {
            totalNumberOfPeople: 0,
            numberOfHighlyEducated: 0,
            numberOfRestart: 0,
            numberOfParty: 0,
            messageNum: 0,
            profileNum: 0,
            option: {
                color: ['#3398DB'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        axisLabel: { interval: 0, rotate: 30 },
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '部门',
                        type: 'bar',
                        barWidth: '60%'
                    }
                ]
            },
            worldCloudoption: {
                title: {
                    text: '职员', // 标题
                    x: 'center',
                    textStyle: {
                        fontSize: 18
                    }
                },
                backgroundColor: '#fff',
                series: [
                    {
                        name: '职员', // 数据提示窗标题
                        type: 'wordCloud',
                        sizeRange: [20, 66], // 画布范围，如果设置太大会出现少词（溢出屏幕）
                        rotationRange: [-45, 90], // 数据翻转范围
                        textPadding: 0,
                        autoSize: {
                            enable: true,
                            minSize: 6
                        },
                        textStyle: {
                            normal: {
                                color: function () {
                                    return (
                                        'rgb(' +
                    [
                        Math.round(Math.random() * 160),
                        Math.round(Math.random() * 160),
                        Math.round(Math.random() * 160)
                    ].join(',') +
                    ')'
                                    );
                                }
                            },
                            emphasis: {
                                shadowBlur: 10,
                                shadowColor: '#333'
                            }
                        }
                    }
                ]
            }
        };
    },
    computed: {},
    mounted () {
        this.getHomePageData();
    },
    methods: {
        getHomePageData () {
            this.$http.post('/api/getHomePageData').then(res => {
                let {
                    success,
                    msg,
                    totalNumberOfPeople,
                    numberOfHighlyEducated,
                    numberOfRestart,
                    numberOfParty,
                    messageNum,
                    profileNum,
                    nameData,
                    branchName,
                    branchPeople
                } = res;
                if (success) {
                    this.totalNumberOfPeople = totalNumberOfPeople;
                    this.numberOfHighlyEducated = numberOfHighlyEducated;
                    this.numberOfRestart = numberOfRestart;
                    this.numberOfParty = numberOfParty;
                    this.messageNum = messageNum;
                    this.profileNum = profileNum;
                    this.worldCloudoption['series'][0]['data'] = nameData;
                    this.option['xAxis'][0]['data'] = branchName;
                    this.option['series'][0]['data'] = branchPeople;
                } else {
                    this.$alert(msg);
                }
            });
        }
    }
};
</script>
<style lang='scss' scoped>
.companyInfoContain {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background-color: #f3f3f3;
}
.companyItem {
  display: flex;
  flex-direction: row;
  width: 350px;
  background-color: #fff;
  padding: 10px;
  margin: 20px;
}
.infoContain {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  padding: 20px 30px;
}
.infoTitle {
  font-size: 28px;
}
.info {
  font-size: 18px;
}
.wordCloudContain {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  padding: 20px;
  background-color: #f3f3f3;
}
</style>
