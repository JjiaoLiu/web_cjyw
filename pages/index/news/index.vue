<template>
  <section class="container">
    <el-form :model="form" ref="form">
      <el-form-item>
        <el-input v-model.trim="form.key" placeholder="keywords"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="news" border ref="table">
      <el-table-column
        v-for="col in columns"
        :key="col.attr"
        :label="col.label"
      >
        <template slot-scope="scope">
          <span
            :id="'news_' + scope.$index"
            :class="
              'contenteditable-input' +
              ' ' +
              (scope.row.contenteditable && 'contenteditable')
            "
            :contenteditable="scope.row.contenteditable"
            v-html="scope.row[col.attr]"
            @blur="(e) => newsSubmit(scope.row, col.attr, e)"
          ></span>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot="header">
          操作
          <el-button
            type="primary"
            @click="handleAddRow"
            size="mini"
            circle
            icon="el-icon-plus"
          ></el-button>
        </template>
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="handleEditRow(scope.$index, scope.row)"
          >
            编辑
          </el-button>
          <el-button type="text" @click="newsDelete(scope.$index, scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>

<script>
import qs from "qs";
const modelRow = { _id: "", title: "", contenteditable: true };
export default {
  name: "News",
  data() {
    return {
      news: [],
      form: { key: "测试" },
      columns: [{ attr: "title", label: "标题" }],
    };
  },
  head() {
    return {
      title: "News",
    };
  },
  mounted() {
    this.newsList();
  },
  methods: {
    onSubmit() {},
    handleEditRow(index, _row) {
      this.$set(this.news[index], "contenteditable", true);
    },
    handleAddRow() {
      this.news.push(Object.assign({}, modelRow));
    },
    async newsList() {
      const { data } = await this.$http.$get(
        "/api/news/list?" + qs.stringify(this.form)
      );
      this.news = data;
    },
    async newsSubmit(row, attr, e) {
      row.contenteditable != undefined && delete row.contenteditable;
      row[attr] = e.srcElement.innerText;
      if (row._id) {
        const { message } = await this.$http.$put("/api/news/put", row);
        this.$message.success(message);
      } else {
        const { message, data } = await this.$http.$post("/api/news/add", row);
        row._id = data.insertedId;
        this.$message.success(message);
      }
    },
    async newsDelete(_index, row) {
      row.contenteditable != undefined && delete row.contenteditable;
      let { message } = await this.$http.$delete(`/api/news/delete/${row._id}`);
      this.news.splice(_index, 1);
      this.$message.success(message);
    },
  },
};
</script>

<style scoped>
.container {
  /* display: flex; */
}
.contenteditable {
  border: 1px solid #ccc;
  background: #ddd;
}
.contenteditable-input {
  padding: 3px 10px;
  display: inline-block;
  width: -webkit-fill-available;
  min-height: 14px;
}
</style>
