<template>
  <section class="container">
    <el-form :model="form" size="small" inline ref="form">
      <el-form-item>
        <el-input
          clearable
          v-model.trim="form.key"
          placeholder="keywords"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="form.date"
          type="daterange"
          range-separator="-"
          start-placeholder="起始时间"
          end-placeholder="结束时间"
          value-format="timestamp"
          :default-time="['00:00:00', '23:59:59']"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-upload
          ref="upload"
          name="excel"
          action="http://127.0.0.1:3000/api/news/import"
          :on-success="() => newsList()"
          :headers="{
            Authorization: $store.state.auth,
          }"
          :file-list="fileList"
          :limit="1"
        >
          <el-button slot="trigger" type="primary">选取文件</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="newsExport">导出</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="news" border ref="table">
      <template v-for="col in columns">
        <el-table-column
          v-if="col.formatter"
          :label="col.label"
          :key="col.attr"
          :formatter="col.formatter"
        >
        </el-table-column>
        <el-table-column v-else :label="col.label" :key="col.attr">
          <template slot-scope="scope">
            <span
              :id="'news_' + scope.$index"
              :class="
                'contenteditable-input' +
                ' ' +
                (scope.row.contenteditable && col.writable !== false
                  ? 'contenteditable'
                  : '')
              "
              :contenteditable="
                scope.row.contenteditable && col.writable !== false
              "
              v-html="scope.row[col.attr]"
              @blur="
                (e) => newsLocalChange(scope.row, scope.$index, col.attr, e)
              "
            ></span>
            <div class="is-error" v-if="errors[scope.$index]">
              {{ $getError(col.attr, errors[scope.$index]) }}
            </div>
          </template>
        </el-table-column>
      </template>

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
          <el-link type="primary" :underline="false">
            <span
              v-if="scope.row.contenteditable"
              @click="newsSubmit(scope.row, scope.$index)"
              >保存</span
            >
            <span v-else @click="handleEditRow(scope.$index, scope.row)">
              编辑
            </span>
          </el-link>
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
const modelRow = { contenteditable: true };
export default {
  name: "News",
  data() {
    return {
      fileList: [],
      news: [],
      total: 0,
      pageSize: 10,
      currentPage: 1,
      form: { key: "", data: [] },
      errors: [],
      columns: [
        { attr: "id", label: "ID", writable: false },
        { attr: "title", label: "标题" },
        { attr: "content", label: "正文" },
        {
          attr: "updateTime",
          label: "更新时间",
          writable: false,
          formatter: (row) => {
            return row["updateTime"]
              ? new Date(row["updateTime"]).toLocaleString()
              : "";
          },
        },
      ],
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
    newsLocalChange(row, index, attr, e) {
      row[attr] = e.srcElement.innerText.trim();
      var feed = newsSchema(Object.assign({}, row));
      this.$set(this.errors, index, feed);
      if (feed.length > 0) {
        row.contenteditable = true;
        return;
      }
    },
    async newsExport() {
      await this.$http.$get("/api/news/export", {
        responseType: "arraybuffer",
      });
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
    async newsSubmit(row, index) {
      this.$delete(this.news[index], "contenteditable");
      let response;
      if (row.id) {
        response = await this.$http.$put("/api/news/put", row);
      } else {
        response = await this.$http.$post("/api/news/add", row);
      }
      this.$message.success(response.message);
      this.newsList();
    },
    async newsDelete(_index, row) {
      let response;
      if (row.id) {
        response = await this.$http.$delete(`/api/news/delete/${row.id}`);
      }
      this.news.splice(_index, 1);
      this.total = this.total - 1;
      this.$message.success(response.message);
    },
  },
};
</script>

<style scoped></style>
