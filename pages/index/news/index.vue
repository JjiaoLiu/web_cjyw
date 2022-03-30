<template>
  <section class="container">
    <el-table :data="news" border stripe>
      <el-table-column v-for="col in columns" :key="col.id" :label="col.label">
        <template slot-scope="scope">
          <!-- @input="(e) => handleRowChange(scope.row, col.id, e)" -->
          <span
            :id="scope.$index + '_' + scope.row.id"
            :class="
              'contenteditable-input' +
              ' ' +
              (scope.row.contenteditable && 'contenteditable')
            "
            :contenteditable="scope.row.contenteditable"
            v-html="scope.row[col.id]"
            @blur="(e) => newsPut(scope.row, col.id, e)"
          ></span>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot="header">
          操作
          <el-button
            type="primary"
            @click="handleAddRow"
            :disabled="ifRowDisabled"
            size="mini"
            circle
            icon="el-icon-plus"
          ></el-button>
        </template>
        <template slot-scope="scope">
          <el-button
            type="text"
            :disabled="ifRowDisabled"
            @click="handleEditRow(scope.$index, scope.row)"
          >
            编辑
          </el-button>
          <el-button
            type="text"
            :disabled="ifRowDisabled"
            @click="newsDelete(scope.$index, scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>

<script>
const modelRow = { title: "" };
export default {
  name: "News",
  data() {
    return {
      columns: [{ id: "title", label: "标题" }],
      ifRowDisabled: false,
    };
  },
  async asyncData({ $http }) {
    const { data } = await $http.$get("/api/news/list");
    return { news: data };
  },
  head() {
    return {
      title: "News",
    };
  },
  methods: {
    handleEditRow(index, _row) {
      this.$set(this.news[index], "contenteditable", true);
    },
    handleAddRow() {
      if (this.ifRowDisabled) return;
      this.ifRowDisabled = true;
      this.news.push(modelRow);
    },
    newsPut(row, id, e) {
      this.$http
        .$put("/api/news/put", { ...row, [id]: e.srcElement.innerText })
        .then((_res) => {});
    },
    newsDelete(_index, row) {
      this.$http.$delete("/api/news/delete", { id: row.id }).then((_res) => {
        this.news.splice(_index, 1);
      });
    },
    newsAdd(_index, row) {
      this.$http.$post("/api/news/add", row).then((_res) => {
        // this.news.splice(_index, 1);
      });
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
}
.contenteditable {
  border: 1px solid #ccc;
  background: #ddd;
}
.contenteditable-input {
  padding: 3px 10px;
  display: inline-block;
  width: -webkit-fill-available;
}
</style>
