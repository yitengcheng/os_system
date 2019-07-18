<template>
  <el-form-item :label="label" :prop="value">
    <el-upload
      :list-type="listType || 'picture-card'"
      ref="upload"
      action="/api/upload"
      :http-request="upload"
      :file-list="fileList"
      multiple
    >
      <i v-if="listType !== 'text'" class="el-icon-plus"></i>
      <el-button v-else size="small" type="primary">点击上传</el-button>
    </el-upload>
  </el-form-item>
</template>

<script>
export default {
    name: 'upload',
    props: ['img', 'value', 'label', 'listType'],
    data () {
        return {
            imageUrl: '',
            dialogVisible: false,
            fileList: []
        };
    },
    mounted () {
        this.imageUrl = this.img || '';
    },
    methods: {
        upload () {
            const formData = new FormData();
            const uploadFiles = this.$refs.upload.uploadFiles;
            const fileIndex = uploadFiles.length - 1;
            const file = uploadFiles[fileIndex];
            const headerConfig = {
                headers: { 'Content-Type': 'multipart/form-data' }
            };
            formData.append('image', file.raw);
            this.$http.post('/api/upload', formData, headerConfig).then(res => {
                let { success, url } = res;
                this.fileList.push({ url: this.$API + url });
                this.$emit('onChange', this.fileList, this.value);
            });
        }
    }
};
</script>
<style lang='scss' scoped>
</style>
