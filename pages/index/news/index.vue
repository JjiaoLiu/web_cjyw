<template>
  <section class="container">
    <el-form :model="form" ref="form">
      <el-form-item>
        <el-input
          clearable
          v-model.trim="form.key"
          placeholder="keywords"
        ></el-input>
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
            @blur="(e) => newsSubmit(scope.row, scope.$index, col.attr, e)"
          ></span>
          <div class="is-error" v-if="errors[scope.$index]">
            {{ $getError(col.attr, errors[scope.$index]) }}
          </div>
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
          <el-link
            type="primary"
            :underline="false"
            @click="handleEditRow(scope.$index, scope.row)"
            >编辑</el-link
          >
          <el-divider direction="vertical"></el-divider>
          <el-link
            type="danger"
            :underline="false"
            @click="newsDelete(scope.$index, scope.row)"
            >删除</el-link
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChange"
      @current-change="currentChange"
      :current-page.sync="currentPage"
      :page-sizes="[10, 15, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      background
    >
    </el-pagination>
  </section>
</template>

<script>
import newsSchema from "@/schema/news";
const modelRow = { title: "", contenteditable: true };
export default {
  name: "News",
  data() {
    return {
      news: [],
      total: 0,
      pageSize: 10,
      currentPage: 1,
      form: { key: "", limit: 3 },
      errors: [],
      columns: [{ attr: "title", label: "标题" }],
    };
  },
  head() {
    return {
      title: "News",
    };
  },
  watch: {
    form: {
      deep: true,
      immediate: true,
      handler(_n, _o) {
        this.newsList();
      },
    },
  },
  methods: {
    currentChange() {
      this.newsList();
    },
    sizeChange() {
      this.currentPage = 1;
      this.newsList();
    },
    handleEditRow(index, _row) {
      this.$set(this.news[index], "contenteditable", true);
    },
    handleAddRow() {
      this.news.push(Object.assign({}, modelRow));
    },
    async newsList() {
      const { data } = await this.$http.$get(
        "/api/news/list?" +
          this.$qs.stringify({
            ...this.form,
            limit: this.pageSize,
            page: this.currentPage,
          })
      );
      this.news = data.data;
      this.total = data.total;
    },
    async newsSubmit(row, index, attr, e) {
      console.log(attr);
      row[attr] = e.srcElement.innerText.trim();
      var feed = newsSchema(Object.assign({}, row));
      this.$set(this.errors, index, feed);
      if (feed.length > 0) {
        row.contenteditable = true;
        return;
      }
      delete row.contenteditable;
      if (row.id) {
        const { message } = await this.$http.$put("/api/news/put", row);
        this.$message.success(message);
      } else {
        const { message, data } = await this.$http.$post("/api/news/add", row);
        row.id = data.insertedId;
        this.total = this.total + 1;
        this.$message.success(message);
      }
    },
    async newsDelete(_index, row) {
      if (row.id) {
        let { message } = await this.$http.$delete(
          `/api/news/delete/${row.id}`
        );
        this.news.splice(_index, 1);
        this.total = this.total - 1;
        this.$message.success(message);
      } else {
        this.news.splice(_index, 1);
        this.total = this.total - 1;
      }
    },
  },
};
</script>

<style scoped></style>
