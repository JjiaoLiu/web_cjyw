<template>
  <div>
    <!-- emulate: true, -->
    <el-upload
      ref="upload"
      :data="fileData"
      action="http://127.0.0.1:3000/api/upload"
      :headers="{
        Authorization: token,
      }"
      :on-remove="handleRemove"
      :file-list="fileList"
      :limit="1"
    >
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <div slot="tip" class="el-upload__tip">
        只能上传jpg/png文件，且不超过500kb
      </div>
    </el-upload>
  </div>
</template>
<script>
const Cookie = process.client ? require("js-cookie") : undefined;

export default {
  data() {
    return {
      fileList: [],
      fileData: {},
      token: Cookie && Cookie.get("token"),
    };
  },
  methods: {},
};
</script>
