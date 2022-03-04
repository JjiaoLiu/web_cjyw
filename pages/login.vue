<template>
  <el-container class="full-page">
    <!-- <el-header>Header</el-header> -->
    <el-main>
      <el-row type="flex" justify="center" align="middle" class="height_100">
        <el-col style="width: 300px">
          <el-form
            :model="user"
            ref="user"
            label-width="0"
            :inline="false"
            size="normal"
          >
            <el-form-item label="">
              <el-input
                v-model="user.name"
                prefix-icon="el-icon-user"
              ></el-input>
            </el-form-item>
            <el-form-item label="">
              <el-input
                v-model="user.password"
                prefix-icon="el-icon-lock"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button class="width_100" type="primary" @click="login"
                >登录</el-button
              >
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-main>
    <!-- <el-footer>footer</el-footer> -->
  </el-container>
</template>

<script>
const Cookie = process.client ? require("js-cookie") : undefined;

export default {
  middleware: "notAuthenticated",
  data() {
    return {
      user: {
        name: "cjyw",
        password: "123456a",
      },
    };
  },
  methods: {
    async login() {
      const { data, token } = await this.$http.$post(
        "/api/auth/login",
        this.user
      );
      this.$store.commit("setAuth", data.name); // mutating to store for client rendering
      Cookie.set("auth", data.name); // saving token in cookie for server rendering
      Cookie.set("token", token); // saving token in cookie for server rendering
      this.$router.push("/");
    },
  },
};
</script>

<style scoped></style>
