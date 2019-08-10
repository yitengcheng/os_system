<template>
  <div class="contain">
    <PageTitle label="留言板" />
    <div class="message-board">
      <el-image class="message-board" src="static/backimage.png"></el-image>
      <div class="message">
        <canvas ref="canvas" :width="fullWidth*0.85" height="400" :style="style"></canvas>
        <canvas ref="hiddenCanvas" width="0" height="0" style="display: none"></canvas>
      </div>
      <div class="input-area">
        <el-input
          class="input"
          :autosize="{ minRows: 2, maxRows: 2}"
          maxlength="50"
          show-word-limit
          type="textarea"
          resize="none"
          @keyup.enter="sent"
          v-model="dmInput"
          placeholder="请输入留言"
        ></el-input>
        <el-button class="button" type="primary" @click="sent">发布留言</el-button>
      </div>
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
            fullWidth: document.documentElement.clientWidth,
            dmArr: [], // 弹幕列表
            gap: 6,
            timer: null,
            width: 0,
            style: '',
            dmInput: '',
            color: '',
            temp: true
        };
    },
    computed: {
        ...mapState({
            user: state => state.user.user
        })
    },
    mounted () {
        window.addEventListener('resize', this.handleResize);
        console.log('---111', this.fullWidth);
        this.style = 'width:' + this.fullWidth + 'px;height:400px';
        this.$http.post('/api/getMessage').then(res => {
            let { success, msg, messageList } = res;
            if (success) {
                for (let i = 0; i < messageList.length; i++) {
                    this.pushDm(messageList[i]);
                }
                this.start();
            }
        });
    },
    destroyed () {
        this.temp = false;
        window.removeEventListener('resize', this.handleResize);
    },
    watch: {
        temp: {
            handler (newvalue, oldvalue) {
                if (newvalue) {
                    this.start();
                }
            }
        }
    },
    methods: {
        pushDm (text, color) {
            let y = this.getY(); // 先确定跑道
            let x = this.fullWidth * 0.85 - 300; // 初始x坐标为canvas的右边界
            console.log('---', this.fullWidth * 0.85 - 300);

            let delayWidth = 0; // 同跑道
            let hiddenCanvas = this.$refs.hiddenCanvas;
            for (let i = 0, len = this.dmArr.length; i < len; i++) {
                let dm = this.dmArr[i];
                if (y === dm.y) {
                    delayWidth += Math.floor(
                        hiddenCanvas.getContext('2d').measureText(dm.text).width * 4 + 50
                    );
                }
            }
            this.dmArr.push({
                text: text,
                x: x + delayWidth,
                y: y,
                speed: 2,
                color: color || this.getColor()
            });
        },
        getY () {
            let range = Math.floor(400 / this.gap); // 跑道数量
            let tmp = Math.floor(Math.random() * range + 1) * this.gap;
            if (tmp < 25 || tmp > 385) {
                this.getY();
            } else {
                return tmp;
            }
        },
        getColor () {
            return `${Math.floor(Math.random() * 25000000).toString(16)}`;
        },
        start () {
            if (this.$refs.canvas) {
                let ctx = this.$refs.canvas.getContext('2d');
                this.timer = setInterval(() => {
                    ctx.clearRect(0, 0, this.fullWidth, 400);
                    ctx.save();
                    ctx.font = '30px Microsoft YaHei';
                    for (let i = 0; i < this.dmArr.length; i++) {
                        this.temp = false;
                        let dm = this.dmArr[i];
                        let overRange = -ctx.measureText(dm.text).width * 2;
                        dm.x -= dm.speed;
                        ctx.fillStyle = `#${dm.color}`;
                        ctx.fillText(dm.text, dm.x, dm.y);
                        if (this.dmArr[this.dmArr.length - 1].x === -200) {
                            for (let j = 0; j < this.dmArr.length; j++) {
                                this.dmArr[j].x = this.fullWidth * 0.85 + j * 50;
                            }
                            this.temp = true;
                            clearInterval(this.timer);
                        }
                    }

                    ctx.restore();
                }, 10);
            }
        },
        stop () {
            let ctx = this.$refs.canvas.getContext('2d');
            ctx.clearRect(0, 0, this.fullWidth * 0.85, 400);
        },
        sent () {
            this.pushDm(this.dmInput, this.color);
            this.$http
                .post('/api/addMessage', {
                    userId: this.user._id,
                    message: this.dmInput
                })
                .then(res => {
                    let { success, msg } = res;
                });

            this.dmInput = '';
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
.message-board {
  display: flex;
  position: relative;
  height: 780px;
  width: 100%;
  flex-direction: column;
  background-repeat: no-repeat;
  background-size: 80%;
  align-items: center;
}
.message {
  height: 400px;
  width: 85%;
  top: 30px;
  position: absolute;
  z-index: 1000;
  background-color: #ffffff;
  border: 1px solid #000000;

  opacity: 0.8;
}
.input-area {
  height: 200px;
  margin-top: 30px;
  top: 430px;
  flex-direction: column;
  position: absolute;
  width: 600px;
  justify-content: center;
}
.input {
  height: 50px;
  width: 600px;
}
.button {
  height: 30px;
  width: 100px;
  background-color: #66b1ff;
  margin-left: 250px;
  margin-top: 20px;
}
</style>
