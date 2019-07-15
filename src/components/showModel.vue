<template>
  <el-dialog :title="title || '提示'" :visible="dialogVisible" @close="closeModel">
    <div>
      <slot name="content"></slot>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="doCancel" class="btn">{{cancel || '取消'}}</el-button>
      <el-button class="btn" type="primary" @click="doConfirm">{{confirm||'确定'}}</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
    props: ['title', 'dialogVisible', 'cancel', 'confirm'],
    methods: {
        closeModel () {
            this.$emit('close');
        },
        doCancel () {
            this.$emit('doCancel');
        },
        doConfirm () {
            this.$emit('doConfirm');
        }
    }
};
</script>
<style lang='scss' scoped>
.dialog-footer {
  display: flex;
  width: 250px;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto 20px auto;
}
.btn {
  width: 100px;
}
</style>
