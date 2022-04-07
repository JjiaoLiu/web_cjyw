<template>
  <div>
    <el-upload
      ref="upload"
      :data="fileData"
      action="http://127.0.0.1:3000/api/upload"
      :headers="{
        Authorization: $store.state.auth,
      }"
      :file-list="fileList"
      :limit="1"
    >
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <div slot="tip" class="el-upload__tip">
        只能上传jpg/png文件，且不超过500kb
      </div>
    </el-upload>
    <el-carousel trigger="click" height="150px" style="width: 220px">
      <el-carousel-item v-for="item in pictures" :key="item">
        <img :src="item" style="height: 100%" alt="" srcset="" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
const Cookie = process.client ? require("js-cookie") : undefined;

export default {
  data() {
    return {
      fileList: [],
      fileData: {},
      pictures: [],
    };
  },
  methods: {
    getPicture() {
      this.$http.$get("/api/picture").then((res) => {
        this.pictures = res.data;
      });
    },
  },
  mounted() {
    this.getPicture();
  },
};
</script>
