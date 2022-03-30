<template>
  <el-container direction="horizontal">
    <el-aside width="200px" style="background-color: #545c64">
      <el-container direction="vertical" style="height: 100%; overflow: hidden">
        <el-header> Logo height=60px </el-header>
        <el-container direction="horizontal" style="overflow-y: auto">
          <el-aside width="200px">
            <el-menu
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b"
            >
              <el-menu-item>
                <i class="el-icon-menu"></i>
                <NuxtLink to="/" slot="title"> 首页 </NuxtLink>
              </el-menu-item>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>导航一</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item>
                    <NuxtLink to="/news"> news page </NuxtLink>
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-aside>
        </el-container>
      </el-container>
    </el-aside>
    <el-container direction="vertical">
      <el-header
        style="text-align: right; padding: 16px; border-bottom: 1px solid #ddd"
        height="auto"
      >
        <el-dropdown @command="handleCommand">
          <el-row :gutter="16" type="flex" justify="end" align="middle">
            <el-col>
              <el-avatar>{{ username }}</el-avatar>
            </el-col>
            <i class="el-icon-arrow-down"></i>
            <el-col></el-col>
          </el-row>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <nuxt-child />
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
const Cookie = process.client ? require("js-cookie") : undefined;
export default {
  middleware: "authenticated",
  data() {
    return {
      username: Cookie && Cookie.get("username"),
    };
  },
  methods: {
    handleCommand(command) {
      this[command]();
    },
    logout() {
      Cookie.remove("token");
      this.$store.commit("setAuth", null);
      window.location.reload();
    },
  },
};
</script>
<style>
.el-menu [class^="nuxt-link"] {
  color: #fff;
  text-decoration: none;
}
.el-menu .nuxt-link-exact-active {
  color: red;
}
</style>
